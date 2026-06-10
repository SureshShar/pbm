<template>
  <section class="py-10 md:py-20 lg:py-28 bg-black-L1">
    <div class="container">
      <GenericSectionTitle
        :title="modelValue.title"
        :paragraph="modelValue.paragraph"
        titleClass="text-bglight"
        :center="true"
      />

      <GenericScrollableGallery>
        <GenericTitleWithDescriptionCard
          v-for="(item, index) in modelValue.items"
          :key="index"
          :title="item.title"
          :paragraph="item.paragraph"
          :date="item.date"
          :showPin="true"
          class="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 h-auto mx-2"
        />
      </GenericScrollableGallery>

      <slot />
    </div>
  </section>
</template>

<script setup>
const modelValue = defineModel("modelValue");
</script>
