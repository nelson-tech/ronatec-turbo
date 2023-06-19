<script lang="ts">
  // https://github.com/unocss/unocss#style-resetting
  import "@unocss/reset/tailwind.css";
  // https://github.com/unocss/unocss/tree/main/packages/vite#installation
  import "uno.css";
</script>

<div class="h-full w-full text-white bg-[hsl(0,0%,2%)]">
  <slot />
</div>
