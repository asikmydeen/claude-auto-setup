<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
	return redirect('login');
});

Auth::routes();

Route::get('home', 'HomeController@index')->name('home');

Route::group(['middleware' => 'guest'], function() {
	Route::get('pricing', 'PageController@pricing')->name('page.pricing');
	Route::get('lock', 'PageController@lock')->name('page.lock');
});

Route::group(['middleware' => 'auth'], function () {
	Route::resource('category', 'CategoryController', ['except' => ['show']]);
	Route::resource('tag', 'TagController', ['except' => ['show']]);
	Route::resource('item', 'ItemController', ['except' => ['show']]);
	Route::resource('role', 'RoleController', ['except' => ['show', 'destroy']]);
	Route::resource('user', 'UserController', ['except' => ['show']]);

	Route::get('profile', ['as' => 'profile.edit', 'uses' => 'ProfileController@edit']);
	Route::put('profile', ['as' => 'profile.update', 'uses' => 'ProfileController@update']);
	Route::put('profile/password', ['as' => 'profile.password', 'uses' => 'ProfileController@password']);
	
	
	Route::get('maps/{page}', ['as' => 'page.maps', 'uses' => 'PageController@maps']);
	Route::get('components/{page}', ['as' => 'page.components', 'uses' => 'PageController@components']);
	Route::get('forms/{page}', ['as' => 'page.forms', 'uses' => 'PageController@forms']);
	Route::get('pages/{page}', ['as' => 'page.pages', 'uses' => 'PageController@pages']);
	Route::get('tables/{page}', ['as' => 'page.tables', 'uses' => 'PageController@tables']);
	Route::get('{page}', ['as' => 'page.index', 'uses' => 'PageController@index']);
});
