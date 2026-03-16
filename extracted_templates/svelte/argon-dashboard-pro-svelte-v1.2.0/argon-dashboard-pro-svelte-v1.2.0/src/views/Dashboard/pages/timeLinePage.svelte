<script>
  import Badge from "../../../components/Badge.svelte";
  import BaseHeader from "../../../components/BaseHeader.svelte";
  import TimeLine from "../../../components/Timeline/TimeLine.svelte";
  import TimeLineItem from "../../../components/Timeline/TimeLineItem.svelte";
  import RouteBreadcrumb from "../../../components/Breadcrumb/RouteBreadcrumb.svelte";
  import BaseButton from "../../../components/BaseButton.svelte";
  import Card from "../../../components/Cards/Card.svelte";
  export let name = "Timeline";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  onMount(function() {
    let topmenu = document.getElementsByTagName("nav").item(0);
    topmenu.classList.add("bg-danger");
    topmenu.classList.add("navbar-dark");
    topmenu.classList.remove("navbar-light");
    let search = document.getElementsByTagName("form").item(0);
    search.classList.remove("navbar-search-dark");
    search.classList.add("navbar-search-light");
  });
</script>

<div transition:fade={{ duration: 250 }}>
  <BaseHeader className="pb-6">
    <div class="row align-items-center py-4">
      <div class="col-lg-6 col-7">
        <h6 class="h2 text-white d-inline-block mb-0">{name}</h6>
        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
          <RouteBreadcrumb {name} />
        </nav>
      </div>
      <div class="col-lg-6 col-5 text-right">
        <BaseButton size="sm" type="neutral">New</BaseButton>
        <BaseButton size="sm" type="neutral">Filters</BaseButton>
      </div>
    </div>
  </BaseHeader>

  <div class="container-fluid mt--6">
    <div class="row">
      <div class="col-lg-6">
        <Card headerClasses="bg-transparent">
          <h3 slot="header" class="mb-0">Timeline</h3>

          <TimeLine type="one-side">

            <TimeLineItem badgeType="success" badgeIcon="ni ni-bell-55">
              <small class="text-muted font-weight-bold">10:30 AM</small>
              <h5 class=" mt-3 mb-0">New message</h5>
              <p class=" text-sm mt-1 mb-0">
                Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
              </p>
              <div class="mt-3">
                <Badge pill={true} variant="success">design</Badge>
                &nbsp;
                <Badge pill={true} variant="success">system</Badge>
                &nbsp;
                <Badge pill={true} variant="success">creative</Badge>
              </div>
            </TimeLineItem>

            <TimeLineItem badgeType="danger" badgeIcon="ni ni-html5">
              <small class="text-muted font-weight-bold">10:30 AM</small>
              <h5 class=" mt-3 mb-0">Product issue</h5>
              <p class=" text-sm mt-1 mb-0">
                Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
              </p>
              <div class="mt-3">
                <Badge pill={true} variant="danger">design</Badge>
                &nbsp;
                <Badge pill={true} variant="danger">system</Badge>
                &nbsp;
                <Badge pill={true} variant="danger">creative</Badge>
              </div>
            </TimeLineItem>

            <TimeLineItem badgeType="info" badgeIcon="ni ni-like-2">
              <small class="text-muted font-weight-bold">10:30 AM</small>
              <h5 class=" mt-3 mb-0">New likes</h5>
              <p class=" text-sm mt-1 mb-0">
                Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
              </p>
              <div class="mt-3">
                <Badge pill={true} variant="info">design</Badge>
                &nbsp;
                <Badge pill={true} variant="info">system</Badge>
                &nbsp;
                <Badge pill={true} variant="info">creative</Badge>
              </div>
            </TimeLineItem>

            <TimeLineItem badgeType="success" badgeIcon="ni ni-bell-55">
              <small class="text-muted font-weight-bold">10:30 AM</small>
              <h5 class=" mt-3 mb-0">New message</h5>
              <p class=" text-sm mt-1 mb-0">
                Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
              </p>
              <div class="mt-3">
                <Badge pill={true} variant="success">design</Badge>
                &nbsp;
                <Badge pill={true} variant="success">system</Badge>
                &nbsp;
                <Badge pill={true} variant="success">creative</Badge>
              </div>
            </TimeLineItem>

            <TimeLineItem badgeType="danger" badgeIcon="ni ni-html5">
              <small class="text-muted font-weight-bold">10:30 AM</small>
              <h5 class=" mt-3 mb-0">Product issue</h5>
              <p class=" text-sm mt-1 mb-0">
                Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
              </p>
              <div class="mt-3">
                <Badge pill={true} variant="danger">design</Badge>
                &nbsp;
                <Badge pill={true} variant="danger">system</Badge>
                &nbsp;
                <Badge pill={true} variant="danger">creative</Badge>
              </div>
            </TimeLineItem>

          </TimeLine>

        </Card>
      </div>
      <div class="col-lg-6">
        <Card shadow gradient="default" headerClasses="bg-transparent">
          <h3 slot="header" class="mb-0 text-white">Dark timeline</h3>

          <TimeLine type="one-side">
            <TimeLineItem badgeType="success" badgeIcon="ni ni-bell-55">
              <small class="text-light font-weight-bold">10:30 AM</small>
              <h5 class=" mt-3 mb-0">New message</h5>
              <p class="text-light text-sm mt-1 mb-0">
                Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
              </p>
              <div class="mt-3">
                <Badge pill={true} variant="success">design</Badge>
                &nbsp;
                <Badge pill={true} variant="success">system</Badge>
                &nbsp;
                <Badge pill={true} variant="success">creative</Badge>
              </div>
            </TimeLineItem>

            <TimeLineItem badgeType="danger" badgeIcon="ni ni-html5">
              <small class="text-light font-weight-bold">10:30 AM</small>
              <h5 class="text-white mt-3 mb-0">Product issue</h5>
              <p class="text-light text-sm mt-1 mb-0">
                Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
              </p>
              <div class="mt-3">
                <Badge pill={true} variant="danger">design</Badge>
                &nbsp;
                <Badge pill={true} variant="danger">system</Badge>
                &nbsp;
                <Badge pill={true} variant="danger">creative</Badge>
              </div>
            </TimeLineItem>

            <TimeLineItem badgeType="info" badgeIcon="ni ni-like-2">
              <small class="text-light font-weight-bold">10:30 AM</small>
              <h5 class="text-white mt-3 mb-0">New likes</h5>
              <p class="text-light text-sm mt-1 mb-0">
                Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
              </p>
              <div class="mt-3">
                <Badge pill={true} variant="info">design</Badge>
                &nbsp;
                <Badge pill={true} variant="info">system</Badge>
                &nbsp;
                <Badge pill={true} variant="info">creative</Badge>
              </div>
            </TimeLineItem>

            <TimeLineItem badgeType="success" badgeIcon="ni ni-bell-55">
              <small class="text-light font-weight-bold">10:30 AM</small>
              <h5 class="text-white mt-3 mb-0">New message</h5>
              <p class="text-light text-sm mt-1 mb-0">
                Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
              </p>
              <div class="mt-3">
                <Badge pill={true} variant="success">design</Badge>
                &nbsp;
                <Badge pill={true} variant="success">system</Badge>
                &nbsp;
                <Badge pill={true} variant="success">creative</Badge>
              </div>
            </TimeLineItem>

            <TimeLineItem badgeType="danger" badgeIcon="ni ni-html5">
              <small class="text-light font-weight-bold">10:30 AM</small>
              <h5 class="text-white mt-3 mb-0">Product issue</h5>
              <p class="text-light text-sm mt-1 mb-0">
                Nullam id dolor id nibh ultricies vehicula ut id elit. Cum
                sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
              </p>
              <div class="mt-3">
                <Badge pill={true} variant="danger">design</Badge>
                &nbsp;
                <Badge pill={true} variant="danger">system</Badge>
                &nbsp;
                <Badge pill={true} variant="danger">creative</Badge>
              </div>
            </TimeLineItem>
          </TimeLine>
        </Card>
      </div>
    </div>
  </div>
</div>
