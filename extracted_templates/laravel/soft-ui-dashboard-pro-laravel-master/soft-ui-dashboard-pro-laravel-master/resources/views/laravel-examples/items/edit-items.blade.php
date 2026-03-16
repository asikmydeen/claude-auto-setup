@extends('user_type.auth', ['parentFolder' => 'laravel', 'childFolder' => 'items'])

@section('content')

  <div class="row">
    <div class="col-lg-9 col-12 mx-auto">
      <div class="card card-body mt-4">
        <h6 class="mb-0">New Item</h6>
        <p class="text-sm mb-0">Create new item</p>
        <hr class="horizontal dark my-3">
        <form method="POST" action="/laravel-edit-item/{{$item->id}}" enctype="multipart/form-data">
          @csrf
          <div class="avatar avatar-xxl position-relative">
            <div>
              <label for="file-input" class="btn btn-sm btn-icon-only bg-gradient-light position-absolute bottom-0 end-0 mb-n2 me-n2">
                <i class="fa fa-pen top-0" data-bs-toggle="tooltip" data-bs-placement="top" title="" aria-hidden="true" data-bs-original-title="Edit Image" aria-label="Edit Image"></i>
                <span class="sr-only">Edit Image</span>
              </label>
              <input type="file" id="file-input" name="item_img" accept="image/*" class="d-none">
              <span class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <img src="{{ URL::asset('assets/img/items/'.$item->file) }}" class="avatar-xxl" id="imgDisplay" alt="Profile Photo">
              </span>
            </div>
          </div>
          <div>
            <label for="name" class="form-label">Item Name</label>
            <input type="text" class="form-control" id="name" name="name" value="{{$item->name}}">
            @error('name')
                  <p class="text-danger text-xs mt-2 mb-2">{{ $message }}</p>
              @enderror
          </div>
          <div>
            <label for="excerpt" class="form-label">Item Excerpt</label>
            <input type="text" class="form-control" id="excerpt" name="excerpt" value="{{$item->excerpt}}">
          </div>
          <div>
            <label class="mt-4">Item Description</label>
            <p class="form-text text-muted text-xs ms-1">
              This is how others will learn about the item, so make it good!
            </p>
            <div class="form-group">
                  <textarea  class="editor-content" id="editor" name="description">
                    {{$item->description}}
                    </textarea>
                </div>
          </div>
          <div>
            <label class="form-label mt-4">Item Category</label>
              <select class="form-control" name="category_id" id="choices-category">
                  <option value="">Choose</option>
                  @foreach ($categories as $category)
                  <option value="{{ $category->id}}" {{ $category->id == $item->category->first()->id ? 'selected' : '' }} class="text-capitalize">{{ $category->name }}</option>
                  @endforeach
              </select>
              @error('category_id')
                  <p class="text-danger text-xs mt-2 mb-2">{{ $message }}</p>
              @enderror
          </div>
          <div>
            <label class="form-label mt-4">Item Tags</label>
              <select class="form-control" name="tag_id[]" id="choices-tag" multiple>
                  @foreach ($tags as $tag) 
                  <option value="{{ $tag->id}}" {{ in_array($tag->id, old('tags', $item->tags->pluck('id')->toArray()) ?? []) ? 'selected' : '' }} class="text-capitalize">{{ $tag->name }}</option>
                  @endforeach
              </select>
              @error('tag_id')
                  <p class="text-danger text-xs mt-2 mb-2">{{ $message }}</p>
              @enderror
          </div>
          <div>
            <label class="mt-4 form-label">Item Status</label>
            <div class=" d-flex flex-column">
                <div class="form-check">
                    <input type="radio" class="form-check-input" {{  ($item->status == 'Published' ? ' checked' : '') }} name="status" id="published" value="Published">
                    <label class="custom-control-label" for="published">Published</label>
                </div>
                <div class="form-check">
                    <input type="radio" class="form-check-input" {{  ($item->status == 'Draft' ? ' checked' : '') }} name="status" id="draft" value="Draft">
                    <label class="custom-control-label" for="draft">Draft</label>
                </div>
                <div class="form-check">
                    <input type="radio" class="form-check-input" {{  ($item->status == 'Active' ? ' checked' : '') }} name="status" id="Active" value="Active">
                    <label class="custom-control-label" for="active">Active</label>
                </div>
            </div>
          </div>

          <div class="form-check form-switch mt-4">
            <input class="form-check-input" type="checkbox" name="show_homepage" id="flexSwitchCheckDefault" onclick="notify(this)" {{  ($item->show_homepage == 'on' ? ' checked' : '') }} data-type="warning" data-content="Once a project is made private, you cannot revert it to a public project." data-title="Warning" data-icon="ni ni-bell-55">
            <label class="form-check-label" for="flexSwitchCheckDefault">Show on homepage</label>
          </div>
          <div>

            <label class="mt-4 form-label">Item Options</label>
            <div class=" d-flex flex-column">
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" {{ in_array('First', json_decode($item->options) ?? []) ? 'checked' : ''}}  name="option[]" id="first" value="First">
                    <label class="custom-control-label" for="first">First</label>
                </div>

                <div class="form-check">
                    <input type="checkbox" class="form-check-input" {{ in_array('Second', json_decode($item->options) ?? []) ? 'checked' : ''}} name="option[]" id="second" value="Second">
                    <label class="custom-control-label" for="second">Second</label>
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" {{ in_array('Third', json_decode($item->options) ?? []) ? 'checked' : ''}} name="option[]" id="third" value="Third">
                    <label class="custom-control-label" for="third">Third</label>
                </div>
            </div>
          </div>
          <div>
            <label for="date">Date</label>
            <div>
                <input class="form-control datetimepicker flatpickr-input" value="{{ $item->date }}" name="date" type="text" placeholder="Please select date" data-input="" onfocus="focused(this)" onfocusout="defocused(this)">
            </div>
          </div>
          <div class="d-flex justify-content-end mt-4">
            <a href="{{ url('laravel-items-management') }}" type="button" name="button" class="btn btn-light m-0">BACK TO LIST</a>
            <button type="submit" name="button" class="btn bg-gradient-primary m-0 ms-2">SUBMIT</button>
          </div>
        </form>
      </div>
    </div>
  </div>
@endsection

@push('js')  
  <script src="{{ URL::asset('assets/js/plugins/choices.min.js') }}"></script>
  <script src="{{ URL::asset('assets/js/plugins/quill.min.js') }}"></script>
  <script src="{{ URL::asset('assets/js/plugins/flatpickr.min.js') }}"></script>
  <script src="{{ URL::asset('assets/js/plugins/dropzone.min.js') }}"></script>
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="https://cdn.ckeditor.com/ckeditor5/19.1.1/classic/ckeditor.js"></script>
  <script>
    if (document.getElementById('choices-tag')) {
      var tags = document.getElementById('choices-tag');
      const examples = new Choices(tags, {
        removeItemButton: true
      });
    }

    if (document.getElementById('choices-category')) {
      var language = document.getElementById('choices-category');
      const example = new Choices(language);
    }

    if (document.getElementById('choices-multiple-remove-button')) {
      var element = document.getElementById('choices-multiple-remove-button');
      const example = new Choices(element, {
        removeItemButton: true
      });

      example.setChoices(
        [{
            value: 'One',
            label: 'Label One',
            disabled: true
          },
          {
            value: 'Two',
            label: 'Label Two',
            selected: true
          },
          {
            value: 'Three',
            label: 'Label Three'
          },
        ],
        'value',
        'label',
        false,
      );
    }

    if (document.querySelector('.datetimepicker')) {
      flatpickr('.datetimepicker', {
        allowInput: true
      }); // flatpickr
    }

    Dropzone.autoDiscover = false;
    var drop = document.getElementById('dropzone')
    var myDropzone = new Dropzone(drop, {
      url: "/file/post",
      addRemoveLinks: true

    });
  </script>

  <script>
     function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#imgDisplay').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }
    
    $("#file-input").change(function(){
        readURL(this);
    });



$(document).ready(function() {
  $(".article-form").on("submit", function(e) {
      var quillEditor = new Quill('.editor-content',{
        theme: 'snow'
      });
      let value = $('.editor-content > div.ql-editor').html();
      if (quillEditor.getLength() > 1) {
          $(this).append("<textarea name='description' style='display:none'>" + value + "</textarea>");
      }
  });
});
$(document).ready(function () {
    ClassicEditor
        .create( document.querySelector( '#editor' ) )
        .then( editor => {
        } )
        .catch( error => {
    } );
    
});
  </script>
@endpush