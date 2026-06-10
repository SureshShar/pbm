<template>
  <section class="py-10 md:py-20 lg:py-28">
    <div class="container">
      <GenericSectionTitle
        :title="modelValue.title"
        :paragraph="modelValue.paragraph"
        :center="true"
      />
      <template v-for="(child, i) in modelValue.childs" :key="i">
        <UISkillTags
          v-if="child.selectedType === 'tagsCard'"
          v-model="modelValue.childs[i]"
        />
      </template>
      <slot />
    </div>
  </section>
</template>

<script setup>
const modelValue = defineModel("modelValue");
</script>
