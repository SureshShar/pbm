<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50" @click="close"></div>

      <!-- Panel -->
      <div
        :class="[
          'relative z-10 w-full rounded-md bg-bglight dark:bg-black-L1 shadow-three',
          classes,
        ]"
      >
        <!-- Header slot -->
        <div
          class="flex items-center justify-between p-2 md:p-4 border-b border-gray-200 dark:border-gray-700"
        >
          <div class="min-w-0">
            <slot name="header"></slot>
          </div>
          <button
            @click="close"
            class="py-1 px-2 rounded bg-primary text-bglight hover:bg-primary/50"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <!-- Default/body slot -->
        <div class="w-full overflow-hidden">
          <div class="max-h-[75vh] md:max-h-[60vh] overflow-y-auto p-2 md:p-4">
            <slot></slot>
          </div>
        </div>

        <!-- Footer slot -->
        <div
          class="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700"
        >
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<!-- 
<GenericModal v-model="modelValue">
  <template #header>
    Items for header
  </template>
    Items for body
  <template #footer>
    Goes here
  </template>
</GenericModal> 
-->

<script setup>
defineProps({
  classes: {
    type: String,
    default: "max-h-[90vh] max-w-[95vw] mx-2",
  },
});

const modelValue = defineModel("modelValue");

// toggle v-model off
function close() {
  modelValue.value = false;
}
</script>
