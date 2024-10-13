<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice',
        'total',
        'paid_amount',
        'subtotal',
        'discount',
        'coupon_id',
        'change',
        'user_id',
        'items'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected $casts = [
        'items' => 'array',
    ];

    public function coupon()
    {
        return $this->belongsTo(Coupon::class);
    }
}
