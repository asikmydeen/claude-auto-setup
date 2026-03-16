<script>
  import Card from "../../components/Cards/Card.svelte";
  import Badge from "../../components/Badge.svelte";
  let creditCard = {
    number: "4358 7421 9256 6682",
    status: "Active",
    statusType: "success",
    name: "John Snow",
    expire: "11/23"
  };
</script>

<div>
  <Card noBody={true} className="bg-gradient-primary">
    <!-- Card body -->
    <div class="card-body">
      <div class="row align-items-center justify-content-between">
        <div class="col">
          <img src="img/icons/cards/visa.png" alt="Image placeholder" />
        </div>
        <div class="col-md-auto">
          <Badge size="lg" className="badge-{creditCard.statusType}">
            {creditCard.status}
          </Badge>
        </div>
      </div>
      <div class="my-4">
        <span class="h6 surtitle text-light">Card number</span>
        <div class="card-serial-number text-white">
          {#each creditCard.number.split(' ') as part, index}
            <h1 class="text-white" key={index}>{part}</h1>
          {/each}
        </div>
      </div>
      <div class="row">
        <div class="col">
          <span class="h6 surtitle text-light">Name</span>
          <span class="d-block h3 text-white">{creditCard.name}</span>
        </div>
        <div class="col">
          <span class="surtitle text-light">
            <h6>Expiry date</h6>
          </span>
          <span class="d-block h3 text-white">{creditCard.expire}</span>
        </div>
      </div>
    </div>
  </Card>
</div>
