<template>
  <section id="login_form" class="overflow-hidden m-4">
    <UniversalCard class="flex xl:gap-4 border rounded-md border-gray-200 dark:border-black-L1">
      <div
        class="w-full md:w-9/12 px-4 md:px-8 md:py-8 mx-auto bg-bglight dark:bg-black-L1"
        data-wow-delay=".15s"
      >
        <UniversalH2 class="mb-3">
          Create new user (SignUp)
          <span class="text-base block font-semibold mt-2"
            >नया उपयोगकर्ता लॉगिन</span
          >
        </UniversalH2>

        <div
          v-if="errorMessage"
          class="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded"
        >
          {{ errorMessage }}
        </div>

        <div class="flex flex-wrap gap-4 md:gap-6 mt-4">
          <GenericDropDownSelect
            class="w-full"
            :items="categories"
            @selectItem="getSelectedItem"
          />
          <GenericTextInput
            v-model="pageID"
            name="Page ID"
            class="w-full"
            type="text"
            label="Page ID"
            placeholder="Enter here"
          />
          <GenericTextInput
            v-model="email"
            name="email"
            class="w-full"
            type="email"
            label="Email"
            placeholder="Enter here"
          />
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
            placeholder="Here i.e. 2025, Abc@1234"
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
        class="hidden xl:block w-1/2 round-md object-cover"
        :src="useRandomBgUrl()"
        alt="Background Image"
      />
    </UniversalCard>
  </section>
</template>

<script setup>
const email = ref("");
const userName = ref("");
const password = ref("");
const pageID = ref(getUserId());
const selectedCategory = ref("");
const errorMessage = ref("");

const categories = ref([]);
const isLoading = ref(false);
const showPassword = ref(false);
const categoryWiseSchemeMap = ref({});

const { setLocalData } = useLocalStorage();
const emit = defineEmits(["onboarding-complete"]);

function sendQuery(lowerCasePageId) {
  useApi("userQuery/send", {
      pageId: "superadmin",
      key: "id_" + Date.now(),
      value: JSON.stringify({
        title: "New user created",
        name: userName.value,
        mail: email.value,
        userId: lowerCasePageId,
        password: password.value,
        category: selectedCategory.value,
        message: "New user onbording done. Name and email given you.",
        status: "success",
      }),
    });
}

async function onSubmit() {
  if (
    selectedCategory.value.trim === "" ||
    !getValidation("text")(userName.value) ||
    !getValidation("password")(password.value)
  ) {
    return (errorMessage.value = "Please fill all the form section.");
  }

  if (isLoading.value) return;

  const lowerCasePageId = pageID.value.toLowerCase()
  errorMessage.value = "";
  isLoading.value = true;

  const pageData = await usePublicFiles(`/json/${categoryWiseSchemeMap.value[selectedCategory.value]}.json`);

  // Simulate an async password verification process
  try {
    const response = await useApi("admin/onboarding", {
      userId: lowerCasePageId,
      email: email.value,
      userName: userName.value,
      password: password.value,
      createdAt: Date.now(),
      pageData: pageData,
    });

    if (response.success) {
      setLocalData("pageId", response.data.pageId);
      setLocalData("authId", response.data.authId);
    } else {
      errorMessage.value = "Api failed. Please try again later.";
    }
  } catch (error) {
    errorMessage.value = "An error occurred. Please try again.";
    console.log(error)
  } finally {
    isLoading.value = false;
    emit("onboarding-complete");
    sendQuery(lowerCasePageId)
  }
}

function getSelectedItem(item) {
  selectedCategory.value = item;
}

onMounted(async () => {
  const { categoryMap } = await import("@/utils/standard/constants.js");
  if (categoryMap) {
    categories.value = Object.keys(categoryMap);
    categoryWiseSchemeMap.value = categoryMap;
  }
});
</script>
