<template>
  <h1
    class="font-bold text-black-L1 dark:text-white-D2 text-lg lg:text-xl"
  >
    {{ heading }} <slot />
  </h1>
</template>
<!-- <UniversalH3 :heading="" /> -->

<script setup>
defineProps({
  heading: {
    type: String,
    default: "",
  },
});
</script>
