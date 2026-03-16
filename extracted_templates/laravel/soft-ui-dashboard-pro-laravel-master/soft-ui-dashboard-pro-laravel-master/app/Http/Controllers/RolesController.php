<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class RolesController extends Controller
{
    public function create()
    {
        $this->authorize('manage-users', User::class);
        $roles = DB::table('roles')->get();
        return view('laravel-examples/roles/roles-management', compact('roles'));
    }

    public function createNew()
    {
        $this->authorize('manage-users', User::class);
        return view('laravel-examples/roles/add-roles');
    }

    public function createEdit($id)
    {
        $this->authorize('manage-users', User::class);
        $role = DB::table('roles')->where('id', $id)->first();
        return view('laravel-examples/roles/edit-roles', compact('role'));
    }

    public function store()
    {
        $attributes = request()->validate([
            'name' => ['required'],
            'description' => ['required'],
        ]);  
        DB::table('roles')
            ->insert(['name' => $attributes['name'], 'description'=> $attributes['description'], 'created_at' => now(), 'updated_at' => now()]);
        return redirect('/laravel-roles-management')->with('success','Role successfully added.');
    }
    public function edit($id)
    {
        $attributes = request()->validate([
            'name' => ['required'],
            'description' => ['required'],
        ]);
        
        DB::table('roles')
            ->where('id', $id)->limit(1)
            ->update(['name' => $attributes['name'], 'description'=> $attributes['description'], 'created_at' => now(), 'updated_at' => now()]);
        return redirect('/laravel-roles-management')->with('success','Role successfully edited.');
    }

    public function destroy($id)
    {
        try{
            DB::table('roles')->where('id', $id)->delete();
            return redirect('/laravel-roles-management')
                ->with('success','Role deleted successfully');
                }catch(Exception $e){
                //if email or phone exist before in db redirect with error messages
                    return redirect()->back()->withErrors(['msgError' => 'Roles that are used cannot be deleted.']);
                }
    }
}
