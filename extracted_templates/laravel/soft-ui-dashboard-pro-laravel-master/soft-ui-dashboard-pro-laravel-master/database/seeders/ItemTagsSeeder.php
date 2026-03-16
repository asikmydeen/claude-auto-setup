<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemTagsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('item-tags')->insert([
            'id' => 1,
            'items_id' => 1,
            'tags_id' => '1',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('item-tags')->insert([
            'id' => 2,
            'items_id' => 1,
            'tags_id' => '3',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('item-tags')->insert([
            'id' => 3,
            'items_id' => 2,
            'tags_id' => '2',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('item-tags')->insert([
            'id' => 4,
            'items_id' => 3,
            'tags_id' => '1',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('item-tags')->insert([
            'id' => 5,
            'items_id' => 3,
            'tags_id' => '2',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('item-tags')->insert([
            'id' => 6,
            'items_id' => 3,
            'tags_id' => '3',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
