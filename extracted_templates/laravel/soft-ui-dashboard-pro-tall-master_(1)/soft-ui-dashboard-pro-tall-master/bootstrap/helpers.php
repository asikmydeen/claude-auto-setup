<?php

use Illuminate\Support\Facades\Request;

function getPathName(){
    $pathname = explode("/", Request::path());
    if (isset($pathname[2]))
      echo ucfirst($pathname[0]) . "<li class='text-size-sm pl-2 leading-normal'>/<span class='opacity-50 text-slate-700 dark:text-white pl-2'>" .ucfirst($pathname[1]). "</span></li>";
    else
      echo ucfirst($pathname[0]);
}

function in_array_r($needle, $haystack, $strict = false)
{
    foreach ($haystack as $item) {
        if (($strict ? $item === $needle : $item == $needle) || (is_array($item) && in_array_r($needle, $item, $strict))) {
            return true;
        }
    }

    return false;
}

function getCategoriesArray($parent, $child = null)
{
    $categories = array(
        'dashboards' => array(
            'analytics',
            'automotive',
            'smart-home',
            'virtual-reality' => array('vr-default', 'vr-info'),
            'crm'
        ),

        'laravel-examples' => array(
            'user-profile',
            'user' => array('user-management', 'edit-user', 'add-user'),
            'category' => array('category-management', 'edit-category', 'add-category'),
            'role' => array('role-management', 'edit-role', 'add-role'),
            'tag' => array('tag-management', 'edit-tag', 'add-tag'),
            'item' => array('item-management', 'edit-item', 'add-item')
        ),

        'pages' => array(
            'profile' => array('profile-overview', 'profile-teams', 'profile-projects'),
            'users' => array('reports', 'new-user'),
            'account' => array('settings', 'billing', 'invoice', 'security'),
            'projects' => array('general', 'timeline', 'new-project'),
            'messages',
            'rtl',
            'widgets',
            'charts',
            'sweet-alerts',
            'notifications'
        ),

        'applications' => array('kanban', 'wizard', 'datatables', 'calendar', 'analytics-page'),

        'ecommerce' => array(
            'overview',
            'products' => array('new-product', 'edit-product', 'product-page', 'products-list'),
            'orders' => array('order-list', 'order-details'),
            'referral'
        ),

        'guest' => array(
            'auth' => array ('register', 'login', 'forgot-password', 'reset-password'),
            'pricing-page',
            'error404',
            'error500',
            'lock' => array('basic-lock', 'cover-lock', 'illustration-lock'),
            'reset'=> array('basic-reset', 'cover-reset', 'illustration-reset'),
            'sign-in'=> array('basic-sign-in', 'cover-sign-in', 'illustration-sign-in'),
            'sign-up'=> array('basic-sign-up', 'cover-sign-up', 'illustration-sign-up'),
            'verification' => array('basic-verification', 'cover-verification', 'illustration-verification'),
        ),

        'guest-dark' => array(
            'forgot-password', 'reset-password', 
            'error404', 'error500', 
            'cover-sign-in', 'illustration-sign-in', 
            'cover-lock', 'illustration-lock', 
            'basic-reset', 'cover-reset', 'illustration-reset', 
            'cover-sign-up', 'illustration-sign-up',
            'cover-verification', 'illustration-verification'
        ),
    );

    if ($child)
        return $categories[$parent][$child];
    else
        return $categories[$parent];
}