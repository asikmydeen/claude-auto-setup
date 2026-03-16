<script>
  import Card from "../../components/Cards/Card.svelte";
  import BaseButton from "../../components/BaseButton.svelte";
  import BaseSwitch from "../../components/BaseSwitch.svelte";
  import BaseInput from "../../components/Inputs/BaseInput.svelte";
  let creditCard = {
    default: true,
    name: "",
    cardNumber: "",
    expire: "",
    ccv: ""
  };
</script>

<div>
  <Card type="gradient-primary">
    <div class="row align-items-center justify-content-between">
      <div class="col">
        <img src="img/icons/cards/mastercard.png" alt="Image placeholder" />
      </div>
      <div class="col-md-auto">
        <div class="d-flex align-items-center">
          <small class="text-white font-weight-bold mr-3">Make default</small>
          <div>
            <BaseSwitch type="white" model="creditCard.default" />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <form action="" role="form" class="form-primary">
        <BaseInput
          prependIcon="ni ni-single-02"
          className="input-group-alternative mb-3"
          placeholder="Name on card"
          model="creditCard.name" />
        <BaseInput
          prependIcon="ni ni-credit-card"
          className="input-group-alternative mb-3"
          placeholder="Card number"
          model="creditCard.cardNumber" />
        <div class="row">
          <div class="col-6">
            <BaseInput
              prependIcon="ni ni-calendar-grid-58"
              className="input-group-alternative mb-3"
              placeholder="MM/YY"
              model="creditCard.expire" />
          </div>
          <div class="col-6">
            <BaseInput
              prependIcon="ni ni-lock-circle-open"
              className="input-group-alternative mb-3"
              placeholder="CCV"
              model="creditCard.ccv" />
          </div>
        </div>
        <BaseButton type="info" block>Save new card</BaseButton>
      </form>
    </div>
  </Card>
</div>
