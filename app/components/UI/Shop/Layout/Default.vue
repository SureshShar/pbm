<template>
  <div
    v-if="modelValue"
    class="relative h-24 md:h-28 flex w-full overflow-hidden bg-bglight shadow-three rounded-md dark:bg-black-L1 dark:shadow-feature-2"
  >
    <!-- Item image -->
    <div v-if="modelValue.image.src" class="relative flex w-1/4 md:w-1/3 h-24 md:h-28 overflow-hidden mr-2">
      <img
        class="w-full h-full object-cover object-center"
        :src="modelValue.image.src"
        :alt="modelValue.image.alt"
      />
      <span
        v-if="modelValue.itemType"
        class="absolute top-0 left-0 m-1 bg-secondary rounded-full px-2 py-1 bg-opacity-60 text-center text-xs text-primary"
      >
        {{ modelValue.itemType.replace(/\b\w/g, (c) => c.toUpperCase()) }}
      </span>
      <SvgIconsSoldOut
        v-if="modelValue.hide"
        class="absolute top-5 right-0 w-20 h-20 text-primary opacity-80"
      />
    </div>

    <!-- Item details -->
    <div :class="[modelValue.image.src ? 'w-3/4 p-1' : 'w-full py-1 px-2', 'flex flex-col justify-between']">
      <!-- Title -->
      <h5
        class="flex items-center justify-between text-sm md:text-base text-black-L2 font-semibold tracking-tight dark:text-bglight"
      >
        <span class="line-clamp-1">{{ modelValue.title }}</span>
        <SvgIconsVeg
          v-if="!hideVegNonVegIcon"
          :class="[
            modelValue.isVeg ? 'text-green-500' : 'text-red-500',
            'w-4 h-4 mr-1',
          ]"
        />
      </h5>

      <!-- Short description -->
      <p class="text-xs md:text-base text-black-L4 line-clamp-1 pr-3 pb-1">
        {{ modelValue.srtdsc || modelValue.shortDescription }}
      </p>

      <!-- Price and Add to cart button -->
      <div class="py-1 flex items-center justify-between">
        <!-- Price -->
        <p>
          <span
            class="text-md md:text-lg font-bold text-black-L2 dark:text-bglight"
          >
            ₹ {{ modelValue.costs[0].price }}
          </span>
          <span class="text-xs md:text-sm text-black-L4 line-through px-1">
            ₹ {{ Math.ceil(Number(modelValue.costs[0].price) * 1.2) }}
          </span>
        </p>

        <!-- Add to cart button -->
        <button
          :class="[
            'flex items-center justify-center rounded-md text-center text-xs md:text-base text-bglight px-2 py-2 font-medium',
            modelValue.hide
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-primary focus:outline-none hover:bg-opacity-80 hover:shadow-signUp',
          ]"
          :disabled="modelValue.hide"
          @click="handleCartItem"
        >
          <SvgIconsCart v-if="!modelValue.hide" class="mr-2 h-5 w-5" />
          {{ modelValue.hide ? "Sold Out" : isAddCart ? "Remove" : "Add" }}
        </button>
      </div>
    </div>

    <!-- Editor -->
    <LazyEditorCartItem
      v-if="showEditor"
      v-model="modelValue"
      @deleteItem="deleteItem"
      @confirmUpdate="confirmUpdate"
      class="absolute top-3 -left-1"
    />
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
    default: 0,
  },
  hideVegNonVegIcon: {
    type: Boolean,
    default: true,
  },
});

const modelValue = defineModel("modelValue");

const emit = defineEmits(["addToCart", "removeFromCart", "deleteItem", "confirmUpdate"]);

const route = useRoute();
const { getLocalData } = useLocalStorage();

const cartItems = computed(() => getLocalData(`cartItems_${route.query.id}`) || []);
const isAddCart = computed(() => cartItems.value.some((cartItem) => cartItem.id === modelValue.value.id));

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
