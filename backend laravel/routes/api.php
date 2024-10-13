<?php

use App\Http\Controllers\adminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware(['auth:sanctum'])->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('login', [AuthController::class, 'login'])->withoutMiddleware(['auth:sanctum']);
        Route::get('info', [AuthController::class, 'info']);
        Route::post('logout', [AuthController::class, 'logout']);
    });

    Route::prefix('admin')->middleware(['roleCheck'])->group(function () {
        Route::apiResources([
            'user' => adminController::class,
            'coupon' => CouponController::class,
        ]);
        Route::post('register', [adminController::class, 'register'])->middleware(['roleCheck']);
        Route::delete('deleteUsers', [adminController::class, 'destroyMany']);
        Route::delete('deleteCoupons', [CouponController::class, 'destroyMany']);
        Route::put('coupon/toggle/{id}', [CouponController::class, 'toggleStatus']);
    });

    Route::apiResources([
        'item' => ItemController::class,
        'transaction' => TransactionController::class,
    ]);
    Route::get('coupon/check', [CouponController::class, 'check']);
    Route::get('skucheck/{sku}', [ItemController::class, 'skuCheck']);
    Route::delete('deleteItems', [ItemController::class, 'destroyMany']);
    Route::delete('deleteTransactions', [TransactionController::class, 'destroyMany']);
    Route::apiResource('user', UserController::class)->only(['update']);
});
