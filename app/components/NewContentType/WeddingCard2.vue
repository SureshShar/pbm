<template>
  <section class="w-full grid md:grid-cols-2 gap-6">
    <LazyNewContentTypeWeddingCard v-model="modelValue.wedding" />
    <LazyNewContentTypePositiveNegativeList v-model="modelValue.listing" />
  </section>
</template>

<script setup>
const modelValue = defineModel("modelValue");
</script>
