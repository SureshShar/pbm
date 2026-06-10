<template>
  <div class="flex items-center">
    <GenericModal v-model="modelValue">
        <template #header>
            <div class="text-lg font-semibold dark:text-bglight pr-2">
                Upload Images. <span class="block text-gray-500 text-base">Don't upload more than 12 images</span>
            </div>
        </template>
        <FeaturesImageUpload v-model="modelValue" :pageId />
    </GenericModal>
  </div>
</template>

<script setup>
defineProps({
  pageId: {
    type: String,
    default: null,
  },
});

const modelValue = defineModel("modelValue");
</script>
