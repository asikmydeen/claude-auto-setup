<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $table = 'items_management';

    protected $fillable = [
        'name',
        'file',
        'excerpt',
        'description',
        'category_id',
        'tag_id',
        'status',
        'show_homepage',
        'options',
        'date',
    ];

    public function tags()
    {
        return $this->belongsToMany(Tag::class,'item-tags', 'items_id', 'tags_id')->withPivot('items_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class,'category_id');
    }

    public function otherTeam()
    {
        if($this->tags->id == $this->id) {
            return $this->tags;

        }
        return $this->category;
    }
}
