<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

use App\Models\User;

class ProfileController extends Controller
{
    public function show() {
        $birthday = auth()->user()->birthday;
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
        return view('laravel.user-profile', compact('birthdayArray'));
    }

    public function update(Request $request) {
        if (config('app.is_demo')) {
            $attributes = $request->validate([
                'firstname' => 'required',
                'phone' => 'max:10',
            ]);
        } else {
            $attributes = $request->validate([
                'firstname' => 'required',
                'email' => ['required', 'email', Rule::unique('users')->ignore(auth()->user()->id)],
                'confirmation' => 'same:email',
                'phone' => 'max:10',
            ]);
        }

        if($request->get('choices-year') && $request->get('choices-month') && $request->get('choices-day'))
        {
            $birthday = $request->get('choices-year').'-'.$request->get('choices-month').'-'.$request->get('choices-day');
        }
        else{
            $birthday = null;
        }

        auth()->user()->update([
            'firstname' => $request->get('firstname'),
            'lastname' => $request->get('lastname'),
            'email' => config('app.is_demo') ? auth()->user()->email : $request->get('email') ,
            'gender' => $request->get('gender'),
            'location' => $request->get('location'),
            'phone' => $request->get('phone'),
            'language' => $request->get('language'),
            'birthday' => $birthday,
            'skills' => $request->get('skills')
        ]);

        if($request->file('avatar')) {
            auth()->user()->update([
                'avatar' => $request->file('avatar')->store('/', 'avatars')
            ]);
        }

        return back()->with('succes', 'Profile succesfully updated');
    }
}
