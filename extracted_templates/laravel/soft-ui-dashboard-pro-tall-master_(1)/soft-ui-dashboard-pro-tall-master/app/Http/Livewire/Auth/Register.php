<?php

namespace App\Http\Livewire\Auth;

use App\Models\Role;
use App\Models\User;
use Livewire\Component;
use Illuminate\Support\Facades\Hash;
use App\Providers\RouteServiceProvider;

class Register extends Component
{

    public $name ='';
    public $email = '';
    public $password = '';
    public $role_id='';
    public $roles;

    protected $rules = [
        'name' => 'required|min:3',
        'email' => 'required|email:rfc,dns|unique:users,email',
        'password' => 'required|min:6',
        'role_id' => 'required'
    ];

    public function register()
    {
        $this->validate();

        $user = User::create([
            'name' => $this->name,
            'email' => $this->email,
            'password' => Hash::make($this->password),
            'role_id' => $this->role_id,
        ]);

        auth()->login($user);

        return redirect(RouteServiceProvider::HOME);
    }

    public function mount(){
        $this->roles=Role::all();
    }

    public function render()
    {
        return view('livewire.auth.register');
    }
    
}
