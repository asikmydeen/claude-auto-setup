<?php

namespace App\Http\Livewire\LaravelExamples\UsersManagement;

use Livewire\Component;
use Livewire\WithPagination;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Index extends Component
{

    use AuthorizesRequests;
    use WithPagination;

    public $search = '';
    public $sortField = 'id';
    public $sortDirection = 'asc';
    public $perPage = 10;

    protected $queryString = ['sortField', 'sortDirection',];

    public function sortBy($field)
    {
        if ($this->sortField === $field) {
            $this->sortDirection = $this->sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            $this->sortDirection = 'asc';
        }
        $this->sortField = $field;
    }

    public function destroy($id)
    {

        if (User::find($id)->isAdmin()) {
            return back()->with('error', "You are not allowed to delete an admin user.");
        }

        if (env('IS_DEMO') && in_array($id, [1, 2, 3])){
            return back()->with('error', 'You are not allowed to delete a default user.');
        }

        $currentAvatar = User::find($id)->picture;

        if ($currentAvatar !== 'profile/team-1.jpg' && $currentAvatar !== 'profile/team-2.jpg' && $currentAvatar !== 'profile/team-3.jpg' && !empty($currentAvatar)) {
            unlink(storage_path('app/public/' . $currentAvatar));
        }

        User::find($id)->delete();
        return redirect(route('user-management'))->with('status', 'User successfully deleted.');
    }

    public function render()
    {
        $this->authorize('manage-users', User::class);

        return view('livewire.laravel-examples.user-management.index', [
            'users' => User::searchMultipleUsers($this->search)->orderBy($this->sortField, $this->sortDirection)->paginate($this->perPage)
        ]);
    }
}
