<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class statusSetter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        try {
            $originalContent = json_decode($response->getContent(), true);
            $newContent = [
                'status' => $response->getStatusCode() === 200 ? 'success' : 'failed',
            ];
            $newContent = array_merge($newContent, $originalContent);
            $response->setContent(json_encode($newContent));
        } catch (\Throwable $th) {
            // do nothing, just return the response without any status
        }

        return $response;
    }
}
