@extends('user_type.auth', ['parentFolder' => 'laravel', 'childFolder' => 'users-laravel'])

@section('content')
<div class="row">
    <div class="col-12">
      <div class="card">
        <!-- Card header -->
        <div class="card-header pb-0">
          <div class="d-lg-flex">
            <div>
              <h5 class="mb-0">All Users</h5>
            </div>
            <div class="ms-auto my-auto mt-lg-0 mt-4">
              <div class="ms-auto my-auto">
                <a href="{{ route('users.create.step.one') }}" class="btn bg-gradient-primary btn-sm mb-0">+&nbsp; New User</a>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body px-0 pb-0">
          <div class="table-responsive">
          @if($errors->get('msgError'))
              <div class="m-3  alert alert-warning alert-dismissible fade show" role="alert">
                  <span class="alert-text text-white">
                  {{$errors->first()}}</span>
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                      <i class="fa fa-close" aria-hidden="true"></i>
                  </button>
              </div>
            @endif
            @if(session('success'))
              <div class="m-3  alert alert-success alert-dismissible fade show" id="alert-success" role="alert">
                  <span class="alert-text text-white">
                  {{ session('success') }}</span>
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                      <i class="fa fa-close" aria-hidden="true"></i>
                  </button>
              </div>
            @endif
            <table class="table table-flush" id="users-list">
              <thead class="thead-light">
                <tr>
                  <th>ID</th>
                  <th>PHOTO</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ROLE</th>
                  <th>CREATION DATE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                  @if(count($users) > 1)
                    @foreach($users as $user)
                        <tr>
                        <td class="text-sm">{{$user->id}}</td>
                        <td class="text-sm">
                          <span class="my-2 text-xs">
                            <img src="{{ URL::asset('assets/img/users/'.$user->file) }}" alt="picture" class="avatar avatar-xxl me-2">
                          </span>
                        </td>
                        <td class="text-sm">{{$user->first_name}}</td>
                        <td class="text-sm">{{$user->email}}</td>
                        <td class="text-sm">{{$user->roles->name}}</td>
                        <td class="text-sm">{{$user->created_at}}</td>
                        <td class="text-sm">
                          <a href="{{ url('laravel-edit-users/' . $user->id) }}" class="mx-3" data-bs-toggle="tooltip" data-bs-original-title="Edit user">
                            <i class="fas fa-user-edit text-secondary"></i>
                          </a>
                          @if ($user->id < 4)
                          <span" data-bs-toggle="tooltip" data-bs-original-title="Disabled" data-bs-original-title="Delete user">
                            <i class="fas fa-trash text-secondary"></i>
                          </span>
                          @else
                          <a href="{{ url('laravel-delete-user/' . $user->id) }}" data-bs-toggle="tooltip" data-bs-original-title="Delete user">
                            <i class="fas fa-trash text-secondary"></i>
                          </a>
                          @endif
                        </td>
                      </tr>
                    @endforeach
                  @else
                      <tr> no content </tr>
                  @endif
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection

  @push('js')
    <script src="{{ URL::asset('assets/js/plugins/datatables.js') }}"></script>  
    <script>
      if (document.getElementById('users-list')) {
        const dataTableSearch = new simpleDatatables.DataTable("#users-list", {
          searchable: true,
          fixedHeight: false,
          perPage: 7
        });

        document.querySelectorAll(".export").forEach(function(el) {
          el.addEventListener("click", function(e) {
            var type = el.dataset.type;

            var data = {
              type: type,
              filename: "soft-ui-" + type,
            };

            if (type === "csv") {
              data.columnDelimiter = "|";
            }

            dataTableSearch.export(data);
          });
        });
      };
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
    $(document).ready(function(){
        $("#alert-success").delay(3000).slideUp(300);

        });
    </script>
  @endpush