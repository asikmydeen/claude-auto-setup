<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class CategoryController extends Controller
{
    public function create()
    {
        $this->authorize('manage-items', User::class);
        $categories = DB::table('category')->get();
        return view('laravel-examples/category/category-management', compact('categories'));
    }

    public function createNew()
    {
        $this->authorize('manage-items', User::class);
        return view('laravel-examples/category/add-category');
    }

    public function createEdit($id)
    {
        $this->authorize('manage-items', User::class);
        $category = DB::table('category')->where('id', $id)->first();
        return view('laravel-examples/category/edit-category', compact('category'));
    }

    public function store(Request $request)
    {
        $attributes = request()->validate([
            'name' => ['required'],
            'description' => ['required'],
        ]); 
        DB::table('category')
            ->insert(['name' => $attributes['name'], 'description'=> $attributes['description'], 'created_at' => now(), 'updated_at' => now()]);
        return redirect('/laravel-category-management')->with('success','Category successfully added.');
    }
    public function edit(Request $request, $id)
    {
        $attributes = request()->validate([
            'name' => ['required'],
            'description' => ['required'],
        ]);         
        DB::table('category')
            ->where('id', $id)->limit(1)
            ->update(['name' => $attributes['name'], 'description'=> $attributes['description'], 'created_at' => now(), 'updated_at' => now()]);
        return redirect('/laravel-category-management')->with('success','Category successfully edited.');
    }

    public function destroy($id)
    {
        try{
            DB::table('category')->where('id', $id)->delete();
            return redirect('/laravel-category-management')
                ->with('success','Category deleted successfully');
                }catch(Exception $e){
                //if email or phone exist before in db redirect with error messages
                    return redirect()->back()->withErrors(['msgError' => 'Categories that are used cannot be deleted.']);
                }
    }
}
