<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
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
            'email' => 'admin@paper.com',
            'password' => Hash::make('secret'),
            'role_id' => 1,
            'picture' => '../img/faces/kaci-baum-1.jpg'
        ]);

        User::factory()->create([
            'id' => 2,
            'name' => 'Creator',
            'email' => 'creator@paper.com',
            'password' => Hash::make('secret'),
            'role_id' => 2,
            'picture' => '../img/faces/joe-gardner-1.jpg'
        ]);

        User::factory()->create([
            'id' => 3,
            'name' => 'Member',
            'email' => 'member@paper.com',
            'password' => Hash::make('secret'),
            'role_id' => 3,
            'picture' => '../img/faces/erik-lucatero-1.jpg'
        ]);
    }
}
