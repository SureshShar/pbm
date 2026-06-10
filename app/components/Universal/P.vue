<template>
    <p class="w-full text-base lg:text-lg text-bgblack dark:text-bglight">
      {{ paragraph }}  <slot/>
    </p>
</template>

<script setup>
defineProps({
  paragraph: {
    type: String,
    default: "",
  },
});
</script>