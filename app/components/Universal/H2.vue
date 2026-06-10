<template>
  <h2
    class="font-bold text-bgblack dark:text-bglight text-xl sm:text-2xl lg:text-2xl xl:text-3xl"
  >
    {{ heading }} <slot />
  </h2>
</template>
<!-- <UniversalH2 :heading="" /> -->

<script setup>
defineProps({
  heading: {
    type: String,
    default: "",
  },
});
</script>
