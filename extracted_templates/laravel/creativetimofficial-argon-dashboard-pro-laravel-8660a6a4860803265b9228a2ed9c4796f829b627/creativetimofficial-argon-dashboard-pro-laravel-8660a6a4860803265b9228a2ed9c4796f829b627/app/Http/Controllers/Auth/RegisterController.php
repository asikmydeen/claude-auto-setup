<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Role;
use App\Models\User;

class RegisterController extends Controller
{
    public function show(Role $model)
    {
        return view('auth.register');
        // return view('auth.register',['roles' => $model->all()]);
    }

    public function register()
    {
        $attributes = request()->validate([
            'firstname' => 'required',
            'email' => 'required|email|max:255|unique:users,email',
            'role' => 'required',
            'password' => 'required|min:5|max:255',
            'terms' => 'required',
        ]);
        $user = User::create([
            'firstname' => $attributes['firstname'],
            'email' => $attributes['email'],
            'role_id' => $attributes['role'],
            'password' => $attributes['password']
        ]);
        auth()->login($user);

        return redirect('/');
    }
}
