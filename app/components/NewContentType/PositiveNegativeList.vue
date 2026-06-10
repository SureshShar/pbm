<template>
  <div
    class="bg-white dark:bg-black-L1 dark:border-black-L1 shadow-two dark:text-bglight rounded-md p-6"
  >
    <h2 class="text-xl font-bold">{{ modelValue.label }}</h2>
    <ul class="mt-4 grid grid-cols-1 gap-3">
      <li
        v-for="(item, key) in modelValue.items"
        :key="key"
        class="flex gap-3 items-start"
      >
        <div>
          <span
            class="mt-1 inline-flex w-5 h-5 items-center justify-center rounded-full bg-teal-100 text-teal-700"
          >
            ✓
          </span>
        </div>
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const modelValue = defineModel("modelValue");
</script>
