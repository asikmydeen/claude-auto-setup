<script>
  import Card from "../../components/Cards/Card.svelte";
  import BaseInput from "../../components/Inputs/BaseInput.svelte";
  export let showSearch = true;
  let memberSearch = "";
  let members = [
    {
      name: "John Michael",
      status: "Online",
      statusType: "success",
      image: "../img/theme/team-1.jpg"
    },
    {
      name: "Alex Smith",
      status: "In a meeting",
      statusType: "danger",
      image: "../img/theme/team-2.jpg"
    },
    {
      name: "Samantha Ivy",
      status: "Offline",
      statusType: "danger",
      image: "../img/theme/team-3.jpg"
    },
    {
      name: "John Michael",
      status: "Online",
      statusType: "success",
      image: "../img/theme/team-4.jpg"
    },
    {
      name: "John Snow",
      status: "Online",
      statusType: "success",
      image: "../img/theme/team-5.jpg"
    }
  ];
</script>

<Card noBody={true}>
  <!-- Card header -->
  <div class="card-header">
    <!-- Title -->
    <h5 class="h3 mb-0">Team members</h5>
  </div>
  <!-- Card search -->
  {#if showSearch}
    <div class="card-header py-0">
      <!-- Search form -->
      <form action="">
        <div class="form-group mb-0">
          <BaseInput
            className="input-group-lg input-group-flush mb-0"
            prependIcon="fas fa-search"
            placeholder="Search"
            type="search"
            model="membersSearch" />
        </div>
      </form>
    </div>
  {/if}
  <!-- Card body -->
  <div class="card-body">
    <!-- List group -->
    <div class="list-group list-group-flush list my--3">
      {#each members as member}
        <div class="list-group-item px-0" key={member.image}>
          <div class="row align-items-center">
            <div class="col-md-auto">
              <!-- Avatar -->
              <a href="/" class="avatar">
                <img
                  src={member.image}
                  class="rounded-circle"
                  alt="Image placeholder" />
              </a>
            </div>
            <div class="col ml--2">
              <h4 class="mb-0">
                <a href="/">{member.name}</a>
              </h4>
              <span class="text-{member.statusType}">●</span>
              <small>{member.status}</small>
            </div>
            <div class="col-md-auto">
              <button type="button" class="btn btn-sm btn-primary">Add</button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</Card>
