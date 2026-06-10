<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="text-start mb-2 block text-base text-gray-400 dark:text-gray-600"
    >
      {{ label }}
    </label>
    
    <select
      v-model="modelValue"
      :id="id"
      :name="name"
      class="dark:text-white dark:shadow-two w-full rounded-sm border bg-white-D1 px-2 md:px-4 py-2 text-base text-black-L2 outline-none gray-300 dark:bg-black-L3"
    >
      <!-- Always present placeholder -->
      <option v-if="placeholder" value="">
        {{ placeholder }}
      </option>

      <!-- Options -->
      <option
        v-for="(option, idx) in options"
        :key="idx"
        :value="option.value || option"
      >
        {{ option.label || option }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "select",
  },
  id: {
    type: String,
    default: () => `select-${Math.random().toString(36).slice(2, 9)}`,
  },
  placeholder: {
    type: String,
    default: "Select an option",
  },
  options: {
    type: Array,
    default: () => [],
  },
});

// options = [{value: "to assign on click to modal", label: "to show in option"}]
const modelValue = defineModel("modelValue");
</script>
