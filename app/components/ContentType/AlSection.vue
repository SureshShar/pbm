<template>
  <section
    class="dark:bg-black-L1 bg-white-D2 py-10 md:py-20 lg:py-28"
  >
    <div class="container">
      <GenericSectionTitle
        :title="modelValue.title"
        :paragraph="modelValue.text"
        :center="true"
      />

      <GenericAIImageBot v-model="modelValue.trainingData" />
      <slot />
    </div>
  </section>
</template>

<script setup>
const modelValue = defineModel("modelValue");
</script>
