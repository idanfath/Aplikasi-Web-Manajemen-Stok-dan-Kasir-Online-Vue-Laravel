<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Coupon>
 */
class CouponFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(['time', 'uses']);
        $nameOptions = ['Discount', 'Promo', 'Coupon', 'Voucher', 'Sale', 'Special Offer', 'Deal', 'Gift', 'Code', 'Promotion'];
        $name = $this->faker->randomElement($nameOptions) . ' ' . $this->faker->words(2, true);

        $discountType = $this->faker->randomElement(['percentage', 'nominal']);
        $discountAmount = $discountType === 'percentage' ? $this->faker->numberBetween(5, 25) / 100 : $this->faker->numberBetween(1000, 10000);
        $maxDiscount = $discountType === 'percentage' ? $this->faker->numberBetween(10000, 100000) : null;
        $minimumPrice = $this->faker->numberBetween(10000, 100000);

        return [
            'name' => $this->faker->randomElement([$name, $name, null]),
            'status' => $this->faker->boolean,
            'code' => Str::slug($this->faker->unique()->words(3, true)),
            'expiry_type' => $type,
            'expires_at' => $type === 'time' ? $this->faker->dateTimeBetween('now', '+1 year') : null,
            'max_uses' => $type !== 'time' ? $this->faker->numberBetween(1, 10) : null,
            'current_uses' => 0,
            'user_id' => User::inRandomOrder()->first()->id,
            'discount_type' => $discountType,
            'discount_amount' => $discountAmount,
            'max_discount' => $maxDiscount,
            'minimum_price' => $minimumPrice,
        ];
    }
}
