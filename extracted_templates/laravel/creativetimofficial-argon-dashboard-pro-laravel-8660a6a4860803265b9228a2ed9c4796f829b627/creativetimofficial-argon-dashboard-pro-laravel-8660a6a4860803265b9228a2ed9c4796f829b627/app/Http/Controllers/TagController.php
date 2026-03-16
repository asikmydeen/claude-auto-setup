<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Tag;

class TagController extends Controller
{
    public function index(Tag $model)
    {
        $this->authorize('update-category', User::class);
        return view('laravel.tag.index', ['tags' => $model->all()]);
    }

    public function create()
    {
        $this->authorize('update-category', User::class);
        return view('laravel.tag.create');
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'name' => 'required|unique:tags',
            'color' => 'required'
        ]);

        Tag::create([
            'name' => $attributes['name'],
            'description' => $attributes['color']
        ]);

        return redirect()->route('tag-management')->with('succes', 'Tag succesfully added');
    }

    public function edit($id)
    {
        $this->authorize('update-category', User::class);
        $tag = Tag::find($id);
        return view('laravel.tag.edit', compact('tag'));
    }

    public function update($id)
    {
        $tag = Tag::find($id);
        $attributes = request()->validate([
            'name' => ['required', Rule::unique('tags')->ignore($tag->id)],
            'color' => 'required'
        ]);

        $tag->update([
            'name' => $attributes['name'],
            'description' => $attributes['color']
        ]);

        return redirect()->route('tag-management')->with('succes', 'Tag succesfully updated');
    }

    public function destroy($id)
    {
        $tag = Tag::find($id);
        $this->authorize('update-category', User::class);
        // check if it is attached to an item
        if (!$tag->items->isEmpty()) {
            return redirect()->route('tag-management')->with('error', 'This tag has items attached and can\'t be deleted.');
        }
        $tag->delete();
        return redirect()->route('tag-management')->with('succes', 'The tag was succesfully deleted');
    }
}
