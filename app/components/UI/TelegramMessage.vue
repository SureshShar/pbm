<template>
  <div
    id="user_send_message"
    class="mx-3 p-4 md:rounded-md shadow-solid-3 bg-bglight shadow-three rounded-md dark:bg-black-L2 dark:shadow-feature-2"
  >
    <!-- Alert Messages -->
    <GenericAlertMessage :alertMessage="alertMessage" :alertType="alertType" />

    <!-- Message Form -->
    <div>
      <div class="mb-7.5">
        <div class="w-full flex flex-col md:flex-row gap-4">
          <GenericTextInput
            v-model="name"
            class="md:mb-4 w-full md:w-1/2"
            type="text"
            label="Your name *"
            placeholder="Enter here"
          />
          <!-- <GenericTextInput
            v-model="mail"
            class="md:mb-4 w-full md:w-1/2"
            type="text"
            label="Enter Mail"
            placeholder="Enter here"
          /> -->
          <GenericTextInput
            v-model="contactNumber"
            class="mb-4 w-full md:w-1/2"
            type="text"
            label="Contact Number"
            placeholder="Enter here"
          />
        </div>
        <GenericTextAreaInput
          v-model="message"
          :rows="6"
          placeholder="write your message here"
          label="Message *"
          :name="'message'"
          :required="true"
        />
      </div>

      <div class="flex justify-start gap-3 mt-6">
        <button
          @click="sendMessage"
          :disabled="isLoading || !message.trim()"
          class="px-4 py-2 bg-primary text-bglight rounded hover:bg-primary-dark"
        >
          <span v-if="!isLoading">Send</span>
          <span v-else class="flex items-center"> Sending... </span>
        </button>
        <button
          @click="clearForm"
          :disabled="isLoading"
          class="px-4 py-2 text-bglight bg-gray-600 rounded hover:bg-gray-400"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const name = ref("");
// const mail = ref("");
const message = ref("");
const contactNumber = ref("");
const isLoading = ref(false);
const alertMessage = ref("");
const alertType = ref("success"); // 'success' or 'error'

// Global edit mode via local storage
const { getLocalData, setLocalData } = useLocalStorage();
const pageId = computed(() => getLocalData("pageId"));

async function sendMessage() {
  const trimmedMessage = message.value.trim()
  if (!trimmedMessage || !name.value) return;

  isLoading.value = true;
  alertMessage.value = "";

  try {
    const response = await useApi("userQuery/send", {
      pageId: pageId.value,
      key: "id_" + Date.now(),
      value: JSON.stringify({
        title: "User feedback",
        name: name.value,
        contactNumber: contactNumber.value,
        message: trimmedMessage,
        status: "pending",
      }),
    });
    // ${mail.value ? '*User Mail*:' + mail.value + '\n' : ''}

    if (response.success) {
      alertType.value = "success";
      alertMessage.value = "Message sent successfully!";
      message.value = "";
      setLocalData("userName", name.value);
      setLocalData("userContact", contactNumber.value);
      // setLocalData("userMail", mail.value);
    } else {
      throw new Error(response.error || "Failed to send message");
    }
  } catch (error) {
    alertType.value = "error";
    alertMessage.value = "Failed to send message. Please try again later.";
    console.error("Error sending message:", error);
  } finally {
    isLoading.value = false;
  }
}

function clearForm() {
  message.value = "";
  alertMessage.value = "";
}

onMounted(() => {
  name.value = getLocalData("userName") || ""
  contactNumber.value = getLocalData("userContact") || ""
  // mail.value = getLocalData("userMail") || ""
})
</script>
