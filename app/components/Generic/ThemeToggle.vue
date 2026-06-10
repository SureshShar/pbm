<template>
  <button
    aria-label="theme toggler"
    @click="toggleTheme"
    class="flex items-center justify-center text-bgblack rounded-full cursor-pointer bg-gray-2 dark:bg-dark-bg dark:text-bglight"
  >
    <SvgIconsSun class="hidden text-secondary w-7 h-7 dark:block" />
    <SvgIconsMoon class="w-7 h-7 block text-black-L1 dark:hidden" />
  </button>
</template>

<script setup>
const { theme, toggleTheme } = useTheme();
</script>
