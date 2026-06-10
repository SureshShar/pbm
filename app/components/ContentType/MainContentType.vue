<template>
  <section :class="sectionClass">
    <div class="container">
      <GenericSectionTitle
        v-if="modelValue.id !== 'socials'"
        :paragraph="modelValue.description"
        :title="modelValue.title"
        :center="true"
      >
        <LazyEditorMainParent
          v-if="showEditor"
          v-model="modelValue"
          class="p-2"
        />
      </GenericSectionTitle>

      <!-- Blocks details -->
      <template v-for="(block, i) in modelValue.blocks" :key="i">
        <!-- CartItems list -->
        <LazyUIShopItemsListing
          v-if="block.type === 'cartItem'"
          v-model="modelValue.blocks[i].items"
          :showEditor
          :isAdminPage
          :layout
          :hideVegNonVegIcon
        />

        <!-- tagsCard -->
        <LazyUISkillTags
          v-else-if="block.type === 'tagsCard'"
          v-model="modelValue.blocks[i]"
          :showEditor="showEditor"
        />

        <!-- OfferCard list -->
        <LazyUIOfferCard
          v-else-if="block.type === 'offerCard'"
          v-model="modelValue.blocks[i].items"
          :showEditor="showEditor"
        />

        <!-- TitleCard list -->
        <LazyUIScrollableTitleDescriptionCard
          v-else-if="block.type === 'titleCard'"
          v-model="modelValue.blocks[i].items"
          :showEditor="showEditor"
        />

        <!-- SmageTitle list -->
        <LazyUIScrollableImageGallery
          v-else-if="block.type === 'imageTitle'"
          v-model="modelValue.blocks[i].items"
          :showEditor="showEditor"
        />

        <!-- SocialLink list -->
        <LazyUIFooterLinks
          v-else-if="block.type === 'socialLink'"
          v-model="modelValue.blocks[i].items"
          :showEditor
        />

        <!-- ImageCard/top blog -->
        <LazyUIImageCard
          v-else-if="block.type === 'imageCard'"
          v-model="modelValue.blocks[i].items"
          :showEditor
        />

        <!-- Message section -->
        <LazyUITelegramMessage
          v-else-if="block.type === 'message'"
        />

        <!-- Multiple blogs -->
        <LazyUIBlog
          v-else-if="block.type === 'blog'"
          v-model="modelValue.blocks[i].items"
          :showEditor
        />

        <!-- Listings -->
        <LazyUIListings
          v-else-if="block.type === 'listings'"
          v-model="modelValue.blocks[i].items"
        />
      </template>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  showEditor: {
    type: Boolean,
    default: true,
  },
  isBackground: {
    type: Boolean,
    default: false,
  },
  isAdminPage: {
    type: Boolean,
    default: false,
  },
  layout: {
    type: String,
    default: "with_image",
  },
  hideVegNonVegIcon: {
    type: Boolean,
    default: true,
  },
});

const modelValue = defineModel("modelValue");

// Computed class for section background
const sectionClass = computed(() => [
  "py-10 md:py-20 lg:py-28",
  modelValue.value.background,
  { "bg-white-D1 dark:bg-black-L1": props.isBackground },
]);
</script>
