<template>
  <div class="w-full">
    <!-- Top category filters -->
    <section class="px-2 container">
      <UniversalH2 heading="Filters" class="mb-3"/>

      <!-- Category Buttons -->
      <GenericScrollableGallery classes="gap-2">
        <button
          v-for="category in uniqueCategories"
          :key="category"
          @click="scrollToCategory(category)"
          :class="[
            'px-4 py-2 rounded-md text-sm md:text-lg font-medium transition-colors whitespace-nowrap dark:shadow-feature-2',
            'bg-white-D2 dark:bg-gray-600 text-bgblack dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500',
          ]"
        >
          {{ formatCategory(category) }} ({{ getCategoryCount(category) }})
        </button>
      </GenericScrollableGallery>
    </section>

    <!-- Items grouped by category -->
    <section class="container mx-auto px-2 py-2 md:py-4 mt-4">
      <div
        v-for="(group, i) in groupedByCategory"
        :key="group.category"
        :id="'cat-' + group.category"
        class="mb-4"
      >
        <h3
          class="text-base md:text-xl font-semibold text-primary/70 dark:text-black-L5 mb-2"
        >
          {{ formatCategory(group.category) }}
        </h3>

        <div
          :class="[
            layout === 'without_image' ? 'gap-1 md:gap-6' : 'xl:grid-cols-3 gap-2 md:gap-6',
            'grid grid-cols-1 md:grid-cols-2',
          ]"
        >
          <template v-for="(item, index) in group.items" :key="item.id">
            <!-- Cart item without image -->
            <LazyUIShopLayoutTwo
              v-if="layout === 'without_image'"
              :modelValue="groupedByCategory[i].items[index]"
              :layout="layout"
              :showEditor="showEditor"
              :isAdminPage="isAdminPage"
              :hideVegNonVegIcon="hideVegNonVegIcon"
              @addToCart="handleAddToCart"
              @deleteItem="handleDeleteItem"
              @removeFromCart="handleRemoveFromCart"
              @confirmUpdate="confirmUpdate"
            />
            <!-- Default cart item layout with image -->
            <LazyUIShopLayoutDefault
              v-else
              :modelValue="groupedByCategory[i].items[index]"
              :layout="layout"
              :showEditor="showEditor"
              :isAdminPage="isAdminPage"
              :hideVegNonVegIcon="hideVegNonVegIcon"
              @addToCart="handleAddToCart"
              @deleteItem="handleDeleteItem"
              @removeFromCart="handleRemoveFromCart"
              @confirmUpdate="confirmUpdate"
            />
          </template>
        </div>
      </div>
    </section>
  </div>

  <!-- Add new item buttons -->
  <div v-if="showEditor && isEditMode" class="flex gap-2 ml-2 -mt-2">
    <SvgIconsPlus
      @click="addNewItem"
      class="w-7 h-7 p-1 bg-primary text-white-D1 rounded cursor-pointer"
    />
    <button
      v-if="getLocalData('superAdminAuthToken')"
      @click="isAIModalOpen = true"
      class="w-7 h-7 p-1 text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded cursor-pointer hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center justify-center"
    >
      <span>AI</span>
    </button>

    <!-- AI Modal -->
    <LazyFeaturesAIModal
      v-if="isAIModalOpen"
      v-model="isAIModalOpen"
      @items-generated="handleAIGeneratedItems"
    />
  </div>

</template>

<script setup>
import { contentTypes } from "@/utils/standard/constants.js";

defineProps({
  showEditor: {
    type: Boolean,
    default: true,
  },
  isAdminPage: {
    type: Boolean,
    default: false,
  },
  layout: {
    type: String,
    default: "with_image",
  },
  hideVegNonVegIcon: {
    type: Boolean,
    default: true,
  },
});

const modelValue = defineModel("modelValue");

// AI Modal state
const isAIModalOpen = ref(false);

// Local storage composable
const route = useRoute();
const { getLocalData, setLocalData, getInstanceData } = useLocalStorage();

const isEditMode = computed(() => getLocalData("editMode") === true);
const cartItems = computed(() => getLocalData(`cartItems_${route.query.pageId}`) || []);

// All unique categories from list
const uniqueCategories = computed(() =>
  [...new Set(modelValue.value.map((item) => item.category))].sort()
);

// Group items by category for sectioned display
const groupedByCategory = computed(() => {
  const groups = uniqueCategories.value.map((cat) => ({
    category: cat,
    items: modelValue.value.filter((i) => i.category === cat),
  }));

  return groups.filter((g) => g.items.length > 0);
});

// Format category name
function formatCategory(category) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

// Get category count
function getCategoryCount(category) {
  return modelValue.value.filter((item) => item.category === category).length;
}

// Add a new item to cart
function handleAddToCart(item) {
  const existingItem = cartItems.value.find(
    (cartItem) => cartItem.id === item.id
  );

  if (existingItem) return;

  const itemModified = {
    ...item,
    costs: item.costs.map((price, i) => ({
      ...price,
      quantity: i === 0 ? 1 : 0,
    })),
  };
  setLocalData(`cartItems_${route.query.pageId}`, [
    ...cartItems.value,
    itemModified,
  ]);
}

// Remove an item from cart
function handleRemoveFromCart(item) {
  const index = cartItems.value.findIndex(
    (cartItem) => cartItem.id === item.id
  );

  if (index !== -1) {
    cartItems.value.splice(index, 1);
  }
  setLocalData(`cartItems_${route.query.pageId}`, cartItems.value);
}

// Delete an item from cart
function handleDeleteItem(item) {
  const index = modelValue.value.findIndex(
    (cartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    modelValue.value.splice(index, 1);
  }
  setLocalData("isUserChangedPageData", true);
}

// Add new dummy item to shop items
function addNewItem() {
  if (!modelValue.value) return;
  modelValue.value = [
    ...modelValue.value,
    { ...contentTypes.cartItem, id: (Date.now()- 1770970161526).toString() },
  ];
  setLocalData("isUserChangedPageData", true);
}

// scroll to category section
function scrollToCategory(category) {
  if (category === "all") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.getElementById("cat-" + category);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 70;

    window.scrollTo({
      top: top,
      behavior: "smooth",
    });
  }
}

function confirmUpdate(newValue) {
  const originalIndex = modelValue.value.findIndex(
    (item) => item.id === newValue.id
  );
  if (originalIndex !== -1) {
    modelValue.value[originalIndex] = { ...newValue };
    setLocalData("isUserChangedPageData", true);
  }
}

function handleAIGeneratedItems(items) {
  if (!modelValue.value) return;
  
  // Add AI generated items to the modelValue
  modelValue.value = [
    ...modelValue.value,
    ...items
  ];
  
  setLocalData("isUserChangedPageData", true);
}
</script>
