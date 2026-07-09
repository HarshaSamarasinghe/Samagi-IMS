<?php

namespace App\Enums;

enum UserRole:string
{
    case UNKNOWN = "unknown";
    case ADMIN = "admin";
    case USER = "user";
}
