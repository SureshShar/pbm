<template>
  <!-- All editable component based on user_ role - shared by Admin & SuperAdmin -->
  <!-- Top header -->
  <ContentTypeHeader v-model="pageData.header" :shopStatus="userAvailableState">
    <LazyEditorMainParent v-model="pageData.header" />
  </ContentTypeHeader>

  <!-- Hero section -->
  <ContentTypeHeroSection
    v-model="pageData.heroSection"
    :userId="userId"
    :userMetaData="userMetaData"
  >
    <LazyEditorMainParent v-model="pageData.heroSection" class="p-2" />
  </ContentTypeHeroSection>

  <!-- About section -->
  <ContentTypeImageCard v-if="pageData.about" v-model="pageData.about.items[0]">
    <LazyEditorMainParent v-model="pageData.about.items[0]" class="p-2" />
  </ContentTypeImageCard>

  <!-- Only for user_ role of cart items -->
  <LazyEditorExtraEditor v-if="isEditMode" v-model="pageData.extra" />

  <!-- Universal content type sections from new schema -->
  <template
    v-for="(section, i) in pageData.page.sections"
    :key="sectionKeyWithIndex ? `${section.id}+${i}` : section.id"
  >
    <EditorAddNewSection
      v-if="showAddSection"
      v-model="pageData.page.sections"
      :index="i"
    />
    <!-- v-if="section.blocks[0].type !== 'message' || (section.blocks[0].type === 'message' && userMetaData.telegram_id)" -->
    <ContentTypeMainContentType
      v-model="pageData.page.sections[i]"
      :isBackground="i % 2 === 0"
      :isAdminPage="true"
      :layout="userMetaData?.page_layout"
      :hideVegNonVegIcon="pageData.extra?.hideVegNonVegIcon"
    />
    <!-- :telegramId="userMetaData.telegram_id" -->
  </template>

  <!-- Sticky footer edit toggle/submit button -->
  <UIFeatureStickyEditButton
    :isEditMode="isEditMode"
    :hideLogoutBtn="hideLogoutBtn"
    @onEditButtonClick="emit('edit-click')"
    @onUserLogout="emit('logout')"
  />
</template>

<script setup>
defineProps({
  pageData: { type: Object, required: true },
  userAvailableState: { type: [String, Number, Boolean], default: null },
  userMetaData: { type: Object, default: () => ({}) },
  isEditMode: { type: Boolean, default: false },
  /** User/page id for hero section (pageId in Admin, selectedUserId in SuperAdmin) */
  userId: { type: [String, Number], default: null },
  /** Hide logout button (SuperAdmin uses true) */
  hideLogoutBtn: { type: Boolean, default: false },
  /** Show EditorAddNewSection in sections loop (SuperAdmin only) */
  showAddSection: { type: Boolean, default: false },
  /** Use index in section key for list stability (SuperAdmin) */
  sectionKeyWithIndex: { type: Boolean, default: false },
});

const emit = defineEmits(["edit-click", "logout"]);
</script>
