<template>
  <li>
    <UniversalP>
      <span v-if="title" class="text-primary font-bold">
        <SvgIconsStar
          v-if="showStore"
          class="text-primary h-5 w-5 inline mb-1"
        />
        {{ title }}:
      </span>
      <span>
        {{ displayText }}
        <button
          v-if="showViewMoreButton"
          @click="toggleExpanded"
          class="text-sm ml-2 text-primary dark:text-secondary font-medium hover:underline"
        >
          {{ isExpanded ? "View Less" : "View More" }}
        </button>
      </span>
      <div class="w-full flex justify-end">
        <slot />
      </div>
    </UniversalP>
  </li>
</template>

<script setup>
const { showStore, title, text } = defineProps({
  showStore: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
});

const isExpanded = ref(false);
let autoCollapseTimer = null;
const CHARACTER_LIMIT = 181;
const autoCollapseMs = 7000;

const showViewMoreButton = computed(() => text && text.length > CHARACTER_LIMIT);
const displayText = computed(() =>
  !text
    ? ""
    : !showViewMoreButton.value || isExpanded.value
    ? text
    : text.substring(0, CHARACTER_LIMIT) + "..."
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
