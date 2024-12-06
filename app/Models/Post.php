<?php
// app/Models/Post.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'content', 'files'];

    protected $casts = [
        'files' => 'array', // Indique que le champ "files" est un tableau JSON
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}



