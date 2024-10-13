<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class roleCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user()) {
            return response()->json([
                'errors' => 'Unauthorized',
            ], 401);
        }

        if (!in_array($request->user()->role, ['admin'])) {
            return response()->json([
                'errors' => 'Unauthorized',
            ], 401);
        }
        return $next($request);
    }
}
