@extends('user_type.auth', ['parentFolder' => 'laravel', 'childFolder' => 'users-laravel'])

@section('content')

<div class="row">
    <div class="col-12">
      <div class="multisteps-form mb-5">
        <!--progress bar-->
        <div class="row">
          <div class="col-12 col-lg-8 mx-auto my-5">
            <div class="multisteps-form__progress">
              <button class="multisteps-form__progress-btn js-active" type="button" title="User Info">
                <span>User Info</span>
              </button>
              <button class="multisteps-form__progress-btn" type="button" title="Address">Address</button>
              <button class="multisteps-form__progress-btn" type="button" title="Socials">Socials</button>
              <button class="multisteps-form__progress-btn" type="button" title="Profile">Profile</button>
            </div>
          </div>
        </div>
        <!--form panels-->
        <div class="row">
          <div class="col-12 col-lg-8 m-auto">
          @if($errors->get('msgError'))
              <div class="mt-3  alert alert-primary alert-dismissible fade show" role="alert">
                  <span class="alert-text text-white">
                  {{$errors->first()}}</span>
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                      <i class="fa fa-close" aria-hidden="true"></i>
                  </button>
              </div>
          @endif
            <form class="multisteps-form__form mb-8 add-edit-user" method="POST" action="/edit-step-one/{{$user->id}}" enctype="multipart/form-data">
              @csrf
              <!--single form panel-->
              <div class="card multisteps-form__panel p-3 border-radius-xl bg-white js-active" id="parsley-form" data-animation="FadeIn">
                <h5 class="font-weight-bolder mb-0">About me</h5>
                <p class="mb-0 text-sm">Mandatory informations</p>
                <div class="multisteps-form__content">
                  <div class="row mt-3">
                    <div class="col-12 col-sm-6">
                        <label>First Name</label>
                        <input class="multisteps-form__input form-control field"  type="text" name="first_name" id="first_name" value="{{ $user->first_name ?? ''}}" ?? '' placeholder="eg. Michael"/>
                        @error('first_name')
                            <p class="text-danger text-xs mt-2 mb-2">{{ $message }}</p>
                        @enderror
                    </div>
                    <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                        <label>Last Name</label>
                        <input class="multisteps-form__input form-control" value="{{ $user->last_name ?? ''}}" ?? '' type="text" id="last_name" name="last_name" placeholder="eg. Prior" />
                        @error('last_name')
                            <p class="text-danger text-xs mt-2 mb-2">{{ $message }}</p>
                        @enderror
                    </div>
                  </div>
                  <div class="row mt-3">
                      <div class=" ">
                          <select class="form-control field" name="role_id" id="role_id" name="role_id">
                              <option value="" selected hidden>Choose</option>
                              @foreach ($roles as $role)
                                <option value="{{ $role->id}}" {{ $role->id == $user->roles->id ? 'selected' : '' }} class="text-capitalize" >{{ $role->name }}</option>
                              @endforeach
                          </select>
                          @error('role_id')
                            <p class="text-danger text-xs mt-2 mb-2">{{ $message }}</p>
                          @enderror
                      </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12 col-sm-6">
                        <label>Company</label>
                        <input class="multisteps-form__input form-control" value="{{ $user->company ?? ''}}" ?? '' type="text" name="company" placeholder="eg. Creative Tim" />
                        @error('company')
                            <p class="text-danger text-xs mt-2 mb-2">{{ $message }}</p>
                        @enderror
                    </div>
                    <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                        <label>Email Address</label>
                        <input class="multisteps-form__input form-control field" type="email" value="{{ $user->email ?? ''}}" ?? '' id="email" name="email" placeholder="eg. soft@dashboard.com"/>
                        @error('email')
                            <p class="text-danger text-xs mt-2 mb-2">{{ $message }}</p>
                        @enderror
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12 col-sm-6">
                        <label>Password</label>
                        <input class="multisteps-form__input form-control field password" type="password" name="password" id="password" placeholder="******"/>
                        @error('password')
                            <p class="text-danger text-xs mt-2 mb-2">{{ $message }}</p>
                        @enderror
                    </div>
                    <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                        <label>Repeat Password</label>
                        <input class="multisteps-form__input form-control field password_confirmation" name="password_confirmation" type="password" placeholder="******" data-parsley-equalto="#password"/>
                        @error('password_confirmation')
                            <p class="text-danger text-xs mt-2 mb-2">{{ $message }}</p>
                        @enderror
                    </div>
                  </div>
                  <div class="button-row d-flex mt-4">
                    <button class="btn bg-gradient-dark ms-auto mb-0" id="next" type="submit" title="Next">Next</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

@endsection
  
  @push('js')
    <script src="{{ URL::asset('assets/js/plugins/choices.min.js') }}"></script>
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossorigin="anonymous"></script>

  <script>
    if (document.getElementById('choices-role')) {
      var gender = document.getElementById('choices-role');
      const example = new Choices(gender);
    }
    if (document.getElementById('role_id')) {
      var country = document.getElementById('role_id');
      const example = new Choices(country);
      }
    
    var upload = document.getElementById('imgDisplay');
    var imgInp = document.getElementById('file-input');
    imgInp.onchange = evt => {
        const [file] = imgInp.files
        if (file) {
            upload.src = URL.createObjectURL(file)
        }
    }
  </script>

  @endpush
  <style>
    .parsley-errors-list{
      margin: 2px 0 3px;
      padding: 0;
      list-style-type: none;
      color: red;
    }
    </style>