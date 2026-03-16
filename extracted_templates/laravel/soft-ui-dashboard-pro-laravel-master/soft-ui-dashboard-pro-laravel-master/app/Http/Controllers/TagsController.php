<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TagsController extends Controller
{
    public function create()
    {
        $this->authorize('manage-items', User::class);
        $tags = DB::table('tags')->get();
        return view('laravel-examples/tags/tags-management', compact('tags'));
    }

    public function createNew()
    {
        $this->authorize('manage-items', User::class);
        return view('laravel-examples/tags/add-tags');
    }

    public function createEdit($id)
    {
        $this->authorize('manage-items', User::class);
        $tag = DB::table('tags')->where('id', $id)->first();
        return view('laravel-examples/tags/edit-tags', compact('tag'));
    }

    public function store(Request $request)
    {
        $attributes = request()->validate([
            'name' => ['required'],
            'color' => ['required'],
        ]); 
        DB::table('tags')
            ->insert(['name' => $attributes['name'], 'description'=> $attributes['color'], 'created_at' => now(), 'updated_at' => now()]);
        return redirect('/laravel-tags-management')->with('success','Tag successfully added.');
    }
    public function edit(Request $request, $id)
    {
        $attributes = request()->validate([
            'name' => ['required'],
            'color' => ['required'],
        ]); 
        
        DB::table('tags')
            ->where('id', $id)->limit(1)
            ->update(['name' => $attributes['name'], 'description'=> $attributes['color'], 'created_at' => now(), 'updated_at' => now()]);
        return redirect('/laravel-tags-management')->with('success','Tag successfully edited.');
    }

    public function destroy($id)
    {
        try{
            DB::table('tags')->where('id', $id)->delete();
            return redirect('/laravel-tags-management')
                ->with('success','Tag deleted successfully');
                }catch(Exception $e){
                //if email or phone exist before in db redirect with error messages
                    return redirect()->back()->withErrors(['msgError' => 'Tags that are used cannot be deleted.']);
                }
    }
}
