<template>
  <div class="card card-calendar">
    <div class="card-body">
      <div id="fullCalendar"></div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridDay from "@fullcalendar/timegrid";

const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();
export default {
  methods: {
    initCalendar() {
      var calendarEl = document.getElementById("fullCalendar");

      var calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, timeGridDay, interactionPlugin],
        selectable: true,
        headerToolbar: {
          center: "dayGridMonth,timeGridWeek,timeGridDay",
          right: "prev,next,today",
        },
        buttonIcons: {
          prev: "fc-icon-chevron-left",
          next: "fc-icon-chevron-right",
          prevYear: "fc-icon-chevron-left",
          nextYear: "fc-icon-chevron-right",
        },
        select: function (info) {
          // on select we show the Sweet Alert modal with an input
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
          });

          swalWithBootstrapButtons
            .fire({
              title: "Create an Event",
              html: `<div class="form-group">
              <input type="text" id="vnud-input" class="form-control">
              </div>`,
              showCancelButton: true,
            })
            .then(() => {
              let event_title = document.getElementById("vnud-input").value;

              if (event_title) {
                calendar.addEvent({
                  title: event_title,
                  start: info.startStr,
                  end: info.endStr,
                });
              }
            });
        },
        events: [
          {
            title: "All Day Event",
            start: new Date(y, m, 1),
            className: "event-default",
          },
          {
            id: 999,
            title: "Repeating Event",
            start: new Date(y, m, d - 4, 6, 0),
            allDay: false,
            className: "event-green",
          },
          {
            id: 999,
            title: "Repeating Event",
            start: new Date(y, m, d + 3, 6, 0),
            allDay: false,
            className: "event-orange",
          },
          {
            title: "Meeting",
            start: new Date(y, m, d - 1, 10, 30),
            allDay: false,
            className: "event-green",
          },
          {
            title: "Lunch",
            start: new Date(y, m, d + 7, 12, 0),
            end: new Date(y, m, d + 7, 14, 0),
            allDay: false,
            className: "event-red",
          },
          {
            title: "Md-pro Launch",
            start: new Date(y, m, d - 2, 12, 0),
            allDay: true,
            className: "event-azure",
          },
          {
            title: "Birthday Party",
            start: new Date(y, m, d + 1, 19, 0),
            end: new Date(y, m, d + 1, 22, 30),
            allDay: false,
            className: "event-azure",
          },
          {
            title: "Click for Creative Tim",
            start: new Date(y, m, 21),
            end: new Date(y, m, 22),
            url: "http://www.creative-tim.com/",
            className: "event-orange",
          },
          {
            title: "Click for Google",
            start: new Date(y, m, 21),
            end: new Date(y, m, 22),
            url: "http://www.creative-tim.com/",
            className: "event-orange",
          },
        ],
      });
      calendar.render();
    },
  },
  mounted() {
    this.initCalendar();
  },
};
</script>
<style></style>
