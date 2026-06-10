<template>
  <div
    v-if="modelValue"
    class="flex w-full items-center justify-between gap-2 mb-2"
  >
    <!-- Title -->
    <h5
      class="relative text-sm md:text-lg text-black-L3 flex items-center font-semibold tracking-tight dark:text-bglight line-clamp-1"
    >
      <!-- Underscore icon -->
      <span
        v-if="hideVegNonVegIcon"
        class="flex items-center text-green-500 w-4 h-4"
      >
        ─
      </span>
      <!-- Veg non veg icon -->
      <SvgIconsVeg
        v-else
        :class="[
          modelValue.isVeg ? 'text-green-500' : 'text-red-500',
          'w-4 h-4 mr-1',
        ]"
      />
      <span>{{ modelValue.title }}</span>
      <LazyEditorCartItem
        v-if="showEditor"
        v-model="modelValue"
        @deleteItem="deleteItem"
        @confirmUpdate="confirmUpdate"
        class="absolute -top-1 right-0"
        opacityClass="bg-opacity-90"
      />
    </h5>

    <!-- Add to cart button -->
    <button
      :class="[
        'flex items-center justify-center rounded-md text-center text-xs md:text-base text-bglight px-2 py-2',
        modelValue.hide
          ? 'bg-gray-500 cursor-not-allowed'
          : 'bg-primary focus:outline-none hover:bg-opacity-80 hover:shadow-signUp',
      ]"
      :disabled="modelValue.hide"
      @click="handleCartItem"
    >
      <SvgIconsCart v-if="!modelValue.hide" class="mr-2 h-4 w-4" />
      {{ modelValue.hide ? "Sold Out" : isAddCart ? "Remove" : "Add" }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  showEditor: {
    type: Boolean,
    default: false,
  },
  isAdminPage: {
    type: Boolean,
    default: false,
  },
  layout: {
    type: [Number, String],
    default: 2,
  },
  hideVegNonVegIcon: {
    type: Boolean,
    default: true,
  },
});

const modelValue = defineModel("modelValue");

const emit = defineEmits(["addToCart", "removeFromCart", "deleteItem"]);

const route = useRoute();
const { getLocalData } = useLocalStorage();

// Cart items
const cartItems = computed(
  () => getLocalData(`cartItems_${route.query.pageId}`) || []
);

// Check if item is already in cart
const isAddCart = computed(() =>
  cartItems.value.some((cartItem) => cartItem.id === modelValue.value.id)
);

// Add/remove to cart function
function handleCartItem() {
  isAddCart.value
    ? emit("removeFromCart", modelValue.value)
    : emit("addToCart", modelValue.value);
}

// Emit event to parent component
function deleteItem() {
  emit("deleteItem", modelValue.value);
}

function confirmUpdate() {
  emit("confirmUpdate", modelValue.value);
}
</script>
