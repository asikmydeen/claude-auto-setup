<script>
  import BaseProgress from "../../components/BaseProgress.svelte";
  let itemLimit = 4;
  let items = [
    {
      id: 1,
      img: "../../img/theme/bootstrap.jpg",
      title: "Argon Design System",
      progress: 60,
      progressType: "orange"
    },
    {
      id: 2,
      img: "../../img/theme/angular.jpg",
      title: "Angular Now UI Kit PRO",
      progress: 100,
      progressType: "green"
    },
    {
      id: 3,
      img: "../../img/theme/sketch.jpg",
      title: "Black Dashboard",
      progress: 72,
      progressType: "red"
    },
    {
      id: 4,
      img: "../../img/theme/react.jpg",
      title: "React Material Dashboard",
      progress: 90,
      progressType: "teal"
    },
    {
      id: 5,
      img: "../../img/theme/vue.jpg",
      title: "Vue Paper UI Kit PRO",
      progress: 100,
      progressType: "success"
    }
  ];

  items = cutItems(items, itemLimit);
  function cutItems(items, itemLimit) {
    let newItems = [];
    for (var i = 0; i < itemLimit; i++) {
      newItems.push(items[i]);
    }
    return newItems;
  }
</script>

<div class="list-group list-group-flush my--3">
  {#each items as item}
    <div class="list-group-item px-0">
      <div class="row align-items-center">
        <div class="col-auto">
          <a href="/pages/user" class="avatar">
            <img
              alt="Image placeholder"
              rounded="circle"
              class="rounded-circle"
              src={item.img} />
          </a>
        </div>
        <div class="col">
          <h5>{item.title}</h5>
          <BaseProgress
            progressClasses="mb-0"
            type={item.progressType}
            value={item.progress} />
        </div>
      </div>
    </div>
  {/each}
</div>
