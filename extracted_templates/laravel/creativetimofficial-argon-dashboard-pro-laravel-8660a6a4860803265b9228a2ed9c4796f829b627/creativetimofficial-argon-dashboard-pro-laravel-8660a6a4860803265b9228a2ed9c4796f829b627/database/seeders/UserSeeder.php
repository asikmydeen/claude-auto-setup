<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'id' => 1,
            'firstname' => 'Admin',
            'lastname' => 'Admin',
            'email' => 'admin@argon.com',
            'password' =>  Hash::make('secret'),
            'role_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
            'avatar' => '/team-1.jpg'
        ]);

        DB::table('users')->insert([
            'id' => 2,
            'firstname' => 'Creator',
            'lastname' => 'Creator',
            'email' => 'creator@argon.com',
            'password' =>  Hash::make('secret'),
            'role_id' => 2,
            'created_at' => now(),
            'updated_at' => now(),
            'avatar' => '/team-2.jpg'
        ]);

        DB::table('users')->insert([
            'id' => 3,
            'firstname' => 'Member',
            'lastname' => 'Member',
            'email' => 'member@argon.com',
            'password' => Hash::make('secret'),
            'role_id' => 3,
            'created_at' => now(),
            'updated_at' => now(),
            'avatar' => '/team-3.jpg'
        ]);
    }
}
