<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function update(Request $r, $id)
    {
        $v = $r->validate([
            'username' => 'required',
            'password' => 'confirmed|min:8',
            'old_password' => 'required|min:8',
        ]);

        $user = User::find($id);

        if ($v['username'] !== $user->username) {
            $r->validate([
                'username' => 'unique:users,username',
            ]);
        }

        if ($r->password) {
            if (!password_verify($v['old_password'], $user->password)) {
                return response()->json([
                    'message' => 'Current password is incorrect'
                ], 400);
            }
            unset($v['old_password']);
        }
        $user->update($v);

        return response()->json([
            'message' => 'success',
            'data' => $user,
        ], 200);
    }
}
