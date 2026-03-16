<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('roles')->truncate();
        DB::table('users')->truncate();
        DB::table('categories')->truncate();
        DB::table('tags')->truncate();
        DB::table('items')->truncate();

        $this->call([RolesSeeder::class, UserSeeder::class, CategorySeeder::class, TagSeeder::class, ItemSeeder::class]);
        DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }
}
