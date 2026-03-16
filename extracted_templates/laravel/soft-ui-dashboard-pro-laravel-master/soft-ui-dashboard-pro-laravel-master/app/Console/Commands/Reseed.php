<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class Reseed extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'image:seed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reseeds the image folders';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        File::copy(storage_path('app/public/seeder/users/team-1.jpg'), public_path('assets/img/users/team-1.jpg'));
        File::copy(storage_path('app/public/seeder/users/team-2.jpg'), public_path('assets/img/users/team-2.jpg'));
        File::copy(storage_path('app/public/seeder/users/team-3.jpg'), public_path('assets/img/users/team-3.jpg'));
        File::copy(storage_path('app/public/seeder/items/home-decor-1.jpg'), public_path('assets/img/items/home-decor-1.jpg'));
        File::copy(storage_path('app/public/seeder/items/home-decor-2.jpg'), public_path('assets/img/items/home-decor-2.jpg'));
        File::copy(storage_path('app/public/seeder/items/home-decor-3.jpg'), public_path('assets/img/items/home-decor-3.jpg'));
    }
}