//removal of Tooltips
export default function removeTooltip() {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll(".bs-tooltip-top")
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return tooltipTriggerEl.remove();
    });
  }
  