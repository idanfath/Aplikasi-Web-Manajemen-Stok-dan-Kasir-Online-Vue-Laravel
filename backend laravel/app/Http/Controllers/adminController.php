<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class adminController extends Controller
{

    public function register(Request $r)
    {
        $v = $r->validate([
            'username' => 'required|min:3|unique:users,username',
            'password' => 'required|min:8|confirmed',
            'role' => 'sometimes|in:admin,officer',
        ]);

        return response()->json([
            'user' => User::create($v),
        ], 200);
    }

    public function index(Request $r)
    {
        $user = User::query();
        if ($r->search) {
            $user->where('username', 'ilike', '%' . $r->search . '%');
        }

        $user->where('id', '!=', $r->user()->id);
        $user->orderBy('created_at', 'desc');
        $result = $user->paginate($r->limit ?? 10);
        return response()->json([
            'data' => $result
        ], 200);
    }
    public function show($id)
    {
        return response()->json([
            'data' => User::find($id)
        ], 200);
    }
    public function update(Request $r, $id)
    {
        // as an admin, you can update user data (username and password) without knowing the old password
        $v = $r->validate([
            'username' => 'required',
            'password' => 'confirmed|min:8',
            'role' => 'sometimes|in:admin,officer',
        ]);
        $user = User::find($id);
        if ($v['username'] !== $user->username) {
            $r->validate([
                'username' => 'unique:users,username',
            ]);
        }
        $user->update($v);
        return response()->json([
            'message' => 'success',
            'data' => $user,
        ], 200);
    }
    public function destroyMany(Request $r)
    {
        $v = $r->validate([
            'id' => 'required|array',
            'id.*' => 'required|exists:users,id',
        ]);

        User::destroy($v['id']);

        return response()->json([
            'message' => 'success',
        ], 200);
    }
}
