<template>
  <div v-if="isPageMounted" class="flex gap-2 fixed bottom-2 right-2 z-30">
    <!-- Scroll to top and show cart -->
    <template v-for="btn in buttons" :key="btn.label">
      <button
        v-if="btn && btn.condition"
        :class="btn.class"
        :aria-label="btn.label"
        @click="btn.action"
      >
        <component :is="btn.icon" class="h-6 w-6 text-white" v-if="btn.icon" />
        <span
          v-if="btn.isArrow"
          class="mt-[6px] h-3 w-3 rotate-45 border-l border-t border-bglight"
        ></span>
      </button>
    </template>

    <!-- Cart Modal -->
    <UIShopCartModal
      v-model="showCartModal"
      :items="cartItems"
      @changeQty="changeQty"
    />

    <!-- Cart history modal -->
    <GenericSlideUpModal v-model="showCartHistoryModal" :footer="false">
      <!-- title -->
      <template #header>
        <div class="flex items-center gap-2 pb-1">
          <div class="w-1.5 h-6 bg-primary-1 rounded-full"></div>
          <h3 class="text-xl font-bold text-black-0 dark:text-white-0">
            Order History
          </h3>
        </div>
      </template>

      <!-- Cart history list -->
      <div class="space-y-4 my-4 max-h-[70vh] pr-1 custom-scrollbar">
        <div
          v-for="(history, i) in cartHistory"
          :key="i"
          class="relative overflow-hidden border border-white-1 dark:border-black-3 bg-white-0 dark:bg-black-1 p-5 rounded-2xl shadow-one hover:shadow-two transition-shadow"
        >
          <!-- Decorative Accent -->
          <div class="absolute top-0 left-0 w-1 h-full bg-primary-1"></div>

          <!-- Header: Timestamp -->
          <div class="flex justify-between items-start mb-4">
            <span class="inline-flex items-center px-3 py-1 rounded-lg bg-primary-1/10 dark:bg-primary-1/20 text-primary-1 dark:text-primary-2 text-xs font-bold tracking-wide">
              <SvgIconsWatch class="w-3.5 h-3.5 mr-1.5" />
              {{ new Date(history.time).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) }}
            </span>
          </div>

          <!-- Messages Section -->
          <ul class="space-y-2 mb-4 border-l-2 border-white-2 dark:border-black-3 pl-4">
            <li 
              v-for="m in history.messages" 
              :key="m" 
              v-html="m" 
              class="text-sm text-black-3 dark:text-black-5 leading-relaxed"
            />
          </ul>

          <!-- Footer: Stats -->
          <div class="flex items-center justify-between pt-3 border-t border-white-1 dark:border-black-2">
            <div class="flex flex-col">
              <span class="text-[10px] uppercase font-bold text-black-4 dark:text-black-5 tracking-wider">Items</span>
              <span class="text-sm font-semibold text-black-1 dark:text-white-2">{{ history.totalItems }} units</span>
            </div>
            <div class="flex flex-col">
              <span class="text-[10px] uppercase font-bold text-black-4 dark:text-black-5 tracking-wider">Total Paid</span>
              <span class="text-sm font-bold text-primary-1 dark:text-primary-2">₹{{ history.totalAmount.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </GenericSlideUpModal>
  </div>
</template>

<script setup>
/**
 * Bottom sticky features component
 * Features: Scroll to top button, Cart button with modal, Cart history modal
 * Edit pencil icon is not handled by this component
*/

import SvgIconsCart from "@/components/SvgIcons/Cart.vue";
import SvgIconsHistory from "@/components/SvgIcons/History.vue";

const isVisible = ref(false);
const isPageMounted = ref(false);
const showCartModal = ref(false);
const showCartHistoryModal = ref(false);

const route = useRoute();
const { getLocalData } = useLocalStorage();

// Common button class
const commanButtonClass = "flex w-10 h-10 items-center justify-center rounded-md text-bglight shadow-md transition duration-300 ease-in-out";

// Cart items and history
const cartItems = computed(() => getLocalData(`cartItems_${route.query.id}`) || []);
const cartHistory = computed(() => getLocalData(`cartHistory_${route.query.id}`) || []);

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Dynamic button configuration
const buttons = computed(() => [
  {
    label: "scroll to top",
    condition: isVisible.value,
    action: scrollToTop,
    class:
      commanButtonClass + " bg-primary hover:bg-opacity-80 hover:shadow-signUp",
    icon: null,
    isArrow: true,
  },
  {
    label: "show cart history",
    condition: cartHistory.value.length,
    action: () => (showCartHistoryModal.value = true),
    class:
      commanButtonClass +
      " bg-tertiary hover:bg-opacity-80 hover:shadow-signUp",
    icon: SvgIconsHistory,
    isArrow: false,
  },
  {
    label: "show cart",
    condition: cartItems.value.length,
    action: () => (showCartModal.value = true),
    class:
      commanButtonClass +
      " bg-tertiary animate-bounce hover:bg-opacity-80 hover:shadow-signUp",
    icon: SvgIconsCart,
    isArrow: false,
  },
]);

// Scroll to top visibility function
function toggleVisibility() {
  isVisible.value = window.pageYOffset > 300;
}

// Change quantity function
function changeQty(ci) {
  const originalIndex = cartItems.value.findIndex((item) => item.id === ci.id);
  if (originalIndex !== -1) {
    cartItems.value[originalIndex] = { ...ci };
  }
}

// On mounted
onMounted(() => {
  window.addEventListener("scroll", toggleVisibility);
  isPageMounted.value = true;
});

// On unmounted
onUnmounted(() => {
  window.removeEventListener("scroll", toggleVisibility);
});
</script>
