<template>
  <div
    v-if="isEditMode"
    :class="[positionClass, 'container flex items-center justify-end font-normal']"
  >
    <SvgIconsPencil
      @click="openEditor"
      class="w-8 h-8 text-bglight cursor-pointer bg-primary bg-opacity-70 rounded-md p-1"
      :class="classes"
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
        <div class="space-y-2 md:space-y-2">
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

          <!-- For image src handler -->
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
                >
                  ?
                </button> -->
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

          <!-- For the blocks sub heading in main content -->
          <template v-for="(block, index) in formData.blocks" :key="index">
            <div v-for="(value, key) in block" :key="key">
              <component
                v-if="blockKeys[key]"
                :is="getComponentName(blockKeys, key)"
                v-model="formData.blocks[index][key]"
                class="mb-2 md:mb-8"
                :label="blockKeys[key].label"
                :placeholder="blockKeys[key].placeholder"
                :rows="blockKeys[key].rows"
                :name="key"
              />
            </div>
          </template>

          <!-- Child Level key -->
          <template v-for="(value, key) in formData.trainingData" :key="key">
            <component
              v-if="childKey[key]"
              :is="getComponentName(childKey, key)"
              v-model="formData.trainingData[key]"
              class="mb-2 md:mb-8 pl-2"
              :label="childKey[key].label"
              :placeholder="childKey[key].placeholder"
              :rows="childKey[key].rows"
              :name="key"
            />
          </template>

          <!-- Modal Footer -->
          <div class="flex justify-start gap-3 pt-3">
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

          <!-- Telegram id instruction modal
          <GenericModal v-model="telegramIdInstructionModal">
            <ContentTypeUserGuideSteps />
          </GenericModal> -->

          <!-- Image instruction modal -->
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
  classes: {
    type: String,
    default: "",
  },
  positionClass: {
    type: String,
    default: "relative",
  },
});

const formData = ref({});
const isEditing = ref(false);
const imageSelectorOpen = ref(false);
// const telegramIdInstructionModal = ref(false);
// const showImageInstructionModal = ref(false);
const modelValue = defineModel("modelValue");

// Global edit mode via local storage
const { getLocalData, setLocalData } = useLocalStorage();
const isEditMode = computed(() => getLocalData("editMode") === true);

const parentKey = {
  title: {
    label: "Title (शीर्षक)",
    placeholder: "Enter title",
  },
  paragraph: {
    label: "Description (विवरण)",
    rows: 3,
    placeholder: "Enter description",
  },
  text: {
    label: "Detail (विवरण)",
    rows: 3,
    placeholder: "Enter detail",
  },
  description: {
    label: "Detail (विवरण)",
    rows: 3,
    placeholder: "Enter detail",
  },
  location: {
    label: "Google location url (लोकेशन URL)",
    placeholder: "Google location url",
  },
  resumeLink: {
    label: "Resume/Menu google derive link (रिस्यूम/मेनू google डरावे लिंक)",
    placeholder: "Google derive pdf link",
  },
  address: {
    label: "Personal/Shop address (व्यक्तिगत/दुकान का पता)",
    placeholder: "Enter your address",
  },
  timing: {
    label: "Working hours detail (कार्यकाल/दुकान का खोलने वाला समय)",
    rows: 3,
    placeholder: "Which days in week your are open and close",
  }
};

const childKey = {
  src: {
    label: "Image Url (इमेज URL)",
    placeholder: "Enter image Url",
  },
  age: {
    label: "Age (आयु)",
    placeholder: "Enter age",
  },
  category: {
    label: "About you (आपके बारे में)",
    placeholder: "Enter category",
  },
  dislikes: {
    label: "Your dislikes (आपकी नापसंद)",
    placeholder: "Enter dislike",
  },
  goals: {
    label: "Your goals (आपकी लक्ष्य)",
    rows: 2,
    placeholder: "Enter goals",
  },
  extra: {
    label: "Any extra info (अन्य जानकारी)",
    rows: 2,
    placeholder: "Enter extra info here",
  },
  hobby: {
    label: "Your hobby (आपका शौक)",
    placeholder: "Enter your hobby",
  },
  likes: {
    label: "Your likes (आपकी लाइक)",
    placeholder: "Enter your likes",
  },
  location: {
    label: "Your location (आपका स्थान)",
    placeholder: "Enter your location",
  },
  skill: {
    label: "Your skill (आपका शौक)",
    placeholder: "Enter your skill",
  },
  tone: {
    label: "Preferred tone (आपकी शौक)",
    placeholder: "Enter your tone",
  },
  userName: {
    label: "User name (उपयोगकर्ता नाम)",
    placeholder: "Enter name",
  },
};

const blockKeys = {
  title: {
    label: "Enter subtitle (उपशीर्षक)",
    placeholder: "Enter here",
  },
};

// const costKey = {
  // layout: {
  //   label: "Select Layout of cart items (कार्ट आइटम का लेआउट चुनें)",
  //   type: "number",
  //   min: 0,
  //   max: 2,
  //   placeholder: "Select layout type",
  // },
// };

function getComponentName(keys, key) {
  return keys[key]?.rows ? GenericTextAreaInput : GenericTextInput;
}

function getDeepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function openEditor() {
  formData.value = getDeepCopy(modelValue.value);
  isEditing.value = true;
}

function closeEditor() {
  isEditing.value = false;
}

// Use the shared EditorImageSelector component
function openImagePicker() {
  imageSelectorOpen.value = true;
}

function onSelectImage(url) {
  if (!formData.value.image) formData.value.image = {};
  formData.value.image.src = url;
}

function submitChanges() {
  modelValue.value = getDeepCopy(formData.value);
  setLocalData("isUserChangedPageData", true);
  closeEditor();
}

watch(isEditing, (val) => {
  document.body.style.overflow = val ? "hidden" : "";
});

onMounted(() => {
  formData.value = { ...modelValue.value };

  // formData.value.address = "";
  // formData.value.resumeLink = "";
  // formData.value.location = "";
  // console.log("formData.value", formData.value);
});
</script>
