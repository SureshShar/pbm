<template>
  <p
    class="bg-gray-200 dark:bg-gray-700 px-3 p-1 md:p-3 rounded-md"
  >
    <span
      class="w-full text-gray-800 dark:text-bglight"
      v-html="renderMarkdown(displayText)"
    ></span>
    <button
      v-if="showViewMoreButton"
      @click="toggleExpanded"
      class="inline text-sm ml-2 text-primary dark:text-secondary font-medium hover:underline"
    >
      {{ isExpanded ? "Hide" : "Show More" }}
    </button>
  </p>
</template>

<script setup>
const props = defineProps({
  renderMarkdown: {
    type: Function,
    default: (val) => val,
  },
  paragraph: {
    type: String,
    default: "",
  },
});

const isExpanded = ref(false);
let autoCollapseTimer = null;
const CHARACTER_LIMIT = 150;
const autoCollapseMs = 10000;

const showViewMoreButton = computed(
  () => props.paragraph && props.paragraph.length > CHARACTER_LIMIT
);

const displayText = computed(() =>
  !props.paragraph
    ? ""
    : !showViewMoreButton.value || isExpanded.value
    ? props.paragraph
    : props.paragraph.substring(0, CHARACTER_LIMIT) + "..."
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
