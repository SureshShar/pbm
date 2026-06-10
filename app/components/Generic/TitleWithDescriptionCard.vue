<template>
  <div
    class="relative shadow-two border border-gray-300 dark:border-white-D1 rounded-md dark:shadow-three dark:hover:shadow-black-L1 bg-white-D1 dark:bg-gray-700 p-4 md:p-8 duration-300 hover:shadow-one"
  >
    <h3
      class="mb-4 text-2xl font-bold leading-tight text-bgblack dark:text-bglight"
    >
      {{ title }}
    </h3>
    <p 
      class="text-base leading-relaxed text-black-L4 dark:text-bglight"
      :class="date ? 'mb-5 border-b border-black-L4 border-opacity-10 dark:border-bglight dark:border-opacity-10 pb-4 md:pb-8' : ''"
    >
      {{ displayText }}
      <button
        v-if="showViewMoreButton"
        @click="toggleExpanded"
        class="text-sm ml-2 text-primary dark:text-secondary font-medium hover:underline"
      >
        {{ isExpanded ? "View Less" : "View More" }}
      </button>
    </p>
    <div v-if="date" class="flex items-center"><p class="text-sm text-black-L4" v-if="date">Date: {{ date }}</p></div>
    
    <LazySvgIconsPin
      v-if="showPin"
      class="text-primary dark:text-secondary h-10 w-10 absolute top-0 -right-1"
    />
    <div class="w-full flex justify-end">
      <slot />  
    </div>
  </div>
</template>

<script setup>
const { showPin, title, paragraph, date } = defineProps({
  showPin: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  paragraph: {
    type: String,
    default: "",
  },
  date: {
    type: [String, Number, Date],
    default: "",
  },
});

const isExpanded = ref(false);
let autoCollapseTimer = null;
const CHARACTER_LIMIT = 181;
const autoCollapseMs = 5000;

const showViewMoreButton = computed(
  () => paragraph && paragraph.length > CHARACTER_LIMIT
);

const displayText = computed(() =>
  !paragraph
    ? ""
    : !showViewMoreButton.value || isExpanded.value
    ? paragraph
    : paragraph.substring(0, CHARACTER_LIMIT) + "..."
);

function toggleExpanded() {
  isExpanded.value = !isExpanded.value;
  if (autoCollapseTimer) clearTimeout(autoCollapseTimer);

  if (isExpanded.value) {
    autoCollapseTimer = setTimeout(() => {
      isExpanded.value = false;
      autoCollapseTimer = null;
    }, autoCollapseMs);
  }
}

onUnmounted(() => {
  if (autoCollapseTimer) clearTimeout(autoCollapseTimer);
});
</script>
