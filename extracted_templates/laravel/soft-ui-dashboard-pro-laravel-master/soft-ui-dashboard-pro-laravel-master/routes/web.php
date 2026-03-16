<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChangePasswordController;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\TagsController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

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

Route::group(['middleware' => 'auth'], function () {
    Route::get('/', function () {
        return redirect('dashboard-default');
    });
    Route::view('/analytics', 'applications/analytics');
    Route::view('/calendar', 'applications/calendar');
    Route::view('/datatable', 'applications/datatables');
    Route::view('/kanban', 'applications/kanban');
    Route::view('/wizard', 'applications/wizard');
    
    Route::view('/authentication-error404', 'authentication/error/404');
    Route::view('/authentication-error500', 'authentication/error/500');
    
    Route::view('/authentication-lock-basic', 'authentication/lock/basic');
    Route::view('/authentication-lock-cover', 'authentication/lock/cover');
    Route::view('/authentication-lock-illustration', 'authentication/lock/illustration');
    
    Route::view('/authentication-reset-basic', 'authentication/reset/basic');
    Route::view('/authentication-reset-cover', 'authentication/reset/cover');
    Route::view('/authentication-reset-illustration', 'authentication/reset/illustration');
    
    Route::view('/authentication-signin-basic', 'authentication/signin/basic');
    Route::view('/authentication-signin-cover', 'authentication/signin/cover');
    Route::view('/authentication-signin-illustration', 'authentication/signin/illustration');
    
    Route::view('/authentication-signup-basic', 'authentication/signup/basic');
    Route::view('/authentication-signup-cover', 'authentication/signup/cover');
    Route::view('/authentication-signup-illustration', 'authentication/signup/illustration');
    
    Route::view('/authentication-verification-basic', 'authentication/verification/basic');
    Route::view('/authentication-verification-cover', 'authentication/verification/cover');
    Route::view('/authentication-verification-illustration', 'authentication/verification/illustration');
    
    Route::view('/dashboard-default', 'dashboards/default');
    Route::view('/dashboard-automative', 'dashboards/automotive');
    Route::view('/dashboard-crm', 'dashboards/crm');
    Route::view('/dashboard-smart-home', 'dashboards/smart-home');
    
    Route::view('/dashboard-virtual-default', 'dashboards/vr/vr-default');
    Route::view('/dashboard-virtual-info', 'dashboards/vr/vr-info');
    
    Route::view('/ecommerce-overview', 'ecommerce/overview');
    Route::view('/ecommerce-referral', 'ecommerce/referral');
    
    Route::view('/ecommerce-products-edit-product', 'ecommerce/products/edit-product');
    Route::view('/ecommerce-products-new-product', 'ecommerce/products/new-product');
    Route::view('/ecommerce-products-page', 'ecommerce/products/product-page');
    Route::view('/ecommerce-products-list', 'ecommerce/products/products-list');
    
    Route::view('/ecommerce-orders-details', 'ecommerce/orders/details');
    Route::view('/ecommerce-orders-list', 'ecommerce/orders/list');
    
    Route::view('/pages-profile-overview', 'pages/profile/overview');
    Route::view('/pages-profile-projects', 'pages/profile/projects');
    Route::view('/pages-profile-teams', 'pages/profile/teams');
    
    Route::view('/pages-users-reports', 'pages/users/reports');
    Route::view('/pages-users-new', 'pages/users/new-user');
    
    Route::view('/pages-account-settings', 'pages/account/settings');
    Route::view('/pages-account-billing', 'pages/account/billing');
    Route::view('/pages-account-invoice', 'pages/account/invoice');
    Route::view('/pages-account-security', 'pages/account/security');
    
    Route::view('/pages-projects-general', 'pages/projects/general');
    Route::view('/pages-projects-new-project', 'pages/projects/new-project');
    Route::view('/pages-projects-timeline', 'pages/projects/timeline');
    
    Route::view('/pages-charts', 'pages/charts');
    Route::view('/pages-notifications', 'pages/notifications');
    Route::view('/pages-pricing', 'pages/pricing-page');
    Route::view('/pages-rtl', 'pages/rtl-page');
    Route::view('/pages-sweet-alerts', 'pages/sweet-alerts');
    Route::view('/pages-widgets', 'pages/widgets');

    Route::post('/laravel-new-role', [RolesController::class, 'store']);
    Route::get('/laravel-new-role', [RolesController::class, 'createNew']);
    Route::post('/laravel-edit-role/{id}', [RolesController::class, 'edit']);
    Route::get('/laravel-edit-roles/{id}', [RolesController::class, 'createEdit']);
    Route::get('/laravel-roles-management', [RolesController::class, 'create']);
    Route::get('/laravel-delete-role/{id}', [RolesController::class, 'destroy']);

    Route::get('/laravel-new-tag', [TagsController::class, 'createNew']);
    Route::post('/laravel-new-tags', [TagsController::class, 'store']);
    Route::get('/laravel-edit-tags/{id}', [TagsController::class, 'createEdit']);
    Route::post('/laravel-edit-tag/{id}', [TagsController::class, 'edit']);
    Route::get('/laravel-tags-management', [TagsController::class, 'create']);
    Route::get('/laravel-delete-tag/{id}', [TagsController::class, 'destroy']);

    Route::get('/laravel-new-category', [CategoryController::class, 'createNew']);
    Route::post('/laravel-new-category', [CategoryController::class, 'store']);
    Route::get('/laravel-edit-categories/{id}', [CategoryController::class, 'createEdit']);
    Route::post('/laravel-edit-category/{id}', [CategoryController::class, 'edit']);
    Route::get('/laravel-category-management', [CategoryController::class, 'create']);
    Route::get('/laravel-delete-category/{id}', [CategoryController::class, 'destroy']);
    
    Route::get('/laravel-user-profile', [UserProfileController::class, 'create']);
    Route::post('/laravel-save-user-profile', [UserProfileController::class, 'store']);

    Route::get('/laravel-new-user', [UsersController::class, 'createOne'])->name('users.create.step.one');
    Route::post('/validate-step-one', [UsersController::class, 'validateOne'])->name('users.validate.step.one');
    Route::get('/laravel-create-step-two', [UsersController::class, 'createTwo'])->name('users.create.step.two');
    Route::post('/validate-step-two', [UsersController::class, 'validateTwo'])->name('users.validate.step.two');
    Route::get('/laravel-create-step-three', [UsersController::class, 'createThree'])->name('users.create.step.three');
    Route::post('/validate-step-three', [UsersController::class, 'validateThree'])->name('users.validate.step.three');
    Route::get('/laravel-create-step-four', [UsersController::class, 'createFour'])->name('users.create.step.four');

    
    Route::get('/laravel-edit-users/{id}', [UsersController::class, 'createEditOne'])->name('edit.create.step.one');
    Route::post('/edit-step-one/{id}', [UsersController::class, 'validateEditOne'])->name('edit.validate.step.one');
    Route::get('/edit-create-step-two/{id}', [UsersController::class, 'createEditTwo'])->name('edit.create.step.two');
    Route::post('/edit-step-two/{id}', [UsersController::class, 'validateEditTwo'])->name('edit.validate.step.two');
    Route::get('/edit-create-step-three/{id}', [UsersController::class, 'createEditThree'])->name('edit.create.step.three');
    Route::post('/edit-step-three/{id}', [UsersController::class, 'validateEditThree'])->name('edit.validate.step.three');
    Route::get('/edit-create-step-four/{id}', [UsersController::class, 'createEditFour'])->name('edit.create.step.four');

    Route::post('/laravel-new-user', [UsersController::class, 'store']);
    Route::post('/laravel-edit-user/{id}', [UsersController::class, 'edit']);
    Route::get('/laravel-users-management', [UsersController::class, 'create']);
    Route::get('/laravel-delete-user/{id}', [UsersController::class, 'destroy']);

    Route::get('/laravel-new-item', [ItemsController::class, 'createNew']);
    Route::post('/laravel-new-item', [ItemsController::class, 'store']);
    Route::get('/laravel-edit-items/{id}', [ItemsController::class, 'createEdit']);
    Route::post('/laravel-edit-item/{id}', [ItemsController::class, 'edit']);
    Route::get('/laravel-items-management', [ItemsController::class, 'create']);
    Route::get('/laravel-delete-item/{id}', [ItemsController::class, 'destroy']);

    Route::get('/logout', [SessionController::class, 'destroy']);
    Route::view('/login', 'dashboards/default')->name('sign-up');
});

Route::group(['middleware' => 'guest'], function () {
    Route::get('/register', [RegisterController::class, 'create']);
    Route::post('/register', [RegisterController::class, 'store']);
    Route::get('/login', [SessionController::class, 'create'])->name('login');
    Route::post('/session', [SessionController::class, 'store']);
    Route::get('/login/forgot-password', [ChangePasswordController::class, 'create']);
    Route::post('/forgot-password', [ChangePasswordController::class, 'sendEmail']);
    Route::get('/reset-password/{token}', [ChangePasswordController::class, 'resetPass'])->name('password.reset');
    Route::post('/reset-password', [ChangePasswordController::class, 'changePassword'])->name('password.update');
    Route::get('/', function () {
        return redirect('/login');
    });
});
