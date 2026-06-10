<template>
  <section id="login_form" class="overflow-hidden pt-32 md:pt-20 lg:pt-28 mx-4">
    <div class="container">
      <UniversalCard class="flex xl:gap-4 border rounded-md border-gray-200 dark:border-black-L1">
        <div
          class="w-full px-4 md:px-8 py-8 mx-auto bg-bglight dark:bg-black-L1"
          data-wow-delay=".15s"
        >
          <UniversalH2 class="mb-3">
            Admin Login
            <span class="text-base block font-semibold mt-2">व्यवस्थापक लॉगिन</span>
          </UniversalH2>

          <div
            v-if="errorMessage"
            class="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded"
          >
            {{ errorMessage }}
          </div>

          <div class="flex flex-wrap gap-4 md:gap-6 mt-4">
            <GenericTextInput
              v-model="userName"
              name="userName"
              class="w-full"
              type="text"
              label="Username"
              placeholder="Enter here"
            />
            <GenericTextInput
              v-model="password"
              name="password"
              class="w-full"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              placeholder="Enter here"
            />
            <div class="w-full flex justify-end">
              <GenericCheckboxInput
                v-model="showPassword"
                :label="showPassword ? 'Hide password' : 'Show password'"
              />
            </div>

            <!-- Submit button -->
            <div class="w-full my-4">
              <UniversalButton @clicked="onSubmit">
                <span v-if="isLoading">Verifying...</span>
                <span v-else>Continue</span>
              </UniversalButton>
            </div>
          </div>
        </div>
        <img
          class="hidden xl:block w-1/2 rounded-md object-cover"
          :src="useRandomBgUrl()"
          alt="Background Image"
        />
      </UniversalCard>
    </div>
  </section>
</template>

<script setup>
/**
 * Validate the Userneme and Password inputs
 * In response get the pageId and authId and also store them in localStorage
 * Then emit login-complete event to parent component to signel data fetch based on PageID and AuthID
*/

const userName = ref("");
const password = ref("2025");
const errorMessage = ref("");
const isLoading = ref(false);
const showPassword = ref(false);

const { setLocalData } = useLocalStorage();
const emit = defineEmits(["login-complete"]);

async function onSubmit() {
  if (
    !getValidation("text")(userName.value) ||
    !getValidation("password")(password.value)
  ) {
    return (errorMessage.value = "Please fill all the form section.");
  }

  if (isLoading.value) return;

  errorMessage.value = "";
  isLoading.value = true;

  // Simulate an async password verification process
  try {
    const response = await useApi("admin/userLogin", {
      userName: userName.value,
      password: password.value,
    });

    if (response.success) {
      setLocalData("pageId", response.data.pageId);
      setLocalData("authId", response.data.authId);
      emit("login-complete");
    } else {
      errorMessage.value = "Api failed. Please try again later.";
    }
  } catch (error) {
    errorMessage.value = "An error occurred. Please try again.";
  } finally {
    isLoading.value = false;
  }
}
</script>
