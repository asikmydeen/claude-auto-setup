<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

use App\Models\Item;
use App\Models\Category;
use App\Models\Tag;

class ItemController extends Controller
{
    public function index(Item $model)
    {
        return view('laravel.items.index', ['items' => $model->all()]);
    }

    public function create()
    {
        $categories = Category::all();
        $tags = Tag::all();
        return view('laravel.items.create', compact('categories', 'tags'));
    }

    public function store(Request $request)
    {
        $attributes = request()->validate([
            'name' => ['required', 'unique:items'],
            'excerpt' => ['max:100'],
            'description' => ['max:255'],
            'choices-category' => ['required'],
            'tags' => ['required'],
        ]);

        $item = Item::create([
            'name' => $request->get('name'),
            'excerpt' => $request->get('excerpt'),
            'description' => $request->get('description'),
            'category_id' => $request->get('choices-category'),
            'date' => $request->get('date'),
            'status' => $request->get('status'),
            'show_on_homepage' => $request->get('show_on_homepage'),
            'options' => $request->get('option')
        ]);

        $item->tags()->attach($request->get('tags'));

        if($request->file('picture')) {
            $item->update([
                'picture' => $request->file('picture')->store('/', 'items')
            ]);
        }

        return redirect()->route('item-management')->with('succes', 'Item succesfully saved');
    }

    public function edit($id)
    {
        $item = Item::find($id);
        $categories = Category::all();
        $tags = Tag::all();
        return view('laravel.items.edit', compact('item', 'categories', 'tags'));
    }

    public function update(Request $request, $id)
    {
        $this->authorize('manage-items', User::class);
        $item = Item::find($id);

        $attributes = $request->validate([
            'name' => ['required',  Rule::unique('items')->ignore($item->id)],
            'excerpt' => ['max:100'],
            'description' => ['max:255'],
            'choices-category' => ['required'],
            'tags' => ['required'],
        ]);

        $item->update([
            'name' => $request->get('name'),
            'excerpt' => $request->get('excerpt'),
            'description' => $request->get('description'),
            'category_id' => $request->get('choices-category'),
            'date' => $request->get('date'),
            'status' => $request->get('status'),
            'show_on_homepage' => $request->get('show_on_homepage'),
            'options' => $request->get('option')
        ]);

        $item->tags()->sync($attributes['tags']);

        if($request->file('picture')) {
            $item->update([
                'picture' => $request->file('picture')->store('/', 'items')
            ]);
        }

        return redirect()->route('item-management')->with('succes', 'Item succesfully updated');
    }

    public function destroy($id)
    {
        $this->authorize('manage-items', User::class);
        $item = Item::find($id);
        $item->tags()->detach();
        $item->delete();
        return redirect()->route('item-management')->with('succes', 'The item was succesfully deleted');
    }
}
