<template>
  <GenericScrollableGallery>
    <GenericTitleWithDescriptionCard
      v-for="(item, idx) in modelValue"
      :key="idx"
      :title="item.label"
      :paragraph="item.text"
      :date="item.date"
      :showPin="true"
      class="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 h-auto"
    >
      <LazyEditorSectionBlock
        v-if="showEditor"
        v-model="modelValue[idx]"
        @deleteItem="deleteItem(idx)"
        class="w-0 h-0"
        positionClass="absolute right-1 -top-2 w-6 h-6 p-1"
      />
    </GenericTitleWithDescriptionCard>
  </GenericScrollableGallery>

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
    label: "Lorem ipsum dolor",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa ut consectetur amet eveniet odio libero? Ratione corrupti, hic mollitia nobis quae aliquam rem! Tempora reprehenderit necessitatibus autem magnam cupiditate quos.",
    date: new Date().toLocaleDateString(),
  };

  modelValue.value.unshift(newItem);
}

function deleteItem(index) {
  if (Array.isArray(modelValue.value)) {
    modelValue.value.splice(index, 1);
  }
}
</script>
