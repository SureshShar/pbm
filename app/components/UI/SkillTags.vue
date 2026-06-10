<template>
  <div class="mx-2">
    <h3
      class="mb-4 text-xl md:text-2xl font-semibold text-bgblack dark:border-bglight dark:border-opacity-10 dark:text-bglight"
    >
      {{ modelValue.title }}
    </h3>
    <div class="flex flex-wrap justify-center items-center">
      <div class="flex" v-for="(item, i) in modelValue.items" :key="i">
        <div
          class="shadow-one bg-white-D2 mb-3 mr-3 inline-flex items-center justify-center rounded-md px-4 py-2 text-md md:text-lg text-bgblack duration-300 hover:bg-primary hover:text-bglight dark:bg-black-L3 dark:text-bglight dark:hover:bg-primary"
        >
          <span>{{ item.label }}</span>
          <template v-if="item.resource">
            <a
              :href="item.resource"
              target="_blank"
              rel="noopener"
              class="ml-2 text-primary underline hover:text-bglight"
              download
            >
              Download
            </a>
          </template>
        </div>
        <LazyEditorSectionBlock
          v-if="showEditor"
          v-model="modelValue.items[i]"
          @deleteItem="deleteItem(i)"
          class="w-0 h-0"
        />
      </div>
      <SvgIconsPlus
        v-if="showEditor && isEditMode"
        @click="addItem"
        class="w-7 h-7 p-1 bg-primary text-white-D1 rounded ml-2"
      />
    </div>
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

const isEditMode = computed(() => getLocalData("editMode") === true);

function addItem() {
  const newItem = {
    id: getUserId(),
    label: "New skill",
    resource: "",
  };

  modelValue.value.items.push(newItem);
}

function deleteItem(index) {
  if (Array.isArray(modelValue.value.items)) {
    modelValue.value.items.splice(index, 1);
  }
}
</script>
