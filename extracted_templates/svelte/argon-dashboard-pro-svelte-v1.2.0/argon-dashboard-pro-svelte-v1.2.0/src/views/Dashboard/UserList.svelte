<script>
  import BaseProgress from "../../components/BaseProgress.svelte";
  import BaseButton from "../../components/BaseButton.svelte";

  let users = [
    {
      id: 1,
      img: "../../img/theme/team-1.jpg",
      name: "John Michael",
      status: "Online",
      statusType: "success"
    },
    {
      id: 2,
      img: "../../img/theme/team-2.jpg",
      name: "Alex Smith",
      status: "In a meeting",
      statusType: "danger"
    },
    {
      id: 3,
      img: "../../img/theme/team-3.jpg",
      name: "Samantha Ivy",
      status: "Offline",
      statusType: "danger"
    },
    {
      id: 4,
      img: "../../img/theme/team-4.jpg",
      name: "John Michael",
      status: "Online",
      statusType: "success"
    }
  ];
</script>

<div class="list-group list-group-flush my--3">
  {#each users as user}
    <div class="list-group-item px-0" key={user.id}>
      <div class="row align-items-center">
        <div class="col-auto">
          <!-- Avatar -->
          <a href="#!" class="avatar rounded-circle">
            <img alt="Image placeholder" src={user.img} />
          </a>
        </div>
        <div class="col ml--2">
          <h4 class="mb-0">
            <a href="#!">{user.name}</a>
          </h4>
          <span class="text-{user.statusType}">●</span>
          <small>{user.status}</small>
        </div>
        <div class="col-auto">
          <BaseButton type="primary" size="sm">Add</BaseButton>
        </div>
      </div>
    </div>
  {/each}
</div>
