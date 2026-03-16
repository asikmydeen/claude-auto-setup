<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('items')->insert([
            'id' => 1,
            'name' => 'Desk',
            'excerpt' => 'This is the excerpt for Desk',
            'description' => 'This is the description for Desk',
            'category_id' => 2,
            'created_at' => now(),
            'updated_at' => now(),
            'picture' => '/home-decor-1.jpg'
        ]);

        DB::table('items')->insert([
            'id' => 2,
            'name' => 'Notepad',
            'excerpt' => 'This is the excerpt for Notepad',
            'description' => 'This is the description for Notepad',
            'category_id' => 2,
            'created_at' => now(),
            'updated_at' => now(),
            'picture' => '/home-decor-2.jpg'
        ]);

        DB::table('items')->insert([
            'id' => 3,
            'name' => 'Laptop',
            'excerpt' => 'This is the excerpt for Laptop',
            'description' => 'This is the description for Laptop',
            'category_id' => 3,
            'created_at' => now(),
            'updated_at' => now(),
            'picture' => '/home-decor-3.jpg'
        ]);

        DB::table('item_tag')->insert([
            'item_id' => 1,
            'tag_id' => 1
        ]);
        DB::table('item_tag')->insert([
            'item_id' => 1,
            'tag_id' => 2
        ]);
        DB::table('item_tag')->insert([
            'item_id' => 2,
            'tag_id' => 3
        ]);

        DB::table('item_tag')->insert([
            'item_id' => 3,
            'tag_id' => 1
        ]);
        DB::table('item_tag')->insert([
            'item_id' => 3,
            'tag_id' => 2
        ]);
        DB::table('item_tag')->insert([
            'item_id' => 3,
            'tag_id' => 3
        ]);
    }
}
