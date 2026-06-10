<template>
  <section id="contact" class="mx-4">
    <UniversalCard>
      <UniversalH2 heading="Change user category data" class="mb-3" />

      <GenericAlertMessage :alertMessage="alertMessage" :showLongTime="true" />
      <div class="flex flex-wrap">
        <GenericDropDownSelect
          class="w-full md:w-1/2"
          :items="categories"
          @selectItem="getSelectedItem"
        />

        <!-- Submit button -->
        <div class="w-full my-4 md:my-8">
          <button
            class="shadow-submit dark:shadow-submit-black-L2 rounded-sm bg-primary px-4 md:px-9 py-2 md:py-4 text-base font-medium text-bglight duration-300 hover:bg-primary/90"
            :disabled="isDisable"
            @click="sendData"
          >
            {{ confirmSelect }}
          </button>
        </div>
      </div>
    </UniversalCard>
  </section>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    default: [],
  },
});

const alertMessage = ref("");
const selectedCategory = ref("");
const confirmSelect = ref("Submit");

const emit = defineEmits(["sendData"]);
const isDisable = computed(() => !selectedCategory.value);

function getSelectedItem(item) {
  selectedCategory.value = item;
}

function sendData() {
  if (confirmSelect.value === "Submit") {
    confirmSelect.value = "Confirm";
    alertMessage.value =
      "Remember this action is irreversible! Can't come back";
  } else if (selectedCategory.value) {
    emit("sendData", {
      category: selectedCategory.value,
    });
    confirmSelect.value = "Submit";
  }
}
</script>
