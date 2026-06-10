<template>
  <div id="blog_top" class="w-full px-4">
    <!-- Title -->
    <UniversalH2 :heading="modelValue[currentBlog].title" class="mb-8"/>

    <!-- Feature image -->
    <div
      v-if="modelValue[currentBlog].image.src"
      class="mb-10 w-full overflow-hidden rounded aspect-[97/60] sm:aspect-[97/44] bg-gray-300"
    >
      <img
        :src="modelValue[currentBlog].image.src"
        alt="image"
        fill
        class="w-full object-cover object-center"
      />
    </div>

    <!-- Editor -->
    <div class="w-full flex justify-end">
      <LazyEditorSectionBlock
        v-if="showEditor"
        v-model="modelValue[currentBlog]"
        @deleteItem="deleteItem(currentBlog)"
        class="w-auto"
        positionClass="w-6 h-6 p-1"
      />
    </div>

    <!-- Paragraphs -->
    <p
      v-for="(paragraph, i) in modelValue[currentBlog].paragraphs"
      :key="i"
      class="mb-4 text-base font-medium leading-relaxed text-black-L4 sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed"
    >
      {{ paragraph }}
    </p>
  </div>

  <!-- Pagination Controls -->
  <div class="w-full flex items-center gap-4 p-4">
    <button
      @click="prevBlog"
      :disabled="currentBlog === 0"
      class="p-1 text-sm rounded-full disabled:opacity-50 bg-black-L1 dark:bg-bglight"
    >
      <SvgIconsArrowDown
        class="w-5 h-5 rotate-90 text-bglight dark:text-primary"
      />
    </button>
    <span class="text-black-L3 dark:text-bglight font-medium">
      {{ currentBlog + 1 }} out of {{ modelValue.length }}
    </span>
    <button
      @click="nextBlog"
      :disabled="currentBlog === modelValue.length - 1"
      class="p-1 text-sm rounded-full disabled:opacity-50 bg-black-L1 dark:bg-bglight"
    >
      <SvgIconsArrowDown
        class="w-5 h-5 -rotate-90 text-bglight dark:text-primary"
      />
    </button>
  </div>

  <!-- Add new item button -->
  <SvgIconsPlus
    v-if="showEditor && isEditMode"
    @click="addItem"
    class="w-9 h-9 p-1 bg-primary text-white-D1 rounded cursor-pointer ml-6 mt-6"
  />
</template>

<script setup>
defineProps({
  showEditor: {
    type: Boolean,
    default: true,
  },
});

const dummbyBlog = ref(null);
const currentBlog = ref(0);

// Global edit mode via local storage
const { getLocalData } = useLocalStorage();
const modelValue = defineModel("modelValue");
const isEditMode = computed(() => getLocalData("editMode") === true);

function addItem() {
  modelValue.value.unshift({
    ...dummbyBlog.value,
    id: getUserId(),
  });
}

function deleteItem(index) {
  if (Array.isArray(modelValue.value)) {
    modelValue.value.splice(index, 1);
  }
}

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function nextBlog() {
  if (currentBlog.value < modelValue.value.length - 1) {
    currentBlog.value++;
    scrollToSection("blog_top");
  }
}

function prevBlog() {
  if (currentBlog.value > 0) {
    currentBlog.value--;
    scrollToSection("blog_top");
  }
}

onMounted(async () => {
  const { contentTypes } = await import("@/utils/standard/constants.js");
  dummbyBlog.value = contentTypes.blog;
});
</script>
