@extends('layouts.app', [
    'title' => __('Role Management'),
    'class' => '',
    'folderActive' => 'laravel-examples',
    'elementActive' => 'role'
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
                                    <h3 class="mb-0">{{ __('Roles') }}</h3>
                                    <p class="text-sm mb-0">
                                        {{ __('This is an example of role management. This is a minimal setup in order to get started fast.') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-12 mt-2">
                            @include('alerts.success')
                            @include('alerts.errors')
                        </div>

                        <div class="table-responsive py-4" id="roles-table">
                            <table class="table table-flush"  id="datatable-basic">
                                <thead class="thead-light">
                                    <tr>
                                        <th scope="col">{{ __('Name') }}</th>
                                        <th scope="col">{{ __('Description') }}</th>
                                        <th scope="col">{{ __('Creation date') }}</th>
                                        @can('manage-users', App\User::class)
                                            <th scope="col"></th>
                                        @endcan
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($roles as $role)
                                        <tr>
                                            <td>{{ $role->name }}</td>
                                            <td>{{ $role->description }}</td>
                                            <td>{{ $role->created_at->format('d/m/Y H:i') }}</td>
                                            @can('manage-users', App\User::class)
                                                <td class="text-right">
                                                    @can('update', $role)
                                                        <div class="dropdown">
                                                            <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i class="nc-icon nc-bullet-list-67"></i>
                                                            </a>
                                                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                                                <a class="dropdown-item" href="{{ route('role.edit', $role) }}">{{ __('Edit') }}</a>
                                                            </div>
                                                        </div>
                                                    @endcan
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