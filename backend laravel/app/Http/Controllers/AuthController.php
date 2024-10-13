<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $r)
    {
        $v = $r->validate([
            'username' => 'required|min:3|exists:users,username',
            'password' => 'required|min:8'
        ]);

        if (Auth::attempt(['username' => $r->username, 'password' => $r->password])) {
            $user = User::where('username', $r->username)->first();
            $token = $user->createToken('token')->plainTextToken;
            return response()->json(['message' => 'Login successful', 'token' => $token], 200);
        } else {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }

    public function info(Request $r)
    {
        return response()->json([
            'message' => 'info retrieved',
            'user' => $r->user()
        ], 200);
    }



    public function logout(Request $r)
    {
        $r->user()->tokens()->delete();

        return response()->json([
            'message' => 'success'
        ], 200);
    }
}
