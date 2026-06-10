<template>
  <section class="overflow-hidden m-4">
    <UniversalCard class="flex">
      <div
        class="w-full px-4 md:px-8 md:py-8 mx-auto bg-bglight dark:bg-black-L1"
        data-wow-delay=".15s"
      >
        <UniversalH2 heading="Welcome Super Admin" class="mb-3" />

        <!-- <div
          v-if="errorMessage"
          class="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded"
        >
          {{ errorMessage }}
        </div> -->

        <div class="">
          <p class="mb-4 md:mb-12 text-base font-medium text-black-L4">
            Created At:
            {{ modalExtra.created_at ? modalExtra.created_at : "N/A" }}
          </p>
          <p class="mb-4 md:mb-12 text-base font-medium text-black-L4">
            Updated At:
            {{ modalExtra.updated_at ? modalExtra.updated_at : "N/A" }}
          </p>
        </div>

        <div class="flex flex-wrap gap-4 md:gap-6 mt-4">
          <GenericTextInput
            v-for="key in Object.keys(modalText)"
            :key="key"
            v-model="modalText[key]"
            :name="key"
            class="w-full"
            type="text"
            :label="camelToTitle(key)"
            placeholder="Enter here"
          />
          <GenericTextInput
            v-for="key in Object.keys(modalDate)"
            :key="key"
            v-model="modalDate[key]"
            :name="key"
            class="w-full"
            type="date"
            :label="camelToTitle(key)"
            placeholder="Enter here"
          />
          <GenericTextInput
            v-for="key in Object.keys(modalNumber)"
            :key="key"
            v-model="modalNumber[key]"
            :name="key"
            class="w-full"
            type="number"
            :label="camelToTitle(key)"
            placeholder="Enter here"
          />
          <GenericTextInput
            v-for="key in Object.keys(modalExtra)"
            :key="key"
            v-model="modalExtra[key]"
            :name="key"
            class="w-full"
            type="date"
            :label="camelToTitle(key)"
            placeholder="Enter here"
          />
          <GenericSelectInput
            v-for="key in Object.keys(modelSelect)"
            :key="key"
            v-model="modalNumber[key]"
            class="w-full"
            :label="camelToTitle(key)"
            :options="selectOptions[key]"
          />

          <!-- Submit button -->
          <div class="w-full my-4">
            <button
              class="shadow-submit dark:shadow-submit-black-L2 rounded-sm bg-primary px-4 md:px-9 py-2 md:py-4 text-base font-medium text-bglight duration-300 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              @click="onSubmit"
            >
              <span v-if="isLoading">Verifying...</span>
              <span v-else>Continue</span>
            </button>
          </div>
        </div>
      </div>
      <img
        class="hidden xl:block w-1/2 rounded-r-md object-cover"
        :src="useRandomBgUrl()"
        alt="Background Image"
      />
    </UniversalCard>
  </section>
</template>

<script setup>
const props = defineProps({
  userMetaData: {
    type: [Object, null],
    default: null,
  },
  authToken: {
    type: String,
    required: true,
  },
});

const pageId = ref("");
// const errorMessage = ref("");
const isLoading = ref(false);

const { showSuccess, showError } = useLocalStorage();

const modalText = ref({
  page_id: "",
  user_password: "",
  user_name: "",
  email_id: "",
  contact_number: "",
  // telegram_id: "",
});
const modalDate = ref({
  topup_start_at: null,
  topup_end_at: null,
});
const modalNumber = ref({
  stars: null,
  karma: null,
});
const modalExtra = ref({
  created_at: null,
  updated_at: null,
});
const modelSelect = ref({
  user_available: "",
  page_layout: "",
});
const selectOptions = ref({
  user_available: [],
  page_layout: [],
});

const { setInstanceData } = useLocalStorage();

async function onSubmit() {
  if (isLoading.value) return;

  // errorMessage.value = "";
  isLoading.value = true;
  const newValues = {
    ...modalText.value,
    ...modelSelect.value,
    ...modalNumber.value,
    topup_start_at: modalDate.value.topup_start_at ? new Date(modalDate.value.topup_start_at).getTime() : null,
    topup_end_at: modalDate.value.topup_end_at ? new Date(modalDate.value.topup_end_at).getTime() : null,
    created_at: modalDate.value.created_at ? new Date(modalDate.value.created_at) : null,
    updated_at: modalDate.value.updated_at ? new Date(modalDate.value.updated_at) : null,
  };

  // Simulate an async password verification process
  try {
    await useApi("superAdmin/updateUserMetaData", {
      pageId: pageId.value,
      authToken: props.authToken,
      updates: getChangedValues(props.userMetaData, newValues),
    });
    showSuccess("Usermeta update successfull")
  } catch (error) {
    // errorMessage.value = "An error occurred. Please try again.";
    console.error(error);
    showError("An error occurred. Please try again.")
  } finally {
    isLoading.value = false;
    setUserPageInstaneData({ data: newValues }, setInstanceData);
  }
}

function msToDateInput(ms) {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

watch(
  () => props.userMetaData,
  (newVal) => {
    if (newVal) {
      pageId.value = newVal.page_id || "";
      modalText.value.page_id = newVal.page_id || "";
      modalText.value.user_password = newVal.user_password || "";
      modalText.value.user_name = newVal.user_name || "";
      modalText.value.email_id = newVal.email_id || "";
      modalText.value.contact_number = newVal.contact_number || "";
      // modalText.value.telegram_id = newVal.telegram_id || "";
      modelSelect.value.user_available = newVal.user_available || "";
      modelSelect.value.page_layout = newVal.page_layout || "";
      modalNumber.value.stars = newVal.stars || null;
      modalNumber.value.karma = newVal.karma || null;

      modalDate.value.topup_start_at = newVal.topup_start_at
        ? msToDateInput(newVal.topup_start_at)
        : null;
      modalDate.value.topup_end_at = newVal.topup_end_at
        ? msToDateInput(newVal.topup_end_at)
        : null;
      modalExtra.value.created_at = newVal.created_at
        ? msToDateInput(newVal.created_at)
        : null;
      modalExtra.value.updated_at = newVal.updated_at
        ? msToDateInput(newVal.updated_at)
        : null;
      // modalExtra.value.created_at = newVal.created_at
      //   ? new Date(newVal.created_at).toLocaleString()
      //   : null;
      // modalExtra.value.updated_at = newVal.updated_at
      //   ? new Date(newVal.updated_at).toLocaleString()
      //   : null;
    }
  },
  { immediate: true },
);

onMounted(async () => {
  try {
    const { contentEnum } = await import("@/utils/standard/constants.js");
    if (contentEnum) {
      selectOptions.value.user_available = contentEnum.availableStatusOptions;
      selectOptions.value.page_layout = contentEnum.itemLayoutOptions;
    }
  } catch (error) {
    console.error("Error loading content module:", error);
  }
});
</script>
<!-- 
/**
 *   "page_id",
 *   "user_password",
 *   "user_name",
 *   "email_id",
 *   "contact_number",
 *   "telegram_id",
 *   "user_available",
 *   "page_layout",

 *   "stars",
 *   "karma",

 *   "topup_start_at",
 *   "topup_end_at",
**/ -->
