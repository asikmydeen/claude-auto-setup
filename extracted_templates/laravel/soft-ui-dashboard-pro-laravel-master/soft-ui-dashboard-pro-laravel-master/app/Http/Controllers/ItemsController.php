<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use Input;

class ItemsController extends Controller
{
    public function create()
    {

        $items = Item::with('tags','category')->get();
        return view('laravel-examples/items/items-management', compact('items'));
    }

    public function createNew()
    {
        $tags =  DB::table('tags')->get();
        $categories =  DB::table('category')->get();
        return view('laravel-examples/items/add-items', compact('tags', 'categories'));
    }

    public function store(Request $request)
    {
        if(!empty($request->file('item_img'))) {
            $uniqueFileName = uniqid().$request->file('item_img')->getClientOriginalName();
            $request->file('item_img')->move(public_path('/assets/img/items/'),$uniqueFileName);
        }
        else{
            $uniqueFileName = 'default/default.jpg';
        }

        $attributes = request()->validate([
            'name' => ['required', 'max:50'],
            'excerpt' => ['required'],
            'category_id' => ['required'],
            'tag_id' => ['required'],
            'status' => ['required'],
            'option' => ['required'],
            'date' => ['required']
        ]); 
        $request->all();
        
        $optionList = $request->input('option');
        $tags = $request->input('tag_id');

        $items = new Item();
            $items->name = $attributes['name'];
            $items->file = $uniqueFileName;
            $items->excerpt = $attributes['excerpt'];
            $items->description = $request->get('description');
            $items->category_id = $attributes['category_id'];
            $items->status = $attributes['status'];
            $items->show_homepage = $request->get('show_homepage');
            $items->date = $attributes['date'];
            $items->created_at = now();
            $items->updated_at = now();
            $items->options = json_encode($optionList);
            $items->save();
            
            $items->tags()->attach($tags);
            return redirect('/laravel-items-management')->with('success','Item successfully added.');
    }

    public function createEdit($id)
    {
        $item = Item::with('tags', 'category')->where('id', $id)->first();
        $tags =  DB::table('tags')->get();
        $categories =  DB::table('category')->get();
        return view('laravel-examples/items/edit-items', compact('item', 'tags', 'categories'));
    }

    public function edit(Request $request, $id)
    {
        $item = DB::table('items_management')->where('id', $id)->first();
        if(!empty($request->file('item_img'))) {
            $uniqueFileName = uniqid().$request->file('item_img')->getClientOriginalName();
            $request->file('item_img')->move(public_path('/assets/img/items/'),$uniqueFileName);
        }
        else{
            $uniqueFileName = $item->file;
        }

        $attributes = request()->validate([
            'name' => ['required', 'max:50'],
            'excerpt' => ['required'],
            'category_id' => ['required'],
            'tag_id' => ['required'],
            'status' => ['required'],
            'option' => ['required'],
            'date' => ['required']
        ]);  
        $request->all();

        $optionList = $request->input('option');
        $tags = $request->input('tag_id');

        $items = Item::find($id);
            $items->name = $attributes['name'];
            $items->file = $uniqueFileName;
            $items->excerpt = $attributes['excerpt'];
            $items->description = $request->get('description');
            $items->category_id = $attributes['category_id'];
            $items->status = $attributes['status'];
            $items->show_homepage = $request->get('show_homepage');
            $items->options = json_encode($optionList);;
            $items->date = $attributes['date'];
            $items->created_at = now();
            $items->updated_at = now();
            $items->save();

            $items->tags()->sync($tags);
            return redirect('/laravel-items-management')->with('success','Item successfully edited.');
    }
    public function destroy($id)
    {
        try{
            DB::table('items_management')->where('id','=', $id)->delete();
            return redirect('/laravel-items-management')
                ->with('success','Item deleted successfully');
                }catch(Exception $e){
                //if email or phone exist before in db redirect with error messages
                    return redirect()->back()->withErrors(['msgError' => 'You can\'t delete this item.']);
                }
    }
}
