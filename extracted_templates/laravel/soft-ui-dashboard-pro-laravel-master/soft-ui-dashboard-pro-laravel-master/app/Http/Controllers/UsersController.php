<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UsersController extends Controller
{
    public function create()
    {
        $this->authorize('manage-users', User::class);
        $users =  User::with('roles')->get();
        return view('laravel-examples/users/users-management', compact('users'));
    }

    public function createOne(Request $request)
    {
        $user = $request->session()->get('user');
        $roles = DB::table('roles')->get();
        return view('laravel-examples/users/add-step-one',compact('user', 'roles'));
    }

    public function validateOne(Request $request)
    {
        $validatedData = $request->validate([
            'first_name' => ['required', 'max:50'],
            'last_name' => ['max:50'],
            'role_id' => ['required'],
            'company' => ['max:150'],
            'email' => ['required', 'email', 'max:50', Rule::unique('users', 'email')],
            'password' => ['required', 'min:5', 'max:20', 'confirmed'],
        ]);
  
        if(empty($request->session()->get('user'))){
            $user = new User();
            $user->fill($validatedData);
            $request->session()->put('user', $user);
        }else{
            $user = $request->session()->get('user');
            $user->fill($validatedData);
            $request->session()->put('user', $user);
        }
  
        return redirect()->route('users.create.step.two');
    }

    public function createTwo(Request $request)
    {
        $user = $request->session()->get('user');
  
        return view('laravel-examples/users/add-step-two',compact('user'));
    }

    public function validateTwo(Request $request)
    {
        $validatedData = $request->validate([
            'Address_1' => ['max:50'],
            'Address_2' => ['max:50'],
            'city' => ['max:50'],
            'state' => ['max:50'],
            'zip_code' => ['max:50'],
        ]);
  
        $user = $request->session()->get('user');
        $user->fill($validatedData);
        $request->session()->put('user', $user);
  
        return redirect()->route('users.create.step.three');
    }

    public function createThree(Request $request)
    {
        $user = $request->session()->get('user');
  
        return view('laravel-examples/users/add-step-three',compact('user'));
    }

    public function validateThree(Request $request)
    {
        $validatedData = $request->validate([
            'twitter' => ['max:50'],
            'facebook' => ['max:50'],
            'instagram' => ['max:50'],
        ]);
  
        $user = $request->session()->get('user');
        $user->fill($validatedData);
        $request->session()->put('user', $user);
  
        return redirect()->route('users.create.step.four');
    }

    public function createFour(Request $request)
    {
        $user = $request->session()->get('user');
  
        return view('laravel-examples/users/add-step-four',compact('user'));
    }

    public function store(Request $request)
    {
        if(!empty($request->file('user_img'))) {
            $uniqueFileName = uniqid().$request->file('user_img')->getClientOriginalName();
            $request->file('user_img')->move(public_path('/assets/img/users/'),$uniqueFileName);
        }
        else{
            $uniqueFileName = 'default/default.jpg';
        }


        $validatedData = $request->validate([
            'public_email' => ['max:50'],
            'biography' => ['max:50'],
        ]);
        $user = $request->session()->get('user');
        $user->fill($validatedData);
        $user->file = $uniqueFileName;
        $user->save();
  
        $request->session()->forget('user');
  
        return redirect('/laravel-users-management')->with('success','User successfully added.');
    }

    public function destroy($id){
        try{
            DB::table('users')->where('id', $id)->delete();
            return redirect('/laravel-users-management')
                ->with('success','User deleted successfully');
                }catch(Exception $e){
                //if email or phone exist before in db redirect with error messages
                    return redirect()->back()->withErrors(['msgError' => 'You can\'t delete this user.']);
                }
    }

    public function createEditOne(Request $request, $id)
    {
        $this->authorize('manage-users', User::class);
        $roles =  DB::table('roles')->get();
        $user = User::with('roles')->where('id', $id)->first();
        
        $editUser = $request->session()->get('user');
        return view('laravel-examples/users/edit-step-one',compact('user', 'roles', 'editUser'));
    }

    public function validateEditOne(Request $request, $id)
    {
        $user = User::with('roles')->where('id', $id)->first();
        $validatedData = $request->validate([
            'first_name' => ['required', 'max:50'],
            'last_name' => ['max:50'],
            'role_id' => ['required'],
            'company' => ['max:150'],
        ]);

        if(!empty(request()->get('password')) || $user->email != $request->get('email'))
        {
            if(env('IS_DEMO') && $user->id <4)
            {
                
                return redirect()->back()->withErrors(['msgError' => 'You are in a demo version, you can\'t change the email address or the password.']);         
            }
            else{
            $validatedData = $request->validate([
                'email' => ['required', 'email', 'max:50', Rule::unique('users', 'email')->ignore($id)],
                'password' => ['required', 'min:5', 'max:20', 'confirmed'],
            ]);
            }
        }

        if(empty($request->session()->get('user'))){
            $editUser = User::findOrFail($id);
            $editUser->fill($validatedData);
            $editUser->password = Hash::make(request()->get('password'));
            $request->session()->put('user', $editUser);
        }else{
            $editUser = $request->session()->get('user');
            $editUser->fill($validatedData);
            $request->session()->put('user', $editUser);
        }
  
        return redirect('/edit-create-step-two/'. $id);
    }

    public function createEditTwo(Request $request, $id)
    {
        $user = User::with('roles')->where('id', $id)->first();
        $editUser = $request->session()->get('user');
        return view('laravel-examples/users/edit-step-two',compact('user', 'editUser'));
    }

    public function validateEditTwo(Request $request, $id)
    {
        $validatedData = $request->validate([
            'Address_1' => ['max:50'],
            'Address_2' => ['max:50'],
            'city' => ['max:50'],
            'state' => ['max:50'],
            'zip_code' => ['max:50'],
        ]);
  
        $editUser = $request->session()->get('user');
        $editUser->fill($validatedData);
        $request->session()->put('user', $editUser);
  
        return redirect('/edit-create-step-three/'. $id);
    }

    public function createEditThree(Request $request, $id)
    {
        $user = User::with('roles')->where('id', $id)->first();
        $editUser = $request->session()->get('user');
        return view('laravel-examples/users/edit-step-three',compact('user', 'editUser'));
    }

    public function validateEditThree(Request $request, $id)
    {
        $validatedData = $request->validate([
            'twitter' => ['max:50'],
            'facebook' => ['max:50'],
            'instagram' => ['max:50'],
        ]);
  
        $editUser = $request->session()->get('user');
        $editUser->fill($validatedData);
        $request->session()->put('user', $editUser);
  
        return redirect('/edit-create-step-four/'. $id);
    }

    public function createEditFour(Request $request, $id)
    {
        $user = User::with('roles')->where('id', $id)->first();
        $editUser = $request->session()->get('user');
        return view('laravel-examples/users/edit-step-four',compact('user', 'editUser'));
    }

    public function edit(Request $request, $id)
    {
        $user = DB::table('users')->where('id', $id)->first();
        if(!empty($request->file('user_img'))) {
            $uniqueFileName = uniqid().$request->file('user_img')->getClientOriginalName();
            $request->file('user_img')->move(public_path('/assets/img/users/'),$uniqueFileName);
        }
        else{
            $uniqueFileName = $user->file;
        }

        $validatedData = $request->validate([
            'public_email' => ['max:50'],
            'biography' => ['max:50'],
        ]);
        $editUser = $request->session()->get('user');
        $editUser->fill($validatedData);
        $editUser->file = $uniqueFileName;
        $editUser->save();
  
        $request->session()->forget('user');
  
        return redirect('/laravel-users-management')->with('success','User successfully edited.');
    }
}
