<template>
  <div class="mx-4">
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
      <GenericListItem
        v-for="(item, idx) in modelValue"
        :key="idx"
        :title="item.label"
        :text="item.text"
      >
        <LazyEditorSectionBlock
          v-if="isEditMode"
          v-model="modelValue[idx]"
          @deleteItem="deleteItem(idx)"
          class="w-0 h-0"
          positionClass="absolute right-1 -top-8 w-6 h-6 p-1"
        />
      </GenericListItem>
    </ul>
  
    <SvgIconsPlus
      v-if="isEditMode"
      @click="addItem"
      class="w-7 h-7 p-1 bg-primary text-white-D1 rounded cursor-pointer ml-3 mt-3"
    />
  </div>
</template>

<script setup>
const modelValue = defineModel("modelValue");

// Global edit mode via local storage
const { getLocalData } = useLocalStorage();
const isEditMode = computed(() => getLocalData("editMode") === true);

function addItem() {
  const newItem = {
    id: getUserId(),
    label: "Listing Title",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa ut consectetur amet eveniet odio libero? Ratione corrupti, hic mollitia nobis quae aliquam rem! Tempora reprehenderit necessitatibus autem magnam cupiditate quos.",
    // date: new Date().toLocaleDateString(),
  };

  modelValue.value.unshift(newItem);
}

function deleteItem(index) {
  if (Array.isArray(modelValue.value)) {
    modelValue.value.splice(index, 1);
  }
}
</script>
