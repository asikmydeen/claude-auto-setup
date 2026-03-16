<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col-lg-10">
        <card class="card-calendar">
          <client-only>
            <calendar></calendar>
          </client-only>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'calendar-page'
  }
</script>
<style>
  .card-calendar {
    min-height: 400px;
  }
</style>
