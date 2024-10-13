<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $itemOptions = ['T-Shirt', 'Pants', 'Shoes', 'Hat', 'Jacket', 'Socks', 'Gloves', 'Scarf', 'Belt', 'Sunglasses'];
        $colorOptions = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Gray', 'Brown', 'Purple', 'Orange'];

        $name = $this->faker->randomElement($colorOptions) . ' ' . $this->faker->randomElement($itemOptions) . ' ' . $this->faker->words(2, true);

        return [

            'name' => $name,
            'stock' => $this->faker->numberBetween(1, 100),
            'price' => $this->faker->numberBetween(1000, 20000),
            'sku' => Str::slug($name)
        ];
    }
}
