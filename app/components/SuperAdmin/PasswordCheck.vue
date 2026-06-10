<template>
  <!-- Loader -->
  <LoaderPageSkelton v-if="!pageMounted" />

  <!-- Super admin main -->
  <div v-else-if="userAuthenticated" class="w-full">
    <slot/>
  </div>

  <!-- Password check form -->
  <template v-else>
    <GenericHeader />
    <section id="contact" class="overflow-hidden pt-32 md:pt-20 lg:pt-28 mx-4">
      <div class="container">
        <div
          class="w-full md:w-9/12 mx-auto shadow-two border border-gray-200 dark:border-black-L1 dark:bg-black-L1 mb-12 rounded-md bg-bglight px-4 md:px-8 py-8"
          data-wow-delay=".15s"
        >
          <UniversalH2 heading="Super Admin Access" class="mb-3"/>

          <div
            v-if="errorMessage"
            class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
          >
            {{ errorMessage }}
          </div>

          <div v-if="isLoading" class="mb-4">
            <p>Verifying...</p>
          </div>

          <div class="flex flex-wrap">
            <GenericTextInput
              v-model="password"
              class="w-full md:w-1/2"
              type="password"
              label="Enter admin password"
              placeholder="Enter admin password"
              @keyup.enter="onPasswordCheck"
            />

            <!-- Submit button -->
            <div class="w-full my-8">
              <button
                class="shadow-submit dark:shadow-submit-black-L2 rounded-sm bg-primary px-4 md:px-9 py-2 md:py-4 text-base font-medium text-bglight duration-300 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!password || isLoading"
                @click="onPasswordCheck"
              >
                <span v-if="isLoading">Verifying...</span>
                <span v-else>Continue</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
</template>

<script setup>
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");
const pageMounted = ref(false);
const userAuthenticated = ref(false);

// Global edit mode via local storage
const { getLocalData, setLocalData } = useLocalStorage();


// On password check
async function onPasswordCheck() {
  if (!password.value) {
    errorMessage.value = "Please enter a password";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const data = await useApi("superAdmin/varification", {
      password: password.value,
    });

    if (data.success) {
      userAuthenticated.value = true;
      setLocalData("superAdminAuthToken", data.authToken);
    } else {
      errorMessage.value = "Invalid password";
    }
  } catch (error) {
    console.error("Authentication error:", error);
    userAuthenticated.value = false;
    errorMessage.value = "An error occurred. Please try again.";
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  pageMounted.value = true;
  userAuthenticated.value = !!getLocalData("superAdminAuthToken");
})
</script>
