<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('picture')->nullable();
            $table->text('excerpt')->nullable();
            $table->text('description')->nullable();
            $table->string('show_on_homepage')->nullable();
            $table->string('status')->nullable();
            $table->string('options')->nullable();
            $table->date('date')->nullable();
            $table->timestamps();

            $table->foreignId('category_id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
};
