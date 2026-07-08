<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

       DB::table("users")->insert([
        'first_name' => 'Harsha',
        'last_name' => 'Samarasinghe',
        'email'=> 'harshasamare25@gmail.com',
        'email_verified_at' => now(),
        'password'=> Hash::make('#Harsha1234'),
        'remember_token' => Str::random(10),
        'role' => UserRole::ADMIN,
        'phone_number' => '0763537831',
        'address' => 'Polgahawela',
        'nic' => '200316410731',
        'created_at' => now(),
        'updated_at'=> now(),
       ]);
    }
}
