<template>
  <!-- loader so that data only fetched on client sside only !pageData && !isNewUser -->
  <LoaderPageSkelton v-if="!isPageMounted" />
  <template v-else-if="pageData">
    <LazyAdminMain
      v-if="adminPageState === 'show_user_page'"
      v-model:pageData="pageData"
      @logout="adminPageState = 'admin_home'"
    />
    <div v-else>
      <GenericHeader />
      <section class="overflow-hidden pt-20 md:pt-20 lg:pt-28 mx-4">
        <div class="container">
          <UniversalCard
            class="flex xl:gap-4 border rounded-md border-gray-200 dark:border-black-L1"
          >
            <div
              class="w-full px-4 md:px-6 py-5 mx-auto bg-bglight dark:bg-black-L1"
            >
              <UniversalH2 class="mb-3">
                Welcome Admin
                <span class="text-base block font-semibold mt-2"
                  >आप सफलतापूर्वक लॉगिन हो गए हैं |</span
                >
              </UniversalH2>

              <div class="flex items-center gap-4 pt-5">
                <UniversalButton
                  :isActive="adminPageState === 'show_user_page'"
                  @click="adminPageState = 'show_user_page'"
                >
                  See Page
                </UniversalButton>

                <UniversalButton
                  class="flex items-center gap-2"
                  :isActive="adminPageState === 'show_cart_orders'"
                  @click="adminPageState = 'show_cart_orders'"
                >
                  <SvgIconsCart class="h-5 w-5" /> <span>Cart orders</span>
                </UniversalButton>
              </div>

              <UniversalButton
                @click="showConfirmation = true"
                class="mt-5 flex items-center gap-2"
              >
                <SvgIconsLogout class="w-5 h-5 text-bglight" />
                <span>Logout</span>
              </UniversalButton>
            </div>

            <img
              class="hidden xl:block w-1/2 rounded-md object-cover"
              :src="useRandomBgUrl()"
              alt="Background Image"
            />
          </UniversalCard>
        </div>
      </section>
      <AdminCartOrders v-if="adminPageState === 'show_cart_orders'" />
    </div>
  </template>

  <!-- Only for the first onboarding -->
  <template v-else-if="isPageMounted && !pageData">
    <GenericHeader />
    <AdminLogin @login-complete="fetchUserData" />
  </template>

  <!-- Logout confirmation Modal -->
  <GenericConfirmationModal
    v-model="showConfirmation"
    message="Are you sure you want to logout from this page ?"
    confirm-btn-text="Yes, Logout"
    cancel-btn-text="No, Cancel"
    @userConfirmed="onUserLogout"
  />
</template>

<script setup>
const pageData = ref(null);
const isPageMounted = ref(false);
const showConfirmation = ref(false);
const adminPageState = ref("show_cart_orders");

const { getLocalData, setLocalData, setInstanceData } = useLocalStorage();

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
      pageData.value = response.data.page_data;
      setUserPageInstaneData(response, setInstanceData);
    }
  } catch (error) {
    console.error("Error fetching admin user data:", error);
  }
}

// Clear local storage and instance data on logout
// Since user might have multiple pages
function onUserLogout() {
  showConfirmation.value = false;
  setLocalData("pageId", null);
  setLocalData("authId", null);
  setLocalData("editMode", false);
  setInstanceData("userMetaData", null);
  setLocalData("isUserChangedPageData", false);
  pageData.value = null;
}

// On component mount
onMounted(() => {
  isPageMounted.value = true;

  if (pageId.value && authId.value) {
    fetchUserData();
  }
});
</script>
