<template>
  <div class="relative">
    <img
      loading="lazy"
      decoding="async"
      :src="modal.image.src"
      alt="Item image"
      class="object-cover object-center md:h-64 h-40 w-full rounded-t-2xl"
    />
  </div>
  <div
    class="pt-4 pb-6 px-4 md:space-y-4 content rounded-b-2xl shadow-xl bg-white dark:bg-tdv-dark_bg_card"
  >
    <p
      class="font-popins font-bold text-tdv-Secondary dark:text-tdv-dark_secondary line-clamp-2 h-11"
    >
      {{ modal.title }}
    </p>
    <p
      class="flex items-center text-sm font-mont font-bold text-gray-400 gap-2"
    >
      <Icon name="mdi:calendar-month-outline" size="1.25rem" />
      {{ modal.description }}
    </p>
  </div>
</template>

<script setup>
const modal = defineModel("modal");
</script>
