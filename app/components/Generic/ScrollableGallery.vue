<template>
  <div class="relative w-full px-1 md:px-3">
    <div
      ref="scrollContainer"
      style="scrollbar-width: none"
      :class="[classes, 'flex overflow-x-auto scroll-smooth']"
      @scroll="checkScroll"
    >
      <slot />
    </div>

    <button
      v-for="btn in buttons"
      :key="btn.direction"
      @click="handleScroll(btn.offset)"
      :disabled="btn.isDisabled"
      :class="[
        btn.classes,
        btn.isDisabled ? 'bg-black-L4' : 'bg-black-L1 dark:bg-bglight',
        'absolute -top-6 md:-top-10 -translate-y-1/2 p-1 rounded-full shadow-one hover:shadow-three opacity-80 disabled:cursor-not-allowed',
      ]"
      :aria-label="btn.label"
      >
      <SvgIconsArrowDown
        :class="['w-5 h-5 md:w-8 md:h-8', btn.iconClass]"
      />
    </button>
  </div>
</template>

<script setup>
defineProps({
  classes: {
    type: String,
    default: "space-x-6 mx-2",
  }
});

const scrollContainer = ref(null);
const isAtStart = ref(true);
const isAtEnd = ref(false);

const buttons = computed(() => [
  {
    direction: 'left',
    offset: -350,
    isDisabled: isAtStart.value,
    classes: "right-14 md:right-20",
    iconClass: "rotate-90 text-bglight dark:text-primary",
    label: "Scroll left"
  },
  {
    direction: 'right',
    offset: 350,
    isDisabled: isAtEnd.value,
    classes: "right-2 md:right-0",
    iconClass: "-rotate-90 text-bglight dark:text-primary",
    label: "Scroll right"
  }
]);

function checkScroll() {
  const el = scrollContainer.value;
  if (!el) return;

  isAtStart.value = el.scrollLeft <= 0;
  isAtEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
}

async function handleScroll(offset) {
  const el = scrollContainer.value;
  if (!el) return;

  el.scrollLeft += offset;
  
  // Wait for the next frame before checking scroll
  await nextTick();
  requestAnimationFrame(checkScroll);
}

// onMounted(checkScroll);
onUpdated(checkScroll);
</script>
