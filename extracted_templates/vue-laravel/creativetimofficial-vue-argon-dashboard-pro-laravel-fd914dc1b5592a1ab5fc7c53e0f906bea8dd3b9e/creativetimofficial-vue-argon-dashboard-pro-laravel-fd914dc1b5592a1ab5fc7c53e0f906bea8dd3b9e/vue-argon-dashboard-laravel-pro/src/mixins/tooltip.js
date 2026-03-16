/* eslint-disable */
export default {
    data() {
        return {
            tooltipTriggerList: null,
            tooltipList: null,
        }
    },
    methods: {
        setTooltip(bootstrap){
            this.tooltipTriggerList = [].slice.call(
                document.querySelectorAll('[data-bs-toggle="tooltip"]')
              );
              this.tooltipList = this.tooltipTriggerList.map(function (tooltipTriggerEl) {
              return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        },
        removeTooltip(){
            this.tooltipList.forEach(function (tooltip, index) {
                tooltip.dispose();
            });
        }
    }
}