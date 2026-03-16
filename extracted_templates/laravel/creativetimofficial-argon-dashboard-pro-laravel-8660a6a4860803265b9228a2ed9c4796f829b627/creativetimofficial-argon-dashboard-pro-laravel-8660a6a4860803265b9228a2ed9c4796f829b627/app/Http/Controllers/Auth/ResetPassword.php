<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Notifications\Notifiable;
use App\Notifications\RecoverPassword;

use App\Models\User;

class ResetPassword extends Controller
{
    use Notifiable;

    public function show()
    {
        return view('auth.reset-password');
    }

    public function routeNotificationForMail() {
        return request()->email;
    }

    public function send(Request $request)
    {
        $email = $request->validate([
            'email' => ['required']
        ]);
        $user = User::where('email', $email)->first();
        if (config('app.is_demo')){
            return back()->with('error', 'You cannot change your password in the demo version');
        } else {
            if ($user) {
                $this->notify(new RecoverPassword($user->id));
                return back()->with('succes', 'An email was send to your email address');
            }
        }
    }
}
