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
    protected $description =  'Reseeds the image folders';

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
        File::copy(storage_path('app/public/pictures-seeder/1.jpg'), storage_path('app/public/articles-seeder/1.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/2.jpg'), storage_path('app/public/articles-seeder/2.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/3.jpg'), storage_path('app/public/articles-seeder/3.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/4.jpg'), storage_path('app/public/articles-seeder/4.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/5.jpg'), storage_path('app/public/articles-seeder/5.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/6.jpg'), storage_path('app/public/articles-seeder/6.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/8.jpg'), storage_path('app/public/articles-seeder/8.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/9.jpg'), storage_path('app/public/articles-seeder/9.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/10.jpg'), storage_path('app/public/articles-seeder/10.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/11.jpg'), storage_path('app/public/articles-seeder/11.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/12.jpg'), storage_path('app/public/articles-seeder/12.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/14.jpg'), storage_path('app/public/articles-seeder/14.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/19.jpg'), storage_path('app/public/articles-seeder/19.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/20.jpg'), storage_path('app/public/articles-seeder/20.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/21.jpg'), storage_path('app/public/articles-seeder/21.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/22.jpg'), storage_path('app/public/articles-seeder/22.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/23.jpg'), storage_path('app/public/articles-seeder/23.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/24.jpg'), storage_path('app/public/articles-seeder/24.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/26.jpg'), storage_path('app/public/articles-seeder/26.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/27.jpg'), storage_path('app/public/articles-seeder/27.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/28.jpg'), storage_path('app/public/articles-seeder/28.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/30.jpg'), storage_path('app/public/articles-seeder/30.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/31.jpg'), storage_path('app/public/articles-seeder/31.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/32.jpg'), storage_path('app/public/articles-seeder/32.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/article-upd.jpg'), storage_path('app/public/articles-seeder/article-upd.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/avatar.jpg'), storage_path('app/public/articles-seeder/avatar.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/camp.jpg'), storage_path('app/public/articles-seeder/camp.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/card-profile1-square.jpg'), storage_path('app/public/articles-seeder/card-profile1-square.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/card-profile2-square.jpg'), storage_path('app/public/articles-seeder/card-profile2-square.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/christian.jpg'), storage_path('app/public/articles-seeder/christian.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/kendall.jpg'), storage_path('app/public/articles-seeder/kendall.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/marc.jpg'), storage_path('app/public/articles-seeder/marc.jpg'));

        File::copy(storage_path('app/public/pictures-seeder/13.jpg'), storage_path('app/public/authors-seeder/13.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/15.jpg'), storage_path('app/public/authors-seeder/15.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/16.jpg'), storage_path('app/public/authors-seeder/16.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/17.jpg'), storage_path('app/public/authors-seeder/17.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/18.jpg'), storage_path('app/public/authors-seeder/18.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/25.jpg'), storage_path('app/public/authors-seeder/25.jpg'));
        File::copy(storage_path('app/public/pictures-seeder/28.jpg'), storage_path('app/public/authors-seeder/28.jpg'));

        File::copy(storage_path('app/public/pictures-cat-seeder/1.jpg'), storage_path('app/public/categories-seeder/1.jpg'));
        File::copy(storage_path('app/public/pictures-cat-seeder/2.jpg'), storage_path('app/public/categories-seeder/2.jpg'));
        File::copy(storage_path('app/public/pictures-cat-seeder/3.jpg'), storage_path('app/public/categories-seeder/3.jpg'));
        File::copy(storage_path('app/public/pictures-cat-seeder/4.jpg'), storage_path('app/public/categories-seeder/4.jpg'));
        File::copy(storage_path('app/public/pictures-cat-seeder/5.jpg'), storage_path('app/public/categories-seeder/5.jpg'));
    }
}
