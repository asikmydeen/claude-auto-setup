@extends('english.layouts.app')

@section('style')
<link rel="stylesheet" href="{{ asset('css/fancybox.min.css') }}" />
<link rel="stylesheet" href="{{ asset('css/quill.min.css') }}" />
@endsection

@section('page-title')
<title>{{$stories->title}}</title>
@endsection

@section('description')
<meta name="description" content="Read the story about {{$stories->title}}">

@endsection

@section('og-description')
<meta name="og:description" content="Read the story about {{$stories->title}}">
@endsection

@section('og-title')
<meta property="og:title" content="{{$stories->title}}">
@endsection

@section('og-image')
  <meta property="og:image" content="/images/roommate-stories.png">
@endsection

@section('twitter_data')
<!-- Twitter Card data -->
<meta name="twitter:card" content="product">
<meta name="twitter:site" content="@roombuddy">
<meta name="twitter:title" content="{{$stories->title}}">

<meta name="twitter:description" content="Read the story about {{$stories->title}}">
<meta name="twitter:creator" content="@roombuddy">
<meta name="twitter:image" content="/images/roommate-stories.png">
@endsection

@section('keywords')
<meta name="keywords" content="roommate stories, roommate experiences, funny roommate stories, roommate disappointing stories,  roommate facts, crazy ex roommate, worst roommate stories, roommate drama stories, weirdest roommate stories">
@endsection

@section('content')

<?php
  $topics = explode(',', $stories->topic);
?>

@if (Session::has('success'))

    <div class="alert alert-success alert-dismissible fade show mb-0" role="alert">
      <div class="alert-group-prepend">
        <span class="alert-group-icon text-">
          <i class="far fa-thumbs-up"></i>
        </span>
      </div>
      <p class="mb-0">{{ Session::get('success') }}</p>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

@endif

<div class="container px-sm-0">
  <div class="row my-5">
    <div class="col-lg-1 col-md-2 d-md-block d-none">
      <div class="position-sticky top-2 text-center border-right ml-n4 pr-3" style="z-index:2;">
        @guest

        <span class="btn btn-sm rounded-circle px-0 d-block"  data-toggle="modal" data-target="#modalLogin">
          <button class="action-item active">
            <svg id="Layer_1" width="5px" style="pointer-events:none;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 418.54 343">
              <path class="cls-1-like" d="M278.57,98.45c-8.73-15.47-26.5-24.67-45-23.32-17.93,1.3-33.56,12.22-40,28-1-.6-13.57-7.93-27.53-2.33a27.58,27.58,0,0,0-17.52,23.32c-21.29-6.81-44.74,0-57.56,16.33-11.59,14.79-12.59,35-2.5,51.31-15.83,5.22-27.44,17.75-30,32.65-3.07,17.64,7,35.73,25,44.31-.7,1-9.9,14.93-2.5,30.32,7.81,16.26,26.64,18.57,27.53,18.66a43.36,43.36,0,0,0,7.51,46.65c12.59,14,33.42,19.6,52.56,14a47.9,47.9,0,0,0,35,32.65A51.62,51.62,0,0,0,256,392.33c8.42,16.05,26.08,26.11,45,25.66,18.09-.43,34.54-10.36,42.55-25.66a34.36,34.36,0,0,0,25,2.33,31.6,31.6,0,0,0,20-18.66c2.39.72,29.15,8.31,50.05-7C458,354.92,464,327.46,451.26,303.7c1.14-.58,23.93-12.6,25-37.32.71-16-7.92-31.15-22.52-39.65,1.28-1.79,8.74-12.6,5-25.66-3.49-12.22-15.37-21.5-30-23.32a44.14,44.14,0,0,0-10-49c-14.58-14.19-37.91-18.05-57.56-9.33-2-3-16.65-24.58-45-28A65.3,65.3,0,0,0,278.57,98.45Z" transform="translate(-57.78 -75)"/><path class="cls-2-like" d="M168.32,192.61c-6.3,19.53,10.45,44.67,26.48,44.14,11.49-.38,21.56-13.89,23.54-26.48,2.61-16.62-8-37.08-23.54-38.25C182.94,171.11,171.82,181.75,168.32,192.61Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M126,294.5,115.82,191.91l-50.11-3c-.31,22.48.58,42,1.79,57.86A626.56,626.56,0,0,0,78.83,327.3c1.6,7.63,3.08,14,4.18,18.49l86.5-1.19L160,293.9Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M141.47,177c2.44,28.57,4.68,53.51,6.56,74,2.39,26,3.52,37.26,6,52.49,3.45,21.43,7.61,38.88,10.74,50.7l53.69,2.39c-6.6-30.2-12.55-62.87-17.3-97.82-3.88-28.59-6.57-55.9-8.35-81.71Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M188,171c.46,18.59,1.41,37.89,3,57.86a1079.66,1079.66,0,0,0,16.11,119.29l59.06-.6-11.33-38.77,43.55,44.14L324,306.43l-45.94-47.72,32.81-78.14L257.2,157.91l-15.51,57.26,1.19-40Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M384.27,152.54a346.53,346.53,0,0,0-84.71,16.7l17.9,169.39a98.73,98.73,0,0,0,89.48-26.84l-10.14-43.54L358,281.37l-.6-10.14L398,258.11l-13.12-45.33-34.6,6-1.19-6.56,42.36-8.95Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M449.29,140l-51.9-2.39A447.84,447.84,0,0,0,410.52,277.8l40-7.16A360.93,360.93,0,0,1,449.29,140Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M460,290.32c4.89,15.93-5.1,33.74-19.69,37.58-17.77,4.67-37.91-12.55-36.95-31.3.65-12.54,10.73-25.49,25.41-27.24S456.16,277.72,460,290.32Z" transform="translate(-57.78 -75)"/></svg>
            <span style="pointer-events: none;" id="likes-count-{{ $stories->id }}" class="text-dark">{{ $stories->likes_count }}</span>
          </button>
        </span>

        <span class="btn btn-sm rounded-circle px-0 d-block"  data-toggle="modal" data-target="#modalLogin">
          <button class="action-item active">
            <svg id="Layer_1" width="5px" style="pointer-events:none;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338.88 274.22">
              <path class="cls-1-love" d="M256.64,181.91c-3.43-2.57-43.37-31.51-90-15.3-40.75,14.15-65.89,55.49-63.42,92.89,2.79,42.22,40.13,69.85,51.31,78.12,9.57,7.08,14,9.17,31,19.22A787.89,787.89,0,0,1,266,411.51c27-44.64,56.5-70,79-85,35.76-23.87,63.34-28,81.06-59.93,3.09-5.57,18-32.41,9.07-63.3-10.61-36.72-46.79-51.11-54.64-54.23-39.57-15.74-75.47.19-84.13,4A118.88,118.88,0,0,0,256.64,181.91Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M151.62,216.89l-42.7,2.17.88,103.09,62.62-7.49,6.2-37.5-36.31,7.09Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M220.35,216.31c-26.35-3.09-50.89,20.59-54.95,46.91-4.14,26.85,12.76,58.25,40.86,62.19,26.2,3.67,49.6-18.28,55.25-41.82C268.45,254.74,249.62,219.74,220.35,216.31Z" transform="translate(-101.01 -140.24)"/><path class="cls-3-love" d="M212.75,256.65c-7.42-1.05-13.83,4.75-15.65,11-2.42,8.27,2.91,18.6,11.4,19.75,8.09,1.09,15.8-6.59,16.2-14.92C225,265.58,220.42,257.74,212.75,256.65Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M297.57,249.2l-14-30.2L245.2,240.95l50.89,91.84,57.29-93-15.21-9.71-19.11-12.2Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M342.43,224.12l68.73-.59-5.65,33.54-31-2.27-.55,4,26.17.59-2.74,19.81-24.46,1.66-.27,2,36.62-2L407.63,322l-67,2.84Z" transform="translate(-101.01 -140.24)"/>
            </svg>
            <span id="loves-count-{{ $stories->id }}" class="text-dark">{{ $stories->loves_count }}</span>
          </button>
        </span>

        <span class="btn btn-sm rounded-circle px-0 d-block"  data-toggle="modal" data-target="#modalLogin">
          <button class="action-item active pr-2 pl-0">
            <svg id="Layer_1" style="pointer-events:none;" width="5px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.28 405.78">
            <path class="cls-1-lol" d="M131.26,85.89a178.94,178.94,0,0,1,8.35,52.85c.11,19.71,0,31.82-8.35,38.94-13.77,11.73-39.82,1.32-50.07-2.78a98.88,98.88,0,0,1-33.38-22.25A121.2,121.2,0,0,1,78.4,186c8,13,15.15,24.68,11.13,36.16-3.91,11.16-16.2,16-25,19.47-17.76,7-34.54,5-44.51,2.78a173.65,173.65,0,0,1,41.73,13.91C75.07,264.79,81.79,268.15,84,275c4.52,14.31-14.2,31.53-22.25,38.94a103,103,0,0,1-38.94,22.25,369.08,369.08,0,0,1,41.73-5.56c29.64-2.25,44.63-3.2,52.85,5.56,7.23,7.7,6.63,18.89,5.56,38.94a172.12,172.12,0,0,1-8.35,44.51,101.89,101.89,0,0,1,27.82-25c11.77-7.16,23.52-14.31,36.16-11.13,12.38,3.12,18.93,14.46,25,25,11.44,19.81,14,40.22,13.91,55.63a203.25,203.25,0,0,1,11.13-38.94c9.29-23.38,15.45-38.87,27.82-41.73,11.8-2.72,23.83,7.32,41.73,22.25A175.3,175.3,0,0,1,320.41,428a209.69,209.69,0,0,1,8.35-36.16c6.87-21,11.6-23.94,13.91-25,7.23-3.44,15.07-.09,27.82,5.56,5.49,2.44,16.95,8,41.73,27.82,7.15,5.72,12.89,10.61,16.69,13.91a147.24,147.24,0,0,1-25-38.94,101.91,101.91,0,0,1-8.35-25c-1.9-10.06-.72-12.7,0-13.91,4.21-7,17.37-6.35,27.82-5.56a611,611,0,0,1,64,8.35,155.44,155.44,0,0,1-25-19.47c-7.11-6.81-13.18-14.83-25-30.6-16.61-22.09-17.15-25-16.69-27.82,1.33-8.17,10.36-11.69,36.16-25,15.45-8,27.91-14.85,36.16-19.47a206.76,206.76,0,0,1-47.29-11.13c-14.72-5.39-19.36-9.09-22.25-13.91-6.63-11.05-2-24.59,0-30.6,7.44-21.94,26.67-32.78,33.38-36.16-13.11,5.76-24.46,10.39-33.38,13.91C404.17,146.29,398,148,390,147.09c-3.65-.41-16.24-1.81-22.25-11.13-2.41-3.73-3.07-7.65-2.78-19.47a286.92,286.92,0,0,1,2.78-33.38,147.79,147.79,0,0,1-13.91,25c-7.51,10.86-12.61,18-22.25,22.25-4.26,1.86-10.13,4.43-16.69,2.78-14.21-3.56-19.69-23.86-22.25-33.38a81.36,81.36,0,0,1-2.78-22.25c-3.06,10.42-6.06,18.94-8.35,25-9.75,26-14.94,30.8-19.47,33.38-1.65.94-9.15,5.22-16.69,2.78-8.16-2.64-11.83-11.65-13.91-16.69-6.71-16.29-15-35.39-25-58.42A159.58,159.58,0,0,1,203.58,97c-3.11,16.16-5.36,13.94-8.35,30.6-1.55,8.66-1.63,13.13-5.56,16.69-5,4.54-13.32,4.95-19.47,2.78-8.31-2.92-11.77-10.22-19.47-25C146.51,113.95,139.94,101.51,131.26,85.89Z" transform="translate(-19.77 -58.6)"/>
            <path class="cls-2-lol" d="M106.22,211.07,45,225c7.27,23.18,15.56,47.35,25,72.32,12.52,33,25.68,63.59,38.94,91.8l91.8-36.16-19.47-47.29-38.94,16.69a356.62,356.62,0,0,1-36.16-111.27Z" transform="translate(-19.77 -58.6)"/>
            <path class="cls-2-lol" d="M223.05,169.35c-38,3.19-65.6,56.23-61.2,100.14,4.43,44.2,42.5,90.83,80.67,86.23,36.76-4.43,54.15-54,55.63-58.42,13.75-40.88-5.41-75.56-8.35-80.67C287.25,212.18,260.07,166.23,223.05,169.35Z" transform="translate(-19.77 -58.6)"/>
            <path class="cls-2-lol" d="M423.33,325.12c13.13,2.38,25.36-7.7,27.82-19.47,3.17-15.16-10.2-31.44-25-30.6-11.93.67-22.1,12.28-22.25,25C403.73,311.29,411.33,322.94,423.33,325.12Z" transform="translate(-19.77 -58.6)"/>
            <path class="cls-3-lol" d="M225.83,222.2c-6.48,1.22-8.94,23.62-5.56,41.73,3.23,17.3,13,37.26,19.47,36.16,6.66-1.13,9.9-24.81,5.56-44.51C241.77,239.51,232.07,221,225.83,222.2Z" transform="translate(-19.77 -58.6)"/>
            <path class="cls-2-lol" d="M295.38,161h61.2l2.78,119.61L398.3,275l8.35,50.07a305.62,305.62,0,0,1-100.14,8.35A696.67,696.67,0,0,1,295.38,161Z" transform="translate(-19.77 -58.6)"/>
            <path class="cls-2-lol" d="M415,152.65l61.2,16.69a225.92,225.92,0,0,0-27.82,116.83,55.42,55.42,0,0,0-41.73-2.78A233,233,0,0,1,415,152.65Z" transform="translate(-19.77 -58.6)"/></svg>
            <span id="lols-count-{{ $stories->id }}" class="text-dark">{{ $stories->lols_count }}</span>
          </button>
        </span>

        <span class="btn btn-sm rounded-circle px-0 d-block"  data-toggle="modal" data-target="#modalLogin">
          <button class="action-item active pr-2 pl-0">
            <svg id="Layer_1" style="pointer-events:none;" width="5px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486 373.93">
              <path class="cls-1-wow" d="M259.59,66.34C161.09,71.09,26.66,132.66,20.24,231.09c-6,91.41,102.26,156.05,111.91,161.64,100,57.92,204.68,17.84,226.92,9.33C391.94,389.48,481.13,355.35,499,274.61c12.19-55.23-15.73-101.84-21.76-111.91C416.22,60.93,270.21,65.83,259.59,66.34Z" transform="translate(-18 -64.16)"/><path class="cls-1-wow" d="M334.2,349.22l121.23,83.93A354.78,354.78,0,0,1,439.89,315" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M85.91,160.24,30,154.36q4.13,29.13,8.83,58.85,9.55,60.36,20.6,117.71H97.68l11.77-38.25L115.34,325,153.59,328l41.2-167.73-55.91-8.83-1,19.78-2,39.07L124.17,172H97.68l-8.83,44.14Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M233,151.42c-36.61.09-64.84,48.55-67.68,88.28-3.09,43.13,22.24,96.6,58.85,100.05,37.77,3.56,75.71-47.22,76.51-94.17C301.47,202.15,270.6,151.32,233,151.42Z" transform="translate(-18 -64.16)"/><path class="cls-1-wow" d="M231.65,207.33c-9,0-18.33,22-17.35,41.2.8,15.86,8.9,35.32,17.35,35.31,8.7,0,17.39-20.6,17.35-38.25C249,228.12,240.37,207.33,231.65,207.33Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M333.1,160.24l-55.91-5.89,26.48,176.56h38.25l14.71-35.31L365.46,325l32.37,5.89,50-167.73L389,154.36l-5.89,61.8L374.29,172H344.87L339,219.1Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M492,157.3c-9.32-1.55-19.16-3.48-29.43-5.89-11.55-2.7-22.35-5.7-32.37-8.83l2.94,138.31,38.25,14.71A535.56,535.56,0,0,1,492,157.3Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M424.32,295.61c-6.3,19.53,10.45,44.67,26.48,44.14,11.49-.38,21.56-13.89,23.54-26.48,2.61-16.62-8-37.08-23.54-38.25C438.94,274.11,427.82,284.75,424.32,295.61Z" transform="translate(-18 -64.16)"/></svg>
              <span id="wows-count-{{ $stories->id }}" class="text-dark">{{ $stories->wows_count }}</span>
          </button>
        </span>


        @else
        <span class="btn btn-sm rounded-circle px-0 d-block">
          @if(!in_array($stories->id,$likes))
          <button onclick="actOnChirp(event);" class="action-item active" data-chirp-id="{{ $stories->id }}" data-type="Like">
            <svg id="Layer_1" width="5px" style="pointer-events:none;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 418.54 343">
              <path class="cls-1-like" d="M278.57,98.45c-8.73-15.47-26.5-24.67-45-23.32-17.93,1.3-33.56,12.22-40,28-1-.6-13.57-7.93-27.53-2.33a27.58,27.58,0,0,0-17.52,23.32c-21.29-6.81-44.74,0-57.56,16.33-11.59,14.79-12.59,35-2.5,51.31-15.83,5.22-27.44,17.75-30,32.65-3.07,17.64,7,35.73,25,44.31-.7,1-9.9,14.93-2.5,30.32,7.81,16.26,26.64,18.57,27.53,18.66a43.36,43.36,0,0,0,7.51,46.65c12.59,14,33.42,19.6,52.56,14a47.9,47.9,0,0,0,35,32.65A51.62,51.62,0,0,0,256,392.33c8.42,16.05,26.08,26.11,45,25.66,18.09-.43,34.54-10.36,42.55-25.66a34.36,34.36,0,0,0,25,2.33,31.6,31.6,0,0,0,20-18.66c2.39.72,29.15,8.31,50.05-7C458,354.92,464,327.46,451.26,303.7c1.14-.58,23.93-12.6,25-37.32.71-16-7.92-31.15-22.52-39.65,1.28-1.79,8.74-12.6,5-25.66-3.49-12.22-15.37-21.5-30-23.32a44.14,44.14,0,0,0-10-49c-14.58-14.19-37.91-18.05-57.56-9.33-2-3-16.65-24.58-45-28A65.3,65.3,0,0,0,278.57,98.45Z" transform="translate(-57.78 -75)"/><path class="cls-2-like" d="M168.32,192.61c-6.3,19.53,10.45,44.67,26.48,44.14,11.49-.38,21.56-13.89,23.54-26.48,2.61-16.62-8-37.08-23.54-38.25C182.94,171.11,171.82,181.75,168.32,192.61Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M126,294.5,115.82,191.91l-50.11-3c-.31,22.48.58,42,1.79,57.86A626.56,626.56,0,0,0,78.83,327.3c1.6,7.63,3.08,14,4.18,18.49l86.5-1.19L160,293.9Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M141.47,177c2.44,28.57,4.68,53.51,6.56,74,2.39,26,3.52,37.26,6,52.49,3.45,21.43,7.61,38.88,10.74,50.7l53.69,2.39c-6.6-30.2-12.55-62.87-17.3-97.82-3.88-28.59-6.57-55.9-8.35-81.71Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M188,171c.46,18.59,1.41,37.89,3,57.86a1079.66,1079.66,0,0,0,16.11,119.29l59.06-.6-11.33-38.77,43.55,44.14L324,306.43l-45.94-47.72,32.81-78.14L257.2,157.91l-15.51,57.26,1.19-40Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M384.27,152.54a346.53,346.53,0,0,0-84.71,16.7l17.9,169.39a98.73,98.73,0,0,0,89.48-26.84l-10.14-43.54L358,281.37l-.6-10.14L398,258.11l-13.12-45.33-34.6,6-1.19-6.56,42.36-8.95Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M449.29,140l-51.9-2.39A447.84,447.84,0,0,0,410.52,277.8l40-7.16A360.93,360.93,0,0,1,449.29,140Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M460,290.32c4.89,15.93-5.1,33.74-19.69,37.58-17.77,4.67-37.91-12.55-36.95-31.3.65-12.54,10.73-25.49,25.41-27.24S456.16,277.72,460,290.32Z" transform="translate(-57.78 -75)"/></svg>
            <span style="pointer-events: none;" id="likes-count-{{ $stories->id }}" class="text-dark">{{ $stories->likes_count }}</span>
          </button>
          @else
          <button onclick="actOnChirp(event);" class="action-item action-like active" data-chirp-id="{{ $stories->id }}" data-type="Unlike">
            <svg id="Layer_1" width="5px" style="pointer-events:none;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 418.54 343">
              <path class="cls-1-like" d="M278.57,98.45c-8.73-15.47-26.5-24.67-45-23.32-17.93,1.3-33.56,12.22-40,28-1-.6-13.57-7.93-27.53-2.33a27.58,27.58,0,0,0-17.52,23.32c-21.29-6.81-44.74,0-57.56,16.33-11.59,14.79-12.59,35-2.5,51.31-15.83,5.22-27.44,17.75-30,32.65-3.07,17.64,7,35.73,25,44.31-.7,1-9.9,14.93-2.5,30.32,7.81,16.26,26.64,18.57,27.53,18.66a43.36,43.36,0,0,0,7.51,46.65c12.59,14,33.42,19.6,52.56,14a47.9,47.9,0,0,0,35,32.65A51.62,51.62,0,0,0,256,392.33c8.42,16.05,26.08,26.11,45,25.66,18.09-.43,34.54-10.36,42.55-25.66a34.36,34.36,0,0,0,25,2.33,31.6,31.6,0,0,0,20-18.66c2.39.72,29.15,8.31,50.05-7C458,354.92,464,327.46,451.26,303.7c1.14-.58,23.93-12.6,25-37.32.71-16-7.92-31.15-22.52-39.65,1.28-1.79,8.74-12.6,5-25.66-3.49-12.22-15.37-21.5-30-23.32a44.14,44.14,0,0,0-10-49c-14.58-14.19-37.91-18.05-57.56-9.33-2-3-16.65-24.58-45-28A65.3,65.3,0,0,0,278.57,98.45Z" transform="translate(-57.78 -75)"/><path class="cls-2-like" d="M168.32,192.61c-6.3,19.53,10.45,44.67,26.48,44.14,11.49-.38,21.56-13.89,23.54-26.48,2.61-16.62-8-37.08-23.54-38.25C182.94,171.11,171.82,181.75,168.32,192.61Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M126,294.5,115.82,191.91l-50.11-3c-.31,22.48.58,42,1.79,57.86A626.56,626.56,0,0,0,78.83,327.3c1.6,7.63,3.08,14,4.18,18.49l86.5-1.19L160,293.9Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M141.47,177c2.44,28.57,4.68,53.51,6.56,74,2.39,26,3.52,37.26,6,52.49,3.45,21.43,7.61,38.88,10.74,50.7l53.69,2.39c-6.6-30.2-12.55-62.87-17.3-97.82-3.88-28.59-6.57-55.9-8.35-81.71Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M188,171c.46,18.59,1.41,37.89,3,57.86a1079.66,1079.66,0,0,0,16.11,119.29l59.06-.6-11.33-38.77,43.55,44.14L324,306.43l-45.94-47.72,32.81-78.14L257.2,157.91l-15.51,57.26,1.19-40Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M384.27,152.54a346.53,346.53,0,0,0-84.71,16.7l17.9,169.39a98.73,98.73,0,0,0,89.48-26.84l-10.14-43.54L358,281.37l-.6-10.14L398,258.11l-13.12-45.33-34.6,6-1.19-6.56,42.36-8.95Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M449.29,140l-51.9-2.39A447.84,447.84,0,0,0,410.52,277.8l40-7.16A360.93,360.93,0,0,1,449.29,140Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M460,290.32c4.89,15.93-5.1,33.74-19.69,37.58-17.77,4.67-37.91-12.55-36.95-31.3.65-12.54,10.73-25.49,25.41-27.24S456.16,277.72,460,290.32Z" transform="translate(-57.78 -75)"/></svg>
            <span style="pointer-events: none;" id="likes-count-{{ $stories->id }}" class="text-dark">{{ $stories->likes_count }}</span>
          </button>
          @endif
        </span>

        <span class="btn btn-sm rounded-circle px-0 d-block">
          @if(!in_array($stories->id,$loves))
          <button onclick="actOnChirp(event);" class="action-item active" data-chirp-id="{{ $stories->id }}" data-type="Love">
            <svg id="Layer_1" width="5px" style="pointer-events:none;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338.88 274.22">
              <path class="cls-1-love" d="M256.64,181.91c-3.43-2.57-43.37-31.51-90-15.3-40.75,14.15-65.89,55.49-63.42,92.89,2.79,42.22,40.13,69.85,51.31,78.12,9.57,7.08,14,9.17,31,19.22A787.89,787.89,0,0,1,266,411.51c27-44.64,56.5-70,79-85,35.76-23.87,63.34-28,81.06-59.93,3.09-5.57,18-32.41,9.07-63.3-10.61-36.72-46.79-51.11-54.64-54.23-39.57-15.74-75.47.19-84.13,4A118.88,118.88,0,0,0,256.64,181.91Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M151.62,216.89l-42.7,2.17.88,103.09,62.62-7.49,6.2-37.5-36.31,7.09Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M220.35,216.31c-26.35-3.09-50.89,20.59-54.95,46.91-4.14,26.85,12.76,58.25,40.86,62.19,26.2,3.67,49.6-18.28,55.25-41.82C268.45,254.74,249.62,219.74,220.35,216.31Z" transform="translate(-101.01 -140.24)"/><path class="cls-3-love" d="M212.75,256.65c-7.42-1.05-13.83,4.75-15.65,11-2.42,8.27,2.91,18.6,11.4,19.75,8.09,1.09,15.8-6.59,16.2-14.92C225,265.58,220.42,257.74,212.75,256.65Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M297.57,249.2l-14-30.2L245.2,240.95l50.89,91.84,57.29-93-15.21-9.71-19.11-12.2Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M342.43,224.12l68.73-.59-5.65,33.54-31-2.27-.55,4,26.17.59-2.74,19.81-24.46,1.66-.27,2,36.62-2L407.63,322l-67,2.84Z" transform="translate(-101.01 -140.24)"/>
            </svg>
            <span style="pointer-events: none;" id="loves-count-{{ $stories->id }}" class="text-dark">{{ $stories->loves_count }}</span>
          </button>
          @else
          <button onclick="actOnChirp(event);" class="action-item action-love" data-chirp-id="{{ $stories->id }}" data-type="Unlove">
            <svg id="Layer_1" width="5px" style="pointer-events:none;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338.88 274.22">
              <path class="cls-1-love" d="M256.64,181.91c-3.43-2.57-43.37-31.51-90-15.3-40.75,14.15-65.89,55.49-63.42,92.89,2.79,42.22,40.13,69.85,51.31,78.12,9.57,7.08,14,9.17,31,19.22A787.89,787.89,0,0,1,266,411.51c27-44.64,56.5-70,79-85,35.76-23.87,63.34-28,81.06-59.93,3.09-5.57,18-32.41,9.07-63.3-10.61-36.72-46.79-51.11-54.64-54.23-39.57-15.74-75.47.19-84.13,4A118.88,118.88,0,0,0,256.64,181.91Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M151.62,216.89l-42.7,2.17.88,103.09,62.62-7.49,6.2-37.5-36.31,7.09Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M220.35,216.31c-26.35-3.09-50.89,20.59-54.95,46.91-4.14,26.85,12.76,58.25,40.86,62.19,26.2,3.67,49.6-18.28,55.25-41.82C268.45,254.74,249.62,219.74,220.35,216.31Z" transform="translate(-101.01 -140.24)"/><path class="cls-3-love" d="M212.75,256.65c-7.42-1.05-13.83,4.75-15.65,11-2.42,8.27,2.91,18.6,11.4,19.75,8.09,1.09,15.8-6.59,16.2-14.92C225,265.58,220.42,257.74,212.75,256.65Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M297.57,249.2l-14-30.2L245.2,240.95l50.89,91.84,57.29-93-15.21-9.71-19.11-12.2Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M342.43,224.12l68.73-.59-5.65,33.54-31-2.27-.55,4,26.17.59-2.74,19.81-24.46,1.66-.27,2,36.62-2L407.63,322l-67,2.84Z" transform="translate(-101.01 -140.24)"/></svg>
            <span style="pointer-events: none;" id="loves-count-{{ $stories->id }}" class="text-dark">{{ $stories->loves_count }}</span>
          </button>
          @endif
        </span>

        <span class="btn btn-sm rounded-circle px-0 d-block">
          @if(!in_array($stories->id,$lols))
          <button onclick="actOnChirp(event);" class="action-item active pr-2 pl-0" data-chirp-id="{{ $stories->id }}" data-type="Lol">
            <svg id="Layer_1" style="pointer-events:none;" width="5px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.28 405.78">
            <path class="cls-1-lol" d="M131.26,85.89a178.94,178.94,0,0,1,8.35,52.85c.11,19.71,0,31.82-8.35,38.94-13.77,11.73-39.82,1.32-50.07-2.78a98.88,98.88,0,0,1-33.38-22.25A121.2,121.2,0,0,1,78.4,186c8,13,15.15,24.68,11.13,36.16-3.91,11.16-16.2,16-25,19.47-17.76,7-34.54,5-44.51,2.78a173.65,173.65,0,0,1,41.73,13.91C75.07,264.79,81.79,268.15,84,275c4.52,14.31-14.2,31.53-22.25,38.94a103,103,0,0,1-38.94,22.25,369.08,369.08,0,0,1,41.73-5.56c29.64-2.25,44.63-3.2,52.85,5.56,7.23,7.7,6.63,18.89,5.56,38.94a172.12,172.12,0,0,1-8.35,44.51,101.89,101.89,0,0,1,27.82-25c11.77-7.16,23.52-14.31,36.16-11.13,12.38,3.12,18.93,14.46,25,25,11.44,19.81,14,40.22,13.91,55.63a203.25,203.25,0,0,1,11.13-38.94c9.29-23.38,15.45-38.87,27.82-41.73,11.8-2.72,23.83,7.32,41.73,22.25A175.3,175.3,0,0,1,320.41,428a209.69,209.69,0,0,1,8.35-36.16c6.87-21,11.6-23.94,13.91-25,7.23-3.44,15.07-.09,27.82,5.56,5.49,2.44,16.95,8,41.73,27.82,7.15,5.72,12.89,10.61,16.69,13.91a147.24,147.24,0,0,1-25-38.94,101.91,101.91,0,0,1-8.35-25c-1.9-10.06-.72-12.7,0-13.91,4.21-7,17.37-6.35,27.82-5.56a611,611,0,0,1,64,8.35,155.44,155.44,0,0,1-25-19.47c-7.11-6.81-13.18-14.83-25-30.6-16.61-22.09-17.15-25-16.69-27.82,1.33-8.17,10.36-11.69,36.16-25,15.45-8,27.91-14.85,36.16-19.47a206.76,206.76,0,0,1-47.29-11.13c-14.72-5.39-19.36-9.09-22.25-13.91-6.63-11.05-2-24.59,0-30.6,7.44-21.94,26.67-32.78,33.38-36.16-13.11,5.76-24.46,10.39-33.38,13.91C404.17,146.29,398,148,390,147.09c-3.65-.41-16.24-1.81-22.25-11.13-2.41-3.73-3.07-7.65-2.78-19.47a286.92,286.92,0,0,1,2.78-33.38,147.79,147.79,0,0,1-13.91,25c-7.51,10.86-12.61,18-22.25,22.25-4.26,1.86-10.13,4.43-16.69,2.78-14.21-3.56-19.69-23.86-22.25-33.38a81.36,81.36,0,0,1-2.78-22.25c-3.06,10.42-6.06,18.94-8.35,25-9.75,26-14.94,30.8-19.47,33.38-1.65.94-9.15,5.22-16.69,2.78-8.16-2.64-11.83-11.65-13.91-16.69-6.71-16.29-15-35.39-25-58.42A159.58,159.58,0,0,1,203.58,97c-3.11,16.16-5.36,13.94-8.35,30.6-1.55,8.66-1.63,13.13-5.56,16.69-5,4.54-13.32,4.95-19.47,2.78-8.31-2.92-11.77-10.22-19.47-25C146.51,113.95,139.94,101.51,131.26,85.89Z" transform="translate(-19.77 -58.6)"/>
            <path class="cls-2-lol" d="M106.22,211.07,45,225c7.27,23.18,15.56,47.35,25,72.32,12.52,33,25.68,63.59,38.94,91.8l91.8-36.16-19.47-47.29-38.94,16.69a356.62,356.62,0,0,1-36.16-111.27Z" transform="translate(-19.77 -58.6)"/>
            <path class="cls-2-lol" d="M223.05,169.35c-38,3.19-65.6,56.23-61.2,100.14,4.43,44.2,42.5,90.83,80.67,86.23,36.76-4.43,54.15-54,55.63-58.42,13.75-40.88-5.41-75.56-8.35-80.67C287.25,212.18,260.07,166.23,223.05,169.35Z" transform="translate(-19.77 -58.6)"/>
            <path class="cls-2-lol" d="M423.33,325.12c13.13,2.38,25.36-7.7,27.82-19.47,3.17-15.16-10.2-31.44-25-30.6-11.93.67-22.1,12.28-22.25,25C403.73,311.29,411.33,322.94,423.33,325.12Z" transform="translate(-19.77 -58.6)"/>
            <path class="cls-3-lol" d="M225.83,222.2c-6.48,1.22-8.94,23.62-5.56,41.73,3.23,17.3,13,37.26,19.47,36.16,6.66-1.13,9.9-24.81,5.56-44.51C241.77,239.51,232.07,221,225.83,222.2Z" transform="translate(-19.77 -58.6)"/>
            <path class="cls-2-lol" d="M295.38,161h61.2l2.78,119.61L398.3,275l8.35,50.07a305.62,305.62,0,0,1-100.14,8.35A696.67,696.67,0,0,1,295.38,161Z" transform="translate(-19.77 -58.6)"/>
            <path class="cls-2-lol" d="M415,152.65l61.2,16.69a225.92,225.92,0,0,0-27.82,116.83,55.42,55.42,0,0,0-41.73-2.78A233,233,0,0,1,415,152.65Z" transform="translate(-19.77 -58.6)"/></svg>
            <span style="pointer-events: none;" id="lols-count-{{ $stories->id }}" class="text-dark">{{ $stories->lols_count }}</span>
          </button>
          @else
          <button onclick="actOnChirp(event);" class="action-item action-lol pr-2 pl-0" data-chirp-id="{{ $stories->id }}" data-type="Unlol">
            <svg id="Layer_1" style="pointer-events:none;" width="5px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.28 405.78">
            <path class="cls-1-lol" d="M131.26,85.89a178.94,178.94,0,0,1,8.35,52.85c.11,19.71,0,31.82-8.35,38.94-13.77,11.73-39.82,1.32-50.07-2.78a98.88,98.88,0,0,1-33.38-22.25A121.2,121.2,0,0,1,78.4,186c8,13,15.15,24.68,11.13,36.16-3.91,11.16-16.2,16-25,19.47-17.76,7-34.54,5-44.51,2.78a173.65,173.65,0,0,1,41.73,13.91C75.07,264.79,81.79,268.15,84,275c4.52,14.31-14.2,31.53-22.25,38.94a103,103,0,0,1-38.94,22.25,369.08,369.08,0,0,1,41.73-5.56c29.64-2.25,44.63-3.2,52.85,5.56,7.23,7.7,6.63,18.89,5.56,38.94a172.12,172.12,0,0,1-8.35,44.51,101.89,101.89,0,0,1,27.82-25c11.77-7.16,23.52-14.31,36.16-11.13,12.38,3.12,18.93,14.46,25,25,11.44,19.81,14,40.22,13.91,55.63a203.25,203.25,0,0,1,11.13-38.94c9.29-23.38,15.45-38.87,27.82-41.73,11.8-2.72,23.83,7.32,41.73,22.25A175.3,175.3,0,0,1,320.41,428a209.69,209.69,0,0,1,8.35-36.16c6.87-21,11.6-23.94,13.91-25,7.23-3.44,15.07-.09,27.82,5.56,5.49,2.44,16.95,8,41.73,27.82,7.15,5.72,12.89,10.61,16.69,13.91a147.24,147.24,0,0,1-25-38.94,101.91,101.91,0,0,1-8.35-25c-1.9-10.06-.72-12.7,0-13.91,4.21-7,17.37-6.35,27.82-5.56a611,611,0,0,1,64,8.35,155.44,155.44,0,0,1-25-19.47c-7.11-6.81-13.18-14.83-25-30.6-16.61-22.09-17.15-25-16.69-27.82,1.33-8.17,10.36-11.69,36.16-25,15.45-8,27.91-14.85,36.16-19.47a206.76,206.76,0,0,1-47.29-11.13c-14.72-5.39-19.36-9.09-22.25-13.91-6.63-11.05-2-24.59,0-30.6,7.44-21.94,26.67-32.78,33.38-36.16-13.11,5.76-24.46,10.39-33.38,13.91C404.17,146.29,398,148,390,147.09c-3.65-.41-16.24-1.81-22.25-11.13-2.41-3.73-3.07-7.65-2.78-19.47a286.92,286.92,0,0,1,2.78-33.38,147.79,147.79,0,0,1-13.91,25c-7.51,10.86-12.61,18-22.25,22.25-4.26,1.86-10.13,4.43-16.69,2.78-14.21-3.56-19.69-23.86-22.25-33.38a81.36,81.36,0,0,1-2.78-22.25c-3.06,10.42-6.06,18.94-8.35,25-9.75,26-14.94,30.8-19.47,33.38-1.65.94-9.15,5.22-16.69,2.78-8.16-2.64-11.83-11.65-13.91-16.69-6.71-16.29-15-35.39-25-58.42A159.58,159.58,0,0,1,203.58,97c-3.11,16.16-5.36,13.94-8.35,30.6-1.55,8.66-1.63,13.13-5.56,16.69-5,4.54-13.32,4.95-19.47,2.78-8.31-2.92-11.77-10.22-19.47-25C146.51,113.95,139.94,101.51,131.26,85.89Z" transform="translate(-19.77 -58.6)"/>
            <path class="cls-2-lol" d="M106.22,211.07,45,225c7.27,23.18,15.56,47.35,25,72.32,12.52,33,25.68,63.59,38.94,91.8l91.8-36.16-19.47-47.29-38.94,16.69a356.62,356.62,0,0,1-36.16-111.27Z" transform="translate(-19.77 -58.6)"/>
            <path class="cls-2-lol" d="M223.05,169.35c-38,3.19-65.6,56.23-61.2,100.14,4.43,44.2,42.5,90.83,80.67,86.23,36.76-4.43,54.15-54,55.63-58.42,13.75-40.88-5.41-75.56-8.35-80.67C287.25,212.18,260.07,166.23,223.05,169.35Z" transform="translate(-19.77 -58.6)"/>
            <path class="cls-2-lol" d="M423.33,325.12c13.13,2.38,25.36-7.7,27.82-19.47,3.17-15.16-10.2-31.44-25-30.6-11.93.67-22.1,12.28-22.25,25C403.73,311.29,411.33,322.94,423.33,325.12Z" transform="translate(-19.77 -58.6)"/>
            <path class="cls-3-lol" d="M225.83,222.2c-6.48,1.22-8.94,23.62-5.56,41.73,3.23,17.3,13,37.26,19.47,36.16,6.66-1.13,9.9-24.81,5.56-44.51C241.77,239.51,232.07,221,225.83,222.2Z" transform="translate(-19.77 -58.6)"/>
            <path class="cls-2-lol" d="M295.38,161h61.2l2.78,119.61L398.3,275l8.35,50.07a305.62,305.62,0,0,1-100.14,8.35A696.67,696.67,0,0,1,295.38,161Z" transform="translate(-19.77 -58.6)"/>
            <path class="cls-2-lol" d="M415,152.65l61.2,16.69a225.92,225.92,0,0,0-27.82,116.83,55.42,55.42,0,0,0-41.73-2.78A233,233,0,0,1,415,152.65Z" transform="translate(-19.77 -58.6)"/></svg>
            <span style="pointer-events: none;" id="lols-count-{{ $stories->id }}" class="text-dark">{{ $stories->lols_count }}</span>
          </button>
          @endif
        </span>

        <span class="btn btn-sm rounded-circle px-0 d-block">
          @if(!in_array($stories->id,$wows))
          <button onclick="actOnChirp(event);" class="action-item pr-2 pl-0" data-chirp-id="{{ $stories->id }}" data-type="Wow">
            <svg id="Layer_1" style="pointer-events:none;" width="5px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486 373.93">
              <path class="cls-1-wow" d="M259.59,66.34C161.09,71.09,26.66,132.66,20.24,231.09c-6,91.41,102.26,156.05,111.91,161.64,100,57.92,204.68,17.84,226.92,9.33C391.94,389.48,481.13,355.35,499,274.61c12.19-55.23-15.73-101.84-21.76-111.91C416.22,60.93,270.21,65.83,259.59,66.34Z" transform="translate(-18 -64.16)"/><path class="cls-1-wow" d="M334.2,349.22l121.23,83.93A354.78,354.78,0,0,1,439.89,315" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M85.91,160.24,30,154.36q4.13,29.13,8.83,58.85,9.55,60.36,20.6,117.71H97.68l11.77-38.25L115.34,325,153.59,328l41.2-167.73-55.91-8.83-1,19.78-2,39.07L124.17,172H97.68l-8.83,44.14Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M233,151.42c-36.61.09-64.84,48.55-67.68,88.28-3.09,43.13,22.24,96.6,58.85,100.05,37.77,3.56,75.71-47.22,76.51-94.17C301.47,202.15,270.6,151.32,233,151.42Z" transform="translate(-18 -64.16)"/><path class="cls-1-wow" d="M231.65,207.33c-9,0-18.33,22-17.35,41.2.8,15.86,8.9,35.32,17.35,35.31,8.7,0,17.39-20.6,17.35-38.25C249,228.12,240.37,207.33,231.65,207.33Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M333.1,160.24l-55.91-5.89,26.48,176.56h38.25l14.71-35.31L365.46,325l32.37,5.89,50-167.73L389,154.36l-5.89,61.8L374.29,172H344.87L339,219.1Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M492,157.3c-9.32-1.55-19.16-3.48-29.43-5.89-11.55-2.7-22.35-5.7-32.37-8.83l2.94,138.31,38.25,14.71A535.56,535.56,0,0,1,492,157.3Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M424.32,295.61c-6.3,19.53,10.45,44.67,26.48,44.14,11.49-.38,21.56-13.89,23.54-26.48,2.61-16.62-8-37.08-23.54-38.25C438.94,274.11,427.82,284.75,424.32,295.61Z" transform="translate(-18 -64.16)"/></svg>
              <span style="pointer-events: none;" id="wows-count-{{ $stories->id }}" class="text-dark">{{ $stories->wows_count }}</span>
          </button>
          @else
          <button onclick="actOnChirp(event);" class="action-item action-wow pr-2 pl-0" data-chirp-id="{{ $stories->id }}" data-type="Unwow">
            <svg id="Layer_1" style="pointer-events:none;" width="5px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486 373.93">
              <path class="cls-1-wow" d="M259.59,66.34C161.09,71.09,26.66,132.66,20.24,231.09c-6,91.41,102.26,156.05,111.91,161.64,100,57.92,204.68,17.84,226.92,9.33C391.94,389.48,481.13,355.35,499,274.61c12.19-55.23-15.73-101.84-21.76-111.91C416.22,60.93,270.21,65.83,259.59,66.34Z" transform="translate(-18 -64.16)"/><path class="cls-1-wow" d="M334.2,349.22l121.23,83.93A354.78,354.78,0,0,1,439.89,315" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M85.91,160.24,30,154.36q4.13,29.13,8.83,58.85,9.55,60.36,20.6,117.71H97.68l11.77-38.25L115.34,325,153.59,328l41.2-167.73-55.91-8.83-1,19.78-2,39.07L124.17,172H97.68l-8.83,44.14Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M233,151.42c-36.61.09-64.84,48.55-67.68,88.28-3.09,43.13,22.24,96.6,58.85,100.05,37.77,3.56,75.71-47.22,76.51-94.17C301.47,202.15,270.6,151.32,233,151.42Z" transform="translate(-18 -64.16)"/><path class="cls-1-wow" d="M231.65,207.33c-9,0-18.33,22-17.35,41.2.8,15.86,8.9,35.32,17.35,35.31,8.7,0,17.39-20.6,17.35-38.25C249,228.12,240.37,207.33,231.65,207.33Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M333.1,160.24l-55.91-5.89,26.48,176.56h38.25l14.71-35.31L365.46,325l32.37,5.89,50-167.73L389,154.36l-5.89,61.8L374.29,172H344.87L339,219.1Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M492,157.3c-9.32-1.55-19.16-3.48-29.43-5.89-11.55-2.7-22.35-5.7-32.37-8.83l2.94,138.31,38.25,14.71A535.56,535.56,0,0,1,492,157.3Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M424.32,295.61c-6.3,19.53,10.45,44.67,26.48,44.14,11.49-.38,21.56-13.89,23.54-26.48,2.61-16.62-8-37.08-23.54-38.25C438.94,274.11,427.82,284.75,424.32,295.61Z" transform="translate(-18 -64.16)"/></svg>
              <span style="pointer-events: none;" id="wows-count-{{ $stories->id }}" class="text-dark">{{ $stories->wows_count }}</span>
          </button>
          @endif
        </span>

        @if($stories->user_id == Auth::user()->id)
        <div class="dropdown mt-3">
          <button type="button" class="btn btn-sm btn-secondary rounded-circle btn-icon-only" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="btn-inner--icon">
                    <i class="fas fa-ellipsis-h"></i>
              </span>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" data-toggle="modal" data-target="#editStory">
              <i class="fas fa-edit text-primary"></i>Edit story
            </a>
            <a class="dropdown-item" data-toggle="modal" data-target="#modalDelete">
              <i class="fas fa-trash text-primary"></i>Delete story
            </a>
          </div>
        </div>
        @endif
        @endguest
        <hr class="mt-4 mb-3">
        <a href="https://www.facebook.com/sharer/sharer.php?u={{URL::current()}}" type="button" class="btn btn-white rounded-circle btn-icon-only mr-2 mb-2" data-toggle="tooltip" data-original-title="Share">
            <span class="btn-inner--icon">
                <i class="fab fa-facebook text-lg text-muted"></i>
            </span>
        </a>
        <a href="https://twitter.com/intent/tweet?url={{URL::current()}}/&text={{$stories->title}}" type="button" class="btn btn-white rounded-circle btn-icon-only mr-2" data-toggle="tooltip" data-original-title="Tweet">
            <span class="btn-inner--icon">
                  <i class="fab fa-twitter text-lg text-muted"></i>
            </span>
        </a>
      </div>
    </div>
    <div class="col-lg-8 col-md-10 text-dark">
      <span class="text-uppercase text-sm font-weight-bold mr-2">{{\Carbon\Carbon::parse($stories->posted_at)->format('M d Y')}} </span>
        @guest
        @else
        @if($stories->user_id == Auth::user()->id)
        <div class="dropdown mt-3 d-md-none d-block">
          <button type="button" class="btn btn-sm btn-secondary rounded-circle btn-icon-only" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="btn-inner--icon">
                    <i class="fas fa-ellipsis-h"></i>
              </span>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" data-toggle="modal" data-target="#editStory">
              <i class="fas fa-edit text-primary"></i>Edit story
            </a>
            <a class="dropdown-item" data-toggle="modal" data-target="#modalDelete">
              <i class="fas fa-trash text-primary"></i>Delete story
            </a>
          </div>
        </div>
        @endif
        @endguest
      <br>
      <div class="mt-5">
        @foreach($topics as $topic)
        <a href="./{{Str::lower($topic)}}" class="badge badge-secondary">{{$topic}}</a>
        @endforeach
      </div>
      <h1 class="mb-4">{{$stories->title}} </h1>
      <p class="lead text-dark"> {!! Markdown::parse($stories->text) !!} </p>

      @if($stories->image)
      <a href="https://roombuddy.s3.eu-west-3.amazonaws.com/stories/{{$stories->image}}" data-fancybox data-caption="{{$stories->title}}">
          <img src="https://roombuddy.s3.eu-west-3.amazonaws.com/stories/{{$stories->image}}" class="img-fluid rounded d-block w-10 mb-5" alt="{{$stories->title}}">
      </a>
      @endif
      <!-- Modal Delete -->
      <div class="modal fade" id="modalDelete" tabindex="-1" role="dialog" aria-labelledby="modalDelete" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header border-0 pb-0">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="py-3 text-center">
                        <i class="fas fa-exclamation-circle fa-4x"></i>
                        <h5 class="heading h4 mt-4">Are you sure you want to delete this story?</h5>
                        <p>
                            You will not be able to recover it
                        </p>
                        <form method="POST" class="mt-5" action="/stories-remove/{{$stories->slug}}">
                          {{ method_field('DELETE') }}
                          {{ csrf_field() }}
                          <button type="submit" class="btn btn-sm">Yes, delete it</button>
                          <button type="submit" class="btn btn-sm btn-dark" data-dismiss="modal" aria-label="Close">Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <!-- Modal Edit -->
      <div class="modal fade" id="editStory" tabindex="-1" role="dialog" aria-labelledby="editStoryModal" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <form method="POST" enctype="multipart/form-data" action="/stories-edit/{{ $stories -> slug }}">
            {{ method_field('PATCH') }}
            @csrf
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="newStoryModal">Edit story</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <?php
                $topicArray =
                  ['Funny', 'Facts', 'Disappointing', 'Other'];
                 ?>
                <div class="form-group">
                  <input type="text" value="{{$stories->title}}" name="title" class="form-control mb-1" placeholder="Title" disabled>
                  <p class="text-xs text-muted mb-2"><span class="text-danger">*</span> once settled the title cannot be changed</p>

                  <div id="editor" class="mb-2 text-dark">
                    {!! Markdown::parse($stories->text) !!}
                  </div>
                  <input type="hidden" id="quill_html" name="text"></input>

                  <select class="topic w-50" name="topic[]" required multiple>

                    @foreach($topicArray as $index => $topicA )
                      @if(in_array($topicA, explode(',', $stories->topic) ))
                       <option value="{{$topicA}}" selected>{{$topicA}}</option>
                     @else
                        <option value="{{$topicA}}">{{$topicA}}</option>
                     @endif
                    @endforeach

                 </select>

                 <div class="col-lg-12 imgUp mt-3">
                   <div class="media align-items-center">
                     <div class="row w-100">
                       <div class="col-md-6 d-flex align-items-center pl-0">
                         <a class="avatar avatar-lg mr-3 imagePreview border border-dashed border-dark" style="background-size:cover; background-position: center center; @if($stories->image) background-image:url('https://roombuddy.s3.eu-west-3.amazonaws.com/stories/{{$stories->image}}') @else background-image:url('https://www.roombuddy.co/images/roombuddy-nophoto.png') @endif"></a>
                         <label class="btn btn-sm btn-dark mb-0">
                           Add image<input type="file" class="uploadFile img" value="Upload Photo" name="image" style="width: 0px;height: 0px;overflow: hidden;" accept=".png, .jpg, .jpeg, .gif, .bmp, .svg">
                         </label>
                       </div>
                     </div>
                   </div>
                 </div>

                 <div class="custom-control custom-checkbox mt-3">
                    <input type="checkbox" name="anonim" value="1" class="custom-control-input" id="checkAnonim">
                    <label class="custom-control-label" for="checkAnonim">Post as anonim</label>
                </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal Login -->
      <div class="modal fade docs-example-modal-sm text-center" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <h5>Login to continue</h5>
                <a class="btn btn-success btn-sm mt-3" href="{{ route('login', 'en') }}">Login</a>
            </div>
          </div>
        </div>
      </div>

      @if(!is_null($stories->user_id))
      <span class="text-sm">- Posted by <a href="../en/profile/{{$stories->author['slug']}}/{{str_slug($stories->author['name'])}}">{{$stories->author->name}}</a></span>
      @else
      <span class="text-sm">- Posted by <a>Anonim</a></span>

      @endif
      <div class="media media-comment align-items-center mt-4">
        <div class="media-body">
          @guest
          <div>
            <div class="form-group text-right mb-0">
              <textarea class="form-control" name="body" data-toggle="autosize" placeholder="Write your comment" rows="4"></textarea>
              <button data-toggle="modal" data-target="#modalLogin" class="btn btn-sm mt-2 btn-primary">
                Comment
              </button>
            </div>
          </div>
          @else
          <form method="POST" action="/comment/{{$stories->slug}}" enctype="multipart/form-data">
            @csrf
            <div class="form-group text-right mb-0">
              <textarea class="form-control" name="body" data-toggle="autosize" placeholder="Write your comment" rows="4" required></textarea>
              <button type="submit" class="btn btn-sm mt-2 btn-primary">
                Comment
              </button>
            </div>
          </form>
          @endguest
        </div>
      </div>


      @foreach($comments as $comment)
      <div class="media media-comment">
        <div class="media-body">
          <div class="media-comment-bubble left-top ml-4">
            <div class="d-flex justify-center mb-2">
              <img alt="Image placeholder" class="avatar avatar-sm rounded-circle mt-2" src="https://www.roombuddy.co/images/default.png">
              <div class="ml-2">
                <a href="../en/profile/{{$comment->commentPostedBy['slug']}}/{{str_slug($comment->commentPostedBy['name'])}}" class="h6 text-dark my-auto">{{$comment->commentPostedBy['name']}}</a>
                <p class="text-xs mb-0 text-muted">{{\Carbon\Carbon::parse($comment->created_at)->format('d.m.y')}}</p>
              </div>
            </div>
            <p class="text-sm mb-0 lh-160">{{$comment->body}}</p>
          </div>
        </div>
      </div>
      @endforeach



      <hr>

      <h3 class="mb-3 h4"> Other stories </h3>
      @foreach($all_stories as $story)

      <?php
        $topics = explode(',', $story->topic);
      ?>

      <div class="mb-5">
        <div class="card mb-0">
          <div class="card-body text-left pb-5">
            @if(!is_null($story->user_id))
            <a href="../en/profile/{{$story->author->slug}}/{{$story->author->name}}" class="text-xs text-muted font-weight-l">
              {{ $story->author->name  }}
            </a>
            @else
            <a class="text-xs text-muted font-weight-l">
            Anonim
            </a>
            @endif
            <br>
            <a href="../roommate-stories/{{$story->slug}}" class="text-dark">{{ $story->title }}</a>
            ·
            @foreach($topics as $topic)
             <span class="badge badge-pill badge-sm badge-secondary">{{ $topic }}</span>
            @endforeach
          </div>
        </div>
        <div class="row align-items-center mt-n3">
            <div class="col-12">
              @guest
              <div class="actions text-left px-sm-4" data-toggle="modal" data-target="#modalLogin">
                <span class="badge badge-pill badge-primary bg-white border ml-2">
                  <button class="action-item active pr-2 pl-0">
                    <svg id="Layer_1" width="10px" style="pointer-events:none;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 418.54 343">
                      <path class="cls-1-like" d="M278.57,98.45c-8.73-15.47-26.5-24.67-45-23.32-17.93,1.3-33.56,12.22-40,28-1-.6-13.57-7.93-27.53-2.33a27.58,27.58,0,0,0-17.52,23.32c-21.29-6.81-44.74,0-57.56,16.33-11.59,14.79-12.59,35-2.5,51.31-15.83,5.22-27.44,17.75-30,32.65-3.07,17.64,7,35.73,25,44.31-.7,1-9.9,14.93-2.5,30.32,7.81,16.26,26.64,18.57,27.53,18.66a43.36,43.36,0,0,0,7.51,46.65c12.59,14,33.42,19.6,52.56,14a47.9,47.9,0,0,0,35,32.65A51.62,51.62,0,0,0,256,392.33c8.42,16.05,26.08,26.11,45,25.66,18.09-.43,34.54-10.36,42.55-25.66a34.36,34.36,0,0,0,25,2.33,31.6,31.6,0,0,0,20-18.66c2.39.72,29.15,8.31,50.05-7C458,354.92,464,327.46,451.26,303.7c1.14-.58,23.93-12.6,25-37.32.71-16-7.92-31.15-22.52-39.65,1.28-1.79,8.74-12.6,5-25.66-3.49-12.22-15.37-21.5-30-23.32a44.14,44.14,0,0,0-10-49c-14.58-14.19-37.91-18.05-57.56-9.33-2-3-16.65-24.58-45-28A65.3,65.3,0,0,0,278.57,98.45Z" transform="translate(-57.78 -75)"/><path class="cls-2-like" d="M168.32,192.61c-6.3,19.53,10.45,44.67,26.48,44.14,11.49-.38,21.56-13.89,23.54-26.48,2.61-16.62-8-37.08-23.54-38.25C182.94,171.11,171.82,181.75,168.32,192.61Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M126,294.5,115.82,191.91l-50.11-3c-.31,22.48.58,42,1.79,57.86A626.56,626.56,0,0,0,78.83,327.3c1.6,7.63,3.08,14,4.18,18.49l86.5-1.19L160,293.9Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M141.47,177c2.44,28.57,4.68,53.51,6.56,74,2.39,26,3.52,37.26,6,52.49,3.45,21.43,7.61,38.88,10.74,50.7l53.69,2.39c-6.6-30.2-12.55-62.87-17.3-97.82-3.88-28.59-6.57-55.9-8.35-81.71Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M188,171c.46,18.59,1.41,37.89,3,57.86a1079.66,1079.66,0,0,0,16.11,119.29l59.06-.6-11.33-38.77,43.55,44.14L324,306.43l-45.94-47.72,32.81-78.14L257.2,157.91l-15.51,57.26,1.19-40Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M384.27,152.54a346.53,346.53,0,0,0-84.71,16.7l17.9,169.39a98.73,98.73,0,0,0,89.48-26.84l-10.14-43.54L358,281.37l-.6-10.14L398,258.11l-13.12-45.33-34.6,6-1.19-6.56,42.36-8.95Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M449.29,140l-51.9-2.39A447.84,447.84,0,0,0,410.52,277.8l40-7.16A360.93,360.93,0,0,1,449.29,140Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M460,290.32c4.89,15.93-5.1,33.74-19.69,37.58-17.77,4.67-37.91-12.55-36.95-31.3.65-12.54,10.73-25.49,25.41-27.24S456.16,277.72,460,290.32Z" transform="translate(-57.78 -75)"/></svg>
                    <span style="pointer-events: none;" id="likes-count-{{ $story->id }}" class="text-dark">{{ $story->likes_count }}</span>
                  </button>
                </span>

                <span class="badge badge-pill badge-primary bg-white border ml-2">
                  <button class="action-item active pr-2 pl-0">
                    <svg id="Layer_1" width="10px" style="pointer-events:none;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338.88 274.22">
                      <path class="cls-1-love" d="M256.64,181.91c-3.43-2.57-43.37-31.51-90-15.3-40.75,14.15-65.89,55.49-63.42,92.89,2.79,42.22,40.13,69.85,51.31,78.12,9.57,7.08,14,9.17,31,19.22A787.89,787.89,0,0,1,266,411.51c27-44.64,56.5-70,79-85,35.76-23.87,63.34-28,81.06-59.93,3.09-5.57,18-32.41,9.07-63.3-10.61-36.72-46.79-51.11-54.64-54.23-39.57-15.74-75.47.19-84.13,4A118.88,118.88,0,0,0,256.64,181.91Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M151.62,216.89l-42.7,2.17.88,103.09,62.62-7.49,6.2-37.5-36.31,7.09Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M220.35,216.31c-26.35-3.09-50.89,20.59-54.95,46.91-4.14,26.85,12.76,58.25,40.86,62.19,26.2,3.67,49.6-18.28,55.25-41.82C268.45,254.74,249.62,219.74,220.35,216.31Z" transform="translate(-101.01 -140.24)"/><path class="cls-3-love" d="M212.75,256.65c-7.42-1.05-13.83,4.75-15.65,11-2.42,8.27,2.91,18.6,11.4,19.75,8.09,1.09,15.8-6.59,16.2-14.92C225,265.58,220.42,257.74,212.75,256.65Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M297.57,249.2l-14-30.2L245.2,240.95l50.89,91.84,57.29-93-15.21-9.71-19.11-12.2Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M342.43,224.12l68.73-.59-5.65,33.54-31-2.27-.55,4,26.17.59-2.74,19.81-24.46,1.66-.27,2,36.62-2L407.63,322l-67,2.84Z" transform="translate(-101.01 -140.24)"/>
                    </svg>
                    <span id="loves-count-{{ $story->id }}" class="text-dark">{{ $story->loves_count }}</span>
                  </button>
                </span>

                <span class="badge badge-pill badge-primary bg-white border ml-2">
                  <button class="action-item active pr-2 pl-0">
                    <svg id="Layer_1" style="pointer-events:none;" width="10px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.28 405.78">
                    <path class="cls-1-lol" d="M131.26,85.89a178.94,178.94,0,0,1,8.35,52.85c.11,19.71,0,31.82-8.35,38.94-13.77,11.73-39.82,1.32-50.07-2.78a98.88,98.88,0,0,1-33.38-22.25A121.2,121.2,0,0,1,78.4,186c8,13,15.15,24.68,11.13,36.16-3.91,11.16-16.2,16-25,19.47-17.76,7-34.54,5-44.51,2.78a173.65,173.65,0,0,1,41.73,13.91C75.07,264.79,81.79,268.15,84,275c4.52,14.31-14.2,31.53-22.25,38.94a103,103,0,0,1-38.94,22.25,369.08,369.08,0,0,1,41.73-5.56c29.64-2.25,44.63-3.2,52.85,5.56,7.23,7.7,6.63,18.89,5.56,38.94a172.12,172.12,0,0,1-8.35,44.51,101.89,101.89,0,0,1,27.82-25c11.77-7.16,23.52-14.31,36.16-11.13,12.38,3.12,18.93,14.46,25,25,11.44,19.81,14,40.22,13.91,55.63a203.25,203.25,0,0,1,11.13-38.94c9.29-23.38,15.45-38.87,27.82-41.73,11.8-2.72,23.83,7.32,41.73,22.25A175.3,175.3,0,0,1,320.41,428a209.69,209.69,0,0,1,8.35-36.16c6.87-21,11.6-23.94,13.91-25,7.23-3.44,15.07-.09,27.82,5.56,5.49,2.44,16.95,8,41.73,27.82,7.15,5.72,12.89,10.61,16.69,13.91a147.24,147.24,0,0,1-25-38.94,101.91,101.91,0,0,1-8.35-25c-1.9-10.06-.72-12.7,0-13.91,4.21-7,17.37-6.35,27.82-5.56a611,611,0,0,1,64,8.35,155.44,155.44,0,0,1-25-19.47c-7.11-6.81-13.18-14.83-25-30.6-16.61-22.09-17.15-25-16.69-27.82,1.33-8.17,10.36-11.69,36.16-25,15.45-8,27.91-14.85,36.16-19.47a206.76,206.76,0,0,1-47.29-11.13c-14.72-5.39-19.36-9.09-22.25-13.91-6.63-11.05-2-24.59,0-30.6,7.44-21.94,26.67-32.78,33.38-36.16-13.11,5.76-24.46,10.39-33.38,13.91C404.17,146.29,398,148,390,147.09c-3.65-.41-16.24-1.81-22.25-11.13-2.41-3.73-3.07-7.65-2.78-19.47a286.92,286.92,0,0,1,2.78-33.38,147.79,147.79,0,0,1-13.91,25c-7.51,10.86-12.61,18-22.25,22.25-4.26,1.86-10.13,4.43-16.69,2.78-14.21-3.56-19.69-23.86-22.25-33.38a81.36,81.36,0,0,1-2.78-22.25c-3.06,10.42-6.06,18.94-8.35,25-9.75,26-14.94,30.8-19.47,33.38-1.65.94-9.15,5.22-16.69,2.78-8.16-2.64-11.83-11.65-13.91-16.69-6.71-16.29-15-35.39-25-58.42A159.58,159.58,0,0,1,203.58,97c-3.11,16.16-5.36,13.94-8.35,30.6-1.55,8.66-1.63,13.13-5.56,16.69-5,4.54-13.32,4.95-19.47,2.78-8.31-2.92-11.77-10.22-19.47-25C146.51,113.95,139.94,101.51,131.26,85.89Z" transform="translate(-19.77 -58.6)"/>
                    <path class="cls-2-lol" d="M106.22,211.07,45,225c7.27,23.18,15.56,47.35,25,72.32,12.52,33,25.68,63.59,38.94,91.8l91.8-36.16-19.47-47.29-38.94,16.69a356.62,356.62,0,0,1-36.16-111.27Z" transform="translate(-19.77 -58.6)"/>
                    <path class="cls-2-lol" d="M223.05,169.35c-38,3.19-65.6,56.23-61.2,100.14,4.43,44.2,42.5,90.83,80.67,86.23,36.76-4.43,54.15-54,55.63-58.42,13.75-40.88-5.41-75.56-8.35-80.67C287.25,212.18,260.07,166.23,223.05,169.35Z" transform="translate(-19.77 -58.6)"/>
                    <path class="cls-2-lol" d="M423.33,325.12c13.13,2.38,25.36-7.7,27.82-19.47,3.17-15.16-10.2-31.44-25-30.6-11.93.67-22.1,12.28-22.25,25C403.73,311.29,411.33,322.94,423.33,325.12Z" transform="translate(-19.77 -58.6)"/>
                    <path class="cls-3-lol" d="M225.83,222.2c-6.48,1.22-8.94,23.62-5.56,41.73,3.23,17.3,13,37.26,19.47,36.16,6.66-1.13,9.9-24.81,5.56-44.51C241.77,239.51,232.07,221,225.83,222.2Z" transform="translate(-19.77 -58.6)"/>
                    <path class="cls-2-lol" d="M295.38,161h61.2l2.78,119.61L398.3,275l8.35,50.07a305.62,305.62,0,0,1-100.14,8.35A696.67,696.67,0,0,1,295.38,161Z" transform="translate(-19.77 -58.6)"/>
                    <path class="cls-2-lol" d="M415,152.65l61.2,16.69a225.92,225.92,0,0,0-27.82,116.83,55.42,55.42,0,0,0-41.73-2.78A233,233,0,0,1,415,152.65Z" transform="translate(-19.77 -58.6)"/></svg>
                    <span id="lols-count-{{ $story->id }}" class="text-dark">{{ $story->lols_count }}</span>
                  </button>
                </span>

                <span class="badge badge-pill badge-primary bg-white border ml-2">
                  <button class="action-item pr-2 pl-0">
                    <svg id="Layer_1" style="pointer-events:none;" width="10px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486 373.93">
                      <path class="cls-1-wow" d="M259.59,66.34C161.09,71.09,26.66,132.66,20.24,231.09c-6,91.41,102.26,156.05,111.91,161.64,100,57.92,204.68,17.84,226.92,9.33C391.94,389.48,481.13,355.35,499,274.61c12.19-55.23-15.73-101.84-21.76-111.91C416.22,60.93,270.21,65.83,259.59,66.34Z" transform="translate(-18 -64.16)"/><path class="cls-1-wow" d="M334.2,349.22l121.23,83.93A354.78,354.78,0,0,1,439.89,315" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M85.91,160.24,30,154.36q4.13,29.13,8.83,58.85,9.55,60.36,20.6,117.71H97.68l11.77-38.25L115.34,325,153.59,328l41.2-167.73-55.91-8.83-1,19.78-2,39.07L124.17,172H97.68l-8.83,44.14Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M233,151.42c-36.61.09-64.84,48.55-67.68,88.28-3.09,43.13,22.24,96.6,58.85,100.05,37.77,3.56,75.71-47.22,76.51-94.17C301.47,202.15,270.6,151.32,233,151.42Z" transform="translate(-18 -64.16)"/><path class="cls-1-wow" d="M231.65,207.33c-9,0-18.33,22-17.35,41.2.8,15.86,8.9,35.32,17.35,35.31,8.7,0,17.39-20.6,17.35-38.25C249,228.12,240.37,207.33,231.65,207.33Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M333.1,160.24l-55.91-5.89,26.48,176.56h38.25l14.71-35.31L365.46,325l32.37,5.89,50-167.73L389,154.36l-5.89,61.8L374.29,172H344.87L339,219.1Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M492,157.3c-9.32-1.55-19.16-3.48-29.43-5.89-11.55-2.7-22.35-5.7-32.37-8.83l2.94,138.31,38.25,14.71A535.56,535.56,0,0,1,492,157.3Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M424.32,295.61c-6.3,19.53,10.45,44.67,26.48,44.14,11.49-.38,21.56-13.89,23.54-26.48,2.61-16.62-8-37.08-23.54-38.25C438.94,274.11,427.82,284.75,424.32,295.61Z" transform="translate(-18 -64.16)"/></svg>
                      <span id="wows-count-{{ $story->id }}" class="text-dark">{{ $story->wows_count }}</span>
                  </button>
                </span>
              </div>
              @else
                <div class="actions text-left px-sm-4">
                  <span class="badge badge-pill badge-primary bg-white border ml-2">
                    @if(!in_array($story->id,$likes))
                    <button onclick="actOnChirp(event);" class="action-item active pr-2 pl-0" data-chirp-id="{{ $story->id }}" data-type="Like">
                      <svg id="Layer_1" width="10px" style="pointer-events:none;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 418.54 343">
                        <path class="cls-1-like" d="M278.57,98.45c-8.73-15.47-26.5-24.67-45-23.32-17.93,1.3-33.56,12.22-40,28-1-.6-13.57-7.93-27.53-2.33a27.58,27.58,0,0,0-17.52,23.32c-21.29-6.81-44.74,0-57.56,16.33-11.59,14.79-12.59,35-2.5,51.31-15.83,5.22-27.44,17.75-30,32.65-3.07,17.64,7,35.73,25,44.31-.7,1-9.9,14.93-2.5,30.32,7.81,16.26,26.64,18.57,27.53,18.66a43.36,43.36,0,0,0,7.51,46.65c12.59,14,33.42,19.6,52.56,14a47.9,47.9,0,0,0,35,32.65A51.62,51.62,0,0,0,256,392.33c8.42,16.05,26.08,26.11,45,25.66,18.09-.43,34.54-10.36,42.55-25.66a34.36,34.36,0,0,0,25,2.33,31.6,31.6,0,0,0,20-18.66c2.39.72,29.15,8.31,50.05-7C458,354.92,464,327.46,451.26,303.7c1.14-.58,23.93-12.6,25-37.32.71-16-7.92-31.15-22.52-39.65,1.28-1.79,8.74-12.6,5-25.66-3.49-12.22-15.37-21.5-30-23.32a44.14,44.14,0,0,0-10-49c-14.58-14.19-37.91-18.05-57.56-9.33-2-3-16.65-24.58-45-28A65.3,65.3,0,0,0,278.57,98.45Z" transform="translate(-57.78 -75)"/><path class="cls-2-like" d="M168.32,192.61c-6.3,19.53,10.45,44.67,26.48,44.14,11.49-.38,21.56-13.89,23.54-26.48,2.61-16.62-8-37.08-23.54-38.25C182.94,171.11,171.82,181.75,168.32,192.61Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M126,294.5,115.82,191.91l-50.11-3c-.31,22.48.58,42,1.79,57.86A626.56,626.56,0,0,0,78.83,327.3c1.6,7.63,3.08,14,4.18,18.49l86.5-1.19L160,293.9Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M141.47,177c2.44,28.57,4.68,53.51,6.56,74,2.39,26,3.52,37.26,6,52.49,3.45,21.43,7.61,38.88,10.74,50.7l53.69,2.39c-6.6-30.2-12.55-62.87-17.3-97.82-3.88-28.59-6.57-55.9-8.35-81.71Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M188,171c.46,18.59,1.41,37.89,3,57.86a1079.66,1079.66,0,0,0,16.11,119.29l59.06-.6-11.33-38.77,43.55,44.14L324,306.43l-45.94-47.72,32.81-78.14L257.2,157.91l-15.51,57.26,1.19-40Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M384.27,152.54a346.53,346.53,0,0,0-84.71,16.7l17.9,169.39a98.73,98.73,0,0,0,89.48-26.84l-10.14-43.54L358,281.37l-.6-10.14L398,258.11l-13.12-45.33-34.6,6-1.19-6.56,42.36-8.95Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M449.29,140l-51.9-2.39A447.84,447.84,0,0,0,410.52,277.8l40-7.16A360.93,360.93,0,0,1,449.29,140Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M460,290.32c4.89,15.93-5.1,33.74-19.69,37.58-17.77,4.67-37.91-12.55-36.95-31.3.65-12.54,10.73-25.49,25.41-27.24S456.16,277.72,460,290.32Z" transform="translate(-57.78 -75)"/></svg>
                      <span style="pointer-events: none;" id="likes-count-{{ $story->id }}" class="text-dark">{{ $story->likes_count }}</span>
                    </button>
                    @else
                    <button onclick="actOnChirp(event);" class="action-item action-like active pr-2 pl-0" data-chirp-id="{{ $story->id }}" data-type="Unlike">
                      <svg id="Layer_1" width="10px" style="pointer-events:none;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 418.54 343">
                        <path class="cls-1-like" d="M278.57,98.45c-8.73-15.47-26.5-24.67-45-23.32-17.93,1.3-33.56,12.22-40,28-1-.6-13.57-7.93-27.53-2.33a27.58,27.58,0,0,0-17.52,23.32c-21.29-6.81-44.74,0-57.56,16.33-11.59,14.79-12.59,35-2.5,51.31-15.83,5.22-27.44,17.75-30,32.65-3.07,17.64,7,35.73,25,44.31-.7,1-9.9,14.93-2.5,30.32,7.81,16.26,26.64,18.57,27.53,18.66a43.36,43.36,0,0,0,7.51,46.65c12.59,14,33.42,19.6,52.56,14a47.9,47.9,0,0,0,35,32.65A51.62,51.62,0,0,0,256,392.33c8.42,16.05,26.08,26.11,45,25.66,18.09-.43,34.54-10.36,42.55-25.66a34.36,34.36,0,0,0,25,2.33,31.6,31.6,0,0,0,20-18.66c2.39.72,29.15,8.31,50.05-7C458,354.92,464,327.46,451.26,303.7c1.14-.58,23.93-12.6,25-37.32.71-16-7.92-31.15-22.52-39.65,1.28-1.79,8.74-12.6,5-25.66-3.49-12.22-15.37-21.5-30-23.32a44.14,44.14,0,0,0-10-49c-14.58-14.19-37.91-18.05-57.56-9.33-2-3-16.65-24.58-45-28A65.3,65.3,0,0,0,278.57,98.45Z" transform="translate(-57.78 -75)"/><path class="cls-2-like" d="M168.32,192.61c-6.3,19.53,10.45,44.67,26.48,44.14,11.49-.38,21.56-13.89,23.54-26.48,2.61-16.62-8-37.08-23.54-38.25C182.94,171.11,171.82,181.75,168.32,192.61Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M126,294.5,115.82,191.91l-50.11-3c-.31,22.48.58,42,1.79,57.86A626.56,626.56,0,0,0,78.83,327.3c1.6,7.63,3.08,14,4.18,18.49l86.5-1.19L160,293.9Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M141.47,177c2.44,28.57,4.68,53.51,6.56,74,2.39,26,3.52,37.26,6,52.49,3.45,21.43,7.61,38.88,10.74,50.7l53.69,2.39c-6.6-30.2-12.55-62.87-17.3-97.82-3.88-28.59-6.57-55.9-8.35-81.71Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M188,171c.46,18.59,1.41,37.89,3,57.86a1079.66,1079.66,0,0,0,16.11,119.29l59.06-.6-11.33-38.77,43.55,44.14L324,306.43l-45.94-47.72,32.81-78.14L257.2,157.91l-15.51,57.26,1.19-40Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M384.27,152.54a346.53,346.53,0,0,0-84.71,16.7l17.9,169.39a98.73,98.73,0,0,0,89.48-26.84l-10.14-43.54L358,281.37l-.6-10.14L398,258.11l-13.12-45.33-34.6,6-1.19-6.56,42.36-8.95Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M449.29,140l-51.9-2.39A447.84,447.84,0,0,0,410.52,277.8l40-7.16A360.93,360.93,0,0,1,449.29,140Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M460,290.32c4.89,15.93-5.1,33.74-19.69,37.58-17.77,4.67-37.91-12.55-36.95-31.3.65-12.54,10.73-25.49,25.41-27.24S456.16,277.72,460,290.32Z" transform="translate(-57.78 -75)"/></svg>
                      <span style="pointer-events: none;" id="likes-count-{{ $story->id }}" class="text-dark">{{ $story->likes_count }}</span>
                    </button>
                    @endif
                  </span>

                  <span class="badge badge-pill badge-primary bg-white border ml-2">
                    @if(!in_array($story->id,$loves))
                    <button onclick="actOnChirp(event);" class="action-item active pr-2 pl-0" data-chirp-id="{{ $story->id }}" data-type="Love">
                      <svg id="Layer_1" width="10px" style="pointer-events:none;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338.88 274.22">
                        <path class="cls-1-love" d="M256.64,181.91c-3.43-2.57-43.37-31.51-90-15.3-40.75,14.15-65.89,55.49-63.42,92.89,2.79,42.22,40.13,69.85,51.31,78.12,9.57,7.08,14,9.17,31,19.22A787.89,787.89,0,0,1,266,411.51c27-44.64,56.5-70,79-85,35.76-23.87,63.34-28,81.06-59.93,3.09-5.57,18-32.41,9.07-63.3-10.61-36.72-46.79-51.11-54.64-54.23-39.57-15.74-75.47.19-84.13,4A118.88,118.88,0,0,0,256.64,181.91Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M151.62,216.89l-42.7,2.17.88,103.09,62.62-7.49,6.2-37.5-36.31,7.09Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M220.35,216.31c-26.35-3.09-50.89,20.59-54.95,46.91-4.14,26.85,12.76,58.25,40.86,62.19,26.2,3.67,49.6-18.28,55.25-41.82C268.45,254.74,249.62,219.74,220.35,216.31Z" transform="translate(-101.01 -140.24)"/><path class="cls-3-love" d="M212.75,256.65c-7.42-1.05-13.83,4.75-15.65,11-2.42,8.27,2.91,18.6,11.4,19.75,8.09,1.09,15.8-6.59,16.2-14.92C225,265.58,220.42,257.74,212.75,256.65Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M297.57,249.2l-14-30.2L245.2,240.95l50.89,91.84,57.29-93-15.21-9.71-19.11-12.2Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M342.43,224.12l68.73-.59-5.65,33.54-31-2.27-.55,4,26.17.59-2.74,19.81-24.46,1.66-.27,2,36.62-2L407.63,322l-67,2.84Z" transform="translate(-101.01 -140.24)"/>
                      </svg>
                      <span style="pointer-events: none;" id="loves-count-{{ $story->id }}" class="text-dark">{{ $story->loves_count }}</span>
                    </button>
                    @else
                    <button onclick="actOnChirp(event);" class="action-item action-love pr-2 pl-0" data-chirp-id="{{ $story->id }}" data-type="Unlove">
                      <svg id="Layer_1" width="10px" style="pointer-events:none;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338.88 274.22">
                        <path class="cls-1-love" d="M256.64,181.91c-3.43-2.57-43.37-31.51-90-15.3-40.75,14.15-65.89,55.49-63.42,92.89,2.79,42.22,40.13,69.85,51.31,78.12,9.57,7.08,14,9.17,31,19.22A787.89,787.89,0,0,1,266,411.51c27-44.64,56.5-70,79-85,35.76-23.87,63.34-28,81.06-59.93,3.09-5.57,18-32.41,9.07-63.3-10.61-36.72-46.79-51.11-54.64-54.23-39.57-15.74-75.47.19-84.13,4A118.88,118.88,0,0,0,256.64,181.91Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M151.62,216.89l-42.7,2.17.88,103.09,62.62-7.49,6.2-37.5-36.31,7.09Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M220.35,216.31c-26.35-3.09-50.89,20.59-54.95,46.91-4.14,26.85,12.76,58.25,40.86,62.19,26.2,3.67,49.6-18.28,55.25-41.82C268.45,254.74,249.62,219.74,220.35,216.31Z" transform="translate(-101.01 -140.24)"/><path class="cls-3-love" d="M212.75,256.65c-7.42-1.05-13.83,4.75-15.65,11-2.42,8.27,2.91,18.6,11.4,19.75,8.09,1.09,15.8-6.59,16.2-14.92C225,265.58,220.42,257.74,212.75,256.65Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M297.57,249.2l-14-30.2L245.2,240.95l50.89,91.84,57.29-93-15.21-9.71-19.11-12.2Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M342.43,224.12l68.73-.59-5.65,33.54-31-2.27-.55,4,26.17.59-2.74,19.81-24.46,1.66-.27,2,36.62-2L407.63,322l-67,2.84Z" transform="translate(-101.01 -140.24)"/></svg>
                      <span style="pointer-events: none;" id="loves-count-{{ $story->id }}" class="text-dark">{{ $story->loves_count }}</span>
                    </button>
                    @endif
                  </span>

                  <span class="badge badge-pill badge-primary bg-white border ml-2">
                    @if(!in_array($story->id,$lols))
                    <button onclick="actOnChirp(event);" class="action-item active pr-2 pl-0" data-chirp-id="{{ $story->id }}" data-type="Lol">
                      <svg id="Layer_1" style="pointer-events:none;" width="10px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.28 405.78">
                      <path class="cls-1-lol" d="M131.26,85.89a178.94,178.94,0,0,1,8.35,52.85c.11,19.71,0,31.82-8.35,38.94-13.77,11.73-39.82,1.32-50.07-2.78a98.88,98.88,0,0,1-33.38-22.25A121.2,121.2,0,0,1,78.4,186c8,13,15.15,24.68,11.13,36.16-3.91,11.16-16.2,16-25,19.47-17.76,7-34.54,5-44.51,2.78a173.65,173.65,0,0,1,41.73,13.91C75.07,264.79,81.79,268.15,84,275c4.52,14.31-14.2,31.53-22.25,38.94a103,103,0,0,1-38.94,22.25,369.08,369.08,0,0,1,41.73-5.56c29.64-2.25,44.63-3.2,52.85,5.56,7.23,7.7,6.63,18.89,5.56,38.94a172.12,172.12,0,0,1-8.35,44.51,101.89,101.89,0,0,1,27.82-25c11.77-7.16,23.52-14.31,36.16-11.13,12.38,3.12,18.93,14.46,25,25,11.44,19.81,14,40.22,13.91,55.63a203.25,203.25,0,0,1,11.13-38.94c9.29-23.38,15.45-38.87,27.82-41.73,11.8-2.72,23.83,7.32,41.73,22.25A175.3,175.3,0,0,1,320.41,428a209.69,209.69,0,0,1,8.35-36.16c6.87-21,11.6-23.94,13.91-25,7.23-3.44,15.07-.09,27.82,5.56,5.49,2.44,16.95,8,41.73,27.82,7.15,5.72,12.89,10.61,16.69,13.91a147.24,147.24,0,0,1-25-38.94,101.91,101.91,0,0,1-8.35-25c-1.9-10.06-.72-12.7,0-13.91,4.21-7,17.37-6.35,27.82-5.56a611,611,0,0,1,64,8.35,155.44,155.44,0,0,1-25-19.47c-7.11-6.81-13.18-14.83-25-30.6-16.61-22.09-17.15-25-16.69-27.82,1.33-8.17,10.36-11.69,36.16-25,15.45-8,27.91-14.85,36.16-19.47a206.76,206.76,0,0,1-47.29-11.13c-14.72-5.39-19.36-9.09-22.25-13.91-6.63-11.05-2-24.59,0-30.6,7.44-21.94,26.67-32.78,33.38-36.16-13.11,5.76-24.46,10.39-33.38,13.91C404.17,146.29,398,148,390,147.09c-3.65-.41-16.24-1.81-22.25-11.13-2.41-3.73-3.07-7.65-2.78-19.47a286.92,286.92,0,0,1,2.78-33.38,147.79,147.79,0,0,1-13.91,25c-7.51,10.86-12.61,18-22.25,22.25-4.26,1.86-10.13,4.43-16.69,2.78-14.21-3.56-19.69-23.86-22.25-33.38a81.36,81.36,0,0,1-2.78-22.25c-3.06,10.42-6.06,18.94-8.35,25-9.75,26-14.94,30.8-19.47,33.38-1.65.94-9.15,5.22-16.69,2.78-8.16-2.64-11.83-11.65-13.91-16.69-6.71-16.29-15-35.39-25-58.42A159.58,159.58,0,0,1,203.58,97c-3.11,16.16-5.36,13.94-8.35,30.6-1.55,8.66-1.63,13.13-5.56,16.69-5,4.54-13.32,4.95-19.47,2.78-8.31-2.92-11.77-10.22-19.47-25C146.51,113.95,139.94,101.51,131.26,85.89Z" transform="translate(-19.77 -58.6)"/>
                      <path class="cls-2-lol" d="M106.22,211.07,45,225c7.27,23.18,15.56,47.35,25,72.32,12.52,33,25.68,63.59,38.94,91.8l91.8-36.16-19.47-47.29-38.94,16.69a356.62,356.62,0,0,1-36.16-111.27Z" transform="translate(-19.77 -58.6)"/>
                      <path class="cls-2-lol" d="M223.05,169.35c-38,3.19-65.6,56.23-61.2,100.14,4.43,44.2,42.5,90.83,80.67,86.23,36.76-4.43,54.15-54,55.63-58.42,13.75-40.88-5.41-75.56-8.35-80.67C287.25,212.18,260.07,166.23,223.05,169.35Z" transform="translate(-19.77 -58.6)"/>
                      <path class="cls-2-lol" d="M423.33,325.12c13.13,2.38,25.36-7.7,27.82-19.47,3.17-15.16-10.2-31.44-25-30.6-11.93.67-22.1,12.28-22.25,25C403.73,311.29,411.33,322.94,423.33,325.12Z" transform="translate(-19.77 -58.6)"/>
                      <path class="cls-3-lol" d="M225.83,222.2c-6.48,1.22-8.94,23.62-5.56,41.73,3.23,17.3,13,37.26,19.47,36.16,6.66-1.13,9.9-24.81,5.56-44.51C241.77,239.51,232.07,221,225.83,222.2Z" transform="translate(-19.77 -58.6)"/>
                      <path class="cls-2-lol" d="M295.38,161h61.2l2.78,119.61L398.3,275l8.35,50.07a305.62,305.62,0,0,1-100.14,8.35A696.67,696.67,0,0,1,295.38,161Z" transform="translate(-19.77 -58.6)"/>
                      <path class="cls-2-lol" d="M415,152.65l61.2,16.69a225.92,225.92,0,0,0-27.82,116.83,55.42,55.42,0,0,0-41.73-2.78A233,233,0,0,1,415,152.65Z" transform="translate(-19.77 -58.6)"/></svg>
                      <span style="pointer-events: none;" id="lols-count-{{ $story->id }}" class="text-dark">{{ $story->lols_count }}</span>
                    </button>
                    @else
                    <button onclick="actOnChirp(event);" class="action-item action-lol pr-2 pl-0" data-chirp-id="{{ $story->id }}" data-type="Unlol">
                      <svg id="Layer_1" style="pointer-events:none;" width="10px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.28 405.78">
                      <path class="cls-1-lol" d="M131.26,85.89a178.94,178.94,0,0,1,8.35,52.85c.11,19.71,0,31.82-8.35,38.94-13.77,11.73-39.82,1.32-50.07-2.78a98.88,98.88,0,0,1-33.38-22.25A121.2,121.2,0,0,1,78.4,186c8,13,15.15,24.68,11.13,36.16-3.91,11.16-16.2,16-25,19.47-17.76,7-34.54,5-44.51,2.78a173.65,173.65,0,0,1,41.73,13.91C75.07,264.79,81.79,268.15,84,275c4.52,14.31-14.2,31.53-22.25,38.94a103,103,0,0,1-38.94,22.25,369.08,369.08,0,0,1,41.73-5.56c29.64-2.25,44.63-3.2,52.85,5.56,7.23,7.7,6.63,18.89,5.56,38.94a172.12,172.12,0,0,1-8.35,44.51,101.89,101.89,0,0,1,27.82-25c11.77-7.16,23.52-14.31,36.16-11.13,12.38,3.12,18.93,14.46,25,25,11.44,19.81,14,40.22,13.91,55.63a203.25,203.25,0,0,1,11.13-38.94c9.29-23.38,15.45-38.87,27.82-41.73,11.8-2.72,23.83,7.32,41.73,22.25A175.3,175.3,0,0,1,320.41,428a209.69,209.69,0,0,1,8.35-36.16c6.87-21,11.6-23.94,13.91-25,7.23-3.44,15.07-.09,27.82,5.56,5.49,2.44,16.95,8,41.73,27.82,7.15,5.72,12.89,10.61,16.69,13.91a147.24,147.24,0,0,1-25-38.94,101.91,101.91,0,0,1-8.35-25c-1.9-10.06-.72-12.7,0-13.91,4.21-7,17.37-6.35,27.82-5.56a611,611,0,0,1,64,8.35,155.44,155.44,0,0,1-25-19.47c-7.11-6.81-13.18-14.83-25-30.6-16.61-22.09-17.15-25-16.69-27.82,1.33-8.17,10.36-11.69,36.16-25,15.45-8,27.91-14.85,36.16-19.47a206.76,206.76,0,0,1-47.29-11.13c-14.72-5.39-19.36-9.09-22.25-13.91-6.63-11.05-2-24.59,0-30.6,7.44-21.94,26.67-32.78,33.38-36.16-13.11,5.76-24.46,10.39-33.38,13.91C404.17,146.29,398,148,390,147.09c-3.65-.41-16.24-1.81-22.25-11.13-2.41-3.73-3.07-7.65-2.78-19.47a286.92,286.92,0,0,1,2.78-33.38,147.79,147.79,0,0,1-13.91,25c-7.51,10.86-12.61,18-22.25,22.25-4.26,1.86-10.13,4.43-16.69,2.78-14.21-3.56-19.69-23.86-22.25-33.38a81.36,81.36,0,0,1-2.78-22.25c-3.06,10.42-6.06,18.94-8.35,25-9.75,26-14.94,30.8-19.47,33.38-1.65.94-9.15,5.22-16.69,2.78-8.16-2.64-11.83-11.65-13.91-16.69-6.71-16.29-15-35.39-25-58.42A159.58,159.58,0,0,1,203.58,97c-3.11,16.16-5.36,13.94-8.35,30.6-1.55,8.66-1.63,13.13-5.56,16.69-5,4.54-13.32,4.95-19.47,2.78-8.31-2.92-11.77-10.22-19.47-25C146.51,113.95,139.94,101.51,131.26,85.89Z" transform="translate(-19.77 -58.6)"/>
                      <path class="cls-2-lol" d="M106.22,211.07,45,225c7.27,23.18,15.56,47.35,25,72.32,12.52,33,25.68,63.59,38.94,91.8l91.8-36.16-19.47-47.29-38.94,16.69a356.62,356.62,0,0,1-36.16-111.27Z" transform="translate(-19.77 -58.6)"/>
                      <path class="cls-2-lol" d="M223.05,169.35c-38,3.19-65.6,56.23-61.2,100.14,4.43,44.2,42.5,90.83,80.67,86.23,36.76-4.43,54.15-54,55.63-58.42,13.75-40.88-5.41-75.56-8.35-80.67C287.25,212.18,260.07,166.23,223.05,169.35Z" transform="translate(-19.77 -58.6)"/>
                      <path class="cls-2-lol" d="M423.33,325.12c13.13,2.38,25.36-7.7,27.82-19.47,3.17-15.16-10.2-31.44-25-30.6-11.93.67-22.1,12.28-22.25,25C403.73,311.29,411.33,322.94,423.33,325.12Z" transform="translate(-19.77 -58.6)"/>
                      <path class="cls-3-lol" d="M225.83,222.2c-6.48,1.22-8.94,23.62-5.56,41.73,3.23,17.3,13,37.26,19.47,36.16,6.66-1.13,9.9-24.81,5.56-44.51C241.77,239.51,232.07,221,225.83,222.2Z" transform="translate(-19.77 -58.6)"/>
                      <path class="cls-2-lol" d="M295.38,161h61.2l2.78,119.61L398.3,275l8.35,50.07a305.62,305.62,0,0,1-100.14,8.35A696.67,696.67,0,0,1,295.38,161Z" transform="translate(-19.77 -58.6)"/>
                      <path class="cls-2-lol" d="M415,152.65l61.2,16.69a225.92,225.92,0,0,0-27.82,116.83,55.42,55.42,0,0,0-41.73-2.78A233,233,0,0,1,415,152.65Z" transform="translate(-19.77 -58.6)"/></svg>
                      <span style="pointer-events: none;" id="lols-count-{{ $story->id }}" class="text-dark">{{ $story->lols_count }}</span>
                    </button>
                    @endif
                  </span>

                  <span class="badge badge-pill badge-primary bg-white border ml-2">
                    @if(!in_array($story->id,$wows))
                    <button onclick="actOnChirp(event);" class="action-item pr-2 pl-0" data-chirp-id="{{ $story->id }}" data-type="Wow">
                      <svg id="Layer_1" style="pointer-events:none;" width="10px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486 373.93">
                        <path class="cls-1-wow" d="M259.59,66.34C161.09,71.09,26.66,132.66,20.24,231.09c-6,91.41,102.26,156.05,111.91,161.64,100,57.92,204.68,17.84,226.92,9.33C391.94,389.48,481.13,355.35,499,274.61c12.19-55.23-15.73-101.84-21.76-111.91C416.22,60.93,270.21,65.83,259.59,66.34Z" transform="translate(-18 -64.16)"/><path class="cls-1-wow" d="M334.2,349.22l121.23,83.93A354.78,354.78,0,0,1,439.89,315" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M85.91,160.24,30,154.36q4.13,29.13,8.83,58.85,9.55,60.36,20.6,117.71H97.68l11.77-38.25L115.34,325,153.59,328l41.2-167.73-55.91-8.83-1,19.78-2,39.07L124.17,172H97.68l-8.83,44.14Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M233,151.42c-36.61.09-64.84,48.55-67.68,88.28-3.09,43.13,22.24,96.6,58.85,100.05,37.77,3.56,75.71-47.22,76.51-94.17C301.47,202.15,270.6,151.32,233,151.42Z" transform="translate(-18 -64.16)"/><path class="cls-1-wow" d="M231.65,207.33c-9,0-18.33,22-17.35,41.2.8,15.86,8.9,35.32,17.35,35.31,8.7,0,17.39-20.6,17.35-38.25C249,228.12,240.37,207.33,231.65,207.33Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M333.1,160.24l-55.91-5.89,26.48,176.56h38.25l14.71-35.31L365.46,325l32.37,5.89,50-167.73L389,154.36l-5.89,61.8L374.29,172H344.87L339,219.1Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M492,157.3c-9.32-1.55-19.16-3.48-29.43-5.89-11.55-2.7-22.35-5.7-32.37-8.83l2.94,138.31,38.25,14.71A535.56,535.56,0,0,1,492,157.3Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M424.32,295.61c-6.3,19.53,10.45,44.67,26.48,44.14,11.49-.38,21.56-13.89,23.54-26.48,2.61-16.62-8-37.08-23.54-38.25C438.94,274.11,427.82,284.75,424.32,295.61Z" transform="translate(-18 -64.16)"/></svg>
                        <span style="pointer-events: none;" id="wows-count-{{ $story->id }}" class="text-dark">{{ $story->wows_count }}</span>
                    </button>
                    @else
                    <button onclick="actOnChirp(event);" class="action-item action-wow pr-2 pl-0" data-chirp-id="{{ $story->id }}" data-type="Unwow">
                      <svg id="Layer_1" style="pointer-events:none;" width="10px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486 373.93">
                        <path class="cls-1-wow" d="M259.59,66.34C161.09,71.09,26.66,132.66,20.24,231.09c-6,91.41,102.26,156.05,111.91,161.64,100,57.92,204.68,17.84,226.92,9.33C391.94,389.48,481.13,355.35,499,274.61c12.19-55.23-15.73-101.84-21.76-111.91C416.22,60.93,270.21,65.83,259.59,66.34Z" transform="translate(-18 -64.16)"/><path class="cls-1-wow" d="M334.2,349.22l121.23,83.93A354.78,354.78,0,0,1,439.89,315" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M85.91,160.24,30,154.36q4.13,29.13,8.83,58.85,9.55,60.36,20.6,117.71H97.68l11.77-38.25L115.34,325,153.59,328l41.2-167.73-55.91-8.83-1,19.78-2,39.07L124.17,172H97.68l-8.83,44.14Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M233,151.42c-36.61.09-64.84,48.55-67.68,88.28-3.09,43.13,22.24,96.6,58.85,100.05,37.77,3.56,75.71-47.22,76.51-94.17C301.47,202.15,270.6,151.32,233,151.42Z" transform="translate(-18 -64.16)"/><path class="cls-1-wow" d="M231.65,207.33c-9,0-18.33,22-17.35,41.2.8,15.86,8.9,35.32,17.35,35.31,8.7,0,17.39-20.6,17.35-38.25C249,228.12,240.37,207.33,231.65,207.33Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M333.1,160.24l-55.91-5.89,26.48,176.56h38.25l14.71-35.31L365.46,325l32.37,5.89,50-167.73L389,154.36l-5.89,61.8L374.29,172H344.87L339,219.1Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M492,157.3c-9.32-1.55-19.16-3.48-29.43-5.89-11.55-2.7-22.35-5.7-32.37-8.83l2.94,138.31,38.25,14.71A535.56,535.56,0,0,1,492,157.3Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M424.32,295.61c-6.3,19.53,10.45,44.67,26.48,44.14,11.49-.38,21.56-13.89,23.54-26.48,2.61-16.62-8-37.08-23.54-38.25C438.94,274.11,427.82,284.75,424.32,295.61Z" transform="translate(-18 -64.16)"/></svg>
                        <span style="pointer-events: none;" id="wows-count-{{ $story->id }}" class="text-dark">{{ $story->wows_count }}</span>
                    </button>
                    @endif
                  </span>
                </div>
                @endif
            </div>
        </div>
      </div>
      @endforeach
      <div class="text-center">
        <a href="../roommate-stories" class="btn btn-sm btn-soft-dark btn-icon">
          <span class="btn-inner--text">View all</span><span class="btn-inner--icon">
             <i class="fa fa-arrow-right"></i>
         </span>
        </a>
      </div>
    </div>
    <div class="col-lg-3">
      <div class="position-sticky top-5 mb-5">
        <div class="card border text-center right-0 mt-lg-0 mt-4 ml-lg-5 ml-0">
          <div class="mt-3 mb-2">
            <i class="star fas fa-star text-warning text-lg"></i>
          </div>

          <div class="px-4 pb-4">
            <p class="text-muted mb-4">Find roommates</p>

              <a href="http://127.0.0.1:8000/en/list" class="btn btn-sm btn-dark mr-0">
                <span class="btn-inner--text">Add list</span>
              </a>
              <br>
              <a href="http://127.0.0.1:8000/en/rooms-for-rent" class="btn btn-sm btn-link text-dark mt-2">
                <span class="btn-inner--text">Find Roommate</span>
              </a>
          </div>
        </div>
        <div class="card border text-left right-0 mt-lg-0 mt-4 ml-lg-5 ml-0">
          <div class="card-body">
            <p class="text-dark mb-4 text-dark">Be the first to find the news!</p>
            <form action="https://roombuddy.us19.list-manage.com/subscribe/post?u=91a62866775388391df0e719a&amp;id=1a22c7613c" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                <div id="mc_embed_signup_scroll">
              <input type="email" value="" name="EMAIL" class="form-control form-control-sm w-100" id="mce-EMAIL" placeholder="Email address" required>
                <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_91a62866775388391df0e719a_1a22c7613c" tabindex="-1" value=""></div>
                <div class="clear text-left"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="btn btn-primary btn-sm btn-block mt-2"></div>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="d-md-none d-block position-sticky bottom-0 border-top w-100 bg-white z-index-2 text-center py-3">
  @guest
  <div class="actions text-center px-sm-4" data-toggle="modal" data-target="#modalLogin">
    <span class="btn btn-sm badge mr-sm-4 mr-3 pl-0"  data-toggle="modal" data-target="#modalLogin">
      <button class="action-item active">
        <svg id="Layer_1" width="5px" style="pointer-events:none;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 418.54 343">
          <path class="cls-1-like" d="M278.57,98.45c-8.73-15.47-26.5-24.67-45-23.32-17.93,1.3-33.56,12.22-40,28-1-.6-13.57-7.93-27.53-2.33a27.58,27.58,0,0,0-17.52,23.32c-21.29-6.81-44.74,0-57.56,16.33-11.59,14.79-12.59,35-2.5,51.31-15.83,5.22-27.44,17.75-30,32.65-3.07,17.64,7,35.73,25,44.31-.7,1-9.9,14.93-2.5,30.32,7.81,16.26,26.64,18.57,27.53,18.66a43.36,43.36,0,0,0,7.51,46.65c12.59,14,33.42,19.6,52.56,14a47.9,47.9,0,0,0,35,32.65A51.62,51.62,0,0,0,256,392.33c8.42,16.05,26.08,26.11,45,25.66,18.09-.43,34.54-10.36,42.55-25.66a34.36,34.36,0,0,0,25,2.33,31.6,31.6,0,0,0,20-18.66c2.39.72,29.15,8.31,50.05-7C458,354.92,464,327.46,451.26,303.7c1.14-.58,23.93-12.6,25-37.32.71-16-7.92-31.15-22.52-39.65,1.28-1.79,8.74-12.6,5-25.66-3.49-12.22-15.37-21.5-30-23.32a44.14,44.14,0,0,0-10-49c-14.58-14.19-37.91-18.05-57.56-9.33-2-3-16.65-24.58-45-28A65.3,65.3,0,0,0,278.57,98.45Z" transform="translate(-57.78 -75)"/><path class="cls-2-like" d="M168.32,192.61c-6.3,19.53,10.45,44.67,26.48,44.14,11.49-.38,21.56-13.89,23.54-26.48,2.61-16.62-8-37.08-23.54-38.25C182.94,171.11,171.82,181.75,168.32,192.61Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M126,294.5,115.82,191.91l-50.11-3c-.31,22.48.58,42,1.79,57.86A626.56,626.56,0,0,0,78.83,327.3c1.6,7.63,3.08,14,4.18,18.49l86.5-1.19L160,293.9Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M141.47,177c2.44,28.57,4.68,53.51,6.56,74,2.39,26,3.52,37.26,6,52.49,3.45,21.43,7.61,38.88,10.74,50.7l53.69,2.39c-6.6-30.2-12.55-62.87-17.3-97.82-3.88-28.59-6.57-55.9-8.35-81.71Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M188,171c.46,18.59,1.41,37.89,3,57.86a1079.66,1079.66,0,0,0,16.11,119.29l59.06-.6-11.33-38.77,43.55,44.14L324,306.43l-45.94-47.72,32.81-78.14L257.2,157.91l-15.51,57.26,1.19-40Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M384.27,152.54a346.53,346.53,0,0,0-84.71,16.7l17.9,169.39a98.73,98.73,0,0,0,89.48-26.84l-10.14-43.54L358,281.37l-.6-10.14L398,258.11l-13.12-45.33-34.6,6-1.19-6.56,42.36-8.95Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M449.29,140l-51.9-2.39A447.84,447.84,0,0,0,410.52,277.8l40-7.16A360.93,360.93,0,0,1,449.29,140Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M460,290.32c4.89,15.93-5.1,33.74-19.69,37.58-17.77,4.67-37.91-12.55-36.95-31.3.65-12.54,10.73-25.49,25.41-27.24S456.16,277.72,460,290.32Z" transform="translate(-57.78 -75)"/></svg>
        <span style="pointer-events: none;" id="likes-count-{{ $stories->id }}" class="text-dark text-xs">{{ $stories->likes_count }}</span>
      </button>
    </span>

    <span class="btn btn-sm badge mr-sm-4 mr-3 pl-0"  data-toggle="modal" data-target="#modalLogin">
      <button class="action-item active">
        <svg id="Layer_1" width="5px" style="pointer-events:none;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338.88 274.22">
          <path class="cls-1-love" d="M256.64,181.91c-3.43-2.57-43.37-31.51-90-15.3-40.75,14.15-65.89,55.49-63.42,92.89,2.79,42.22,40.13,69.85,51.31,78.12,9.57,7.08,14,9.17,31,19.22A787.89,787.89,0,0,1,266,411.51c27-44.64,56.5-70,79-85,35.76-23.87,63.34-28,81.06-59.93,3.09-5.57,18-32.41,9.07-63.3-10.61-36.72-46.79-51.11-54.64-54.23-39.57-15.74-75.47.19-84.13,4A118.88,118.88,0,0,0,256.64,181.91Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M151.62,216.89l-42.7,2.17.88,103.09,62.62-7.49,6.2-37.5-36.31,7.09Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M220.35,216.31c-26.35-3.09-50.89,20.59-54.95,46.91-4.14,26.85,12.76,58.25,40.86,62.19,26.2,3.67,49.6-18.28,55.25-41.82C268.45,254.74,249.62,219.74,220.35,216.31Z" transform="translate(-101.01 -140.24)"/><path class="cls-3-love" d="M212.75,256.65c-7.42-1.05-13.83,4.75-15.65,11-2.42,8.27,2.91,18.6,11.4,19.75,8.09,1.09,15.8-6.59,16.2-14.92C225,265.58,220.42,257.74,212.75,256.65Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M297.57,249.2l-14-30.2L245.2,240.95l50.89,91.84,57.29-93-15.21-9.71-19.11-12.2Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M342.43,224.12l68.73-.59-5.65,33.54-31-2.27-.55,4,26.17.59-2.74,19.81-24.46,1.66-.27,2,36.62-2L407.63,322l-67,2.84Z" transform="translate(-101.01 -140.24)"/>
        </svg>
        <span id="loves-count-{{ $stories->id }}" class="text-dark text-xs">{{ $stories->loves_count }}</span>
      </button>
    </span>

    <span class="btn btn-sm badge mr-sm-4 mr-3 pl-0"  data-toggle="modal" data-target="#modalLogin">
      <button class="action-item active pr-2 pl-0">
        <svg id="Layer_1" style="pointer-events:none;" width="5px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.28 405.78">
        <path class="cls-1-lol" d="M131.26,85.89a178.94,178.94,0,0,1,8.35,52.85c.11,19.71,0,31.82-8.35,38.94-13.77,11.73-39.82,1.32-50.07-2.78a98.88,98.88,0,0,1-33.38-22.25A121.2,121.2,0,0,1,78.4,186c8,13,15.15,24.68,11.13,36.16-3.91,11.16-16.2,16-25,19.47-17.76,7-34.54,5-44.51,2.78a173.65,173.65,0,0,1,41.73,13.91C75.07,264.79,81.79,268.15,84,275c4.52,14.31-14.2,31.53-22.25,38.94a103,103,0,0,1-38.94,22.25,369.08,369.08,0,0,1,41.73-5.56c29.64-2.25,44.63-3.2,52.85,5.56,7.23,7.7,6.63,18.89,5.56,38.94a172.12,172.12,0,0,1-8.35,44.51,101.89,101.89,0,0,1,27.82-25c11.77-7.16,23.52-14.31,36.16-11.13,12.38,3.12,18.93,14.46,25,25,11.44,19.81,14,40.22,13.91,55.63a203.25,203.25,0,0,1,11.13-38.94c9.29-23.38,15.45-38.87,27.82-41.73,11.8-2.72,23.83,7.32,41.73,22.25A175.3,175.3,0,0,1,320.41,428a209.69,209.69,0,0,1,8.35-36.16c6.87-21,11.6-23.94,13.91-25,7.23-3.44,15.07-.09,27.82,5.56,5.49,2.44,16.95,8,41.73,27.82,7.15,5.72,12.89,10.61,16.69,13.91a147.24,147.24,0,0,1-25-38.94,101.91,101.91,0,0,1-8.35-25c-1.9-10.06-.72-12.7,0-13.91,4.21-7,17.37-6.35,27.82-5.56a611,611,0,0,1,64,8.35,155.44,155.44,0,0,1-25-19.47c-7.11-6.81-13.18-14.83-25-30.6-16.61-22.09-17.15-25-16.69-27.82,1.33-8.17,10.36-11.69,36.16-25,15.45-8,27.91-14.85,36.16-19.47a206.76,206.76,0,0,1-47.29-11.13c-14.72-5.39-19.36-9.09-22.25-13.91-6.63-11.05-2-24.59,0-30.6,7.44-21.94,26.67-32.78,33.38-36.16-13.11,5.76-24.46,10.39-33.38,13.91C404.17,146.29,398,148,390,147.09c-3.65-.41-16.24-1.81-22.25-11.13-2.41-3.73-3.07-7.65-2.78-19.47a286.92,286.92,0,0,1,2.78-33.38,147.79,147.79,0,0,1-13.91,25c-7.51,10.86-12.61,18-22.25,22.25-4.26,1.86-10.13,4.43-16.69,2.78-14.21-3.56-19.69-23.86-22.25-33.38a81.36,81.36,0,0,1-2.78-22.25c-3.06,10.42-6.06,18.94-8.35,25-9.75,26-14.94,30.8-19.47,33.38-1.65.94-9.15,5.22-16.69,2.78-8.16-2.64-11.83-11.65-13.91-16.69-6.71-16.29-15-35.39-25-58.42A159.58,159.58,0,0,1,203.58,97c-3.11,16.16-5.36,13.94-8.35,30.6-1.55,8.66-1.63,13.13-5.56,16.69-5,4.54-13.32,4.95-19.47,2.78-8.31-2.92-11.77-10.22-19.47-25C146.51,113.95,139.94,101.51,131.26,85.89Z" transform="translate(-19.77 -58.6)"/>
        <path class="cls-2-lol" d="M106.22,211.07,45,225c7.27,23.18,15.56,47.35,25,72.32,12.52,33,25.68,63.59,38.94,91.8l91.8-36.16-19.47-47.29-38.94,16.69a356.62,356.62,0,0,1-36.16-111.27Z" transform="translate(-19.77 -58.6)"/>
        <path class="cls-2-lol" d="M223.05,169.35c-38,3.19-65.6,56.23-61.2,100.14,4.43,44.2,42.5,90.83,80.67,86.23,36.76-4.43,54.15-54,55.63-58.42,13.75-40.88-5.41-75.56-8.35-80.67C287.25,212.18,260.07,166.23,223.05,169.35Z" transform="translate(-19.77 -58.6)"/>
        <path class="cls-2-lol" d="M423.33,325.12c13.13,2.38,25.36-7.7,27.82-19.47,3.17-15.16-10.2-31.44-25-30.6-11.93.67-22.1,12.28-22.25,25C403.73,311.29,411.33,322.94,423.33,325.12Z" transform="translate(-19.77 -58.6)"/>
        <path class="cls-3-lol" d="M225.83,222.2c-6.48,1.22-8.94,23.62-5.56,41.73,3.23,17.3,13,37.26,19.47,36.16,6.66-1.13,9.9-24.81,5.56-44.51C241.77,239.51,232.07,221,225.83,222.2Z" transform="translate(-19.77 -58.6)"/>
        <path class="cls-2-lol" d="M295.38,161h61.2l2.78,119.61L398.3,275l8.35,50.07a305.62,305.62,0,0,1-100.14,8.35A696.67,696.67,0,0,1,295.38,161Z" transform="translate(-19.77 -58.6)"/>
        <path class="cls-2-lol" d="M415,152.65l61.2,16.69a225.92,225.92,0,0,0-27.82,116.83,55.42,55.42,0,0,0-41.73-2.78A233,233,0,0,1,415,152.65Z" transform="translate(-19.77 -58.6)"/></svg>
        <span id="lols-count-{{ $stories->id }}" class="text-dark text-xs">{{ $stories->lols_count }}</span>
      </button>
    </span>

    <span class="btn btn-sm mr-auto badge mr-sm-4 mr-3 pl-0"  data-toggle="modal" data-target="#modalLogin">
      <button class="action-item active pr-2 pl-0">
        <svg id="Layer_1" style="pointer-events:none;" width="5px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486 373.93">
          <path class="cls-1-wow" d="M259.59,66.34C161.09,71.09,26.66,132.66,20.24,231.09c-6,91.41,102.26,156.05,111.91,161.64,100,57.92,204.68,17.84,226.92,9.33C391.94,389.48,481.13,355.35,499,274.61c12.19-55.23-15.73-101.84-21.76-111.91C416.22,60.93,270.21,65.83,259.59,66.34Z" transform="translate(-18 -64.16)"/><path class="cls-1-wow" d="M334.2,349.22l121.23,83.93A354.78,354.78,0,0,1,439.89,315" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M85.91,160.24,30,154.36q4.13,29.13,8.83,58.85,9.55,60.36,20.6,117.71H97.68l11.77-38.25L115.34,325,153.59,328l41.2-167.73-55.91-8.83-1,19.78-2,39.07L124.17,172H97.68l-8.83,44.14Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M233,151.42c-36.61.09-64.84,48.55-67.68,88.28-3.09,43.13,22.24,96.6,58.85,100.05,37.77,3.56,75.71-47.22,76.51-94.17C301.47,202.15,270.6,151.32,233,151.42Z" transform="translate(-18 -64.16)"/><path class="cls-1-wow" d="M231.65,207.33c-9,0-18.33,22-17.35,41.2.8,15.86,8.9,35.32,17.35,35.31,8.7,0,17.39-20.6,17.35-38.25C249,228.12,240.37,207.33,231.65,207.33Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M333.1,160.24l-55.91-5.89,26.48,176.56h38.25l14.71-35.31L365.46,325l32.37,5.89,50-167.73L389,154.36l-5.89,61.8L374.29,172H344.87L339,219.1Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M492,157.3c-9.32-1.55-19.16-3.48-29.43-5.89-11.55-2.7-22.35-5.7-32.37-8.83l2.94,138.31,38.25,14.71A535.56,535.56,0,0,1,492,157.3Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M424.32,295.61c-6.3,19.53,10.45,44.67,26.48,44.14,11.49-.38,21.56-13.89,23.54-26.48,2.61-16.62-8-37.08-23.54-38.25C438.94,274.11,427.82,284.75,424.32,295.61Z" transform="translate(-18 -64.16)"/></svg>
          <span id="wows-count-{{ $stories->id }}" class="text-dark text-xs">{{ $stories->wows_count }}</span>
      </button>
    </span>
  </div>
  @else
  <span class="btn btn-sm rounded-circle badge mr-sm-4 mr-3 pl-0">
    @if(!in_array($stories->id,$likes))
    <button onclick="actOnChirp(event);" class="action-item active" data-chirp-id="{{ $stories->id }}" data-type="Like">
      <svg id="Layer_1" width="5px" style="pointer-events:none;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 418.54 343">
        <path class="cls-1-like" d="M278.57,98.45c-8.73-15.47-26.5-24.67-45-23.32-17.93,1.3-33.56,12.22-40,28-1-.6-13.57-7.93-27.53-2.33a27.58,27.58,0,0,0-17.52,23.32c-21.29-6.81-44.74,0-57.56,16.33-11.59,14.79-12.59,35-2.5,51.31-15.83,5.22-27.44,17.75-30,32.65-3.07,17.64,7,35.73,25,44.31-.7,1-9.9,14.93-2.5,30.32,7.81,16.26,26.64,18.57,27.53,18.66a43.36,43.36,0,0,0,7.51,46.65c12.59,14,33.42,19.6,52.56,14a47.9,47.9,0,0,0,35,32.65A51.62,51.62,0,0,0,256,392.33c8.42,16.05,26.08,26.11,45,25.66,18.09-.43,34.54-10.36,42.55-25.66a34.36,34.36,0,0,0,25,2.33,31.6,31.6,0,0,0,20-18.66c2.39.72,29.15,8.31,50.05-7C458,354.92,464,327.46,451.26,303.7c1.14-.58,23.93-12.6,25-37.32.71-16-7.92-31.15-22.52-39.65,1.28-1.79,8.74-12.6,5-25.66-3.49-12.22-15.37-21.5-30-23.32a44.14,44.14,0,0,0-10-49c-14.58-14.19-37.91-18.05-57.56-9.33-2-3-16.65-24.58-45-28A65.3,65.3,0,0,0,278.57,98.45Z" transform="translate(-57.78 -75)"/><path class="cls-2-like" d="M168.32,192.61c-6.3,19.53,10.45,44.67,26.48,44.14,11.49-.38,21.56-13.89,23.54-26.48,2.61-16.62-8-37.08-23.54-38.25C182.94,171.11,171.82,181.75,168.32,192.61Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M126,294.5,115.82,191.91l-50.11-3c-.31,22.48.58,42,1.79,57.86A626.56,626.56,0,0,0,78.83,327.3c1.6,7.63,3.08,14,4.18,18.49l86.5-1.19L160,293.9Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M141.47,177c2.44,28.57,4.68,53.51,6.56,74,2.39,26,3.52,37.26,6,52.49,3.45,21.43,7.61,38.88,10.74,50.7l53.69,2.39c-6.6-30.2-12.55-62.87-17.3-97.82-3.88-28.59-6.57-55.9-8.35-81.71Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M188,171c.46,18.59,1.41,37.89,3,57.86a1079.66,1079.66,0,0,0,16.11,119.29l59.06-.6-11.33-38.77,43.55,44.14L324,306.43l-45.94-47.72,32.81-78.14L257.2,157.91l-15.51,57.26,1.19-40Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M384.27,152.54a346.53,346.53,0,0,0-84.71,16.7l17.9,169.39a98.73,98.73,0,0,0,89.48-26.84l-10.14-43.54L358,281.37l-.6-10.14L398,258.11l-13.12-45.33-34.6,6-1.19-6.56,42.36-8.95Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M449.29,140l-51.9-2.39A447.84,447.84,0,0,0,410.52,277.8l40-7.16A360.93,360.93,0,0,1,449.29,140Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M460,290.32c4.89,15.93-5.1,33.74-19.69,37.58-17.77,4.67-37.91-12.55-36.95-31.3.65-12.54,10.73-25.49,25.41-27.24S456.16,277.72,460,290.32Z" transform="translate(-57.78 -75)"/></svg>
      <span style="pointer-events: none;" id="likes-count-bottom-{{ $stories->id }}" class="text-dark">{{ $stories->likes_count }}</span>
    </button>
    @else
    <button onclick="actOnChirp(event);" class="action-item action-like active" data-chirp-id="{{ $stories->id }}" data-type="Unlike">
      <svg id="Layer_1" width="5px" style="pointer-events:none;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 418.54 343">
        <path class="cls-1-like" d="M278.57,98.45c-8.73-15.47-26.5-24.67-45-23.32-17.93,1.3-33.56,12.22-40,28-1-.6-13.57-7.93-27.53-2.33a27.58,27.58,0,0,0-17.52,23.32c-21.29-6.81-44.74,0-57.56,16.33-11.59,14.79-12.59,35-2.5,51.31-15.83,5.22-27.44,17.75-30,32.65-3.07,17.64,7,35.73,25,44.31-.7,1-9.9,14.93-2.5,30.32,7.81,16.26,26.64,18.57,27.53,18.66a43.36,43.36,0,0,0,7.51,46.65c12.59,14,33.42,19.6,52.56,14a47.9,47.9,0,0,0,35,32.65A51.62,51.62,0,0,0,256,392.33c8.42,16.05,26.08,26.11,45,25.66,18.09-.43,34.54-10.36,42.55-25.66a34.36,34.36,0,0,0,25,2.33,31.6,31.6,0,0,0,20-18.66c2.39.72,29.15,8.31,50.05-7C458,354.92,464,327.46,451.26,303.7c1.14-.58,23.93-12.6,25-37.32.71-16-7.92-31.15-22.52-39.65,1.28-1.79,8.74-12.6,5-25.66-3.49-12.22-15.37-21.5-30-23.32a44.14,44.14,0,0,0-10-49c-14.58-14.19-37.91-18.05-57.56-9.33-2-3-16.65-24.58-45-28A65.3,65.3,0,0,0,278.57,98.45Z" transform="translate(-57.78 -75)"/><path class="cls-2-like" d="M168.32,192.61c-6.3,19.53,10.45,44.67,26.48,44.14,11.49-.38,21.56-13.89,23.54-26.48,2.61-16.62-8-37.08-23.54-38.25C182.94,171.11,171.82,181.75,168.32,192.61Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M126,294.5,115.82,191.91l-50.11-3c-.31,22.48.58,42,1.79,57.86A626.56,626.56,0,0,0,78.83,327.3c1.6,7.63,3.08,14,4.18,18.49l86.5-1.19L160,293.9Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M141.47,177c2.44,28.57,4.68,53.51,6.56,74,2.39,26,3.52,37.26,6,52.49,3.45,21.43,7.61,38.88,10.74,50.7l53.69,2.39c-6.6-30.2-12.55-62.87-17.3-97.82-3.88-28.59-6.57-55.9-8.35-81.71Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M188,171c.46,18.59,1.41,37.89,3,57.86a1079.66,1079.66,0,0,0,16.11,119.29l59.06-.6-11.33-38.77,43.55,44.14L324,306.43l-45.94-47.72,32.81-78.14L257.2,157.91l-15.51,57.26,1.19-40Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M384.27,152.54a346.53,346.53,0,0,0-84.71,16.7l17.9,169.39a98.73,98.73,0,0,0,89.48-26.84l-10.14-43.54L358,281.37l-.6-10.14L398,258.11l-13.12-45.33-34.6,6-1.19-6.56,42.36-8.95Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M449.29,140l-51.9-2.39A447.84,447.84,0,0,0,410.52,277.8l40-7.16A360.93,360.93,0,0,1,449.29,140Z" transform="translate(-57.78 -75)"/><path class="cls-3-like" d="M460,290.32c4.89,15.93-5.1,33.74-19.69,37.58-17.77,4.67-37.91-12.55-36.95-31.3.65-12.54,10.73-25.49,25.41-27.24S456.16,277.72,460,290.32Z" transform="translate(-57.78 -75)"/></svg>
      <span style="pointer-events: none;" id="likes-count-bottom-{{ $stories->id }}" class="text-dark">{{ $stories->likes_count }}</span>
    </button>
    @endif
  </span>

  <span class="btn btn-sm rounded-circle badge mr-sm-4 mr-3">
    @if(!in_array($stories->id,$loves))
    <button onclick="actOnChirp(event);" class="action-item active" data-chirp-id="{{ $stories->id }}" data-type="Love">
      <svg id="Layer_1" width="5px" style="pointer-events:none;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338.88 274.22">
        <path class="cls-1-love" d="M256.64,181.91c-3.43-2.57-43.37-31.51-90-15.3-40.75,14.15-65.89,55.49-63.42,92.89,2.79,42.22,40.13,69.85,51.31,78.12,9.57,7.08,14,9.17,31,19.22A787.89,787.89,0,0,1,266,411.51c27-44.64,56.5-70,79-85,35.76-23.87,63.34-28,81.06-59.93,3.09-5.57,18-32.41,9.07-63.3-10.61-36.72-46.79-51.11-54.64-54.23-39.57-15.74-75.47.19-84.13,4A118.88,118.88,0,0,0,256.64,181.91Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M151.62,216.89l-42.7,2.17.88,103.09,62.62-7.49,6.2-37.5-36.31,7.09Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M220.35,216.31c-26.35-3.09-50.89,20.59-54.95,46.91-4.14,26.85,12.76,58.25,40.86,62.19,26.2,3.67,49.6-18.28,55.25-41.82C268.45,254.74,249.62,219.74,220.35,216.31Z" transform="translate(-101.01 -140.24)"/><path class="cls-3-love" d="M212.75,256.65c-7.42-1.05-13.83,4.75-15.65,11-2.42,8.27,2.91,18.6,11.4,19.75,8.09,1.09,15.8-6.59,16.2-14.92C225,265.58,220.42,257.74,212.75,256.65Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M297.57,249.2l-14-30.2L245.2,240.95l50.89,91.84,57.29-93-15.21-9.71-19.11-12.2Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M342.43,224.12l68.73-.59-5.65,33.54-31-2.27-.55,4,26.17.59-2.74,19.81-24.46,1.66-.27,2,36.62-2L407.63,322l-67,2.84Z" transform="translate(-101.01 -140.24)"/>
      </svg>
      <span style="pointer-events: none;" id="loves-count-bottom-{{ $stories->id }}" class="text-dark">{{ $stories->loves_count }}</span>
    </button>
    @else
    <button onclick="actOnChirp(event);" class="action-item action-love" data-chirp-id="{{ $stories->id }}" data-type="Unlove">
      <svg id="Layer_1" width="5px" style="pointer-events:none;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338.88 274.22">
        <path class="cls-1-love" d="M256.64,181.91c-3.43-2.57-43.37-31.51-90-15.3-40.75,14.15-65.89,55.49-63.42,92.89,2.79,42.22,40.13,69.85,51.31,78.12,9.57,7.08,14,9.17,31,19.22A787.89,787.89,0,0,1,266,411.51c27-44.64,56.5-70,79-85,35.76-23.87,63.34-28,81.06-59.93,3.09-5.57,18-32.41,9.07-63.3-10.61-36.72-46.79-51.11-54.64-54.23-39.57-15.74-75.47.19-84.13,4A118.88,118.88,0,0,0,256.64,181.91Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M151.62,216.89l-42.7,2.17.88,103.09,62.62-7.49,6.2-37.5-36.31,7.09Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M220.35,216.31c-26.35-3.09-50.89,20.59-54.95,46.91-4.14,26.85,12.76,58.25,40.86,62.19,26.2,3.67,49.6-18.28,55.25-41.82C268.45,254.74,249.62,219.74,220.35,216.31Z" transform="translate(-101.01 -140.24)"/><path class="cls-3-love" d="M212.75,256.65c-7.42-1.05-13.83,4.75-15.65,11-2.42,8.27,2.91,18.6,11.4,19.75,8.09,1.09,15.8-6.59,16.2-14.92C225,265.58,220.42,257.74,212.75,256.65Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M297.57,249.2l-14-30.2L245.2,240.95l50.89,91.84,57.29-93-15.21-9.71-19.11-12.2Z" transform="translate(-101.01 -140.24)"/><path class="cls-2-love" d="M342.43,224.12l68.73-.59-5.65,33.54-31-2.27-.55,4,26.17.59-2.74,19.81-24.46,1.66-.27,2,36.62-2L407.63,322l-67,2.84Z" transform="translate(-101.01 -140.24)"/></svg>
      <span style="pointer-events: none;" id="loves-count-bottom-{{ $stories->id }}" class="text-dark">{{ $stories->loves_count }}</span>
    </button>
    @endif
  </span>

  <span class="btn btn-sm rounded-circle badge mr-sm-4 mr-3">
    @if(!in_array($stories->id,$lols))
    <button onclick="actOnChirp(event);" class="action-item active pr-2 pl-0" data-chirp-id="{{ $stories->id }}" data-type="Lol">
      <svg id="Layer_1" style="pointer-events:none;" width="5px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.28 405.78">
      <path class="cls-1-lol" d="M131.26,85.89a178.94,178.94,0,0,1,8.35,52.85c.11,19.71,0,31.82-8.35,38.94-13.77,11.73-39.82,1.32-50.07-2.78a98.88,98.88,0,0,1-33.38-22.25A121.2,121.2,0,0,1,78.4,186c8,13,15.15,24.68,11.13,36.16-3.91,11.16-16.2,16-25,19.47-17.76,7-34.54,5-44.51,2.78a173.65,173.65,0,0,1,41.73,13.91C75.07,264.79,81.79,268.15,84,275c4.52,14.31-14.2,31.53-22.25,38.94a103,103,0,0,1-38.94,22.25,369.08,369.08,0,0,1,41.73-5.56c29.64-2.25,44.63-3.2,52.85,5.56,7.23,7.7,6.63,18.89,5.56,38.94a172.12,172.12,0,0,1-8.35,44.51,101.89,101.89,0,0,1,27.82-25c11.77-7.16,23.52-14.31,36.16-11.13,12.38,3.12,18.93,14.46,25,25,11.44,19.81,14,40.22,13.91,55.63a203.25,203.25,0,0,1,11.13-38.94c9.29-23.38,15.45-38.87,27.82-41.73,11.8-2.72,23.83,7.32,41.73,22.25A175.3,175.3,0,0,1,320.41,428a209.69,209.69,0,0,1,8.35-36.16c6.87-21,11.6-23.94,13.91-25,7.23-3.44,15.07-.09,27.82,5.56,5.49,2.44,16.95,8,41.73,27.82,7.15,5.72,12.89,10.61,16.69,13.91a147.24,147.24,0,0,1-25-38.94,101.91,101.91,0,0,1-8.35-25c-1.9-10.06-.72-12.7,0-13.91,4.21-7,17.37-6.35,27.82-5.56a611,611,0,0,1,64,8.35,155.44,155.44,0,0,1-25-19.47c-7.11-6.81-13.18-14.83-25-30.6-16.61-22.09-17.15-25-16.69-27.82,1.33-8.17,10.36-11.69,36.16-25,15.45-8,27.91-14.85,36.16-19.47a206.76,206.76,0,0,1-47.29-11.13c-14.72-5.39-19.36-9.09-22.25-13.91-6.63-11.05-2-24.59,0-30.6,7.44-21.94,26.67-32.78,33.38-36.16-13.11,5.76-24.46,10.39-33.38,13.91C404.17,146.29,398,148,390,147.09c-3.65-.41-16.24-1.81-22.25-11.13-2.41-3.73-3.07-7.65-2.78-19.47a286.92,286.92,0,0,1,2.78-33.38,147.79,147.79,0,0,1-13.91,25c-7.51,10.86-12.61,18-22.25,22.25-4.26,1.86-10.13,4.43-16.69,2.78-14.21-3.56-19.69-23.86-22.25-33.38a81.36,81.36,0,0,1-2.78-22.25c-3.06,10.42-6.06,18.94-8.35,25-9.75,26-14.94,30.8-19.47,33.38-1.65.94-9.15,5.22-16.69,2.78-8.16-2.64-11.83-11.65-13.91-16.69-6.71-16.29-15-35.39-25-58.42A159.58,159.58,0,0,1,203.58,97c-3.11,16.16-5.36,13.94-8.35,30.6-1.55,8.66-1.63,13.13-5.56,16.69-5,4.54-13.32,4.95-19.47,2.78-8.31-2.92-11.77-10.22-19.47-25C146.51,113.95,139.94,101.51,131.26,85.89Z" transform="translate(-19.77 -58.6)"/>
      <path class="cls-2-lol" d="M106.22,211.07,45,225c7.27,23.18,15.56,47.35,25,72.32,12.52,33,25.68,63.59,38.94,91.8l91.8-36.16-19.47-47.29-38.94,16.69a356.62,356.62,0,0,1-36.16-111.27Z" transform="translate(-19.77 -58.6)"/>
      <path class="cls-2-lol" d="M223.05,169.35c-38,3.19-65.6,56.23-61.2,100.14,4.43,44.2,42.5,90.83,80.67,86.23,36.76-4.43,54.15-54,55.63-58.42,13.75-40.88-5.41-75.56-8.35-80.67C287.25,212.18,260.07,166.23,223.05,169.35Z" transform="translate(-19.77 -58.6)"/>
      <path class="cls-2-lol" d="M423.33,325.12c13.13,2.38,25.36-7.7,27.82-19.47,3.17-15.16-10.2-31.44-25-30.6-11.93.67-22.1,12.28-22.25,25C403.73,311.29,411.33,322.94,423.33,325.12Z" transform="translate(-19.77 -58.6)"/>
      <path class="cls-3-lol" d="M225.83,222.2c-6.48,1.22-8.94,23.62-5.56,41.73,3.23,17.3,13,37.26,19.47,36.16,6.66-1.13,9.9-24.81,5.56-44.51C241.77,239.51,232.07,221,225.83,222.2Z" transform="translate(-19.77 -58.6)"/>
      <path class="cls-2-lol" d="M295.38,161h61.2l2.78,119.61L398.3,275l8.35,50.07a305.62,305.62,0,0,1-100.14,8.35A696.67,696.67,0,0,1,295.38,161Z" transform="translate(-19.77 -58.6)"/>
      <path class="cls-2-lol" d="M415,152.65l61.2,16.69a225.92,225.92,0,0,0-27.82,116.83,55.42,55.42,0,0,0-41.73-2.78A233,233,0,0,1,415,152.65Z" transform="translate(-19.77 -58.6)"/></svg>
      <span style="pointer-events: none;" id="lols-count-bottom-{{ $stories->id }}" class="text-dark">{{ $stories->lols_count }}</span>
    </button>
    @else
    <button onclick="actOnChirp(event);" class="action-item action-lol pr-2 pl-0" data-chirp-id="{{ $stories->id }}" data-type="Unlol">
      <svg id="Layer_1" style="pointer-events:none;" width="5px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.28 405.78">
      <path class="cls-1-lol" d="M131.26,85.89a178.94,178.94,0,0,1,8.35,52.85c.11,19.71,0,31.82-8.35,38.94-13.77,11.73-39.82,1.32-50.07-2.78a98.88,98.88,0,0,1-33.38-22.25A121.2,121.2,0,0,1,78.4,186c8,13,15.15,24.68,11.13,36.16-3.91,11.16-16.2,16-25,19.47-17.76,7-34.54,5-44.51,2.78a173.65,173.65,0,0,1,41.73,13.91C75.07,264.79,81.79,268.15,84,275c4.52,14.31-14.2,31.53-22.25,38.94a103,103,0,0,1-38.94,22.25,369.08,369.08,0,0,1,41.73-5.56c29.64-2.25,44.63-3.2,52.85,5.56,7.23,7.7,6.63,18.89,5.56,38.94a172.12,172.12,0,0,1-8.35,44.51,101.89,101.89,0,0,1,27.82-25c11.77-7.16,23.52-14.31,36.16-11.13,12.38,3.12,18.93,14.46,25,25,11.44,19.81,14,40.22,13.91,55.63a203.25,203.25,0,0,1,11.13-38.94c9.29-23.38,15.45-38.87,27.82-41.73,11.8-2.72,23.83,7.32,41.73,22.25A175.3,175.3,0,0,1,320.41,428a209.69,209.69,0,0,1,8.35-36.16c6.87-21,11.6-23.94,13.91-25,7.23-3.44,15.07-.09,27.82,5.56,5.49,2.44,16.95,8,41.73,27.82,7.15,5.72,12.89,10.61,16.69,13.91a147.24,147.24,0,0,1-25-38.94,101.91,101.91,0,0,1-8.35-25c-1.9-10.06-.72-12.7,0-13.91,4.21-7,17.37-6.35,27.82-5.56a611,611,0,0,1,64,8.35,155.44,155.44,0,0,1-25-19.47c-7.11-6.81-13.18-14.83-25-30.6-16.61-22.09-17.15-25-16.69-27.82,1.33-8.17,10.36-11.69,36.16-25,15.45-8,27.91-14.85,36.16-19.47a206.76,206.76,0,0,1-47.29-11.13c-14.72-5.39-19.36-9.09-22.25-13.91-6.63-11.05-2-24.59,0-30.6,7.44-21.94,26.67-32.78,33.38-36.16-13.11,5.76-24.46,10.39-33.38,13.91C404.17,146.29,398,148,390,147.09c-3.65-.41-16.24-1.81-22.25-11.13-2.41-3.73-3.07-7.65-2.78-19.47a286.92,286.92,0,0,1,2.78-33.38,147.79,147.79,0,0,1-13.91,25c-7.51,10.86-12.61,18-22.25,22.25-4.26,1.86-10.13,4.43-16.69,2.78-14.21-3.56-19.69-23.86-22.25-33.38a81.36,81.36,0,0,1-2.78-22.25c-3.06,10.42-6.06,18.94-8.35,25-9.75,26-14.94,30.8-19.47,33.38-1.65.94-9.15,5.22-16.69,2.78-8.16-2.64-11.83-11.65-13.91-16.69-6.71-16.29-15-35.39-25-58.42A159.58,159.58,0,0,1,203.58,97c-3.11,16.16-5.36,13.94-8.35,30.6-1.55,8.66-1.63,13.13-5.56,16.69-5,4.54-13.32,4.95-19.47,2.78-8.31-2.92-11.77-10.22-19.47-25C146.51,113.95,139.94,101.51,131.26,85.89Z" transform="translate(-19.77 -58.6)"/>
      <path class="cls-2-lol" d="M106.22,211.07,45,225c7.27,23.18,15.56,47.35,25,72.32,12.52,33,25.68,63.59,38.94,91.8l91.8-36.16-19.47-47.29-38.94,16.69a356.62,356.62,0,0,1-36.16-111.27Z" transform="translate(-19.77 -58.6)"/>
      <path class="cls-2-lol" d="M223.05,169.35c-38,3.19-65.6,56.23-61.2,100.14,4.43,44.2,42.5,90.83,80.67,86.23,36.76-4.43,54.15-54,55.63-58.42,13.75-40.88-5.41-75.56-8.35-80.67C287.25,212.18,260.07,166.23,223.05,169.35Z" transform="translate(-19.77 -58.6)"/>
      <path class="cls-2-lol" d="M423.33,325.12c13.13,2.38,25.36-7.7,27.82-19.47,3.17-15.16-10.2-31.44-25-30.6-11.93.67-22.1,12.28-22.25,25C403.73,311.29,411.33,322.94,423.33,325.12Z" transform="translate(-19.77 -58.6)"/>
      <path class="cls-3-lol" d="M225.83,222.2c-6.48,1.22-8.94,23.62-5.56,41.73,3.23,17.3,13,37.26,19.47,36.16,6.66-1.13,9.9-24.81,5.56-44.51C241.77,239.51,232.07,221,225.83,222.2Z" transform="translate(-19.77 -58.6)"/>
      <path class="cls-2-lol" d="M295.38,161h61.2l2.78,119.61L398.3,275l8.35,50.07a305.62,305.62,0,0,1-100.14,8.35A696.67,696.67,0,0,1,295.38,161Z" transform="translate(-19.77 -58.6)"/>
      <path class="cls-2-lol" d="M415,152.65l61.2,16.69a225.92,225.92,0,0,0-27.82,116.83,55.42,55.42,0,0,0-41.73-2.78A233,233,0,0,1,415,152.65Z" transform="translate(-19.77 -58.6)"/></svg>
      <span style="pointer-events: none;" id="lols-count-bottom-{{ $stories->id }}" class="text-dark">{{ $stories->lols_count }}</span>
    </button>
    @endif
  </span>

  <span class="btn btn-sm rounded-circle badge mr-sm-4 mr-3">
    @if(!in_array($stories->id,$wows))
    <button onclick="actOnChirp(event);" class="action-item pr-2 pl-0" data-chirp-id="{{ $stories->id }}" data-type="Wow">
      <svg id="Layer_1" style="pointer-events:none;" width="5px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486 373.93">
        <path class="cls-1-wow" d="M259.59,66.34C161.09,71.09,26.66,132.66,20.24,231.09c-6,91.41,102.26,156.05,111.91,161.64,100,57.92,204.68,17.84,226.92,9.33C391.94,389.48,481.13,355.35,499,274.61c12.19-55.23-15.73-101.84-21.76-111.91C416.22,60.93,270.21,65.83,259.59,66.34Z" transform="translate(-18 -64.16)"/><path class="cls-1-wow" d="M334.2,349.22l121.23,83.93A354.78,354.78,0,0,1,439.89,315" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M85.91,160.24,30,154.36q4.13,29.13,8.83,58.85,9.55,60.36,20.6,117.71H97.68l11.77-38.25L115.34,325,153.59,328l41.2-167.73-55.91-8.83-1,19.78-2,39.07L124.17,172H97.68l-8.83,44.14Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M233,151.42c-36.61.09-64.84,48.55-67.68,88.28-3.09,43.13,22.24,96.6,58.85,100.05,37.77,3.56,75.71-47.22,76.51-94.17C301.47,202.15,270.6,151.32,233,151.42Z" transform="translate(-18 -64.16)"/><path class="cls-1-wow" d="M231.65,207.33c-9,0-18.33,22-17.35,41.2.8,15.86,8.9,35.32,17.35,35.31,8.7,0,17.39-20.6,17.35-38.25C249,228.12,240.37,207.33,231.65,207.33Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M333.1,160.24l-55.91-5.89,26.48,176.56h38.25l14.71-35.31L365.46,325l32.37,5.89,50-167.73L389,154.36l-5.89,61.8L374.29,172H344.87L339,219.1Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M492,157.3c-9.32-1.55-19.16-3.48-29.43-5.89-11.55-2.7-22.35-5.7-32.37-8.83l2.94,138.31,38.25,14.71A535.56,535.56,0,0,1,492,157.3Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M424.32,295.61c-6.3,19.53,10.45,44.67,26.48,44.14,11.49-.38,21.56-13.89,23.54-26.48,2.61-16.62-8-37.08-23.54-38.25C438.94,274.11,427.82,284.75,424.32,295.61Z" transform="translate(-18 -64.16)"/></svg>
        <span style="pointer-events: none;" id="wows-count-bottom-{{ $stories->id }}" class="text-dark">{{ $stories->wows_count }}</span>
    </button>
    @else
    <button onclick="actOnChirp(event);" class="action-item action-wow pr-2 pl-0" data-chirp-id="{{ $stories->id }}" data-type="Unwow">
      <svg id="Layer_1" style="pointer-events:none;" width="5px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486 373.93">
        <path class="cls-1-wow" d="M259.59,66.34C161.09,71.09,26.66,132.66,20.24,231.09c-6,91.41,102.26,156.05,111.91,161.64,100,57.92,204.68,17.84,226.92,9.33C391.94,389.48,481.13,355.35,499,274.61c12.19-55.23-15.73-101.84-21.76-111.91C416.22,60.93,270.21,65.83,259.59,66.34Z" transform="translate(-18 -64.16)"/><path class="cls-1-wow" d="M334.2,349.22l121.23,83.93A354.78,354.78,0,0,1,439.89,315" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M85.91,160.24,30,154.36q4.13,29.13,8.83,58.85,9.55,60.36,20.6,117.71H97.68l11.77-38.25L115.34,325,153.59,328l41.2-167.73-55.91-8.83-1,19.78-2,39.07L124.17,172H97.68l-8.83,44.14Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M233,151.42c-36.61.09-64.84,48.55-67.68,88.28-3.09,43.13,22.24,96.6,58.85,100.05,37.77,3.56,75.71-47.22,76.51-94.17C301.47,202.15,270.6,151.32,233,151.42Z" transform="translate(-18 -64.16)"/><path class="cls-1-wow" d="M231.65,207.33c-9,0-18.33,22-17.35,41.2.8,15.86,8.9,35.32,17.35,35.31,8.7,0,17.39-20.6,17.35-38.25C249,228.12,240.37,207.33,231.65,207.33Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M333.1,160.24l-55.91-5.89,26.48,176.56h38.25l14.71-35.31L365.46,325l32.37,5.89,50-167.73L389,154.36l-5.89,61.8L374.29,172H344.87L339,219.1Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M492,157.3c-9.32-1.55-19.16-3.48-29.43-5.89-11.55-2.7-22.35-5.7-32.37-8.83l2.94,138.31,38.25,14.71A535.56,535.56,0,0,1,492,157.3Z" transform="translate(-18 -64.16)"/><path class="cls-2-wow" d="M424.32,295.61c-6.3,19.53,10.45,44.67,26.48,44.14,11.49-.38,21.56-13.89,23.54-26.48,2.61-16.62-8-37.08-23.54-38.25C438.94,274.11,427.82,284.75,424.32,295.61Z" transform="translate(-18 -64.16)"/></svg>
        <span style="pointer-events: none;" id="wows-count-bottom-{{ $stories->id }}" class="text-dark">{{ $stories->wows_count }}</span>
    </button>
    @endif
  </span>
  @endguest
</div>

@endsection

@section('script')
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="{{ asset('js/select2.min.js') }}" defer></script>
<script src="{{ asset('js/fancybox.js') }}"></script>
<script src="{{ asset('js/quill.min.js') }}"></script>


<script>
var updateChirpStats = {
    Like: function (chirpId) {
        document.querySelector('#likes-count-' + chirpId).textContent++;
        if(document.querySelector('#likes-count-bottom-' + chirpId)){
          document.querySelector('#likes-count-bottom-' + chirpId).textContent++;
        }

    },

    Unlike: function(chirpId) {
        document.querySelector('#likes-count-' + chirpId).textContent--;
        if(document.querySelector('#likes-count-bottom-' + chirpId)){
          document.querySelector('#likes-count-bottom-' + chirpId).textContent--;
        }
    },

    Love: function(chirpId) {
        document.querySelector('#loves-count-' + chirpId).textContent++;
        if(document.querySelector('#loves-count-bottom-' + chirpId)){
          document.querySelector('#loves-count-bottom-' + chirpId).textContent++;
        }

    },

    Unlove: function(chirpId) {
        document.querySelector('#loves-count-' + chirpId).textContent--;
        if(document.querySelector('#loves-count-bottom-' + chirpId)){
          document.querySelector('#loves-count-bottom-' + chirpId).textContent--;
        }
    },

    Lol: function(chirpId) {
        document.querySelector('#lols-count-' + chirpId).textContent++;
        if(document.querySelector('#lols-count-bottom-' + chirpId)){
          document.querySelector('#lols-count-bottom-' + chirpId).textContent++;
        }
    },

    Unlol: function(chirpId) {
        document.querySelector('#lols-count-' + chirpId).textContent--;
        if(document.querySelector('#lols-count-bottom-' + chirpId)){
          document.querySelector('#lols-count-bottom-' + chirpId).textContent--;
        }

    },

    Wow: function(chirpId) {
        document.querySelector('#wows-count-' + chirpId).textContent++;
        if(document.querySelector('#wows-count-bottom-' + chirpId)){
          document.querySelector('#wows-count-bottom-' + chirpId).textContent++;
        }

    },

    Unwow: function(chirpId) {
        document.querySelector('#wows-count-' + chirpId).textContent--;
        if(document.querySelector('#wows-count-bottom-' + chirpId)){
          document.querySelector('#wows-count-bottom-' + chirpId).textContent--;
        }

    }
};


var toggleButtonText = {
    Like: function(button) {
        button.classList.add('action-like');
        button.classList.remove('text-muted');
        button.setAttribute("data-type", "Unlike");
    },

    Unlike: function(button) {
        button.classList.add('text-muted');
        button.classList.remove('action-like');
        button.setAttribute("data-type", "Like");
    },

    Love: function(button) {
        button.classList.add('action-love');
        button.classList.remove('text-muted');
        button.setAttribute("data-type", "Unlove");
    },

    Unlove: function(button) {
        button.classList.remove('action-love');
        button.classList.add('text-muted');
        button.setAttribute("data-type", "Love");
    },

    Lol: function(button) {
        button.classList.add('action-lol');
        button.classList.remove('text-muted');
        button.setAttribute("data-type", "Unlol");
    },

    Unlol: function(button) {
        button.classList.remove('action-lol');
        button.classList.add('text-muted');
        button.setAttribute("data-type", "Lol");
    },

    Wow: function(button) {
        button.classList.add('action-wow');
        button.classList.remove('text-muted');
        button.setAttribute("data-type", "Unwow");
    },

    Unwow: function(button) {
        button.classList.remove('action-wow');
        button.classList.add('text-muted');
        button.setAttribute("data-type", "Wow");
    }


};

var actOnChirp = function (event) {
    var chirpId = event.target.dataset.chirpId;
    var action = event.target.getAttribute('data-type');
    toggleButtonText[action](event.target);
    updateChirpStats[action](chirpId);
    axios.post('/stories/' + chirpId + '/act',
        { action: action });

        // $.ajax({
        //     type:"post",
        //     url: '/stories/' + chirpId + '/act',
        //     headers: {
        //       'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        //     }
        // });
};

  $(document).ready(function() {
      $('.topic').select2({
        placeholder: "Choose topic",
      });

      var editor = new Quill('#editor', {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline','strike'],
            ['code-block'],
            ['link'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }]
          ]
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'  // or 'bubble'
      });

      document.getElementById("quill_html").value = editor.root.innerHTML;

      editor.on('text-change', function() {
        document.getElementById("quill_html").value = editor.root.innerHTML;
      });
  });
</script>
@endsection
