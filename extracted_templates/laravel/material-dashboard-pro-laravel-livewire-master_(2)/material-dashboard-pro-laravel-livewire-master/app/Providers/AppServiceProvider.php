<?php

namespace App\Providers;

use App\Models\Category;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Role;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Builder::macro('getRoleId', function ($name){
            $roles = Role::all();
            for($i = 0; $i < count($roles); $i++) {
                if(strtolower($name) === strtolower($roles[$i]->name)) {
                    return $roles[$i]->id;
                }
            }
        }); 

        Builder::macro('getCategoryId', function ($name){
            $categories = Category::all();
            for($i = 0; $i < count($categories); $i++) {
                if(strtolower($name) === strtolower($categories[$i]->name)) {
                    return $categories[$i]->id;
                }
            }
        }); 

        Builder::macro('search', function ($field, $string) {
            return $string ? $this->where($field, 'like', '%'.$string.'%') : $this;
        });

        Builder::macro('searchMultipleUsers', function ($string) {
            if($string) {
                return $this->where('id', 'like', '%'.$string.'%')
                             ->orWhere('name', 'like', '%'.$string.'%')
                             ->orWhere('email', 'like', '%'.$string.'%')
                             ->orWhere('created_at', 'like', '%'.$string.'%')
                             ->orWhere('role_id','=',  intval($this->getRoleId($string)));
            } else {
                return $this;
            }
        });

        Builder::macro('searchMultiple', function ($string) {
            if($string) {
                return $this->where('id', '=', intval($string))
                             ->orWhere('name', 'like', '%'.$string.'%')
                             ->orWhere('description', 'like', '%'.$string.'%')
                             ->orWhere('created_at', 'like', '%'.$string.'%');
            } else {
                return $this;
            }
        });

        Builder::macro('searchMultipleTags', function ($string) {
            if($string) {
                return $this->where('id', '=', intval($string))
                             ->orWhere('name', 'like', '%'.$string.'%')
                             ->orWhere('created_at', 'like', '%'.$string.'%');
            } else {
                return $this;
            }
        });
    }
}

