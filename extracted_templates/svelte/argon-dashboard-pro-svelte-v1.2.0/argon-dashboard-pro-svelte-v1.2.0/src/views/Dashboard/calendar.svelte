<script>
  import FullCalendar from "svelte-fullcalendar";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import timeGridPlugin from "@fullcalendar/timegrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import BaseHeader from "../../components/BaseHeader.svelte";
  import BaseButton from "../../components/BaseButton.svelte";
  import RouteBreadcrumb from "../../components/Breadcrumb/RouteBreadcrumb.svelte";
  import Card from "../../components/Cards/Card.svelte";
  import Modal from "../../components/Modal.svelte";
  import BaseInput from "../../components/Inputs/BaseInput.svelte";
  import "~@fullcalendar/core/main.css";
  import "~@fullcalendar/core/main.css";
  import "~@fullcalendar/daygrid/main.css";
  import "~@fullcalendar/timegrid/main.css";
  import "~@fullcalendar/interaction/main.css";
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

  // rollup must be configured to do this
  export let name = "Calendar";
  export let parent = "";
  let calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  let defaultView = "dayGridMonth";
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth();
  const d = today.getDate();
  let yearAndMonth;
  if (m + 1 < 10) {
    yearAndMonth = `${y}-0${m + 1}`;
  } else {
    yearAndMonth = `${y}-${m + 1}`;
  }
  let events = [
    {
      title: "Call with Dave",
      start: `${yearAndMonth}-18`,
      end: `${yearAndMonth}-18`,
      className: "bg-red",
      allDay: true
    },

    {
      title: "Lunch meeting",
      start: `${yearAndMonth}-21`,
      end: `${yearAndMonth}-22`,
      className: "bg-orange",
      allDay: true
    },

    {
      title: "All day conference",
      start: `${yearAndMonth}-29`,
      end: `${yearAndMonth}-29`,
      className: "bg-green",
      allDay: true
    },

    {
      title: "Meeting with Mary",
      start: `${yearAndMonth}-01`,
      end: `${yearAndMonth}-01`,
      className: "bg-blue",
      allDay: true
    },

    {
      title: "Winter Hackaton",
      start: `${yearAndMonth}-03`,
      end: `${yearAndMonth}-03`,
      className: "bg-red",
      allDay: true
    },

    {
      title: "Digital event",
      start: `${yearAndMonth}-07`,
      end: `${yearAndMonth}-09`,
      className: "bg-orange",
      allDay: true
    },

    {
      title: "Marketing event",
      start: `${yearAndMonth}-10`,
      end: `${yearAndMonth}-10`,
      className: "bg-purple",
      allDay: true
    },

    {
      title: "Dinner with Family",
      start: `${yearAndMonth}-19`,
      end: `${yearAndMonth}-19`,
      className: "bg-red",
      allDay: true
    },

    {
      title: "Black Friday",
      start: `${yearAndMonth}-23`,
      end: `${yearAndMonth}-23`,
      className: "bg-blue",
      allDay: true
    },

    {
      title: "Cyber Week",
      start: `${yearAndMonth}-02`,
      end: `${yearAndMonth}-02`,
      className: "bg-yellow",
      allDay: true
    }
  ];
  let showAddModal = false;
  let showEditModal = false;
  let model = {
    title: "",
    className: "bg-default",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    start: "",
    end: ""
  };
  let eventColors = [
    "bg-info",
    "bg-orange",
    "bg-red",
    "bg-green",
    "bg-default",
    "bg-blue",
    "bg-purple",
    "bg-yellow"
  ];
  let calendarRef = "";
  function calendarApi() {
    return calendarRef.getAPI();
  }

  function changeView(viewType) {
    defaultView = viewType;
    calendarApi().changeView(viewType);
  }

  function next() {
    calendarApi().next();
  }

  function prev() {
    calendarApi().prev();
  }

  function onDateClick({ date }) {
    showAddModal = true;
    let y = date.getFullYear();
    let m = date.getMonth();
    let d = date.getDate();
    let eventDate;
    if (m + 1 < 10 && d < 10) {
      eventDate = `${y}-0${m + 1}-0${d}`;
    } else if (m + 1 >= 10 && d < 10) {
      eventDate = `${y}-${m + 1}-0${d}`;
    } else if (m + 1 < 10 && d >= 10) {
      eventDate = `${y}-0${m + 1}-${d}`;
    } else if (m + 1 >= 10 && d >= 10) {
      eventDate = `${y}-${m + 1}-${d}`;
    }
    model.start = eventDate;
    model.end = eventDate;
  }

  function onEventClick({ event }) {
    let y = event.start.getFullYear();
    let m = event.start.getMonth();
    let d = event.start.getDate();
    let eventDate;
    if (m + 1 < 10 && d < 10) {
      eventDate = `${y}-0${m + 1}-0${d}`;
    } else if (m + 1 >= 10 && d < 10) {
      eventDate = `${y}-${m + 1}-0${d}`;
    } else if (m + 1 < 10 && d >= 10) {
      eventDate = `${y}-0${m + 1}-${d}`;
    } else if (m + 1 >= 10 && d >= 10) {
      eventDate = `${y}-${m + 1}-${d}`;
    }
    model.start = eventDate;
    model.end = eventDate;
    model = {
      title: event.title,
      className: event.classNames[0],
      start: eventDate,
      end: eventDate,
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    };
    showEditModal = true;
  }

  function saveEvent() {
    let input = document.getElementById("addEventInput");
    if (input.value !== "") {
      model.title = input.value;
    }
    if (model.title) {
      let event = {
        ...model,
        allDay: true
      };
      events = [
        ...events,
        {
          title: model.title,
          start: model.start,
          end: model.end,
          className: model.className,
          allDay: true
        }
      ];
      model = {
        title: "",
        className: "bg-default",
        start: "",
        end: ""
      };
    }
    showAddModal = false;
  }

  function editEvent() {
    let index = events.findIndex(e => e.title === model.title);
    let event = model;
    let input = document.getElementById("editEventInput");
    let description = document.getElementById("eventDescription");
    if (input.value !== "") {
      event.title = input.value;
    }
    if (description.value !== "") {
      event.description = description.value;
    }
    if (index !== -1) {
      events.splice(index, 1);
    }
    events = [...events, event];
    showEditModal = false;
    model = {
      title: event.title,
      className: "bg-default",
      start: "",
      end: "",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    };
  }

  function deleteEvent() {
    let index = events.findIndex(e => e.title === model.title);
    if (index !== -1) {
      events.splice(index, 1);
    }
    events = [...events, {}];
    showEditModal = false;
    model = {
      title: "",
      className: "bg-default",
      start: "",
      end: "",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    };
  }

  function showMe(name) {
    // console.log(name);
  }

  function changeColor(color) {
    model.className = color;
  }
</script>

<div style="transform-origin: center top;">
  <BaseHeader className="pb-6">
    <div class="row align-items-center py-4">
      <div class="col-lg-6 col-7">
        <h6 class="h2 text-white d-inline-block mb-0">{name}</h6>
        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
          <RouteBreadcrumb {name} {parent} />
        </nav>
      </div>
      <div class="col-lg-6 mt-3 mt-lg-0 text-lg-right">
        <a
          href="/calendar"
          on:click={next}
          class="fullcalendar-btn-prev btn btn-sm btn-default mr-1">
          <i class="fas fa-angle-left" />
        </a>
        <a
          href="/calendar"
          on:click={prev}
          class="fullcalendar-btn-next btn btn-sm btn-default mr-1">
          <i class="fas fa-angle-right" />
        </a>
        <button
          class="btn btn-sm btn-default {defaultView === 'dayGridMonth' ? 'active' : ''}
          mr-1"
          on:click={() => {
            changeView('dayGridMonth');
          }}>
          Month
        </button>
        <button
          class="btn btn-sm btn-default {defaultView === 'dayGridWeek' ? 'active' : ''}
          mr-1"
          on:click={() => {
            changeView('dayGridWeek');
          }}>
          Week
        </button>
        <button
          class="btn btn-sm btn-default {defaultView === 'timeGridDay' ? 'active' : ''}
          mr-1"
          on:click={() => {
            changeView('timeGridDay');
          }}>
          Day
        </button>
      </div>
    </div>
  </BaseHeader>
  <div class="container-fluid mt--6">
    <div class="row">
      <div class="col">
        <!-- Fullcalendar -->
        <Card noBody className="card-calendar card">
          <!-- Card header -->
          <div slot="header">
            <!-- Title -->
            <h5 class="h3 mb-0">Calendar</h5>
          </div>
          <!-- Card body -->
          <div class="card-body p-0 card-calendar-body">
            <FullCalendar
              bind:this={calendarRef}
              {events}
              defaultDate={today}
              plugins={calendarPlugins}
              editable="true"
              contentHeight="auto"
              theme="false"
              selectable="true"
              selectHelper="true"
              ref="fullCalendar"
              class="calendar"
              on:dateClick={event => onDateClick(event.detail)}
              on:eventClick={event => onEventClick(event.detail)}
              {defaultView} />
          </div>
        </Card>
      </div>
    </div>
  </div>

  <Modal show={showAddModal} modalClasses="modal-secondary">
    <form class="new-event--form" on:submit={saveEvent}>
      <BaseInput
        label="Event title"
        placeholder="Event title"
        model="title"
        id="addEventInput"
        inputClasses="form-control-alternative new-event--title" />
      <div class="form-group">
        <label class="form-control-label d-block mb-3">Status color</label>
        <div class="btn-group btn-group-toggle btn-group-colors event-tag">
          {#each eventColors as color}
            <label
              key={color}
              class="btn {color}
              {model.className === color ? 'active focused' : ''}">
              <input
                type="radio"
                model={model.className}
                name="event-tag"
                value={color}
                on:click={() => changeColor(color)}
                autocomplete="off" />
            </label>
          {/each}
        </div>
      </div>
      <input type="hidden" class="new-event--start" />
      <input type="hidden" class="new-event--end" />
    </form>
    <div slot="footer" class="w-100 d-flex">
      <BaseButton
        type="primary"
        className="new-event--add mr-auto"
        on:click={saveEvent}>
        Add event
      </BaseButton>
      <BaseButton
        type="link"
        className="ml-auto"
        on:click={() => {
          showAddModal = false;
        }}>
        Close
      </BaseButton>
    </div>
  </Modal>

  <Modal show={showEditModal} modalClasses="modal-secondary">
    <form class="edit-event--form" on:submit={editEvent}>
      <BaseInput
        label="Event title"
        placeholder="Event title"
        model={model.title}
        id="editEventInput"
        value={model.title}
        inputClasses="form-control-alternative new-event--title" />
      <div class="form-group">
        <label class="form-control-label d-block mb-3">Status color</label>
        <div class="btn-group btn-group-toggle btn-group-colors event-tag">
          {#each eventColors as color}
            <label
              key={color}
              class="btn {color}
              {model.className === color ? 'active focused' : ''}">
              <input
                model={model.className}
                on:click={() => changeColor(color)}
                type="radio"
                name="event-tag"
                value={color}
                autocomplete="off" />
            </label>
          {/each}
        </div>
      </div>
      <BaseInput label="Description">
        <textarea
          model={model.description}
          class="form-control form-control-alternative edit-event--description
          textarea-autosize"
          id="eventDescription"
          value={model.description}
          placeholder="Event Desctiption" />
        <i class="form-group--bar" />
      </BaseInput>
      <input type="hidden" class="new-event--start" />
      <input type="hidden" class="new-event--end" />
    </form>

    <div slot="footer" class="w-100 d-flex">
      <BaseButton
        nativeType="submit"
        type="primary"
        className="new-event--add"
        on:click={editEvent}>
        Update
      </BaseButton>
      <BaseButton type="danger" on:click={deleteEvent} className="mr-auto">
        Delete
      </BaseButton>
      <BaseButton
        type="link"
        class="ml-auto"
        on:click={() => {
          showEditModal = false;
        }}>
        Close
      </BaseButton>
    </div>
  </Modal>
</div>
