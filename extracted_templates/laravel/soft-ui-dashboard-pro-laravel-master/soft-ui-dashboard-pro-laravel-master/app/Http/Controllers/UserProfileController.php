<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\View;

class UserProfileController extends Controller
{
    public function create()
    {
        $gender = auth()->user()->gender;
        $language = auth()->user()->language;
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
        
        return view('laravel-examples/user-profile', compact('gender', 'language', 'birthdayArray'));
        
    }

    public function store(Request $request)
    {

        if($request->get('email') != Auth::user()->email)
        {
            if(env('IS_DEMO'))
            {
                
                return redirect()->back()->withErrors(['msgError' => 'You are in a demo version, you can\'t change the email address or the password.']);         
            }
            else{
                $attribute = request()->validate([
                    'email' => ['required', 'confirmed', 'email', 'max:50', Rule::unique('users')->ignore(Auth::user()->id)],
                ]);
            }
        }
        else{
            $attribute = array('email' => Auth::user()->email,);
        }

        if($request->get('choices-year') || $request->get('choices-month') || $request->get('choices-day'))
        {
            $birthday = $request->get('choices-year').'-'.$request->get('choices-month').'-'.$request->get('choices-day');
        }
        else{
            $birthday = Null;
        }

        if(!empty($request->file('user_img'))) {
            $uniqueFileName = uniqid().$request->file('user_img')->getClientOriginalName();
            $request->file('user_img')->move(public_path('/assets/img/users/'),$uniqueFileName);
        }
        else{
            $uniqueFileName = auth()->user()->file;
        }
        
        User::where('id','=',auth()->user()->id)
            ->update([
                'first_name'    => $request->get('firstName'),
                'file' => $uniqueFileName,
                'last_name'    => $request->get('lastName'),
                'gender'    => $request->get('choices-gender'),
                'birthday'    => $birthday,
                'email'    => $attribute['email'],
                'Address_1'    => $request->get('location'),
                'phone'     => $request->get('phone'),
                'language'    => $request->get('choices-language'),
                'skills' => $request->get('skills'),
            ]);
        return redirect('/laravel-user-profile')->with('success','Your account details have been saved.');
    }
}
