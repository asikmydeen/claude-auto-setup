<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemsManagementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('items_management')->insert([
            'id' => 1,
            'category_id' => 2,
            'name' => 'Alchimia Chair',
            'file' => 'home-decor-1.jpg',
            'excerpt' => 'This is the excerpt for Alchimia Chair',
            'description' => 'This is the description for Alchimia Chair',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('items_management')->insert([
            'id' => 2,
            'category_id' => 2,
            'name' => 'Master Bed',
            'file' => 'home-decor-2.jpg',
            'excerpt' => 'This is the excerpt for Master Bed',
            'description' => 'This is the description for Master Bed',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('items_management')->insert([
            'id' => 3,
            'category_id' => 2,
            'name' => 'Fancy T-Shirt',
            'file' => 'home-decor-3.jpg',
            'excerpt' => 'This is the excerpt for Fancy T-Shirt',
            'description' => 'This is the description for Fancy T-Shirt',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
