<template>
  <GenericModal v-model="modelValue">
    <template #header>
      <UniversalH3>AI helper आपका AI दोस्त</UniversalH3>
    </template>

    <div class="my-4">
      <GenericTextAreaInput
        v-model="prompt"
        name="Ai bot"
        :rows="6"
        placeholder="Add 3 South Indian dosa varieties.(दक्षिण भारतीय डोसे की 3 किस्में शामिल करें)"
        label="Describe the items you want to add:"
        @keyup.enter="generateItems"
        :disabled="isLoading"
      />
    </div>

    <!-- Ai generated Cart items shown -->
    <div class="mb-4 bg-gray-200 dark:bg-gray-700 rounded-md shadow-md p-2 md:p-4" v-if="generatedItems.length > 0">
      <h4 class="text-base font-medium text-gray-800 dark:text-gray-300 mb-2">
        Generate:
      </h4>
      <div class="max-h-80 overflow-y-auto space-y-2">
        <div
          v-for="(item, index) in generatedItems"
          :key="item.id"
          class="p-2 bg-white dark:bg-gray-300 rounded text-sm font-semibold"
        >
          <div class="font-medium">{{ item.title }}</div>
          <div class="text-gray-600 dark:text-gray-500 text-xs">
            {{ item.srtdsc }}
          </div>
          <div class="text-primary text-xs font-semibold">
            {{ item.costs[0]?.size }}: ₹{{ item.costs[0]?.price }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="error" class="mt-3 text-red-600 dark:text-red-400 text-sm">
      {{ error }}
    </div>

    <template #footer>
      <div class="flex gap-3">
        <button
          v-if="generatedItems.length === 0"
          @click="generateItems"
          :disabled="!prompt.trim() || isLoading"
          class="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span>Generate</span>
          <SvgIconsLoader v-if="isLoading" class="w-5 h-5 text-white animate-spin" />
        </button>
        <button
          v-else
          @click="addItemsToCart"
          :disabled="isLoading"
          class="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Add ({{ generatedItems.length }})
        </button>
        <button
          @click="modelValue = false"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
        >
          Cancel
        </button>
      </div>
    </template>
  </GenericModal>
</template>

<script setup>
const prompt = ref("");
const isLoading = ref(false);
const generatedItems = ref([]);
const error = ref("");

const modelValue = defineModel("modelValue");
const emit = defineEmits(["itemsGenerated"]);

async function generateItems() {
  if (!prompt.value.trim()) return;

  isLoading.value = true;
  error.value = "";

  try {
    const response = await useApi("generateCartItems", {
      prompt: prompt.value.trim(),
    });

    if (response.success) {
      generatedItems.value = response.data || [];
    } else {
      error.value = response.data || "Failed to generate items";
    }
  } catch (err) {
    error.value = "Error generating items. Please try again.";
    console.error("AI generation error:", err);
  } finally {
    isLoading.value = false;
  }
}

function addItemsToCart() {
  if (generatedItems.value.length > 0) {
    emit("itemsGenerated", generatedItems.value);
    modelValue.value = false;
  }
}
</script>
