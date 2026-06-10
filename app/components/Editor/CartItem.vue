<template>
  <div class="relative font-normal">
    <SvgIconsPencil
      v-if="isEditMode"
      @click="openEditor"
      :class="[
        'cursor-pointer bg-primary rounded-md',
        textClass,
        opacityClass,
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
        <div class="space-y-4 pr-2">
          <GenericToggle v-model="formData.hide" />
          <GenericToggle
            v-model="formData.isVeg"
            firstLabel="Veg"
            secondLabel="NonVeg"
          />

          <!-- Edit item properties -->
          <template v-for="(value, key) in formData" :key="key">
            <component
              v-if="parentKey[key]"
              :is="getComponentName(parentKey, key)"
              v-model="formData[key]"
              class="mb-2 md:mb-8"
              :options="parentKey[key].options"
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
                v-if="imageKey[key]"
                :is="getComponentName(imageKey, key)"
                v-model="formData.image[key]"
                class="mb-2 md:mb-8"
                :label="imageKey[key].label"
                :placeholder="imageKey[key].placeholder"
                :rows="imageKey[key].rows"
                :name="key"
              >
                <button
                  v-if="key === 'src'"
                  type="button"
                  @click="openImagePicker"
                  class="px-2 py-1 text-xs bg-primary text-bglight rounded hover:bg-primary-dark"
                >
                  Images
                </button>
              </component>
            </template>
          </template>

          <!-- For costs properties -->
          <div v-if="formData.costs" class="bg-white-D2 dark:bg-black-L2 rounded-md p-2">
            <div
              v-for="(value, index) in formData.costs"
              :key="index"
              class="relative flex gap-1"
            >
              <template v-for="(value, key) in value" :key="key">
                <component
                  v-if="costKey[key]"
                  :is="getComponentName(costKey, key)"
                  v-model="formData.costs[index][key]"
                  class="mb-2 md:mb-8"
                  :label="index === 0 ? costKey[key].label : ''"
                  :placeholder="costKey[key].placeholder"
                  :type="costKey[key].type"
                  :rows="costKey[key].rows"
                  :name="key"
                />
                <!-- :options="costKey[key].options" -->
              </template>
              <!-- Delete item -->
              <SvgIconsDelete
                @click="removeCost(index)"
                :class="[ deletePriceConfirm[index] ? 'bg-primary' : 'bg-red-500','absolute bottom-6 -right-1 w-5 h-5 p-1 text-white-D1 rounded cursor-pointer']"
              />
            </div>
            <!-- Add new item -->
            <div class="flex items-center gap-2">
              <SvgIconsPlus
                @click="addCost"
                class="w-6 h-6 p-1 bg-primary text-white-D1 rounded cursor-pointer"
              />
            </div>
          </div>

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

          <!-- Save and cancel buttons -->
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

      <!-- Global image selector component (uses local vegetables images) -->
      <EditorImageSelector
        v-model="imageSelectorOpen"
        @selectImage="onSelectImage"
      />
    </div>
  </div>
</template>

<script setup>
import GenericTextInput from "../Generic/TextInput.vue";
import GenericTextAreaInput from "../Generic/TextAreaInput.vue";
import { contentEnum } from "@/utils/standard/constants";

defineProps({
  textClass: {
    type: String,
    default: "text-bglight",
  },
  positionClass: {
    type: String,
    default: "absolute right-0 -top-2 w-6 h-6 p-1",
  },
  opacityClass: {
    type: String,
    default: "bg-opacity-70",
  },
});

const formData = ref({});
const isEditing = ref(false);
const imageSelectorOpen = ref(false);
const showDeleteConfirmation = ref(false);
const deletePriceConfirm = ref({});

const emit = defineEmits(["deleteItem", "confirmUpdate"]);

const modelValue = defineModel("modelValue");
const { getLocalData, setLocalData } = useLocalStorage();

// Global edit mode via local storage
const isEditMode = computed(() => getLocalData("editMode") === true);

const parentKey = {
  itemType: {
    select: true,
    label: "Item type (श्रेणी)",
    options: contentEnum.cartItemsOptions,
  },
  srtdsc: { // short description srtdsc
    label: "Description (विवरण)",
    placeholder: "Enter description",
  },
  shortDescription: { // kept for backward compatibility
    label: "Description (विवरण)",
    placeholder: "Enter description",
  },
  title: {
    label: "Name (नाम)",
    placeholder: "Enter name",
  },
  category: {
    select: true,
    label: "Category (श्रेणी)",
    options: contentEnum.cartItemsOptions,
  },
};

const imageKey = {
  src: {
    label: "Image URL (छवि URL)",
    placeholder: "Image URL",
  },
  // alt: {
  //   label: "Image Description (छवि विवरण)",
  //   placeholder: "Enter description",
  // },
};

const costKey = {
  size: {
    select: true,
    label: "Size (आकार)",
  },
  price: {
    label: "Price ₹(मूल्य)",
    type: "number",
    placeholder: "Enter price",
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

function confirmDelete() {
  emit("deleteItem");
  closeEditor();
  setLocalData("isUserChangedPageData", true);
}

function cancelDelete() {
  showDeleteConfirmation.value = false;
}

function openEditor() {
  // document.body.style.overflow = "hidden";
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
  emit("confirmUpdate", formData.value);
  closeEditor();
}

// Use the shared EditorImageSelector component
function openImagePicker() {
  imageSelectorOpen.value = true;
}

function onSelectImage(url) {
  if (!formData.value.image) formData.value.image = {};
  formData.value.image.src = url;
}

function addCost() {
  if (!formData.value.costs) formData.value.costs = [];
  formData.value.costs.push({ size: "1kg/xl/litre", price: 100 });
}

function removeCost(index) {
  if(deletePriceConfirm.value[index] === undefined) {
    deletePriceConfirm.value[index] = true;
    return;
  } else {
    formData.value.costs.splice(index, 1);
    deletePriceConfirm.value[index] = undefined;
  }
}

// onBeforeUnmount(() => {
//   document.body.style.overflow = "";
// });

onMounted(() => {
  formData.value = { ...modelValue.value };
});
</script>
