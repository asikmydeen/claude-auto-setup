<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    public function dashboards(string $page)
    {
        if (view()->exists("dashboards.{$page}")) {
            return view("dashboards.{$page}");
        }

        return abort(404);
    }

    public function profiles(string $page)
    {
        if (view()->exists("pages.profile.{$page}")) {
            return view("pages.profile.{$page}");
        }

        return abort(404);
    }

    public function users(string $page)
    {
        if (view()->exists("pages.users.{$page}")) {
            return view("pages.users.{$page}");
        }

        return abort(404);
    }

    public function accounts(string $page)
    {
        if (view()->exists("pages.account.{$page}")) {
            return view("pages.account.{$page}");
        }

        return abort(404);
    }

    public function projects(string $page)
    {
        if (view()->exists("pages.projects.{$page}")) {
            return view("pages.projects.{$page}");
        }

        return abort(404);
    }


    public function pages(string $page)
    {
        if (view()->exists("pages.{$page}")) {
            return view("pages.{$page}");
        }

        return abort(404);
    }

    public function applications(string $page)
    {
        if (view()->exists("applications.{$page}")) {
            return view("applications.{$page}");
        }

        return abort(404);
    }

    public function ecommerce(string $page)
    {
        if (view()->exists("ecommerce.{$page}")) {
            return view("ecommerce.{$page}");
        }

        return abort(404);
    }

    public function products(string $page)
    {
        if (view()->exists("ecommerce.products.{$page}")) {
            return view("ecommerce.products.{$page}");
        }

        return abort(404);
    }

    public function orders(string $page)
    {
        if (view()->exists("ecommerce.orders.{$page}")) {
            return view("ecommerce.orders.{$page}");
        }

        return abort(404);
    }

    public function signins(string $page)
    {
        if (view()->exists("authentication.sign-in.{$page}")) {
            return view("authentication.sign-in.{$page}");
        }

        return abort(404);
    }
    public function signups(string $page)
    {
        if (view()->exists("authentication.sign-up.{$page}")) {
            return view("authentication.sign-up.{$page}");
        }

        return abort(404);
    }

    public function resets(string $page)
    {
        if (view()->exists("authentication.reset-password.{$page}")) {
            return view("authentication.reset-password.{$page}");
        }

        return abort(404);
    }

    public function locks(string $page)
    {
        if (view()->exists("authentication.lock.{$page}")) {
            return view("authentication.lock.{$page}");
        }

        return abort(404);
    }

    public function verifications(string $page)
    {
        if (view()->exists("authentication.verification.{$page}")) {
            return view("authentication.verification.{$page}");
        }

        return abort(404);
    }

    public function errors(string $page)
    {
        if (view()->exists("authentication.error.{$page}")) {
            return view("authentication.error.{$page}");
        }

        return abort(404);
    }
}
