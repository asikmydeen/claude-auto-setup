<?php

namespace App\Http\Livewire\LaravelExamples\Items;

use App\Models\Category;
use App\Models\Item;
use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Livewire\Component;
use Livewire\WithFileUploads;

class Create extends Component
{
    use AuthorizesRequests;
    use WithFileUploads;

    public $categories;
    public $tags;
    public $name = '';
    public $category_id = '';
    public $description = '';
    public $picture;
    public $tags_id = [];
    public $status = '';
    public $options = [];
    public $date;
    public $showOnHomepage = false;

    protected $rules = [
        'name' => 'required|min:3|unique:items,name',
        'category_id' => 'required|exists:categories,id',
        'description' => 'required|min:5',
        'picture' => 'required|mimes:jpg,jpeg,png,bmp,tiff |max:4096',
        'tags_id' => 'required',
        'status' => 'required|in:published,draft,archive',
        'options' => 'required',
        'date' => 'required'

    ];

    public function mount()
    {
        $this->categories = Category::get(['id', 'name']);
        $this->tags = Tag::get(['id', 'name']);
    }


    public function store()
    {

        $this->validate();

        $item = Item::create([

            'name' => $this->name,
            'category_id' => $this->category_id,
            'description' => $this->description,
            'picture' => $this->picture->store('pictures', 'public'),
            'status' => $this->status,
            'options' => $this->options,
            'homepage' => $this->showOnHomepage ? 1 : 0,
            'date' => Carbon::parse($this->date)->format('Y-m-d')

        ]);

        sort($this->tags_id);
        $item->tag()->sync($this->tags_id, false);

        return redirect(route('item-management'))->with('status', 'Item successfully created.');
    }

    public function render()
    {
        $this->authorize('manage-items', User::class);

        return view('livewire.laravel-examples.items.create');
    }
}
