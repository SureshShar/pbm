<template>
  <GenericSlideUpModal v-model="modelValue">
    <!-- Header -->
    <template #header>
      <div class="flex items-center justify-between w-full border-b border-white-D1 dark:border-black-L3 pb-3">
        <div class="flex items-center gap-2">
          <h3 class="text-xl font-bold text-black-L1 dark:text-white-0">
            {{ !showForm ? "Cart items" : "Order list" }}
          </h3>
          <span class="px-2 py-0.5 mx-1 text-xs font-medium rounded-full bg-primary-2/20 text-primary-1">
            {{ totalItems }} items
          </span>
        </div>
        <button
          class="px-3 py-1 text-xs font-semibold rounded-md transition-colors bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-bglight"
          @click="emptyCart"
        >
          {{ cartEmptyState }}
        </button>
      </div>
    </template>

    <!-- Initial Stage Cart items -->
    <ul v-if="!showForm" class="space-y-3 my-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
      <UIShopCartItem
        v-for="it in items"
        :key="it.id"
        :item="it"
        :layoutData="layoutData"
        @changeQty="(item) => emit('changeQty', item)"
      />
      <!-- Empty State Illustration/Text if needed -->
      <div v-if="items.length === 0" class="py-10 text-center text-black-L4">
        Your cart is empty
      </div>
    </ul>

    <!-- Final stage Order Details Form -->
    <div v-else class="my-4">
      <!-- Order details Messages -->
      <ul v-if="messages.length" class="space-y-2 mb-6 p-3 rounded-lg bg-primary-2/5 border border-primary-2/20">
        <li
          v-for="m in messages"
          :key="m"
          class="text-sm text-black-L2 dark:text-black-L5 flex gap-2"
        >
          <span class="text-primary-1">•</span>
          <span v-html="m" />
        </li>
      </ul>

      <!-- Order Details Form -->
      <div class="space-y-5">
        <GenericTextInput
          v-model="customerName"
          type="text"
          label="Your Name"
          :showStar="true"
          placeholder="Enter full name"
          class="w-full"
          :required="true"
        />
        <GenericTextInput
          v-model="userIdentifier"
          type="text"
          :showStar="true"
          :label="layoutData.cartLabel"
          :placeholder="`Enter ${layoutData.cartLabel}`"
          class="w-full"
          :required="true"
        />
        <GenericTextInput
          v-model="contactNumber"
          type="text"
          label="Contact number (optional)"
          placeholder="+91 00000 00000"
          class="w-full"
        />
        <GenericTextAreaInput
          v-model="extraMessage"
          :rows="3"
          placeholder="Any special instructions?"
          label="Message (optional)"
          name="message"
          class="w-full"
        />
      </div>
    </div>

    <!-- Footer -->
    <template #footer>
      <div class="w-full flex items-center justify-between pt-4 border-t border-white-D1 dark:border-black-L3 bg-bglight dark:bg-bgblack">
        <!-- Price and total items -->
        <div class="flex flex-col">
          <span class="text-xs uppercase tracking-wider text-black-L4 dark:text-black-L5 font-medium">Total Amount</span>
          <div class="flex items-center gap-2">
            <span class="font-bold text-xl text-primary-1 dark:text-primary-2">
              ₹{{ totalAmount.toFixed(2) }}
            </span>
            <span class="text-[10px] leading-none font-bold text-bglight bg-red-500 px-1.5 py-0.5 rounded shadow-sm">
              + GST
            </span>
          </div>
        </div>

        <!-- Initial Stage confirm and close button -->
        <div v-if="!showForm" class="flex items-center gap-3">
          <button
            class="px-5 py-2.5 text-sm font-bold rounded-xl transition-all bg-white-D1 dark:bg-black-L3 text-black-L1 dark:text-bglight hover:bg-white-D2"
            @click="modelValue = false"
          >
            Close
          </button>
          
          <button
            :disabled="!totalItems"
            class="px-8 py-2.5 text-sm font-bold rounded-xl transition-all shadow-btn hover:shadow-btn-hover disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-bglight hover:bg-primary-1"
            @click="showForm = true"
          >
            Confirm
          </button>
        </div>

        <!-- Final Stage submit and back button -->
        <div v-else class="flex items-center gap-3">
          <button
            :disabled="isLoading"
            class="px-5 py-2.5 text-sm font-bold rounded-xl transition-all bg-white-D1 dark:bg-black-L3 text-black-L1 dark:text-bglight disabled:opacity-50"
            @click="showForm = false"
          >
            Back
          </button>

          <button
            :disabled="isLoading || !isFormValid"
            class="px-8 py-2.5 text-sm font-bold rounded-xl transition-all shadow-btn hover:shadow-btn-hover disabled:bg-black-L4 disabled:cursor-not-allowed bg-primary text-bglight hover:bg-primary-1"
            @click="submitOrder"
          >
            <span class="flex items-center gap-2">
              <SvgIconsLoader
                v-if="isLoading"
                class="w-4 h-4 animate-spin text-current"
              />
              {{ isLoading ? "Processing..." : "Place Order" }}
            </span>
          </button>
        </div>
      </div>
    </template>
  </GenericSlideUpModal>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["changeQty"]);

// Form state
const extraMessage = ref("");
const customerName = ref("");
const userIdentifier = ref("");
const contactNumber = ref("");

const isLoading = ref(false);
const showForm = ref(false);
const cartEmptyState = ref("Clear shopping cart");

// Modal close or open
const modelValue = defineModel("modelValue");

// Global edit mode via local storage
const route = useRoute();
const { getLocalData, setLocalData, getInstanceData, showSuccess, showError, showWarning } = useLocalStorage();

const pageId = computed(() => getLocalData("pageId"));
const layoutData = computed(() => getInstanceData("userMetaData")?.extraPageData || {});

// Cart items total price
const totalAmount = computed(() => {
  if (!props.items) return 0;
  return props.items.reduce((sum, it) => {
    const costSums = it.costs.reduce((costSum, cost) => {
      return costSum + cost.quantity * cost.price;
    }, 0);
    return sum + costSums;
  }, 0);
});

// Cart items total quantity
const totalItems = computed(() => {
  if (!props.items) return 0;
  return props.items.reduce((sum, it) => {
    const costSums = it.costs.reduce((costSum, cost) => {
      return costSum + cost.quantity;
    }, 0);
    return sum + costSums;
  }, 0);
});

// Filter Cart items with quantity > 0
const selectedItems = computed(() => {
  return props.items.filter((item) => {
    return item.costs.some((cost) => cost.quantity > 0);
  });
});

// Order details messages in first stage
const messages = computed(() => {
  const textLists = [];

  selectedItems.value.forEach((item) => {
    item.costs.forEach((cost) => {
      if (cost.quantity) {
        textLists.push(
          `<b>${item.title}</b> (${cost.size}) → (${cost.quantity} x ₹${
            cost.price
          }) = ₹${cost.quantity * cost.price}\n`,
        );
      }
    });
  });

  return textLists;
});

// Order submit button/form validation
const isFormValid = computed(() => {
  return (
    customerName.value.trim() !== "" &&
    userIdentifier.value.trim() !== "" &&
    totalItems.value > 0
  );
});

// Send order to record keeper
async function submitOrder() {
  if (!isFormValid.value) return;

  isLoading.value = true;

  try {
    const response = await useApi("userQuery/send", {
      pageId: pageId.value,
      key: "id_" + Date.now(),
      value: JSON.stringify({
        title: "Cart order",
        name: customerName.value,
        [layoutData.value.cartLabel]: userIdentifier.value,
        contactNumber: contactNumber.value,
        items: messages.value,
        message: extraMessage.value.trim(),
        totalAmount: "₹" + totalAmount.value.toFixed(2),
        status: "pending",
      }),
    });

    // const response = await new Promise((resolve) => { setTimeout(resolve, 10000); // 10000 ms = 10 seconds });

    if (response.success) {
      showSuccess("Your order placed successfully.");
      const cartHistory = getLocalData(`cartHistory_${route.query.pageId}`) || [];

      setLocalData("userName", customerName.value);
      setLocalData(`cartHistory_${route.query.pageId}`, [
        {
          messages: messages.value,
          totalAmount: totalAmount.value,
          totalItems: totalItems.value,
          time: Date.now(),
        },
        ...cartHistory.slice(0, 3),
      ]);
      if (contactNumber.value.trim()) {
        setLocalData("userContact", contactNumber.value);
      }
      resetCart();
    } else {
      showError("Failed to place order. Please try again later.");
    }
  } catch (error) {
    showError("Failed to place order. Please try again later.");
  } finally {
    isLoading.value = false;
  }
}

// Empty cart
function emptyCart() {
  if (cartEmptyState.value === "Are you sure?") {
    resetCart();
    cartEmptyState.value = "Clear shopping cart";
  } else {
    cartEmptyState.value = "Are you sure?";
  }
}

// Reset form fields
function resetCart() {
  modelValue.value = false;
  showForm.value = false;
  setLocalData(`cartItems_${route.query.pageId}`, []);
}

// watch for Modal open or close and scroll disable
watch(modelValue, (val) => {
  if (val) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

// Set values from local store
onMounted(() => {
  customerName.value = getLocalData("userName") || "";
  contactNumber.value = getLocalData("userContact") || "";
});
</script>
