<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'name' => 'Admin',
            'role_id' => 1,
            'email' => 'admin@softui.com',
            'password' => Hash::make('secret'),
            'picture' => 'profile/team-1.jpg'
        ]);

        User::factory()->create([
            'name' => 'Creator',
            'role_id' => 2,
            'email' => 'creator@softui.com',
            'password' => Hash::make('secret'),
            'picture' => 'profile/team-2.jpg'
        ]);

        User::factory()->create([
            'name' => 'Member',
            'role_id' => 3,
            'email' => 'member@softui.com',
            'password' => Hash::make('secret'),
            'picture' => 'profile/team-3.jpg'
        ]);
    }
}
