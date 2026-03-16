<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

use App\Models\User;
use App\Models\Role;

class UserController extends Controller
{
    public function index(User $model)
    {
        $this->authorize('manage-users', User::class);
        return view('laravel.users.index', ['users' => $model->all()]);
    }

    public function create()
    {
        $roles = Role::all();
        return view('laravel.users.create', compact('roles'));
    }

    public function store(Request $request)
    {
        $attributes = request()->validate([
            'firstname' => ['required'],
            'email' => ['required', 'unique:users', 'email'],
            'confirmation' => ['same:email'],
            'password' => ['required', 'min:5'],
            'confirm-password' => ['same:password'],
            'role' => ['required'],
            'image' => ['image'],
            'phone' => ['max:10']
        ]);

        if($request->get('choices-year') || $request->get('choices-month') || $request->get('choices-day'))
        {
            $birthday = $request->get('choices-year').'-'.$request->get('choices-month').'-'.$request->get('choices-day');
        }
        else{
            $birthday = null;
        }

        $user = User::create([
            'firstname' => $request->get('firstname'),
            'lastname' => $request->get('lastname'),
            'password' => $request->get('password'),
            'role_id' => $request->get('role'),
            'email' => $request->get('email'),
            'gender' => $request->get('gender'),
            'location' => $request->get('location'),
            'phone' => $request->get('phone'),
            'language' => $request->get('language'),
            'birthday' => $birthday,
            'skills' => $request->get('skills')
        ]);

        if($request->file('avatar')) {
            $user->update([
                'avatar' => $request->file('avatar')->store('/', 'avatars')
            ]);
        }

        return redirect()->route('user-management')->with('succes', 'User succesfully saved');
    }

    public function edit($id)
    {
        $this->authorize('manage-users', User::class);
        $user = User::find($id);
        $roles = Role::all();

        $birthday = $user->birthday;
        if(!empty($birthday))
        {
            $year = Carbon::createFromFormat('Y-m-d', $birthday)->format('Y');
            $day = Carbon::createFromFormat('Y-m-d', $birthday)->format('d');
            $month = Carbon::createFromFormat('Y-m-d', $birthday)->format('m');
            $birthdayArray = array(
                "year" => $year,
                "day" => $day,
                "month" =>$month
              );
        }
        else{
            $birthdayArray = array(
                'year' => 0,
                'day' => 0,
                'month' => 0
              );

        }

        return view ('laravel.users.edit', compact('user', 'roles', 'birthdayArray'));
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        $attributes = request()->validate([
            'firstname' => ['required'],
            'email' => ['required', 'email',  Rule::unique('users')->ignore($user->id)],
            'confirmation' => [],
            'password' => [],
            'confirm-password' => ['same:password'],
            'role' => ['required'],
            'image' => ['image'],
            'phone' => ['max:10']
        ]);

        if($request->get('choices-year') || $request->get('choices-month') || $request->get('choices-day'))
        {
            $birthday = $request->get('choices-year').'-'.$request->get('choices-month').'-'.$request->get('choices-day');
        }
        else{
            $birthday = null;
        }

        $user ->update([
            'firstname' => $request->get('firstname'),
            'lastname' => $request->get('lastname'),
            'password' => $request->get('password'),
            'role_id' => $request->get('role'),
            'email' => $request->get('email'),
            'gender' => $request->get('gender'),
            'location' => $request->get('location'),
            'phone' => $request->get('phone'),
            'language' => $request->get('language'),
            'birthday' => $birthday,
            'skills' => $request->get('skills')
        ]);

        if($request->file('avatar')) {
            $user->update([
                'avatar' => $request->file('avatar')->store('/', 'avatars')
            ]);
        }

        return redirect()->route('user-management')->with('succes', 'User succesfully updated');
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return redirect()->route('user-management')->with('succes', 'The user was succesfully deleted');
    }
}
