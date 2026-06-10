<template>
  <section id="contact" class="pt-20 md:pt-20 lg:pt-28 mx-4">
    <UniversalCard>
      <UniversalH2 heading="Enter user Id to modify user data." class="mb-3" />
      <!-- <p class="mb-4 md:mb-12 text-base font-medium text-black-L4">
        Our support team will be with you.
      </p> -->

      <div>
        <GenericTextInput
          v-model="userId"
          class="w-full md:w-1/2 mb-8"
          type="text"
          label=""
          placeholder="Enter user Id"
        />
        <!-- Submit button -->
        <button
          class="w-fit dark:shadow-submit-black-L2 rounded-sm bg-primary px-4 md:px-9 py-2 md:py-4 text-base font-medium text-bglight duration-300 hover:bg-primary/90"
          @click="sendData"
        >
          Fetch User Data
        </button>
      </div>
    </UniversalCard>
  </section>
</template>

<script setup>
const userId = ref("");
const emit = defineEmits(["sendData"]);

function sendData() {
  emit("sendData", {
    userId: userId.value,
  });
}
</script>
