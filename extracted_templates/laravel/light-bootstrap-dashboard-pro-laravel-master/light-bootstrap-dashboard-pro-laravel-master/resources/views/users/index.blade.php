@extends('layouts.app', ['activePage' => 'user', 'activeButton' => 'laravel', 'title' => 'Light Bootstrap Dashboard PRO Laravel by Creative Tim & UPDIVISION', 'navName' => 'Users'])

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card data-tables">

                        <div class="card-header">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">{{ __('Users') }}</h3>
                                    <p class="text-sm mb-0">
                                        {{ __('This is an example of user management. This is a minimal setup in order to get started fast.') }}
                                    </p>
                                </div>
                                @can('create', App\User::class)
                                    <div class="col-4 text-right">
                                        <a href="{{ route('user.create') }}" class="btn btn-sm btn-primary">{{ __('Add user') }}</a>
                                    </div>
                                @endcan
                            </div>
                        </div>

                        <div class="col-12 mt-2">
                            @include('alerts.success')
                            @include('alerts.errors')
                        </div>

                        <div class="toolbar">
                            <!--        Here you can write extra buttons/actions for the toolbar              -->
                        </div>
                        <div class="table-responsive py-4" id="users-table">
                            <table id="datatables" class="table table-striped table-bordered table-hover" cellspacing="0" width="100%" style="width:100%">
                                <thead>
                                    <tr>
                                        <th>{{ __('Photo') }}</th>
                                        <th>{{ __('Name') }}</th>
                                        <th>{{ __('Email') }}</th>
                                        <th>{{ __('Role') }}</th>
                                        <th>{{ __('Start') }}</th>
                                        @can('manage-users', App\User::class)
                                            <th class="disabled-sorting text-right">{{ __('Actions') }}</th>
                                        @endcan
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>{{ __('Photo') }}</th>
                                        <th>{{ __('Name') }}</th>
                                        <th>{{ __('Email') }}</th>
                                        <th>{{ __('Role') }}</th>
                                        <th>{{ __('Start') }}</th>
                                        @can('manage-users', App\User::class)
                                            <th class="text-right">{{ __('Actions') }}</th>
                                        @endcan
                                    </tr>
                                </tfoot>
                                <tbody>

                                    @foreach ($users as $user)
                                        <tr>
                                            <td> 
                                                <span class="rounded-circle">  
                                                    <img src="{{$user->profilePicture() }}" class="rounded-circle" style="max-width:50px;" > 
                                                </span>
                                            </td>
                                            <td>{{ $user->name }}</td>
                                            <td>{{ $user->email }}</td>
                                            <td>{{ $user->role->name }}</td>
                                            <td>{{ $user->created_at }}</td>
                                            @can('manage-users', App\User::class)
                                                <td class="text-right">
                                                    @if (auth()->user()->can('update', $user) || auth()->user()->can('delete', $user))
                                                        @if ($user->id != auth()->id())
                                                            @can('update', $user)
                                                                <a href="{{ route('user.edit', $user->id) }}" class="btn btn-link btn-warning edit d-inline-block"><i class="fa fa-edit"></i></a>
                                                            @endcan
                                                            @can('delete', $user)
                                                                <form class="d-inline-block" action="{{ route('user.destroy', $user->id) }}" method="POST">
                                                                    @method('delete')
                                                                    @csrf
                                                                    <a class="btn btn-link btn-danger " onclick="confirm('{{ __('Are you sure you want to delete this user?') }}') ? this.parentElement.submit() : ''"s><i class="fa fa-times"></i></a>
                                                                </form>
                                                            @endcan
                                                        @else    
                                                            <a href="{{ route('profile.edit', $user->id) }}" class="btn btn-link btn-warning edit d-inline-block"><i class="fa fa-edit"></i></a>
                                                        @endif
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

@push('js')
    <script type="text/javascript">
        $(document).ready(function() {
            $('#datatables').DataTable({
                "pagingType": "full_numbers",
                "lengthMenu": [
                    [10, 25, 50, -1],
                    [10, 25, 50, "All"]
                ],
                responsive: true,
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "Search records",
                }

            });


            var table = $('#datatables').DataTable();

            // Delete a record
            table.on('click', '.remove', function(e) {
                $tr = $(this).closest('tr');
                table.row($tr).remove().draw();
                e.preventDefault();
            });

            //Like record
            table.on('click', '.like', function() {
                alert('You clicked on Like button');
            });
        });
    </script>
@endpush