<script>
  import BaseCheckbox from "../../components/Inputs/BaseCheckbox.svelte";
  let items = [
    {
      id: 1,
      title: "Call with Dave",
      description: "10:30 AM",
      done: true,
      checkType: "success"
    },
    {
      id: 2,
      title: "Lunch meeting",
      description: "10:30 AM",
      done: false,
      checkType: "warning"
    },
    {
      id: 3,
      title: "Argon Dashboard Launch",
      description: "10:30 AM",
      done: false,
      checkType: "info"
    },
    {
      id: 4,
      title: "Winter Hackaton",
      description: "10:30 AM",
      done: true,
      checkType: "danger"
    }
  ];

  function changeList(item) {
    if (item.done === true) {
      item.done = false;
      document
        .getElementById(item.id)
        .classList.remove("checklist-item-checked");
    } else {
      item.done = true;
      document.getElementById(item.id).classList.add("checklist-item-checked");
    }
  }
</script>

<div class="list-group list-group-flush" data-toggle="checklist">
  {#each items as item}
    <div
      class="list-group-item checklist-entry flex-column align-items-start py-4
      px-4"
      key={item.title}>
      <div
        class="checklist-item {item.done === true ? 'checklist-item-checked' : ''}
        checklist-item-{item.checkType}"
        id={item.id}>
        <div class="checklist-info">
          <h5 class="checklist-title mb-0">{item.title}</h5>
          <small>{item.description}</small>
        </div>
        <div>
          <BaseCheckbox
            on:click={() => changeList(item)}
            model={item.done === true ? 'checked' : ''}
            type={item.checkType} />
        </div>
      </div>
    </div>
  {/each}
</div>
