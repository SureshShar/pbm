<template>
  <AdminOnboarding @onboarding-complete="fetchUserData"/>
</template>

<script setup>
const emit = defineEmits(['pageData']);
const { getLocalData, setInstanceData } = useLocalStorage();

// Global edit mode via local storage
const pageId = computed(() => getLocalData("pageId"));
const authId = computed(() => getLocalData("authId"));

// Handler for onboarding complete
async function fetchUserData() {
  try {
    const response = await useApi("admin/getAdminUserData", {
      pageId: pageId.value,
      authId: authId.value,
    });

    if (response.success) {
      setUserPageInstaneData(response, setInstanceData);
      emit('pageData', response.data.page_data);
    }
  } catch (error) {
    console.error("Error fetching admin user data:", error);
  }
}
</script>
