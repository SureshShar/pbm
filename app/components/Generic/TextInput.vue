<template>
  <div>
    <div class="flex items-center justify-between">
      <!-- :for="name" -->
      <label
        class="flex items-center justify-center text-start mb-1 md:mb-3 text-base text-gray-400 dark:text-gray-600 line-clamp-1 truncate"
      >
        {{ label }} <span v-if="showStar" class="text-red-500 text-2xl px-2">*</span>
      </label>
      <slot></slot>
    </div>
    <!-- :id="name" -->
    <input
      :value="modelValue"
      :name="name"
      :min="min"
      :max="max"
      :placeholder="placeholder"
      @input="event => modelValue = event.target.value"
      :type="type"
      class="dark:text-white dark:shadow-two w-full rounded-sm border bg-white-D1 px-2 md:px-6 py-1 md:py-3 text-base text-black-L2 outline-none border-gray-300 dark:bg-black-L3"
    />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: "Label",
  },
  name: {
    type: String,
    default: "input",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "Enter value",
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  showStar: {
    type: Boolean,
    default: false,
  },
});

const modelValue = defineModel("modelValue");
</script>

<!-- 
  <GenericTextInput
    class="mb-8"
    type="mail"
    label="Your Email"
    placeholder="Enter your email"
  /> 
  <div class="w-full px-4 md:w-1/2">
    <GenericTextInput
      v-model="userId"
      class="mb-8"
      type="mail"
      label="Your user Id ?"
      placeholder="Select you user Id"
    />
  </div>
-->
