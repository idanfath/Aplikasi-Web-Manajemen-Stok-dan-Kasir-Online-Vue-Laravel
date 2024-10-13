<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Factories\CouponFactory;
use Database\Factories\ItemFactory;
use Database\Factories\TransactionFactory;
use Database\Factories\UserFactory;
use Illuminate\Database\Seeder;
use Throwable;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // create user admin
        try {
            if (!User::where('username', 'admin')->exists()) {
                User::create([
                    'username' => 'admin',
                    'password' => 'admin123',
                    'role' => 'admin',
                ]);
            }

            if (!User::where('username', 'user')->exists()) {
                User::create([
                    'username' => 'user',
                    'password' => 'user1234',
                ]);
            }
        } catch (Throwable $e) {
            // echo $e->getMessage();
        }
        UserFactory::new()->count(10)->create();
        ItemFactory::new()->count(10)->create();
        TransactionFactory::new()->count(10)->create();
        CouponFactory::new()->count(10)->create();
    }
}
