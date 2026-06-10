<template>
  <div class="my-4 flex">
    <span
      @click="toggleState(true)"
      :class="[
        modelValue
          ? 'pointer-events-none text-primary'
          : 'text-dark dark:text-white',
        'mr-4 cursor-pointer text-sm md:text-base',
      ]"
    >
      {{ firstLabel }}
    </span>
    <div
      @click="toggleState(!modelValue)"
      class="flex cursor-pointer items-center"
    >
      <div class="relative">
        <div class="h-5 w-14 rounded-full bg-bgblack dark:bg-bglight shadow-inner"></div>
        <div
          :class="[
            modelValue ? '' : 'translate-x-full',
            'shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full bg-primary transition',
          ]"
        >
          <span class="active h-4 w-4 rounded-full bg-white"></span>
        </div>
      </div>
    </div>
    <span
      @click="toggleState(false)"
      :class="[
        modelValue
          ? 'text-dark dark:text-white'
          : 'pointer-events-none text-primary',
        'ml-4 cursor-pointer text-sm md:text-base',
      ]"
    >
      {{ secondLabel }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  firstLabel: {
    type: String,
    default: "Sold",
  },
  secondLabel: {
    type: String,
    default: "Available",
  },
});

const modelValue = defineModel("modelValue");

function toggleState(value) {
  modelValue.value = value;
}
</script>
