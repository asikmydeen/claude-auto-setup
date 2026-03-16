<script>
  import Card from "../../components/Cards/Card.svelte";
  let events = [
    {
      title: "New message",
      description: "Let's meet at Starbucks at 11:30. Wdyt?",
      icon: "ni ni-bell-55",
      type: "success",
      time: "2 hrs ago"
    },
    {
      title: "Product issue",
      description: "A new issue has been reported for Argon.",
      icon: "ni ni-html5",
      type: "danger",
      time: "3 hrs ago"
    },
    {
      title: "New likes",
      description: "Your posts have been liked a lot.",
      icon: "ni ni-like-2",
      type: "info",
      time: "5 hrs ago"
    }
  ];
</script>

<div>
  <Card noBody={true}>
    <!-- Card header -->
    <div class="card-header">
      <!-- Title -->
      <h5 class="h3 mb-0">Latest notifications</h5>
    </div>
    <!-- Card body -->
    <div class="card-body">
      <div
        class="timeline timeline-one-side"
        data-timeline-content="axis"
        data-timeline-axis-style="dashed">
        {#each events as event}
          <div class="timeline-block" key={event.title}>
            <span class="timeline-step badge-{event.type}">
              <i class={event.icon} />
            </span>
            <div class="timeline-content">
              <div class="d-flex justify-content-between pt-1">
                <div>
                  <span class="text-muted text-sm font-weight-bold">
                    {event.title}
                  </span>
                </div>
                <div class="text-right">
                  <small class="text-muted">
                    <i class="fas fa-clock mr-1" />
                    {event.time}
                  </small>
                </div>
              </div>
              <h6 class="text-sm mt-1 mb-0">{event.description}</h6>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </Card>
</div>
