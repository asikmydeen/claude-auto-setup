<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item-tags', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('items_id');
            $table->unsignedBigInteger('tags_id');
            $table->timestamps();

            $table->foreign('items_id')->references('id')->on('items_management')->onDelete('cascade');
            $table->foreign('tags_id')->references('id')->on('tags');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item-tags');
    }
}
