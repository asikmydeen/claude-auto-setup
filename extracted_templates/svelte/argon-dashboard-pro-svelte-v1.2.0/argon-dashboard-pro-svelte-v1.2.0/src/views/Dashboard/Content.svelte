<script>
  import { fade } from "svelte/transition";
</script>

<div
  in:fade={{ duration: 500 }}
  out:fade={{ duration: 100 }}
  class="content">
  <slot />
</div>