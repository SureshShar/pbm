<template>
  <div>
    <!-- loader so that data only fetched on client sside only -->
    <LoaderPageSkelton v-if="!isPageMounted" />

    <!-- All editable component based on user_ role -->
    <template v-else-if="pageData">
      <CommonCodeAdminSuerAdmin
        :pageData="pageData"
        :userAvailableState="userAvailableState"
        :userMetaData="userMetaData"
        :isEditMode="isEditMode"
        :userId="selectedUserId"
        :hideLogoutBtn="true"
        :showAddSection="true"
        :sectionKeyWithIndex="true"
        @edit-click="onEditButtonClick"
      />
    </template>

    <!-- Super admin controll form  -->
    <template v-if="isPageMounted">
      <GenericHeader v-if="!pageData" />
      <SuperAdminUserIdForm @sendData="onUserDataRequest" />

      <GenericLoadMoreDrawer title="user meta data">
        <SuperAdminChangeUserDataForm :userMetaData="completeUserData" :authToken/>
      </GenericLoadMoreDrawer>
      <GenericLoadMoreDrawer title="user shop type">
        <SuperAdminSchemaForm :categories @sendData="updateNewSchema" />
      </GenericLoadMoreDrawer>
      <GenericLoadMoreDrawer title="make new user">
        <FeaturesUserOnboarding />
      </GenericLoadMoreDrawer>
      <!-- <GenericLoadMoreDrawer title="compress images"><FeaturesImageCompress class="mx-4" /></GenericLoadMoreDrawer> -->
      <GenericLoadMoreDrawer title="onboarding requests">
        <SuperAdminOnbordingRequest />
      </GenericLoadMoreDrawer>
    </template>
  </div>
</template>

<script setup>
const pageData = ref(null);
const isPageMounted = ref(false);
const selectedUserId = ref(null);
const completeUserData = ref(null);

// Change user data schema type
const categories = ref([]);
const categoryWiseSchemeMap = ref(null);

// Global edit mode via local storage
// const config = useRuntimeConfig();
const { getLocalData, setLocalData, setInstanceData, getInstanceData } = useLocalStorage();

const isEditMode = computed(() => !!getLocalData("editMode"));
const authToken = computed(() => getLocalData("superAdminAuthToken"));
const isUserChangedPageData = computed(() => !!getLocalData("isUserChangedPageData"));

// Shop Open, Closed, null not available
const userAvailableState = computed(() => getInstanceData("userMetaData")?.user_available,);
const userMetaData = computed(() => getInstanceData("userMetaData") || {});

// Edit and submit bitton
async function onEditButtonClick() {
  if (isEditMode.value && isUserChangedPageData.value) {
    await submitChanges();
  } else {
    setLocalData("editMode", !isEditMode.value);
  }
}

// New change to submit to backend
async function submitChanges() {
  try {
    if (!selectedUserId.value || !pageData.value || !authToken.value) return;

    await useApi("superAdmin/updateUserData", {
      pageId: selectedUserId.value,
      userData: pageData.value,
      authToken: authToken.value,
    });

    // After successful submit, exit edit mode
    setLocalData("isUserChangedPageData", false);
    setLocalData("editMode", false);
  } catch (e) {
    console.log(e);
  }
}

// Page data request
async function onUserDataRequest(data) {
  selectedUserId.value = data.userId.trim();

  if (selectedUserId.value && selectedUserId.value !== 0) {
    try {
      const response = await useApi("superAdmin/getUserData", {
        pageId: selectedUserId.value,
        authToken: authToken.value,
      });

      if (response.success && response.data) {
        completeUserData.value = response.data;
        pageData.value = response.data.page_data;
        setUserPageInstaneData(response, setInstanceData);

        setLocalData("isUserChangedPageData", false);
        setLocalData("editMode", false);
      }
    } catch (e) {
      console.log(e);
    }
  }
  // scrollToTop();
}

// Update user schema data to pageData ref to update it
async function updateNewSchema(data) {
  let avatarUrl = pageData.value && pageData.value.header ? pageData.value.header.image.src : "";

  if (data.category) {
    let newData = await usePublicFiles(`/json/${categoryWiseSchemeMap.value[data.category]}.json`);

    if(!newData) return;

    pageData.value = newData;
    pageData.value.header.image.src = avatarUrl;

    if (!userMetaData.value) {
      setInstanceData("userMetaData", {});
    }
  }

  // scrollToTop();
}

// New user_ Page layout data to start with
async function setSchemaData() {
  try {
    const { categoryMap } = await import("@/utils/standard/constants.js");
    if (categoryMap) {
      categories.value = Object.keys(categoryMap);
      categoryWiseSchemeMap.value = categoryMap;
    }
  } catch (error) {}
}

// On page mounted
onMounted(() => {
  isPageMounted.value = true;
  setLocalData("isUserChangedPageData", false);
  setLocalData("editMode", false);
  setSchemaData();
});
</script>
