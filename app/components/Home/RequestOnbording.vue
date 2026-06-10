<template>
  <UniversalCard>
    <GenericSectionTitle
      paragraph="क्या आप नया दुकान पेज बनाना चाहते हैं, तो इस फॉर्म को भरे"
      title="Request New Page"
      :center="true"
    >
    </GenericSectionTitle>
    <div
      class="p-4 md:rounded-md shadow-solid-3 bg-bglight shadow-three rounded-md dark:bg-black-L2 dark:shadow-feature-2"
    >
      <!-- Message Form -->
      <div class="container">
        <div class="mb-7.5">
          <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <GenericTextInput
              v-model="name"
              class="md:mb-4 w-full"
              type="text"
              label="Your name *"
              placeholder="Enter here"
            />
            <GenericTextInput
              v-model="mail"
              class="md:mb-4 w-full"
              type="mail"
              label="Enter Mail *"
              placeholder="Enter here"
            />
            <GenericTextInput
              v-model="contactNumber"
              class="mb-4 w-full"
              type="text"
              label="Your contact number *"
              placeholder="Enter here"
            />
            <GenericDropDownSelect
              class="w-full"
              :items="categories"
              @selectItem="getSelectedItem"
            />
            <GenericTextAreaInput
              v-model="message"
              :rows="4"
              placeholder="write your message here"
              label="Message"
              :name="'message'"
              class="w-full col-span-1 md:col-span-2"
            />
          </div>
        </div>

        <div class="flex justify-start gap-3 mt-6">
          <button
            @click="sendMessage"
            :disabled="isLoading || !message"
            class="px-4 py-2 bg-primary text-bglight rounded hover:bg-primary-dark"
          >
            <span v-if="!isLoading">Send</span>
            <span v-else class="flex items-center"> Sending... </span>
          </button>
        </div>
      </div>
    </div>
  </UniversalCard>
</template>

<script setup>
const name = ref("");
const mail = ref("");
const message = ref("");
const contactNumber = ref("");
const selectedCategory = ref(null);

const isLoading = ref(false);
const categories = ref([]);
const categoryWiseSchemeMap = ref(null);

// Global edit mode via local storage
const { getLocalData, showSuccess, showError, setLocalData } = useLocalStorage();

async function sendMessage() {
  if (!name.value || !contactNumber.value) return;
  
  isLoading.value = true;
  
  try {
    const response = await useApi("userQuery/send", {
      pageId: "superadmin",
      key: "id_" + Date.now(),
      value: JSON.stringify({
        title: "Page request",
        name: name.value,
        mail: mail.value,
        contactNumber: contactNumber.value,
        category: selectedCategory.value,
        message: message.value.trim(),
        status: "pending",
      }),
    });

    if (response.success) {
      showSuccess("Request sent successfully!")
      setLocalData("userName", name.value);
      setLocalData("userContact", contactNumber.value);
      
      name.value = "";
      message.value = "";
      contactNumber.value = "";
      selectedCategory.value = null;
    } else {
      throw new Error(response.error || "Failed to send message");
    }
  } catch (error) {
    showError("Failed to send message. Please try again later." + `${error}`);
  } finally {
    isLoading.value = false;
  }
}

function getSelectedItem(item) {
  selectedCategory.value = item;
}

onMounted(async () => {
  name.value = getLocalData("userName") || "";
  contactNumber.value = getLocalData("userContact") || "";
  const { categoryMap } = await import("@/utils/standard/constants.js");
  if (categoryMap) {
    categories.value = Object.keys(categoryMap);
    categoryWiseSchemeMap.value = categoryMap;
  }
});
</script>
