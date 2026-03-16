@extends('layouts.app')

@section('content')
    <nav class="navbar navbar-main navbar-expand-lg  px-0 mx-4 shadow-none border-radius-xl z-index-sticky " id="navbarBlur"
        data-scroll="false">
        <div class="container-fluid py-1 px-3">
            @include('layouts.navbars.auth.topnav', ['title' => 'Edit Item'])
            <div class="sidenav-toggler sidenav-toggler-inner d-xl-block d-none ">
                <a href="javascript:;" class="nav-link p-0">
                    <div class="sidenav-toggler-inner">
                        <i class="sidenav-toggler-line bg-white"></i>
                        <i class="sidenav-toggler-line bg-white"></i>
                        <i class="sidenav-toggler-line bg-white"></i>
                    </div>
                </a>
            </div>
            <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                <div class="ms-md-auto pe-md-3 d-flex align-items-center">
                    <div class="input-group">
                        <span class="input-group-text text-body"><i class="fas fa-search" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" placeholder="Type here...">
                    </div>
                </div>
                <ul class="navbar-nav  justify-content-end">
                    <li class="nav-item d-flex align-items-center">
                        @include('auth.logout')
                    </li>
                    <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                        <a href="javascript:;" class="nav-link text-white p-0" id="iconNavbarSidenav">
                            <div class="sidenav-toggler-inner">
                                <i class="sidenav-toggler-line bg-white"></i>
                                <i class="sidenav-toggler-line bg-white"></i>
                                <i class="sidenav-toggler-line bg-white"></i>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item px-3 d-flex align-items-center">
                        <a href="javascript:;" class="nav-link text-white p-0">
                            <i class="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                        </a>
                    </li>
                    <li class="nav-item position-relative pe-2 d-flex align-items-center">
                        <a href="javascript:;" class="nav-link text-white p-0" id="dropdownMenuButton"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-bell cursor-pointer"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                            <li class="mb-2">
                                <a class="dropdown-item border-radius-md" href="javascript:;">
                                    <div class="d-flex py-1">
                                        <div class="my-auto">
                                            <img src="/assets/img/team-2.jpg" class="avatar avatar-sm  me-3 "
                                                alt="user image">
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="text-sm font-weight-normal mb-1">
                                                <span class="font-weight-bold">New message</span> from Laur
                                            </h6>
                                            <p class="text-xs text-secondary mb-0">
                                                <i class="fa fa-clock me-1"></i>
                                                13 minutes ago
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li class="mb-2">
                                <a class="dropdown-item border-radius-md" href="javascript:;">
                                    <div class="d-flex py-1">
                                        <div class="my-auto">
                                            <img src="/assets/img/small-logos/logo-spotify.svg"
                                                class="avatar avatar-sm bg-gradient-dark  me-3 " alt="logo spotify">
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="text-sm font-weight-normal mb-1">
                                                <span class="font-weight-bold">New album</span> by Travis Scott
                                            </h6>
                                            <p class="text-xs text-secondary mb-0">
                                                <i class="fa fa-clock me-1"></i>
                                                1 day
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item border-radius-md" href="javascript:;">
                                    <div class="d-flex py-1">
                                        <div class="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                                            <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <title>credit-card</title>
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF"
                                                        fill-rule="nonzero">
                                                        <g transform="translate(1716.000000, 291.000000)">
                                                            <g transform="translate(453.000000, 454.000000)">
                                                                <path class="color-background"
                                                                    d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                                                    opacity="0.593633743"></path>
                                                                <path class="color-background"
                                                                    d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z">
                                                                </path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="text-sm font-weight-normal mb-1">
                                                Payment successfully completed
                                            </h6>
                                            <p class="text-xs text-secondary mb-0">
                                                <i class="fa fa-clock me-1"></i>
                                                2 days
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- End Navbar -->
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-lg-9 col-12 mx-auto">
                <div class="card card-body mt-4">
                    <h6 class="mb-0">Edit Item</h6>
                    <hr class="horizontal dark my-3">
                    <form method="POST" action="{{ route('item-edit.update', $item->id) }}" enctype="multipart/form-data"
                        class="item-form">
                        @csrf
                        <label for="name" class="form-label">Name</label>
                        <div>
                            <input type="text" class="form-control" id="name" name="name"
                                value="{{ old('name', $item->name) }}">
                            @error('name')
                                <p class='text-danger text-xs pt-1'> {{ $message }} </p>
                            @enderror
                        </div>

                        <img src="{{ $item->pictureUrl() }}" class="avatar-xxl border-radius-lg shadow-sm mt-4">
                        <div class="d-flex flex-column">
                            <label class="mt-4 form-label" for="picture">Change Image</label>
                            <input type="file" name="picture" accept="image/*" id="picture" class="form-control">
                        </div>

                        <label for="excerpt" class="form-label mt-4">Excerpt</label>
                        <div>
                            <textarea name="excerpt" rows="2" class="w-100 form-control">{{ old('excerpt', $item->excerpt) }}</textarea>
                            @error('excerpt')
                                <p class='text-danger text-xs pt-1'> {{ $message }} </p>
                            @enderror
                        </div>

                        <label class="mt-4">Description</label>
                        <div class="">
                            <div data-toggle="quill" id="editor" class="editor-description"
                                data-quill-placeholder="Description">
                                {!! old('description', $item->description) !!}
                            </div>
                            @error('description')
                                <p class='text-danger text-xs pt-1'> {{ $message }} </p>
                            @enderror
                        </div>

                        <label for="choices-category" class="form-label mt-4">Category</label>
                        <div>
                            <select class="form-control" name="choices-category" id="choices-category">
                                <option value="">Choose category</option>
                                @foreach ($categories as $category)
                                    <option value="{{ $category->id }}"
                                        {{ $category->id == old('choices-category', $item->category_id) ? 'selected' : '' }}>
                                        {{ $category->name }}</option>
                                @endforeach
                            </select>
                            @error('choices-category')
                                <p class='text-danger text-xs pt-1'> {{ $message }} </p>
                            @enderror
                        </div>

                        <label class="mt-4 form-label">Tags</label>
                        <div>
                            <select class="form-control" name="tags[]" id="choices-multiple-remove-button" multiple>
                                <option value="">Choose tags</option>
                                @foreach ($tags as $tag)
                                    <option value="{{ $tag->id }}"
                                        {{ in_array($tag->id, old('tags', $item->tags->pluck('id')->toArray()) ?? []) ? 'selected' : '' }}>
                                        {{ $tag->name }}
                                    </option>
                                @endforeach
                            </select>
                            @error('tags')
                                <p class='text-danger text-xs pt-1'> {{ $message }} </p>
                            @enderror
                        </div>

                        <div class="row mt-4">
                            <div class="col-6">
                                <label class="form-label">Date</label>
                                <input class="form-control datetimepicker" type="text" name="date" data-input
                                    value="{{ old('date', $item->date) }}">
                            </div>
                        </div>

                        <div class="row mt-4 d-flex flex-column">
                            <label class="form-label">Item Status</label>
                            <div class=" d-flex flex-column">
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" name="status" id="published"
                                        value="Published"
                                        {{ old('status', $item->status) == 'Published' ? ' checked' : '' }}>
                                    <label class="custom-control-label" for="published">Published</label>
                                </div>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" name="status" id="draft" value="Draft"
                                        {{ old('status', $item->status) == 'Draft' ? ' checked' : '' }}>
                                    <label class="custom-control-label" for="draft">Draft</label>
                                </div>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" name="status" id="Active" value="Active"
                                        {{ old('status', $item->status) == 'Active' ? ' checked' : '' }}>
                                    <label class="custom-control-label" for="active">Active</label>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-4">
                            <div class="col-6 d-flex align-items-center">
                                <div class="form-check form-switch">
                                    <input class="form-check-input mb-2" type="checkbox" name="show_on_homepage"
                                        id="flexSwitchCheckDefault23" value="1"
                                        {{ old('show_on_homepage', $item->show_on_homepage) == 1 ? ' checked' : '' }}
                                        onchange="visible()">
                                </div>
                                <label class="form-label">Show on homepage</label>
                            </div>
                        </div>

                        <div>
                            <label class="mt-4 form-label">Item Options</label>
                            <div class=" d-flex flex-column">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" name="option[]" id="first"
                                        value="First"
                                        {{ old('option', $item->options) && in_array('First', old('option', $item->options)) ? 'checked' : '' }}>
                                    <label class="custom-control-label" for="first">First</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" name="option[]" id="second"
                                        value="Second"
                                        {{ old('option', $item->options) && in_array('Second', old('option', $item->options)) ? 'checked' : '' }}>
                                    <label class="custom-control-label" for="second">Second</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" name="option[]" id="third"
                                        value="Third"
                                        {{ old('option', $item->options) && in_array('Thirs', old('option', $item->options)) ? 'checked' : '' }}>
                                    <label class="custom-control-label" for="third">Third</label>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex justify-content-end mt-4">
                            <a href="{{ route('item-management') }}" class="btn btn-light m-0">Back</a>
                            <button type="submit" class="btn bg-gradient-primary m-0 ms-2">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        @include('layouts.footers.auth.footer')
    </div>
@endsection

@push('css')
    <style>
        .choices {
            margin-bottom: 0;
        }

    </style>
@endpush

@push('js')
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="/assets/js/plugins/choices.min.js"></script>
    <script src="/assets/js/plugins/quill.min.js"></script>
    <script src="/assets/js/plugins/flatpickr.min.js"></script>
    <script>
        if (document.getElementById('editor')) {
            var quill = new Quill('#editor', {
                theme: 'snow' // Specify theme in configuration
            });
        }

        if (document.getElementById('choices-category')) {
            var element2 = document.getElementById('choices-category');
            const example2 = new Choices(element2);
        }

        if (document.getElementById('choices-multiple-remove-button')) {
            var element1 = document.getElementById('choices-multiple-remove-button');
            const example1 = new Choices(element1, {
                removeItemButton: true
            });
        }

        if (document.querySelector('.datetimepicker')) {
            flatpickr('.datetimepicker', {
                allowInput: true
            }); // flatpickr
        }
    </script>
    <script>
        $(document).ready(function() {
            $(".item-form").on("submit", function(e) {
                let quillEditor = new Quill('#editor');
                let value = $('#editor > div.ql-editor').html();
                if (quillEditor.getLength() > 1) {
                    $(this).append("<textarea name='description' style='display:none'>" + value +
                        "</textarea>");
                }
            });
        });
    </script>
@endpush
