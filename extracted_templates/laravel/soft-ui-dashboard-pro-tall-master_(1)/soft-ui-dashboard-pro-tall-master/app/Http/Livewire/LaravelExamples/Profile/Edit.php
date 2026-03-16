<?php

namespace App\Http\Livewire\LaravelExamples\Profile;

use Livewire\Component;
use Livewire\WithFileUploads;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class Edit extends Component
{
    use WithFileUploads;

    public User $user;

    public $picture;

    public $passwordConfirmation = '';
    public $new_password = '';
    public $old_password = '';

    protected function rules()
    {
        return [
            'user.name' => 'required|min:3',
            'user.email' => 'required|email|unique:users,email,' . $this->user->id,
            'user.phone' => 'max:12',
            'user.location' => 'max:50',
        ];
    }

    public function mount()
    {
        $this->user = auth()->user();
    }

    public function update()
    {
        $this->validate();

        if (env('IS_DEMO') && in_array(auth()->user()->id, [1, 2, 3])) {

            if (auth()->user()->email == $this->user->email) {

                if ($this->picture) {

                    $this->validate([
                        'picture' => 'mimes:jpg,jpeg,png,bmp,tiff |max:4096',
                    ]);

                    $currentAvatar = auth()->user()->picture;

                    if ($currentAvatar !== 'profile/team-1.jpg' && $currentAvatar !== 'profile/team-2.jpg' && $currentAvatar !== 'profile/team-3.jpg' && !empty($currentAvatar)) {

                        unlink(storage_path('app/public/' . $currentAvatar));
                        $this->user->update([
                            'picture' => $this->picture->store('profile', 'public')
                        ]);
                    } else {
                        $this->user->update([
                            'picture' => $this->picture->store('profile', 'public')
                        ]);
                    }
                }

                $this->user->save();
                return back()->withStatus('Your profile has been successfully updated!');
            }

            return back()->with('demo', "You are in a demo version. You are not allowed to change the email for default users.");
        };

        if ($this->picture) {

            $this->validate([
                'picture' => 'mimes:jpg,jpeg,png,bmp,tiff |max:4096',
            ]);

            $currentAvatar = auth()->user()->picture;

            if ($currentAvatar !== 'profile/team-1.jpg' && $currentAvatar !== 'profile/team-2.jpg' && $currentAvatar !== 'profile/team-3.jpg' && !empty($currentAvatar)) {

                unlink(storage_path('app/public/' . $currentAvatar));
                $this->user->update([
                    'picture' => $this->picture->store('profile', 'public')
                ]);
            } else {
                $this->user->update([
                    'picture' => $this->picture->store('profile', 'public')
                ]);
            }
        }
        $this->user->save();

        return back()->withStatus('Your profile has been successfully updated!');
    }


    public function passwordUpdate()
    {
        $this->validate([
            'old_password' => 'required',
            'new_password' => 'required|min:6|same:passwordConfirmation',
        ]);

        if (env('IS_DEMO') && in_array(auth()->user()->id, [1, 2, 3])) {
            return back()->with('demo', "You are in a demo version. You are not allowed to change the password for default users.");
        }

        $hashedPassword = auth()->user()->password;

        if (Hash::check($this->old_password, $hashedPassword)) {
            if (!Hash::check($this->new_password, $hashedPassword)) {
                $users = User::findorFail(auth()->user()->id);
                $users->password = Hash::make($this->new_password);
                $users->save();
                return back()->with(['success' => 'Your password has been successfully updated!']);
            } else {
                return back()->with(['error' => "The new password can not be the same password that you are using now!"]);
            }
        } else {
            return back()->with(['error' => "Old password is incorrect!"]);
        }
    }

    public function render()
    {
        return view('livewire.laravel-examples.profile.edit');
    }
}
