<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'password',
        'gender',
        'location',
        'phone',
        'language',
        'skills',
        'role_id',
        'birthday',
        'avatar'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Always encrypt the password when it is updated.
     *
     * @param $value
    * @return string
    */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    public function avatarUrl() {
        return $this->avatar ? Storage::disk('avatars')->url($this->avatar) : '/assets/img/team-3.jpg';
    }

    public function role() {
        return $this->belongsTo(Role::class);
    }

    /**
     * Check if the user is admin
     */
    public function isAdmin() {
        return $this->role_id === 1;
    }

    /**
     * Check if the user is creator
     */
    public function isCreator() {
        return $this->role_id === 2;
    }

    /**
     * Check if the user is member
     */
    public function isMember() {
        return $this->role_id === 3;
    }
}
