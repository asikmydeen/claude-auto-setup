<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Item extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'picture', 'category_id', 'show_on_homepage', 'status', 'options', 'excerpt', 'description', 'date'];

    protected $casts = [
        'options' => 'array'
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function tags(){
        return $this->belongsToMany(Tag::class, 'item_tag', 'item_id', 'tag_id');
    }

    public function pictureUrl() {
        return $this->picture ? Storage::disk('items')->url($this->picture) : '/assets/img/home-decor-1.jpg';
    }
}
