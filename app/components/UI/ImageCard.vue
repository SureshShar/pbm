<template>
  <div v-for="(item, idx) in modelValue" class="py-2 md:py-6 flex flex-wrap items-center">
      <!-- Editable Image -->
      <div class="relative w-full px-2 lg:w-1/3">
        <div
          class="mx-auto mb-12 lg:m-0 bg-gray-400 rounded-lg overflow-hidden"
          data-wow-delay=".15s"
        >
          <img
            :src="item.image.src || useRandomBgUrl()"
            alt="about img"
            class="drop-shadow-three dark:drop-shadow-none object-contain w-full h-fit"
          />
        </div>
      </div>

      <!-- Editable Text -->
      <div class="w-full px-4 lg:w-2/3">
        <div class="mb-4 md:mb-9 text-center md:text-left">
          <!-- Editable Heading -->
          <h3 class="mb-4 text-2xl font-bold text-bgblack dark:text-bglight">
            {{ item.title }}
          </h3>

          <!-- Editable Paragraph -->
          <p
            class="text-base font-medium leading-relaxed text-black-L4 sm:text-lg sm:leading-relaxed"
          >
            {{ item.text }}
          </p>
        </div>
        <!-- <LazyEditorSectionBlock v-model="modelValue[idx]" class="w-auto" positionClass="w-6 h-6 p-1" /> -->
        <LazyEditorMainParent
          v-if="showEditor"
          v-model="modelValue[idx]"
          class="p-2"
        />
      </div>
    <!-- </div> -->
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
</script>
