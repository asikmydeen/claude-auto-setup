<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tags')->insert([
            'name' => 'HOT',
            'color' => '#ea0606',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('tags')->insert([
            'name' => 'COLD',
            'color' => '#17c1e8',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('tags')->insert([
            'name' => 'Trending',
            'color' => '#0CCA18',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
