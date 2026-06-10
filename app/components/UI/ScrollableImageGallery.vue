<template>
  <GenericScrollableGallery>
    <div
      v-for="(item, idx) in modelValue"
      :key="idx"
      class="relative flex-shrink-0 w-auto h-auto text-center"
    >
      <img
        :src="item.image?.src || useRandomBgUrl()"
        :alt="item.image?.alt"
        class="h-72 w-auto object-cover shadow-two dark:shadow-three dark:hover:shadow-black-L1 rounded-sm mx-auto"
      />

      <p
        v-if="item.label?.trim() || isEditMode"
        class="absolute flex gap-2 bottom-0 right-0 mt-2 bg-black-L1 bg-opacity-95 text-base text-bglight px-4 py-2"
      >
       <span>{{ item.label?.trim() }}</span>
        <LazyEditorSectionBlock
          v-if="showEditor"
          v-model="modelValue[idx]"
          @deleteItem="deleteItem(idx)"
          class="w-auto"
          positionClass="w-6 h-6 p-1"
        />
      </p>
    </div>
  </GenericScrollableGallery>

  <!-- Add new item button -->
  <SvgIconsPlus
    v-if="showEditor && isEditMode"
    @click="addItem"
    class="w-7 h-7 p-1 bg-primary text-white-D1 rounded cursor-pointer ml-3 mt-3"
  />
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

const isEditMode = computed(() => getLocalData("editMode") === true);

function addItem() {
  const newItem = {
    id: getUserId(),
    label: "",
    image: {
      src: useRandomBgUrl(),
      alt: "image",
    },
  };

  modelValue.value.unshift(newItem);
}

function deleteItem(index) {
  if (Array.isArray(modelValue.value)) {
    modelValue.value.splice(index, 1);
  }
}
</script>
