<template>
  <h1
    class="font-bold text-black-L1 dark:text-white-D2 text-xl lg:text-2xl"
  >
    {{ heading }} <slot />
  </h1>
</template>
<!-- <UniversalH1 :heading="" /> -->

<script setup>
defineProps({
  heading: {
    type: String,
    default: "",
  },
});
</script>
