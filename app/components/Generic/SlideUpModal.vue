<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="closeModal"
    ></div>
  </transition>

  <!-- Modal Content -->
  <transition name="slide-up">
    <div
      v-if="modelValue"
      :class="['fixed bottom-0 left-0 w-full rounded-t-md shadow-three z-50', bgClass]"
    >
      <div class="mx-auto p-4 max-h-[95vh] max-w-4xl overflow-hidden">
        <div class="flex items-center justify-between p-2 md:p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="min-w-0">
            <slot name="header"></slot>
          </div>
          <button
            @click="closeModal"
            class="py-1 px-2 text-sm md:text-base rounded bg-primary text-bglight hover:bg-primary/50"
            aria-label="Close"
          > ✕ </button>
        </div>

        <!-- Default/body slot -->
        <div class="w-full overflow-hidden">
          <div class="max-h-[75vh] md:max-h-[60vh] overflow-y-scroll p-2 md:p-4">
            <slot></slot>
          </div>
        </div>

        <!-- Footer slot -->
        <div
          v-if="footer"
          class="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700"
        >
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  bgClass: {
    type: String,
    default: "bg-bglight dark:bg-black-L1",
  },
  footer: {
    type: Boolean,
    default: true
  }
});

const modelValue = defineModel("modelValue");

function closeModal() {
  modelValue.value = false;
}
</script>
