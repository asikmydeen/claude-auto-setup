@extends('layouts.app', [
    'title' => __('Category Management'),
    'class' => '',
    'folderActive' => 'laravel-examples',
    'elementActive' => 'category',
])

@section('content')
    <div class="content">
        <div class="container-fluid mt--6">
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">{{ __('Categories') }}</h3>
                                    <p class="text-sm mb-0">
                                        {{ __('This is an example of category management. This is a minimal setup in order to get started fast.') }}
                                    </p>
                                </div>
                                @if (auth()->user()->can('create', App\Category::class))
                                    <div class="col-4 text-right">
                                        <a href="{{ route('category.create') }}" class="btn btn-sm btn-primary">{{ __('Add category') }}</a>
                                    </div>
                                @endif
                            </div>
                        </div>
                        
                        <div class="col-12 mt-2">
                            @include('alerts.success')
                            @include('alerts.errors')
                        </div>

                        <div class="table-responsive py-4" id="categories-table">
                            <table class="table align-items-center table-flush"  id="datatable-basic">
                                <thead class="thead-light">
                                    <tr>
                                        <th scope="col">{{ __('Name') }}</th>
                                        <th scope="col">{{ __('Description') }}</th>
                                        <th scope="col">{{ __('Creation date') }}</th>
                                        @can('manage-items', App\User::class)
                                            <th scope="col"></th>
                                        @endcan
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($categories as $category)
                                        <tr>
                                            <td>{{ $category->name }}</td>
                                            <td>{{ $category->description }}</td>
                                            <td>{{ $category->created_at->format('d/m/Y H:i') }}</td>
                                            @can('manage-items', App\User::class)
                                                <td class="text-right">
                                                    @if (auth()->user()->can('update', $category) || auth()->user()->can('delete', $category))
                                                        <div class="dropdown">
                                                            <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i class="nc-icon nc-bullet-list-67"></i>
                                                            </a>
                                                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                                                @can('update', $category)
                                                                    <a class="dropdown-item" href="{{ route('category.edit', $category) }}">{{ __('Edit') }}</a>
                                                                @endcan
                                                                @if ($category->items->isEmpty() && auth()->user()->can('delete', $category))
                                                                    <form action="{{ route('category.destroy', $category) }}" method="post">
                                                                        @csrf
                                                                        @method('delete')
                                                                        <button type="button" class="dropdown-item" onclick="confirm('{{ __("Are you sure you want to delete this category?") }}') ? this.parentElement.submit() : ''">
                                                                            {{ __('Delete') }}
                                                                        </button>
                                                                    </form>
                                                                @endif
                                                            </div>
                                                        </div>
                                                    @endif
                                                </td>
                                            @endcan
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection