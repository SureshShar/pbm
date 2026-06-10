<template>
  <li
    v-if="!item.hide"
    class="mx-auto flex items-center max-w-md rounded bg-white-D1 dark:bg-black-L2"
  >
    <!-- Cart item image -->
    <div v-if="!hideImage" class="relative h-24 flex w-1/4 overflow-hidden">
      <img class="object-cover" :src="item.image.src" :alt="item.image.alt" />
      <span
        v-if="item.itemType"
        class="absolute top-0 left-0 m-1 bg-secondary rounded-full px-2 py-1 bg-opacity-60 text-center text-xs text-primary"
      >
        {{ camelToTitle(item.itemType) }}
      </span>
    </div>

    <!-- Cart item details -->
    <div :class="[!hideImage ? 'px-2' : 'p-2', 'flex-1 min-w-0']">
      <!-- Item name -->
      <p
        class="w-full flex items-center justify-between gap-2 flex-nowrap text-sm md:text-base font-semibold text-black-L2 dark:text-bglight truncate pb-1"
      >
        <span>{{ item.title }}</span>
        <SvgIconsVeg
          v-if="!layoutData.hideVegNonVegIcon"
          :class="[
            item.isVeg ? 'text-green-500' : 'text-red-500',
            'w-4 h-4 mr-1',
          ]"
        />
      </p>

      <!-- Item price and quantity -->
      <div class="grid grid-cols-1 gap-1">
        <template v-for="(cost, index) in item.costs" :key="index">
          <div v-if="cost.price" class="flex items-center justify-between">
            <p class="text-black-L4 text-sm md:text-base font-semibold">
              {{ cost.size }}
              <span class="text-primary">₹{{ cost.price }}</span>
            </p>
            <div class="flex items-center gap-4">
              <SvgIconsMinus
                @click="changeQty(item, cost.size, -1)"
                class="p-1 rounded bg-black-L4 w-6 h-6 md:w-8 md:h-8 text-bgblack dark:text-bglight"
              />
              <span
                class="text-sm md:text-base text-center dark:text-bglight cursor-pointer"
              >
                {{ cost.quantity }}
              </span>
              <SvgIconsPlus
                @click="changeQty(item, cost.size, 1)"
                class="p-1 rounded bg-primary w-6 h-6 md:w-7 md:h-7 text-bglight cursor-pointer"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
  layoutData: {
    type: Object,
    default: {},
  },
});

const emit = defineEmits(["changeQty"]);

const hideImage = computed(
  () => props.layoutData.layout !== 2 || !props.item.image.src
);

function formatName(name) {
  return name.replace(/\b\w/g, (c) => c.toUpperCase());
}

function changeQty(item, size, increament) {
  const cost = item.costs.find((c) => c.size === size);
  cost.quantity = Math.max(0, cost.quantity + increament);
  emit("changeQty", item);
}
</script>
