<template>
  <div
    class="w-full"
    :class="[
      { 'mx-auto text-center': center },
      width, title && paragraph && mb
    ]"
    data-wow-delay=".1s"
  >
    <h2
      :class="[
        titleClass,
        'px-3 mb-4 text-3xl font-bold !leading-tight sm:text-4xl md:text-[45px]',
      ]"
    >
      {{ title }}
    </h2>
    <p
      v-if="paragraph"
      class="px-3 text-base !leading-relaxed text-black-L4 md:text-lg"
    >
      {{ paragraph }}
    </p>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  titleClass: {
    type: String,
    default: "text-bgblack dark:text-bglight",
  },
  paragraph: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "w-[570px]",
  },
  center: {
    type: Boolean,
    default: false,
  },
  mb: {
    type: String,
    default: "mb-12 md:mb-20",
  },
});
</script>
