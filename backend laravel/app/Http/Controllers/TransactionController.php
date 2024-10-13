<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use App\Models\Item;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index(Request $r)
    {
        $item = Transaction::query()->with('coupon');

        $item->with('user');

        if ($r->search) {
            $item->where(function ($query) use ($r) {
                $query->where('invoice', 'ilike', '%' . $r->search . '%')
                    ->orWhereRaw("items::jsonb @> ?", [
                        json_encode([['name' => $r->search]])
                    ])
                    ->orWhereRaw("items::jsonb @> ?", [
                        json_encode([['sku' => $r->search]])
                    ]);
            });
        }

        $item->orderBy('created_at', 'desc');

        $result = $item->paginate($r->limit ?? 10);
        return response()->json([
            'data' => $result
        ], 200);
    }
    public function show($id)
    {
        return response()->json([
            'data' => Transaction::find($id)
        ], 200);
    }
    public function store(Request $r)
    {
        $v = $r->validate([
            'paid_amount' => 'required|numeric',
            'coupon' => 'nullable|exists:coupons,code',
            'items' => 'required',
            'items.*.sku' => 'required|exists:items,sku',
            'items.*.id' => 'required|exists:items,id',
            'items.*.name' => 'required|string',
            'items.*.amount' => 'required|numeric',
        ]);

        $total = 0;
        foreach ($v['items'] as $i) {
            $i['price'] = Item::find($i['id'])->price;
            $total += $i['price'] * $i['amount'];
            $i['subtotal'] = $i['price'] * $i['amount'];
        }

        $v['total'] = $total;
        $v['invoice'] = md5(time() . $r->user()->id . $r->user()->name);

        if ($v['paid_amount'] < $v['total']) {
            return response()->json([
                'message' => 'paid amount not enough',
            ], 400);
        }

        foreach ($v['items'] as $i) {
            $item = Item::find($i['id']);
            $item->stock -= $i['amount'];
            $item->save();
        }

        if ($v['coupon']) {
            $coupon = Coupon::where('code', $v['coupon'])->first();
            $err = 0;
            $errmsg = '';

            switch (true) {
                case !$coupon->status:
                    $errmsg = 'Coupon is inactive';
                    break;
                case $coupon->expiry_type === 'time' && $coupon->expires_at < now():
                    $errmsg = 'Coupon has expired';
                    break;
                case $coupon->expiry_type === 'uses' && $coupon->current_uses >= $coupon->max_uses:
                    $errmsg = 'Coupon has reached its maximum usage';
                    break;
                case $total < $coupon->minimum_price:
                    $errmsg = 'Minimum price not met';
                    break;
            }

            if ($errmsg > 0) {
                return response()->json([
                    'message' => $errmsg,
                ], 400);
            }

            if ($coupon->discount_type === 'percentage') {
                $discount = $total * $coupon->discount_amount;
                if ($discount > $coupon->max_discount) {
                    $discount = $coupon->max_discount;
                }
            } else {
                $discount = $coupon->discount_amount;
            }

            $v['subtotal'] = $total;
            $v['discount'] = $discount;
            $v['total'] = $total - $discount;
            $v['change'] = floor(($v['paid_amount'] - $v['total']) / 100) * 100;
            $v['coupon_id'] = $coupon->id;
            $coupon->current_uses++;
            $coupon->save();
        } else {
            $v['subtotal'] = $total;
            $v['discount'] = 0;
            $v['total'] = $total;
            $v['change'] = $v['paid_amount'] - $v['total'];
        }

        $v['items'] = $v['items'];
        $v['user_id'] = $r->user()->id;

        return response()->json([
            'message' => 'success',
            'data' => Transaction::create($v),
        ], 200);
    }
    public function update(Request $r, $id)
    {
        $item = Transaction::find($id);
        $item->update($r->all());

        return response()->json([
            'message' => 'success',
            'data' => $item,
        ], 200);
    }
    public function destroyMany(Request $r)
    {
        $v = $r->validate([
            'id' => 'required',
            'id.*' => 'required|exists:transactions,id'
        ]);

        Transaction::destroy($v['id']);

        return response()->json([
            'message' => 'success deleting'
        ], 200);
    }
}
