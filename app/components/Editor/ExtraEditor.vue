<template>
  <!-- Modal -->
  <div
    v-if="isEditing"
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-bgblack bg-opacity-80 max-h-screen font-normal"
    aria-modal="true"
    role="dialog"
  >
    <div
      class="bg-bglight max-h-[95vh] md:max-h-[80vh] overflow-auto dark:bg-black-L1 p-4 md:p-6 rounded-lg w-full max-w-xl shadow-lg m-4"
    >
      <!-- Modal Header -->
      <div class="flex justify-between items-center mb-4">
        <UniversalH2 heading="Edit" />
        <SvgIconsCross
          @click="closeEditor"
          class="w-8 h-8 cursor-pointer bg-primary p-2 rounded-md text-bglight shadow-submit"
        />
      </div>

      <!-- Dynamic Inputs -->
      <div class="space-y-4">
        <!-- Hide veg non veg icon -->
        <GenericToggle
          v-model="formData.hideVegNonVegIcon"
          firstLabel="Hide Veg/NonVeg Icon"
          secondLabel="Show Veg/NonVeg Icon"
        />

        <!-- Parent Level key -->
        <template v-for="(value, key) in formData" :key="key">
          <component
            v-if="parentKey[key]"
            :is="getComponentName(parentKey, key)"
            v-model="formData[key]"
            class="mb-2 md:mb-8"
            :label="parentKey[key].label"
            :placeholder="parentKey[key].placeholder"
            :rows="parentKey[key].rows"
            :name="key"
          />
        </template>

        <GenericTextInput
          v-model="userMetaData.contact_number"
          class="mb-2 md:mb-8"
          label="Contact number (मोबाइल नंबर)"
          placeholder="Contact number"
          name="telephone number"
        />
        <GenericTextInput
          v-model="userMetaData.email_id"
          class="mb-2 md:mb-8"
          label="Email (ईमेल)"
          placeholder="Email"
          name="Email"
        />
        <!-- <GenericTextInput
          v-model="userMetaData.telegram_id"
          class="mb-2 md:mb-8"
          label="Telegram id (मैसेज के लिए टेलीग्राम आईडी)"
          placeholder="Telegram"
          name="Telegram"
        >
          <button
            type="button"
            @click="telegramIdInstructionModal = true"
            class="px-2 text-xl bg-primary text-bglight rounded hover:bg-primary-dark"
          >
            ?
          </button>
        </GenericTextInput> -->
        <GenericSelectInput
          v-model="userMetaData.user_available"
          class="mb-2 md:mb-8"
          label="Shop open/close status"
          :options="optionsShop"
        />
        <GenericSelectInput
          v-model="userMetaData.page_layout"
          class="mb-2 md:mb-8"
          label="Shop item layout"
          :options="optionsLayout"
        />

        <!-- Modal Footer -->
        <div class="flex justify-start gap-3 mt-6">
          <button
            @click="closeEditor"
            class="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            @click="submitChanges"
            class="px-4 py-2 bg-primary text-bglight rounded hover:bg-primary-dark"
          >
            Save
          </button>
        </div>
      </div>
    </div>
    <!-- Telegram id instruction modal -->
    <!-- <GenericModal v-model="telegramIdInstructionModal">
      <ContentTypeUserGuideSteps />
    </GenericModal> -->
  </div>
</template>

<script setup>
import GenericTextInput from "../Generic/TextInput.vue";
import GenericTextAreaInput from "../Generic/TextAreaInput.vue";

defineProps({
  classes: {
    type: String,
    default: "text-black-L1 dark:text-bglight",
  },
  positionClass: {
    type: String,
    default: "relative",
  },
});

const formData = ref({});
const userMetaData = ref({});
// const telegramIdInstructionModal = ref(false);
const modelValue = defineModel("modelValue");

// Global edit mode via local storage
const { getLocalData, setLocalData, getInstanceData, setInstanceData } = useLocalStorage();
const isEditing = computed(() => !!getLocalData("editExtraFields"));
const metaDataStored = computed(() => getInstanceData("userMetaData") || {});

const parentKey = {
  title: {
    label: "Title (शीर्षक)",
    placeholder: "Enter title",
  },
  cartLabel: {
    label: "Cart form label (आपकी cart फॉर्म लेबल)",
    placeholder: "Society name/Flat number/table number/Car number/Car color",
  },
};
const optionsShop = ref([]);
const optionsLayout = ref([]);

function getComponentName(keys, key) {
  return keys[key]?.rows ? GenericTextAreaInput : GenericTextInput;
}

function getDeepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function closeEditor() {
  setLocalData("editExtraFields", false);
}

// Update only changed values
async function submitChanges() {
  try {
    const changedValues = getChangedValues(
      metaDataStored.value,
      userMetaData.value,
    );
    if (Object.keys(changedValues).length) {
      await useApi("comman/updateExtra", {
        pageId: getLocalData("pageId"),
        authId: getLocalData("authId"),
        authToken: getInstanceData("authToken"),
        updates: changedValues,
      });

      // If successful, update local storage and instance data
      setInstanceData("userMetaData", {
        ...metaDataStored.value,
        ...changedValues,
      });
    }

    // Update the exra user data model value to reflect changes
    modelValue.value = getDeepCopy(formData.value);
    setLocalData("isUserChangedPageData", true);
    closeEditor();
  } catch (error) {
    console.error("Error updating extra fields:", error);
  }
}

watch(isEditing, (val) => {
  document.body.style.overflow = val ? "hidden" : "";
});

// Initialize form data when component is mounted
onMounted(async () => {
  formData.value = getDeepCopy(modelValue.value);
  userMetaData.value = getDeepCopy(metaDataStored.value);
  try {
    const { contentEnum } = await import("@/utils/standard/constants.js");
    if (contentEnum) {
      optionsShop.value = contentEnum.availableStatusOptions;
      optionsLayout.value = contentEnum.itemLayoutOptions;
    }
  } catch (error) {
    console.error("Error loading content module:", error);
  }
});
</script>
