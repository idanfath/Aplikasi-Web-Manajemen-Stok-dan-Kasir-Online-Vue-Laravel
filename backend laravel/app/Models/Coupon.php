<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'status',
        'code',
        'expiry_type',
        'expires_at',
        'max_uses',
        'current_uses',
        'discount_type',
        'discount_amount',
        'max_discount',
        'minimum_price',
        'user_id',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
