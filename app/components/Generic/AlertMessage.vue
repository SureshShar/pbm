<template>
  <div v-if="currentAlertMessage" class="mb-4 md:mb-6">
    <div
      :class="[
        'p-2 md:p-4 text-sm md:text-base rounded-md border',
        alertType === 'success'
          ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300'
          : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300',
      ]"
    >
      {{ currentAlertMessage }}
    </div>
  </div>
</template>

<!-- 
<GenericAlertMessage :alertMessage="alertMessage" :alertType="alertType" /> 
const alertMessage = ref("");
const alertType = ref("success"); // 'success' or 'error'
-->

<script setup>
const props = defineProps({
  alertMessage: {
    type: String,
    default: "",
  },
  alertType: {
    type: String,
    default: "success",
  },
  showLongTime: {
    type: Boolean,
    default: false,
  },
});

const currentAlertMessage = ref("");

watch(
  () => props.alertMessage,
  (newVal) => {
    if (newVal) {
      currentAlertMessage.value = newVal;
      if (props.showLongTime) return;

      setTimeout(() => {
        currentAlertMessage.value = "";
      }, 3000);
    }
  }
);
</script>
