<template>
  <vnud-card class="card-user">
    <template v-slot:image>
      <div class="image">
        <img src="img/bg5.jpg" alt="..." />
      </div>
    </template>
    <div>
      <div class="author">
        <a href="#">
          <img class="avatar border-gray" src="img/mike.jpg" alt="..." />
          <h5 class="title">Mike Andrew</h5>
        </a>
        <p class="description">michael24</p>
      </div>
      <p class="description text-center">
        "Lamborghini Mercy <br />
        Your chick she so thirsty <br />
        I'm in that two seat Lambo"
      </p>
    </div>
    <template v-slot:footer>
      <div class="button-container">
        <n-button href="#" type="neutral" icon round size="lg">
          <i class="fa fa-facebook-square"></i>
        </n-button>
        <n-button href="#" type="neutral" icon round size="lg">
          <i class="fa fa-twitter"></i>
        </n-button>
        <n-button href="#" type="neutral" icon round size="lg">
          <i class="fa fa-google-plus-square"></i>
        </n-button>
      </div>
    </template>
  </vnud-card>
</template>
<script>
export default {};
</script>
<style></style>
