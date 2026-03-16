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
            <form class="multisteps-form__form mb-8" method="POST" action="/laravel-edit-user/{{$user->id}}" enctype="multipart/form-data">
              @csrf
              <!--single form panel-->
              <div class="card multisteps-form__panel p-3 border-radius-xl bg-white js-active" id="parsley-form" data-animation="FadeIn">
                <h5 class="font-weight-bolder mb-0">About me</h5>
                <p class="mb-0 text-sm">Mandatory informations</p>
                <div class="multisteps-form__content">
                  <div class="row mt-3">
                    <div class="col-12 col-sm-6">
                      <label>First Name</label>
                      <input class="multisteps-form__input form-control field"  type="text" name="first_name" value="{{$user->first_name}}" id="first_name" placeholder="eg. Michael" required/>
                    </div>
                    <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                      <label>Last Name</label>
                      <input class="multisteps-form__input form-control" type="text" id="last_name" value="{{$user->last_name}}" name="last_name" placeholder="eg. Prior" />
                    </div>
                  </div>
                  <div class="row mt-3">
                      <div class=" ">
                          <select class="form-control field" name="role_id" id="role_id" name="role_id" required>
                              <option value="" selected hidden>Choose</option>
                              @foreach ($roles as $role)
                              <option value="{{ $role->id}}" {{ $role->id == $user->roles->id ? 'selected' : '' }} class="text-capitalize">{{ $role->name }}</option>
                              @endforeach
                          </select>
                      </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12 col-sm-6">
                      <label>Company</label>
                      <input class="multisteps-form__input form-control" type="text" name="company" placeholder="eg. Creative Tim" />
                    </div>
                    <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                      <label>Email Address</label>
                      <input class="multisteps-form__input form-control field" type="email" value="{{$user->email}}" id="email" name="email" placeholder="eg. soft@dashboard.com" required/>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12 col-sm-6">
                      <label>Password</label>
                      <input class="multisteps-form__input form-control password" type="password" name="password" id="password" placeholder="******"/>
                    </div>
                    <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                      <label>Repeat Password</label>
                      <input class="multisteps-form__input form-control password_confirmation" name="password_confirmation" type="password" placeholder="******" data-parsley-equalto="#password"/>
                    </div>
                  </div>
                  <div class="button-row d-flex mt-4">
                    <button class="btn bg-gradient-dark ms-auto mb-0" id="next" type="button" title="Next">Next</button>
                  </div>
                </div>
              </div>
              <!--single form panel-->
              <div class="card multisteps-form__panel p-3 border-radius-xl bg-white" data-animation="FadeIn">
                <h5 class="font-weight-bolder">Address</h5>
                <div class="multisteps-form__content">
                  <div class="row mt-3">
                    <div class="col">
                      <label>Address 1</label>
                      <input class="multisteps-form__input form-control" type="text" name="Address_1" value="{{$user->Address_1}}" placeholder="eg. Street 111" />
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col">
                      <label>Address 2</label>
                      <input class="multisteps-form__input form-control" type="text" name="Address_2" value="{{$user->Address_2}}" placeholder="eg. Street 221" />
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12 col-sm-6">
                      <label>City</label>
                      <input class="multisteps-form__input form-control" type="text" name="city" value="{{$user->city}}" placeholder="eg. Tokyo" />
                    </div>
                    <div class="col-6 col-sm-3 mt-3 mt-sm-0">
                      <label>State</label>
                      <select class="multisteps-form__select form-control" name="state">
                        <option selected="selected">...</option>
                        <option value="1">State 1</option>
                        <option value="2">State 2</option>
                      </select>
                    </div>
                    <div class="col-6 col-sm-3 mt-3 mt-sm-0">
                      <label>Zip</label>
                      <input class="multisteps-form__input form-control" type="text" name="zip_code" value="{{$user->zip_code}}" placeholder="7 letters" />
                    </div>
                  </div>
                  <div class="button-row d-flex mt-4">
                    <button class="btn bg-gradient-light mb-0 js-btn-prev" type="button" title="Prev">Prev</button>
                    <button class="btn bg-gradient-dark ms-auto mb-0 js-btn-next" type="button" title="Next">Next</button>
                  </div>
                </div>
              </div>
              <!--single form panel-->
              <div class="card multisteps-form__panel p-3 border-radius-xl bg-white" data-animation="FadeIn">
                <h5 class="font-weight-bolder">Socials</h5>
                <div class="multisteps-form__content">
                  <div class="row mt-3">
                    <div class="col-12">
                      <label>Twitter Handle</label>
                      <input class="multisteps-form__input form-control" type="text" name="twitter" value="{{$user->twitter}}" placeholder="@soft" />
                    </div>
                    <div class="col-12 mt-3">
                      <label>Facebook Account</label>
                      <input class="multisteps-form__input form-control" type="text" name="facebook" value="{{$user->facebook}}" placeholder="https://..." />
                    </div>
                    <div class="col-12 mt-3">
                      <label>Instagram Account</label>
                      <input class="multisteps-form__input form-control" type="text" name="instagram" value="{{$user->instagram}}" placeholder="https://..." />
                    </div>
                  </div>
                  <div class="row">
                    <div class="button-row d-flex mt-4 col-12">
                      <button class="btn bg-gradient-light mb-0 js-btn-prev" type="button" title="Prev">Prev</button>
                      <button class="btn bg-gradient-dark ms-auto mb-0 js-btn-next" type="button" title="Next">Next</button>
                    </div>
                  </div>
                </div>
              </div>
              <!--single form panel-->
              <div class="card multisteps-form__panel p-3 border-radius-xl bg-white h-100" data-animation="FadeIn">
                <h5 class="font-weight-bolder">Profile</h5>
                <div class="multisteps-form__content mt-3">
                  <div class="avatar avatar-xl position-relative">
                    <div>
                      <label for="file-input" class="btn btn-sm btn-icon-only bg-gradient-light position-absolute bottom-0 end-0 mb-n2 me-n2">
                        <i class="fa fa-pen top-0" data-bs-toggle="tooltip" data-bs-placement="top" title="" aria-hidden="true" data-bs-original-title="Edit Image" aria-label="Edit Image"></i>
                        <span class="sr-only">Edit Image</span>
                      </label>
                      <input type="file" id="file-input" name="user_img" accept="image/*" class="d-none">
                      <span class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <img src="{{ URL::asset('assets/img/users/'.$user->file) }}" class="avatar-xxl" id="imgDisplay" alt="Profile Photo">
                      </span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <label>Public Email</label>
                      <input class="multisteps-form__input form-control" type="text" name="public_email" value="{{$user->public_email}}" placeholder="Use an address you don't use frequently." />
                    </div>
                    <div class="col-12 mt-3">
                      <label>Bio</label>
                      <textarea class="multisteps-form__textarea form-control" rows="5" name="biography" value="{{$user->biography}}" placeholder="Say a few words about who you are or what you're working on."></textarea>
                    </div>
                  </div>
                  <div class="button-row d-flex mt-4">
                    <button class="btn bg-gradient-light mb-0 js-btn-prev" type="button" title="Prev">Prev</button>
                    <button class="btn bg-gradient-dark ms-auto mb-0" type="submit" title="Send">Send</button>
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
  <script src="{{ URL::asset('assets/js/plugins/multistep-form.js') }}"></script>
    <script src="{{ URL::asset('assets/js/plugins/choices.min.js') }}"></script>
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/parsley.js/2.9.2/parsley.min.js" integrity="sha512-eyHL1atYNycXNXZMDndxrDhNAegH2BDWt1TmkXJPoGf1WLlNYt08CSjkqF5lnCRmdm3IrkHid8s2jOUY4NIZVQ==" crossorigin="anonymous"></script>

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
  <script>

    $('#parsley-form').find('button').click(function(){
      $('#parsley-form :input:not(:button)').each(function (index, value) { 
        $(this).parsley().validate();
      });
    });


    jQuery(document).ready(function ($) {
        'use strict';
        // Add fa-check on success, but first remove if it exists
        window.Parsley.on('field:success', function () {
          $("#next").addClass("js-btn-next");
        });
        // Remove fa-check on error
        window.Parsley.on('field:error', function () {
          $("#next").removeClass("js-btn-next");
        });
    });
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