<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'id' => 1,
            'name' => 'Admin',
            'email' => 'admin@lightbp.com',
            'role_id' => 1,
            'picture' => '../img/faces/margot.jpg'
        ]);

        User::factory()->create([
            'id' => 2,
            'name' => 'Creator',
            'email' => 'creator@lightbp.com',
            'role_id' => 2,
            'picture' => '../img/faces/face-6.jpg'
        ]);

        User::factory()->create([
            'id' => 3,
            'name' => 'Member',
            'email' => 'member@lightbp.com',
            'role_id' => 3,
            'picture' => '../img/faces/face-5.jpg'
        ]);
    }
}
