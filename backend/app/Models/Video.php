<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;


class Video extends Model
{
    protected $table = 'videos';

    protected $fillable = [
        'name',
        'email',
        'path',
        'fecha',
        'likes',
        'dislikes',
        'views',
        'imagen',
        'link'
        
    ];
    public $timestamps = false;
    // Define any relationships or additional methods here
}