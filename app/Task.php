<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    //
    protected $table = 'tasks';

    public $primaryKey = 'id';

    public $timestamps = true;

    protected $fillable = [
        'task_title', 'task_description', 'due_date',
    ];

}
