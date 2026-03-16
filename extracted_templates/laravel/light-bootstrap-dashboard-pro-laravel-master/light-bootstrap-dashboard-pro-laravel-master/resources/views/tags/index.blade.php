@extends('layouts.app', ['activePage' => 'tag', 'activeButton' => 'laravel', 'title' => 'Light Bootstrap Dashboard PRO Laravel by Creative Tim & UPDIVISION', 'navName' => 'Tags' ])

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card data-tables">

                        <div class="card-header">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">{{ __('Tags') }}</h3>
                                    <p class="text-sm mb-0">
                                        {{ __('This is an example of user management. This is a minimal setup in order to get started fast.') }}
                                    </p>
                                </div>
                                @can('create', App\Tag::class)
                                    <div class="col-4 text-right">
                                        <a href="{{ route('tag.create') }}" class="btn btn-sm btn-primary">{{ __('Add tag') }}</a>
                                    </div>
                                @endcan
                            </div>
                        </div>

                        <div class="col-12 mt-2">
                            @include('alerts.success')
                            @include('alerts.errors')
                        </div>

                        <div class="table-responsive py-4" id="tags-table">
                            <table id="datatables" class="table table-striped table-bordered table-hover" cellspacing="0" width="100%" style="width:100% ">
                                <thead>
                                    <tr>
                                        <th>{{ __('Name') }}</th>
                                        <th>{{ __('Color') }}</th>
                                        <th>{{ __('Creation data') }}</th>
                                        @can('manage-items', App\User::class)
                                            <th class="disabled-sorting text-right">{{ __('Actions') }}</th>
                                        @endcan
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>{{ __('Name') }}</th> 
                                        <th>{{ __('Color') }}</th>
                                        <th>{{ __('Creation data') }}</th>
                                        @can('manage-items', App\User::class)
                                            <th class="text-right">{{ __('Actions') }}</th>
                                        @endcan
                                    </tr>
                                </tfoot>
                                <tbody>

                                    @foreach ($tags as $tag)
                                        <tr>
                                            <td>{{ $tag->name }}</td>
                                            <td><span class="badge badge-default" style="background-color:{{ $tag->color }}">{{ $tag->name }}</span></td>
                                            <td>{{ $tag->created_at }}</td>
                                            @can('manage-items', App\User::class)
                                                <td class="text-right">
                                                    @if (auth()->user()->can('update', $tag) || auth()->user()->can('delete', $tag))
                                                        @can('update', $tag)
                                                            <a href="{{ route('tag.edit', $tag->id) }}" class="btn btn-link btn-warning edit d-inline-block"><i class="fa fa-edit"></i></a>
                                                        @endcan
                                                        @if ($tag->items->isEmpty() && auth()->user()->can('delete', $tag))
                                                            <form class="d-inline-block" action="{{ route('tag.destroy', $tag->id) }}" method="POST">
                                                                @method('delete')
                                                                @csrf
                                                                <a class="btn btn-link btn-danger " onclick="confirm('{{ __('Are you sure you want to delete this tag?') }}') ? this.parentElement.submit() : ''"s><i class="fa fa-times"></i></a>
                                                            </form>
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