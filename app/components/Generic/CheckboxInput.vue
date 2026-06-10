<template>
  <div class="flex items-center">
    <input
      v-model="modelValue"
      id="link-checkbox"
      type="checkbox"
      class="flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded border border-opacity-20 dark:border-white dark:border-opacity-10"
    />
    <label
      for="link-checkbox"
      class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "Label",
  },
});

const modelValue = defineModel("modelValue");
</script>
