<script>
  import StatsCard from "../../components/Cards/StatsCard.svelte";
  import Card from "../../components/Cards/Card.svelte";
</script>

<div>
  <StatsCard className="bg-gradient-default">
    <!-- Card body -->
    <div class="row">
      <div class="col">
        <h5 class="card-title text-uppercase text-muted mb-0 text-white">
          Total traffic
        </h5>
        <span class="h2 font-weight-bold mb-0 text-white">350,897</span>
      </div>
      <div class="col-md-auto">
        <div class="icon icon-shape bg-white text-dark rounded-circle shadow">
          <i class="ni ni-active-40" />
        </div>
      </div>
    </div>
    <p class="mt-3 mb-0 text-sm">
      <span class="text-white mr-2">
        <i class="fa fa-arrow-up" />
        3.48%
      </span>
      <span class="text-nowrap text-light">Since last month</span>
    </p>

  </StatsCard>

  <Card className="bg-gradient-primary">
    <!-- Card body -->
    <div class="row">
      <div class="col">
        <h5 class="card-title text-uppercase text-muted mb-0 text-white">
          New users
        </h5>
        <span class="h2 font-weight-bold mb-0 text-white">2,356</span>
      </div>
      <div class="col-md-auto">
        <div class="icon icon-shape bg-white text-dark rounded-circle shadow">
          <i class="ni ni-atom" />
        </div>
      </div>
    </div>
    <p class="mt-3 mb-0 text-sm">
      <span class="text-white mr-2">
        <i class="fa fa-arrow-up" />
        3.48%
      </span>
      <span class="text-nowrap text-light">Since last month</span>
    </p>
  </Card>
  <Card className="bg-gradient-danger">
    <!-- Card body -->
    <div class="row">
      <div class="col">
        <h5 class="card-title text-uppercase text-muted mb-0 text-white">
          Performance
        </h5>
        <span class="h2 font-weight-bold mb-0 text-white">49,65%</span>
      </div>
      <div class="col-md-auto">
        <div class="icon icon-shape bg-white text-dark rounded-circle shadow">
          <i class="ni ni-spaceship" />
        </div>
      </div>
    </div>
    <p class="mt-3 mb-0 text-sm">
      <span class="text-white mr-2">
        <i class="fa fa-arrow-up" />
        3.48%
      </span>
      <span class="text-nowrap text-light">Since last month</span>
    </p>
  </Card>
</div>
