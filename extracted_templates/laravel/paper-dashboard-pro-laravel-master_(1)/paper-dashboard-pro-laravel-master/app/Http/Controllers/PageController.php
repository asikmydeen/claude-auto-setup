<?php
/*

=========================================================
* Argon Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-laravel
* Copyright 2018 Creative Tim (https://www.creative-tim.com) & UPDIVISION (https://www.updivision.com)

* Coded by www.creative-tim.com & www.updivision.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
namespace App\Http\Controllers;

class PageController extends Controller
{
    /**
     * Display all the static pages when authenticated
     *
     * @param string $page
     * @return \Illuminate\View\View
     */
    public function index(string $page)
    {
        if (view()->exists("pages.{$page}")) {
            return view("pages.{$page}");
        }

        return abort(404);
    }

    /**
     * Display components pages when authenticated
     *
     * @param string $page
     * @return \Illuminate\View\View
     */
    public function components(string $page)
    {
        if (view()->exists("pages.components.{$page}")) {
            return view("pages.components.{$page}");
        }

        return abort(404);
    }

    /**
     * Display forms pages when authenticated
     *
     * @param string $page
     * @return \Illuminate\View\View
     */
    public function forms(string $page)
    {
        if (view()->exists("pages.forms.{$page}")) {
            return view("pages.forms.{$page}");
        }

        return abort(404);
    }

    /**
     * Display components maps when authenticated
     *
     * @param string $page
     * @return \Illuminate\View\View
     */
    public function maps(string $page)
    {
        if (view()->exists("pages.maps.{$page}")) {
            return view("pages.maps.{$page}");
        }

        return abort(404);
    }

    /**
     * Display some pages like timeline and user profile when authenticated
     *
     * @param string $page
     * @return \Illuminate\View\View
     */
    public function pages(string $page)
    {
        if (view()->exists("pages.pages.{$page}")) {
            return view("pages.pages.{$page}");
        }

        return abort(404);
    }

    /**
     * Display tables pages when authenticated
     *
     * @param string $page
     * @return \Illuminate\View\View
     */
    public function tables(string $page)
    {
        if (view()->exists("pages.tables.{$page}")) {
            return view("pages.tables.{$page}");
        }

        return abort(404);
    }

    /**
     * Display the pricing page
     *
     * @return \Illuminate\View\View
     */
    public function pricing()
    {
        return view('pages.pricing');
    }

    /**
     * Display the lock page
     *
     * @return \Illuminate\View\View
     */
    public function lock()
    {
        return view('pages.lock');
    }
}
