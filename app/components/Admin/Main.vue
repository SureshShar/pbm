<template>
  <!-- All editable component based on user_ role -->
    <CommonCodeAdminSuerAdmin
      :pageData="pageData"
      :userAvailableState="userAvailableState"
      :userMetaData="userMetaData"
      :isEditMode="isEditMode"
      :userId="pageId"
      @edit-click="updateUserPageData"
      @logout="emit('logout')"
    />
</template>

<script setup>
const pageData = defineModel("pageData");
const emit = defineEmits(["logout"]);

const { getLocalData, setLocalData, getInstanceData } = useLocalStorage();

// Global edit mode via local storage
const pageId = computed(() => getLocalData("pageId"));
const authId = computed(() => getLocalData("authId"));
const isEditMode = computed(() => !!getLocalData("editMode"));
const isUserChangedPageData = computed(() => !!getLocalData("isUserChangedPageData"));

// Shop Open, Closed, null not available
const userAvailableState = computed(() => getInstanceData("userMetaData")?.user_available);
const userMetaData = computed(() => getInstanceData("userMetaData") || {});

// validation for changes to server
async function updateUserPageData() {
  if (isEditMode.value && isUserChangedPageData.value) {
    await submitChanges();
  } else {
    setLocalData("editMode", !isEditMode.value);
  }
}

// Submit changes to server
async function submitChanges() {
  try {
    if (!pageId.value || !pageData.value) return;

    await useApi("admin/updateUserData", {
      pageId: pageId.value,
      userData: pageData.value,
      authId: authId.value,
    });

    // After successful submit, exit edit mode
    setLocalData("isUserChangedPageData", false);
    setLocalData("editMode", false);
  } catch (e) {
    console.log(e);
  }
}
</script>
