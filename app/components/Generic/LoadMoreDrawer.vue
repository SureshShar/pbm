<template>
  <div class="w-full">
    <!-- Divider: Using theme neutrals for dark/light mode -->
    <div
      class="my-6 md:my-10 flex items-center gap-4 before:h-px before:flex-1 before:bg-white-1 dark:before:bg-black-3 after:h-px after:flex-1 after:bg-white-1 dark:after:bg-black-3"
    >
      <button
        type="button"
        @click="toggle = !toggle"
        class="flex items-center gap-2 rounded-full bg-secondary px-5 py-2 text-sm md:text-base font-bold text-primary shadow-btn hover:shadow-btn-hover hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <SvgIconsArrowDown
          :class="[
            'w-5 h-5 duration-300 ease-in-out',
            toggle ? 'rotate-180' : '',
          ]"
        />
        <span>{{ toggle ? "Hide" : "View" }} {{ title }}</span>
      </button>
    </div>

    <!-- Content Slot with subtle padding -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="toggle" class="pb-4">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Title comes here",
  },
});

const toggle = ref(false);
</script>
