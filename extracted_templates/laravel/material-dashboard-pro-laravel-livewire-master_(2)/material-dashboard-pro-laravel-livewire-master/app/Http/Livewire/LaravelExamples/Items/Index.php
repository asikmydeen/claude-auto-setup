<?php

namespace App\Http\Livewire\LaravelExamples\Items;

use App\Models\Item;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Livewire\Component;
use Livewire\WithPagination;
use Illuminate\Support\Facades\DB;

class Index extends Component
{
    use WithPagination;

    public $search = '';
    public $sortField = 'id';
    public $sortDirection = 'asc';
    public $perPage = 10;

    protected $queryString = ['sortField', 'sortDirection'];
    protected $paginationTheme = 'bootstrap';

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

        $currentPicture = Item::find($id)->picture;

        if ($currentPicture !== 'pictures/img1.jpg' && $currentPicture !== 'pictures/img2.jpg' && $currentPicture !== 'pictures/img3.jpg') {
            unlink(storage_path('app/public/' . $currentPicture));
        }

        Item::find($id)->delete();

        return redirect(route('item-management'))->with('status', 'Item successfully deleted.');
    }

    public function render()
    {
        return view('livewire.laravel-examples.items.index', [
            'items' => Item::where(function ($query) {
                $query->where('name', 'LIKE', '%' . $this->search . '%')
                    ->orWhereHas('tag', function ($query) {
                        $query->where('name', 'LIKE', '%' . $this->search . '%');
                    })
                    ->orWhereHas('category', function ($query) {
                        $query->where('name', 'LIKE', '%' . $this->search . '%');
                    });
            })->orderBy($this->sortField, $this->sortDirection)
                ->paginate($this->perPage),
        ]);
    }
}
