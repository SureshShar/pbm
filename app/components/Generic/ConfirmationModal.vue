<template>
  <div class="flex items-center">
    <GenericModal v-model="modelValue">
      <template #header>
        <div class="text-lg font-semibold dark:text-bglight">
          User Confirmation
        </div>
      </template>

      <div class="p-6 pt-0 text-center">
        <svg
          class="w-20 h-20 text-red-600 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h3 class="text-xl font-normal text-gray-500 mt-5 mb-6">
          {{ message }}
        </h3>
      </div>
      <template #footer>
        <div class="w-full flex items-center justify-between">
          <button
            @click="emit('userConfirmed')"
            type="button"
            class="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
          >
            {{ confirmBtnText }}
          </button>
          <button
            @click="modelValue = false"
            type="button"
            class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
            data-modal-toggle="delete-user-modal"
          >
            {{ cancelBtnText }}
          </button>
        </div>
      </template>
    </GenericModal>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: "Are you sure you want to delete this user?",
  },
  confirmBtnText: {
    type: String,
    default: "Yes, I'm sure",
  },
  cancelBtnText: {
    type: String,
    default: "No, cancel",
  },
});

const modelValue = defineModel("modelValue");
const emit = defineEmits(["userConfirmed"]);
</script>
