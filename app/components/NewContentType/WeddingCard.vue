<template>
  <div class="bg-white dark:bg-gray-600  shadow-xl rounded-lg text-bgblack dark:text-bglight mx-auto">
    <div class="rounded-t-lg h-44 overflow-hidden">
      <img
        class="object-cover object-top w-full"
        :src="modelValue.bgImg"
        alt="bride"
      />
    </div>

    <div class="flex justify-between items-center">
      <div
        class="mx-auto w-36 h-36 relative -mt-16 border-4 border-white dark:border-gray-800 rounded-full overflow-hidden"
      >
        <img
          class="object-cover object-center h-36"
          :src="modelValue.brideImg"
          alt="Woman looking front"
        />
      </div>
      <div
        class="mx-auto w-36 h-36 relative -mt-16 border-4 border-white dark:border-gray-800 rounded-full overflow-hidden"
      >
        <img
          class="object-cover object-center h-36"
          :src="modelValue.groomImg"
          alt="Man looking front"
        />
      </div>
    </div>

    <div class="text-center mt-2 pb-5">
      <h2 class="font-bold text-xl">
        {{ modelValue.bride }} 💖
        {{ modelValue.groom }}
      </h2>
      <p class="text-xl text-gray-500 dark:text-gray-300">{{ modelValue.msg }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  userMetaData: {
    type: Object,
    default: () => ({ contact_number: "+917229958503" }),
  },
});

const modelValue = defineModel("modelValue");
</script>
