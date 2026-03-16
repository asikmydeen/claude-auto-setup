<?php

use App\Http\Livewire\Applications\Analytics;
use App\Http\Livewire\Applications\Calendar;
use App\Http\Livewire\Applications\Datatables;
use App\Http\Livewire\Auth\Login;

use App\Http\Livewire\Pages\Charts;
use App\Http\Livewire\Auth\Register;
use App\Http\Livewire\Pages\RtlPage;
use App\Http\Livewire\Pages\Widgets;

use App\Http\Livewire\Dashboards\Crm;

use App\Http\Livewire\Pages\Messages;
use Illuminate\Support\Facades\Route;
use App\Http\Livewire\Dashboards\Index;
use App\Http\Livewire\Pages\PricingPage;

use App\Http\Livewire\Pages\SweetAlerts;
use App\Http\Livewire\Auth\ResetPassword;

use App\Http\Livewire\Applications\Kanban;
use App\Http\Livewire\Applications\Wizard;
use App\Http\Livewire\Auth\ForgotPassword;
use App\Http\Livewire\Pages\Notifications;

use App\Http\Livewire\Pages\Users\NewUser;
use App\Http\Livewire\Pages\Users\Reports;
use App\Http\Livewire\Dashboards\SmartHome;
use App\Http\Livewire\Dashboards\Vr\VrInfo;
use App\Http\Livewire\Dashboards\Automotive;
use App\Http\Livewire\Pages\Account\Billing;
use App\Http\Livewire\Pages\Account\Invoice;
use App\Http\Livewire\Pages\Account\Security;
use App\Http\Livewire\Pages\Account\Settings;
use App\Http\Livewire\Pages\Profile\Projects;
use App\Http\Livewire\Pages\Projects\General;
use App\Http\Livewire\Dashboards\Vr\VrDefault;
use App\Http\Livewire\Pages\Projects\Timeline;
use App\Http\Livewire\Pages\Projects\NewProject;
use App\Http\Livewire\LaravelExamples\Tag\Edit as TagEdit;
use App\Http\Livewire\Pages\Profile\Teams as ProfileTeams;
use App\Http\Livewire\LaravelExamples\Tag\Index as TagIndex;
use App\Http\Livewire\LaravelExamples\Items\Edit as ItemsEdit;
use App\Http\Livewire\LaravelExamples\Roles\Edit as RolesEdit;
use App\Http\Livewire\LaravelExamples\Tag\Create as TagCreate;
use App\Http\Livewire\LaravelExamples\Items\Index as ItemsIndex;
use App\Http\Livewire\LaravelExamples\Roles\Index as RolesIndex;
use App\Http\Livewire\Pages\Profile\Overview as ProfileOverview;
use App\Http\Livewire\Ecommerce\Orders\Details;
use App\Http\Livewire\Ecommerce\Orders\OrderList;
use App\Http\Livewire\Ecommerce\Overview;
use App\Http\Livewire\Ecommerce\Products\EditProduct;
use App\Http\Livewire\Ecommerce\Products\NewProduct;
use App\Http\Livewire\Ecommerce\Products\ProductPage;
use App\Http\Livewire\Ecommerce\Products\ProductsList;
use App\Http\Livewire\Ecommerce\Referral;
use App\Http\Livewire\LaravelExamples\Items\Create as ItemsCreate;
use App\Http\Livewire\LaravelExamples\Profile\Edit as ProfileEdit;
use App\Http\Livewire\LaravelExamples\Roles\Create as RolesCreate;
use App\Http\Livewire\LaravelExamples\Category\Edit as CategoryEdit;
use App\Http\Livewire\LaravelExamples\Category\Index as CategoryIndex;
use App\Http\Livewire\LaravelExamples\Category\Create as CategoryCreate;
use App\Http\Livewire\LaravelExamples\UsersManagement\Edit as UserManagementEdit;
use App\Http\Livewire\LaravelExamples\UsersManagement\Index as UserManagementIndex;
use App\Http\Livewire\LaravelExamples\UsersManagement\Create as UserManagementCreate;

use App\Http\Livewire\Authentication\Error\Error404;
use App\Http\Livewire\Authentication\Error\Error500;

use App\Http\Livewire\Authentication\Lock\Basic as LockBasic;
use App\Http\Livewire\Authentication\Lock\Cover as LockCover;
use App\Http\Livewire\Authentication\Lock\Illustration as LockIllustration;

use App\Http\Livewire\Authentication\Reset\Basic as ResetBasic;
use App\Http\Livewire\Authentication\Reset\Cover as ResetCover;
use App\Http\Livewire\Authentication\Reset\Illustration as ResetIllustration;

use App\Http\Livewire\Authentication\SignIn\Basic as SignInBasic;
use App\Http\Livewire\Authentication\SignIn\Cover as SignInCover;
use App\Http\Livewire\Authentication\SignIn\Illustration as SignInIllustration;

use App\Http\Livewire\Authentication\SignUp\Basic as SignUpBasic;
use App\Http\Livewire\Authentication\SignUp\Cover as SignUpCover;
use App\Http\Livewire\Authentication\SignUp\Illustration as SignUpIllustration;

use App\Http\Livewire\Authentication\Verification\Basic as VerificationBasic;
use App\Http\Livewire\Authentication\Verification\Cover as VerificationCover;
use App\Http\Livewire\Authentication\Verification\Illustration as VerificationIllustration;

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

Route::middleware('guest')->group(function () {
    Route::get('sign-up', Register::class)->name('register');
    Route::get('sign-in', Login::class)->name('login');
    Route::get('forgot-password', ForgotPassword::class)->name('forgot-password');
    Route::get('reset-password/{id}', ResetPassword::class)->name('reset-password')->middleware('signed');
});

Route::middleware('auth')->group(function () {

    //Laravel Examples

    Route::get('laravel-examples/user-profile', ProfileEdit::class)->name('user-profile');

    Route::get('laravel-examples/user-management', UserManagementIndex::class)->name('user-management');
    Route::get('laravel-examples/user-management/{id}', UserManagementEdit::class)->name('edit-user');
    Route::get('laravel-examples/new-user-management', UserManagementCreate::class)->name('add-user');

    Route::get('laravel-examples/category', CategoryIndex::class)->name('category-management');
    Route::get('laravel-examples/category/{id}', CategoryEdit::class)->name('edit-category');
    Route::get('laravel-examples/new-category', CategoryCreate::class)->name('add-category');
    
    Route::get('laravel-examples/role-management', RolesIndex::class)->name('role-management');
    Route::get('laravel-examples/role-management/{id}', RolesEdit::class)->name('edit-role');
    Route::get('laravel-examples/new-role-management', RolesCreate::class)->name('add-role');

    Route::get('laravel-examples/tag', TagIndex::class)->name('tag-management');
    Route::get('laravel-examples/tag/{id}', TagEdit::class)->name('edit-tag');
    Route::get('laravel-examples/new-tag', TagCreate::class)->name('add-tag');

    Route::get('laravel-examples/items', ItemsIndex::class)->name('item-management');
    Route::get('laravel-examples/items/{id}', ItemsEdit::class)->name('edit-item');
    Route::get('laravel-examples/new-item', ItemsCreate::class)->name('add-item');

    // Dashboards

    Route::get('dashboard/analytics', Index::class)->name('analytics');
    Route::get('dashboard/automotive', Automotive::class)->name('automotive');
    Route::Get('dashboard/smart-home', SmartHome::class)->name('smart-home');
    Route::get('dashboard/crm', Crm::class)->name('crm');
    Route::Get('dashboard/vr/vr-default', VrDefault::class)->name('vr-default');
    Route::get('dashboard/vr/vr-info', VrInfo::class)->name('vr-info');

    // Pages

    Route::get('pages/profile/overview', ProfileOverview::class)->name('profile-overview');
    Route::get('pages/profile/teams', ProfileTeams::class)->name('profile-teams');
    Route::get('pages/profile/projects', Projects::class)->name('profile-projects');

    Route::get('pages/users/reports', Reports::class)->name('reports');
    Route::get('pages/users/new-user', NewUser::class)->name('new-user');

    Route::get('pages/account/settings', Settings::class)->name('settings');
    Route::get('pages/account/billing', Billing::class)->name('billing');
    Route::get('pages/account/invoice', Invoice::class)->name('invoice');
    Route::get('pages/account/security', Security::class)->name('security');

    Route::get('pages/projects/general', General::class)->name('general');
    Route::get('pages/projects/timeline', Timeline::class)->name('timeline');
    Route::get('pages/projects/new-project', NewProject::class)->name('new-project');

    Route::get('pages/pricing-page', PricingPage::class)->name('pricing-page');
    Route::get('pages/messages', Messages::class)->name('messages');
    Route::get('pages/rtl-page', RtlPage::class)->name('rtl');
    Route::get('pages/widgets', Widgets::class)->name('widgets');
    Route::get('pages/charts', Charts::class)->name('charts');
    Route::get('pages/sweet-alerts', SweetAlerts::class)->name('sweet-alerts');
    Route::get('pages/notifications', Notifications::class)->name('notifications');

    // Applications

    Route::get('applications/kanban', Kanban::class)->name('kanban');
    Route::get('applications/wizard', Wizard::class)->name('wizard');
    Route::get('applications/datatables', Datatables::class)->name('datatables');
    Route::get('applications/calendar', Calendar::class)->name('calendar');
    Route::get('applications/analytics', Analytics::class)->name('analytics-page');

    // Ecommerce

    Route::get('ecommerce/overview', Overview::class)->name('overview');

    Route::get('ecommerce/products/new-product', NewProduct::class)->name('new-product');
    Route::get('ecommerce/products/edit-product', EditProduct::class)->name('edit-product');
    Route::get('ecommerce/products/product-page', ProductPage::class)->name('product-page');
    Route::get('ecommerce/products/products-list', ProductsList::class)->name('products-list');

    Route::get('ecommerce/orders/order-list', OrderList::class)->name('order-list');
    Route::get('ecommerce/orders/order-details', Details::class)->name('order-details');

    Route::get('ecommerce/referral', Referral::class)->name('referral');

    // Authentication

    Route::get('error404', Error404::class)->name('error404');
    Route::get('error500', Error500::class)->name('error500');

    Route::get('authentication/lock/basic', LockBasic::class)->name('basic-lock');
    Route::get('authentication/lock/cover', LockCover::class)->name('cover-lock');
    Route::get('authentication/lock/illustration', LockIllustration::class)->name('illustration-lock');

    Route::get('authentication/reset/basic', ResetBasic::class)->name('basic-reset');
    Route::get('authentication/reset/cover', ResetCover::class)->name('cover-reset');
    Route::get('authentication/reset/illustration', ResetIllustration::class)->name('illustration-reset');

    Route::get('authentication/sign-in/basic', SignInBasic::class)->name('basic-sign-in');
    Route::get('authentication/sign-in/cover', SignInCover::class)->name('cover-sign-in');
    Route::get('authentication/sign-in/illustration', SignInIllustration::class)->name('illustration-sign-in');

    Route::get('authentication/sign-up/basic', SignUpBasic::class)->name('basic-sign-up');
    Route::get('authentication/sign-up/cover', SignUpCover::class)->name('cover-sign-up');
    Route::get('authentication/sign-up/illustration', SignUpIllustration::class)->name('illustration-sign-up');

    Route::get('authentication/verification/basic', VerificationBasic::class)->name('basic-verification');
    Route::get('authentication/verification/cover', VerificationCover::class)->name('cover-verification');
    Route::get('authentication/verification/illustration', VerificationIllustration::class)->name('illustration-verification');

});

Route::get('/', function () {
    return redirect()->route('login');
});
