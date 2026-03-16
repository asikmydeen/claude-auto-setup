@extends('layouts.app', [
    'title' => __('Item Management'),
    'class' => '',
    'folderActive' => 'laravel-examples',
    'elementActive' => 'item'
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
                                    <h3 class="mb-0">{{ __('Items') }}</h3>
                                    <p class="text-sm mb-0">
                                        {{ __('This is an example of item management. This is a minimal setup in order to get started fast.') }}
                                    </p>
                                </div>
                                @if (auth()->user()->can('create', App\Item::class))
                                    <div class="col-4 text-right">
                                        <a href="{{ route('item.create') }}" class="btn btn-sm btn-primary">{{ __('Add item') }}</a>
                                    </div>
                                @endif
                            </div>
                        </div>
                        
                        <div class="col-12 mt-2">
                            @include('alerts.success')
                            @include('alerts.errors')
                        </div>

                        <div class="table-responsive py-4" id="items-table">
                            <table class="table align-items-center table-flush"  id="datatable-basic">
                                <thead class="thead-light">
                                    <tr>
                                        <th scope="col">{{ __('Name') }}</th>
                                        <th scope="col">{{ __('Category') }}</th>
                                        <th scope="col">{{ __('Picture') }}</th>
                                        <th scope="col">{{ __('Tags') }}</th>
                                        <th scope="col">{{ __('Creation Date') }}</th>
                                        @can('manage-items', App\User::class)
                                            <th scope="col"></th>
                                        @endcan
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($items as $item)
                                        <tr>
                                            <td>{{ $item->name }}</td>
                                            <td>{{ $item->category->name }}</td>
                                            <td>
                                                <img src="{{ $item->path() }}" alt="" style="max-width: 100px;">
                                            </td>
                                            <td>
                                                @foreach ($item->tags as $tag)
                                                    <span class="badge badge-default" style="background-color:{{ $tag->color }}; border-color:{{ $tag->color }}">{{ $tag->name }}</span>
                                                @endforeach
                                            </td>
                                            <td>{{ $item->created_at->format('d/m/Y H:i') }}</td>
                                            @can('manage-items', App\User::class)
                                                <td class="text-right">
                                                    @if (auth()->user()->can('update', $item) || auth()->user()->can('delete', $item))
                                                        <div class="dropdown">
                                                            <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i class="nc-icon nc-bullet-list-67"></i>
                                                            </a>
                                                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                                                @can('update', $item)
                                                                    <a class="dropdown-item" href="{{ route('item.edit', $item) }}">{{ __('Edit') }}</a>
                                                                @endcan
                                                                @can('delete', $item)
                                                                    <form action="{{ route('item.destroy', $item) }}" method="post">
                                                                        @csrf
                                                                        @method('delete')
                                                                        <button type="button" class="dropdown-item" onclick="confirm('{{ __("Are you sure you want to delete this item?") }}') ? this.parentElement.submit() : ''">
                                                                                {{ __('Delete') }}
                                                                        </button>
                                                                    </form>
                                                                @endcan
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