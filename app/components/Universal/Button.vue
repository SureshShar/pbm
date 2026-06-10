<template>
  <button
    :class="[disabled ? 'bg-primary/50 cursor-not-allowed' : isActive ? 'bg-tertiary' : 'bg-primary hover:bg-primary/90', 'shadow-submit dark:shadow-submit-black-L2 rounded-sm px-4 md:px-9 py-2 md:py-4 text-base font-medium text-bglight duration-300 focus:bg-tertiary']"
    :disabled="disabled"
    @click="$emit('clicked')"
  >
    {{ heading }} <slot/>
  </button>

  <!-- How to use it
  <UniversalButton
    heading="Show Page"
    @clicked="navigateTo(`/${userId}`)"
    :disabled="!userId"
  /> -->
</template>

<script setup>
defineProps({
  heading: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
