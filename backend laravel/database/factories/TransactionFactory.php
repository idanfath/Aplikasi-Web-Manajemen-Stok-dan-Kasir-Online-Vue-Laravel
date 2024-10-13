<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        if (Item::count() === 0) {
            Item::factory()->count(10)->create();
        }

        $randomItems = Item::all()->random(3);
        $amount = [
            $this->faker->numberBetween(1, $randomItems[0]->stock),
            $this->faker->numberBetween(1, $randomItems[1]->stock),
            $this->faker->numberBetween(1, $randomItems[2]->stock),
        ];
        $total = $randomItems[0]->price * $amount[0] + $randomItems[1]->price * $amount[1] + $randomItems[2]->price * $amount[2];
        $subtotal = $total;
        $paidAmount = $this->faker->randomElement([0, 20, 5, 10, 25, 50, 100]) * 1000 + $total;
        $paidAmount = ceil($paidAmount / 1000) * 1000;
        $change = $paidAmount - $total;
        $change = floor($change / 500) * 500;

        return [
            'invoice' => md5($this->faker->unique()->randomNumber(8)),
            'total' => $total,
            'user_id' => 1,
            'paid_amount' => $paidAmount,
            'change' => $change,
            'subtotal' => $subtotal,
            'items' => [
                [
                    'id' => $randomItems[0]->id,
                    'sku' => $randomItems[0]->sku,
                    'price' => $randomItems[0]->price,
                    'name' => $randomItems[0]->name,
                    'amount' => $amount[0],
                    'subtotal' => $randomItems[0]->price * $amount[0],
                ],
                [
                    'id' => $randomItems[1]->id,
                    'sku' => $randomItems[1]->sku,
                    'price' => $randomItems[1]->price,
                    'name' => $randomItems[1]->name,
                    'amount' => $amount[1],
                    'subtotal' => $randomItems[1]->price * $amount[1],
                ],
                [
                    'id' => $randomItems[2]->id,
                    'sku' => $randomItems[2]->sku,
                    'price' => $randomItems[2]->price,
                    'name' => $randomItems[2]->name,
                    'amount' => $amount[2],
                    'subtotal' => $randomItems[2]->price * $amount[2],
                ],
            ]
        ];
    }
}
