<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Category;
use App\Policies\CategoryPolicy;

class CategoryController extends Controller
{
    public function index(Category $model)
    {
        $this->authorize('update-category', User::class);
        return view('laravel.category.index', ['categories' => $model->all()]);
    }

    public function create()
    {
        $this->authorize('update-category', User::class);
        return view('laravel.category.create');
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'name' => 'required|unique:categories',
            'description' => 'required|max:255'
        ]);

        Category::create([
            'name' => $attributes['name'],
            'description' => $attributes['description']
        ]);

        return redirect()->route('category-management')->with('succes', 'Category succesfully added');
    }

    public function edit($id)
    {
        $this->authorize('update-category', User::class);
        $category = Category::find($id);
        return view('laravel.category.edit', compact('category'));
    }

    public function update($id)
    {
        $category = Category::find($id);

        $attributes = request()->validate([
            'name' => ['required', Rule::unique('categories')->ignore($category->id)],
            'description' => 'required'
        ]);

        $category->update($attributes);

        return redirect()->route('category-management')->with('succes', 'Category succesfully updated');
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        $this->authorize('update-category', User::class);
        if (!$category->items->isEmpty()) {
            return redirect()->route('category-management')->with('error', 'This category has items attached and can\'t be deleted.');
        }
        $category->delete();
        return redirect()->route('category-management')->with('succes', 'The category was succesfully deleted ');
    }
}
