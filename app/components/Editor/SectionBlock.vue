<template>
  <div class="relative font-normal">
    <SvgIconsPencil
      v-if="isEditMode"
      @click="openEditor"
      :class="[
        'cursor-pointer bg-primary bg-opacity-70 rounded-md',
        textClass,
        positionClass,
      ]"
    />

    <!-- Modal -->
    <div
      v-if="isEditing"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-bgblack bg-opacity-80 max-h-screen"
      aria-modal="true"
      role="dialog"
    >
      <div
        class="bg-bglight max-h-[95vh] md:max-h-[80vh] overflow-auto dark:bg-black-L1 p-4 md:p-6 rounded-lg w-full max-w-xl shadow-lg m-4"
      >
        <!-- Modal Header -->
        <div class="flex justify-between items-center mb-4">
          <UniversalH2 heading="Edit Content" />
          <SvgIconsCross
            @click="closeEditor"
            class="w-8 h-8 cursor-pointer bg-primary p-1 rounded-md text-bglight shadow-submit"
          />
        </div>

        <!-- Dynamic Inputs -->
        <div class="space-y-4">
          <!-- Edit item properties -->
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

          <!-- For image properties -->
          <template v-if="formData.image">
            <template v-for="(value, key) in formData.image" :key="key">
              <component
                v-if="childKey[key]"
                :is="getComponentName(childKey, key)"
                v-model="formData.image[key]"
                class="mb-2 md:mb-8"
                :label="childKey[key].label"
                :placeholder="childKey[key].placeholder"
                :rows="childKey[key].rows"
                :name="key"
              >
                <div class="flex gap-2">
                  <!-- <button
                    type="button"
                    @click="showImageInstructionModal = true"
                    class="px-2 text-xl bg-primary text-bglight rounded hover:bg-primary-dark"
                  >?</button> -->
                  <button
                    v-if="key === 'src'"
                    type="button"
                    @click="openImagePicker"
                    class="px-2 py-1 text-sm bg-primary text-bglight rounded hover:bg-primary-dark"
                  >
                   Your Images
                  </button>
                </div>
              </component>
            </template>
          </template>

          <!-- Delete confirmation -->
          <div
            v-if="showDeleteConfirmation"
            class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4"
          >
            <p class="text-red-700 dark:text-red-300 mb-3">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
            <div class="flex gap-2">
              <button
                @click="confirmDelete"
                class="px-3 py-1 bg-red-500 text-bglight rounded text-sm hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                @click="cancelDelete"
                class="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded text-sm hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>

          <!-- Action buttons -->
          <div
            class="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700"
          >
            <button
              @click="requestDelete"
              class="px-3 py-2 bg-red-500 text-bglight rounded text-sm hover:bg-red-600"
            >
              Delete Item
            </button>
          </div>

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
          <!-- <GenericModal v-model="showImageInstructionModal">
            <ContentTypeUserGuideSteps stepType="imagePost" />
          </GenericModal> -->
          <!-- Global image selector component (uses local vegetables images) -->
          <EditorImageSelector
            v-model="imageSelectorOpen"
            @selectImage="onSelectImage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GenericTextInput from "../Generic/TextInput.vue";
import GenericTextAreaInput from "../Generic/TextAreaInput.vue";

defineProps({
  textClass: {
    type: String,
    default: "text-bglight",
  },
  positionClass: {
    type: String,
    default: "absolute right-0 -top-2 w-6 h-6 p-1",
  },
});

const formData = ref({});
const isEditing = ref(false);
const imageSelectorOpen = ref(false);
const showDeleteConfirmation = ref(false);
// const showImageInstructionModal = ref(false);

const emit = defineEmits(["deleteItem"]);
const modelValue = defineModel("modelValue");
const { getLocalData, setLocalData } = useLocalStorage();

// Global edit mode via local storage
const isEditMode = computed(() => getLocalData("editMode") === true);

const parentKey = {
  label: {
    label: "Label (शीर्षक)",
    placeholder: "Enter here",
  },
  resource: {
    label: "Resource URL (संसाधन URL)",
    placeholder: "Enter here",
  },
  text: {
    label: "Description (विवरण)",
    rows: 3,
    placeholder: "Enter description",
  },
  date: {
    label: "Date (दिनांक)",
    placeholder: "Enter date",
  },
  href: {
    label: "Link URL (लिंक URL)",
    placeholder: "Enter full URL",
  },
  platform: {
    label: "Platform (संसाधन)",
    placeholder: "facebook, twitter, youtube, instagram, linkedin",
  },
  alt: {
    label: "Image Info (आइमेज एल्ट टेक्स्ट)",
    placeholder: "Enter alt text",
  },
  ttl: {
    label: "Top title (प्रस्ताव शीर्षक)",
    placeholder: "Enter here",
  },
  msg1: {
    label: "Message 1 (प्रस्ताव संदेश 1)",
    rows: 3,
    placeholder: "Enter message",
  },
  msg2: {
    label: "Message 2 (प्रस्ताव संदेश 2)",
    placeholder: "Enter message",
  },
  msg3: {
    label: "Message 3 (प्रस्ताव कोड)",
    placeholder: "Enter message",
  },
  btntxt: {
    label: "Button Text (बटन पाठ)",
    placeholder: "Enter button text",
  },
};

const childKey = {
  src: {
    label: "Image URL (आइमेज URL)",
    placeholder: "Enter image URL",
  },
  alt: {
    label: "Image Info (आइमेज एल्ट टेक्स्ट)",
    placeholder: "Enter alt text",
  },
};

function getComponentName(keys, key) {
  return keys[key]?.rows ? GenericTextAreaInput : GenericTextInput;
}

function getDeepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function requestDelete() {
  showDeleteConfirmation.value = true;
}

// Use the shared EditorImageSelector component
function openImagePicker() {
  imageSelectorOpen.value = true;
}

function onSelectImage(url) {
  if (!formData.value.image) formData.value.image = {};
  formData.value.image.src = url;
}

function confirmDelete() {
  emit("deleteItem");
  closeEditor();
  setLocalData("isUserChangedPageData", true);
}

function cancelDelete() {
  showDeleteConfirmation.value = false;
}

function openEditor() {
  formData.value = getDeepCopy(modelValue.value);
  isEditing.value = true;
  showDeleteConfirmation.value = false;
}

function closeEditor() {
  isEditing.value = false;
  showDeleteConfirmation.value = false;
}

function submitChanges() {
  modelValue.value = getDeepCopy(formData.value);
  closeEditor();
  setLocalData("isUserChangedPageData", true);
}

onMounted(() => {
  formData.value = { ...modelValue.value };
  // console.log("**Section editor**", modelValue.value);
});
</script>
