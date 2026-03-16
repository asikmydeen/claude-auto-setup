<script>
  import Card from "../../components/Cards/Card.svelte";
  import BaseProgress from "../../components/BaseProgress.svelte";

  let list = [
    {
      name: "Argon Design System",
      image: "img/theme/bootstrap.jpg",
      color: "orange",
      progress: 60
    },
    {
      name: "Angular Now UI Kit PRO",
      image: "img/theme/angular.jpg",
      color: "green",
      progress: 100
    },
    {
      name: "Black Dashboard",
      image: "img/theme/sketch.jpg",
      color: "red",
      progress: 72
    },
    {
      name: "React Material Dashboard",
      image: "img/theme/react.jpg",
      color: "teal",
      progress: 90
    },
    {
      name: "Vue Paper UI Kit PRO",
      image: "img/theme/vue.jpg",
      color: "green",
      progress: 100
    }
  ];
</script>

<div>
  <Card noBody={true}>
    <!-- Card header -->
    <div class="card-header">
      <!-- Title -->
      <h5 class="h3 mb-0">Progress track</h5>
    </div>
    <!-- Card body -->
    <div class="card-body">
      <!-- List group -->
      <div class="list-group list-group-flush list my--3">
        {#each list as item, index}
          <div class="list-group-item px-0" key={index}>
            <div class="row align-items-center">
              <div class="col-md-auto">
                <!-- Avatar -->
                <a href="/" class="avatar rounded-circle">
                  <img alt="Image placeholder" src={item.image} />
                </a>
              </div>
              <div class="col">
                <h5>{item.name}</h5>
                <BaseProgress
                  className="progress-xs mb-0"
                  type={item.color}
                  value={item.progress} />
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </Card>
</div>
