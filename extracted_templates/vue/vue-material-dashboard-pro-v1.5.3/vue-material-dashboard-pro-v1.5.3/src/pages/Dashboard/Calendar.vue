<template>
  <div>
    <div class="header text-center">
      <h3 class="title">FullCalendar.io</h3>
      <p class="category">
        Handcrafted by our friends from
        <a target="_blank" href="https://fullcalendar.io/">FullCalendar.io</a>.
        Please checkout the
        <a href="https://fullcalendar.io/docs" target="_blank"
          >full documentation</a
        >.
      </p>
    </div>

    <div class="md-layout">
      <div class="md-layout-item md-size-80 mx-auto">
        <md-card class="md-card-calendar">
          <md-card-content>
            <fullCalendar ref="calendar" :options="calendarOptions" />
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import Swal from "sweetalert2";

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          center: "dayGridMonth,timeGridWeek,timeGridDay",
          right: "prev,next,today",
        },
        initialView: "dayGridMonth",
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
      },
      currentEvents: [],
    };
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },

    handleDateSelect(selectInfo) {
      // on select we show the Sweet Alert modal with an input

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "md-button md-success",
          cancelButton: "md-button md-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Create an Event",
          html: `<div class="md-field md-theme-default">
          <input type="text" id="md-input" class="md-input">
          </div>`,
          showCancelButton: true,
        })
        .then(() => {
          var title = document.getElementById("md-input").value;
          let calendarApi = selectInfo.view.calendar;

          calendarApi.unselect(); // clear date selection

          if (title) {
            calendarApi.addEvent({
              id: createEventId(),
              title,
              start: selectInfo.startStr,
              end: selectInfo.endStr,
              allDay: selectInfo.allDay,
            });
          }
        });
    },

    handleEventClick(clickInfo) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
      }
    },

    handleEvents(events) {
      this.currentEvents = events;
    },
  },
};
</script>
<style lang="scss" scoped>
#fullCalendar {
  min-height: 300px;
}

.md-card-calendar {
  .md-card-content {
    padding: 0 !important;
  }
}

.text-center {
  text-align: center;
}
</style>
