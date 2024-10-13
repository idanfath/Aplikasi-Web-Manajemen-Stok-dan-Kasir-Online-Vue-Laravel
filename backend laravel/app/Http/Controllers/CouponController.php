<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use App\Models\Item;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function index(Request $r)
    {
        $coupon = Coupon::query();
        if ($r->search) {
            $coupon->where('code', 'ilike', '%' . $r->search . '%')
                ->orWhere('name', 'ilike', '%' . $r->search . '%');
        }

        $coupon->orderBy('created_at', 'desc');

        $result = $coupon->paginate($r->limit ?? 10);

        return response()->json([
            'data' => $result
        ], 200);
    }
    public function show($id)
    {
        return response()->json([
            'data' => Coupon::find($id)
        ], 200);
    }
    public function store(Request $r)
    {
        $v = $r->validate([
            'name' => 'sometimes|string',
            'status' => 'sometimes|boolean',
            'code' => 'required|unique:coupons,code',
            'expiry_type' => 'required|in:time,uses',
            'expires_at' => 'required_if:expiry_type,time|date',
            'max_uses' => 'required_if:expiry_type,uses|integer',
            'discount_type' => 'required|in:percentage,nominal',
            'minimum_price' => 'required|numeric',
            'discount_amount' => 'required|numeric',
            'max_discount' => 'required_if:discount_type,percentage|numeric',
        ]);

        if ($v['expiry_type'] === 'time') {
            unset($v['max_uses']);
        } else {
            unset($v['expires_at']);
        }

        if ($v['discount_type'] === 'percentage') {
            if ($v['discount_amount'] > 100) {
                return response()->json([
                    'message' => 'Discount amount must be less than or equal to 100',
                ], 400);
            }
            $v['discount_amount'] = $v['discount_amount'] / 100;
        } else {
            unset($v['max_discount']);
        }

        $v['user_id'] = $r->user()->id;

        return response()->json([
            'coupon' => Coupon::create($v),
        ], 200);
    }
    public function update(Request $r, $id)
    {
        $v = $r->validate([
            'name' => 'sometimes|string',
            'status' => 'sometimes|boolean',
            'code' => 'required',
            'expiry_type' => 'required|in:time,uses',
            'expires_at' => 'required_if:expiry_type,time|date',
            'max_uses' => 'required_if:expiry_type,uses|integer',
            'discount_type' => 'required|in:percentage,nominal',
            'minimum_price' => 'required|numeric',
            'discount_amount' => 'required|numeric',
            'max_discount' => 'required_if:discount_type,percentage|numeric',
        ]);

        $coupon = Coupon::find($id);

        if ($v['code'] !== $coupon->code) {
            $r->validate([
                'code' => 'unique:coupons,code',
            ]);
        }

        if ($v['expiry_type'] === 'time') {
            unset($v['max_uses']);
            $coupon->expires_at = $v['expires_at'];
            $coupon->max_uses = null;
        } else {
            unset($v['expires_at']);
            $coupon->max_uses = $v['max_uses'];
            $coupon->expires_at = null;
        }

        if ($v['discount_type'] === 'percentage') {
            if ($v['discount_amount'] > 100) {
                return response()->json([
                    'message' => 'Discount amount must be less than or equal to 100',
                ], 400);
            }
            $v['discount_amount'] = $v['discount_amount'] / 100;
        } else {
            unset($v['max_discount']);
            $coupon->max_discount = null;
        }

        $coupon->update($v);
        $coupon->save();

        return response()->json([
            'message' => 'success',
            'data' => $coupon,
        ], 200);
    }
    public function destroyMany(Request $r)
    {
        $v = $r->validate([
            'id' => 'required|array',
            'id.*' => 'required|exists:coupons,id',
        ]);

        Coupon::destroy($v['id']);

        return response()->json([
            'message' => 'success',
        ], 200);
    }
    public function toggleStatus(Request $r, $id)
    {
        $v = $r->validate([
            'status' => 'required|boolean',
        ]);

        $coupon = Coupon::find($id);
        $coupon->status = $r->status;
        $coupon->save();

        return response()->json([
            'message' => 'success',
            'data' => $coupon->status,
        ], 200);
    }
    public function check(Request $r)
    {
        $v = $r->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:items,id',
            'items.*.sku' => 'required|exists:items,sku',
            'items.*.amount' => 'required|numeric',
            'paid' => 'required|numeric',
            'code' => 'required|exists:coupons,code',
        ]);


        $coupon = Coupon::where('code', $v['code'])->first();
        $errmsg = '';
        $total = 0;

        foreach ($v['items'] as $item) {
            $total += Item::where('sku', $item['sku'])->first()->price * $item['amount'];
        }

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

        return response()->json([
            'discount' => $discount,
        ], 200);
    }
}
