<template>
  <div
    class="w-full md:w-9/12 mx-auto shadow-two border border-gray-200 dark:border-black-L1 mb-12 rounded-md px-4 md:px-8 py-8"
    :class="[bgClass]"
  >
    <slot />
  </div>
  <!-- <UniversalCard></UniversalCard> -->
</template>

<script setup>
defineProps({
  bgClass: {
    type: String,
    default: "dark:bg-black-L1 bg-bglight",
  },
});
</script>
