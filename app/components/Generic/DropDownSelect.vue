<template>
  <div class="relative">
    <span class="mb-3 block text-base text-black-L2 dark:text-bglight">
      {{ label }}
    </span>

    <button
      @click="toggleDropdown"
      class="dark:text-white dark:shadow-two w-full rounded-sm border bg-white-D1 px-2 md:px-6 py-1 md:py-3 text-base text-black-L2 outline-none border-gray-300 dark:bg-black-L3 flex justify-between items-center"
    >
          <!-- class="dark:text-white dark:shadow-two w-full rounded-sm border bg-white-D1 px-2 md:px-6 py-1 md:py-3 text-base text-black-L2 outline-none border-gray-300 dark:bg-black-L3" -->
      {{ camelToTitle(selectedRole) }}
      <SvgIconsArrowDown class="w-6 h-6 text-primary transition duration-200" :class="isOpen ? 'rotate-180': 'rotate-0'" />
    </button>

    <!-- Dropdown Menu -->
    <ul
      v-show="isOpen"
      class="absolute mt-1 w-11/12 bg-bglight dark:bg-black-L3 border border-primary rounded shadow-md max-h-60 overflow-auto"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        @click="selectItem(item)"
        class="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-bglight"
      >
        {{ camelToTitle(item) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "Your Role",
  },
  items: {
    type: Array,
    default: [],
  },
  placeholder: {
    type: String,
    default: "Select your item",
  },
});

const emit = defineEmits(["selectItem"]);

const isOpen = ref(false);
const selectedRole = ref(props.placeholder);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectItem(item) {
  selectedRole.value = item;
  isOpen.value = false;

  if (item !== props.placeholder) {
    emit("selectItem", item);
  }
}
</script>
