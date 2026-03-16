<script>
  import Card from "../../../components/Cards/Card.svelte";
  import Badge from "../../../components/Badge.svelte";
  let card = {
    status: "Active",
    statusType: "success",
    title: "john.snow@gmail.com",
    name: "John Snow"
  };
</script>

<div>
  <Card noBody={true}>
    <div class="card-body">
      <div class="row align-items-center justify-content-between">
        <div class="col">
          <img src="../img/icons/cards/paypal.png" alt="Image placeholder" />
        </div>
        <div class="col-md-auto">
          <Badge size="lg" className="badge-{card.statusType}">{card.status}</Badge>
        </div>
      </div>
      <div class="my-4">
        <span class="h6 surtitle text-muted">PayPal E-mail</span>
        <div class="h1">{card.title}</div>
      </div>
      <div class="row">
        <div class="col">
          <span class="h6 surtitle text-muted">Name</span>
          <span class="d-block h3">{card.name}</span>
        </div>
      </div>
    </div>
  </Card>
</div>
