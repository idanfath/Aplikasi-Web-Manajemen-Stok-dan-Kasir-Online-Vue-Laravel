<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function skuCheck($sku)
    {
        return response()->json([
            'data' => Item::where('sku', $sku)->exists()
        ], 200);
    }

    public function index(Request $r)
    {
        $item = Item::query();
        if ($r->search) {
            $item->where('name', 'ilike', '%' . $r->search . '%')
                ->orWhere('sku', 'ilike', '%' . $r->search . '%');
        }

        $item->orderBy('updated_at', 'desc');

        $result = $item->paginate($r->limit ?? 10);
        return response()->json([
            'data' => $result
        ], 200);
    }
    public function show($id)
    {
        return response()->json([
            'data' => Item::find($id)
        ], 200);
    }
    public function store(Request $r)
    {
        $v = $r->validate([
            'name' => 'required',
            'stock' => 'required|min:1|numeric',
            'price' => 'required|numeric',
            'sku' => 'required|unique:items,sku',
        ]);

        return response()->json([
            'message' => 'success',
            'data' => Item::create($v),
        ], 200);
    }
    public function update(Request $r, $id)
    {
        $item = Item::find($id);
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
            'id.*' => 'required|exists:items,id'
        ]);

        Item::destroy($v['id']);


        return response()->json([
            'message' => 'success deleting'
        ], 200);
    }
}
