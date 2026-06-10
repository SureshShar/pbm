<template>
  <div
    id="social-link"
    class="w-full flex gap-4 items-center justify-center pb-8"
  >
    <div v-for="(item, idx) in modelValue" :key="idx" class="relative">
      <a
        :href="item.href"
        aria-label="social-link"
        target="_blank"
        rel="noopener"
        class="relative dark:text-black-L5 text-black-L4 duration-300 hover:text-primary dark:hover:text-primary"
      >
        <img
          :src="item.image.src"
          alt="about img"
          class="drop-shadow-three dark:drop-shadow-none object-contain w-12 md:w-16 h-12 md:h-16 bg-primary/40 rounded-md p-1"
        />
      </a>
      <span v-if="showEditor" class="w-full flex items-center justify-end">
        <LazyEditorSectionBlock
          v-model="modelValue[idx]"
          @deleteItem="deleteItem(idx)"
          class="w-0 h-0"
          positionClass="absolute right-0 -top-3 w-6 h-6 p-1"
        />
      </span>
    </div>
    <SvgIconsPlus
      v-if="showEditor && isEditMode"
      @click="addItem"
      class="w-7 h-7 p-1 bg-primary text-white-D1 rounded ml-2"
    />
  </div>
</template>

<script setup>
defineProps({
  showEditor: {
    type: Boolean,
    default: true,
  },
});

const modelValue = defineModel("modelValue");

// Global edit mode via local storage
const { getLocalData } = useLocalStorage();
const isEditMode = computed(() => !!getLocalData("editMode"));

function addItem() {
  const newItem = {
    id: getUserId(),
    image: {
      src: "/images/socialMedia/2.svg",
      alt: "facebook",
    },
    href: "https://www.facebook.com/@mukeshsoni",
  };

  modelValue.value.push(newItem);
}

function deleteItem(index) {
  if (Array.isArray(modelValue.value)) {
    modelValue.value.splice(index, 1);
  }
}
</script>
