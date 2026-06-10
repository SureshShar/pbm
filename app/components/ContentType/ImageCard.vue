<template>
  <section class="py-12 md:py-20 lg:py-20">
    <div class="container">
      <div class="flex flex-wrap items-center">
        <!-- Editable Image -->
        <div class="relative w-full px-2 lg:w-1/3">
          <div
            class="mx-auto mb-12 lg:m-0 bg-gray-400 rounded-lg overflow-hidden"
            data-wow-delay=".15s"
          >
            <img
              :src="modelValue.image.src || useRandomBgUrl()"
              alt="about img"
              class="drop-shadow-three dark:drop-shadow-none object-contain w-full h-fit"
            />
          </div>
        </div>

        <!-- Editable Text -->
        <div class="w-full px-4 lg:w-2/3">
          <div class="mb-4 md:mb-9 text-center md:text-left">
            <!-- Editable Heading -->
            <h3
              class="mb-4 text-2xl font-bold text-bgblack dark:text-bglight"
            >
              {{ modelValue.title }}
            </h3>

            <!-- Editable Paragraph -->
            <p
              class="text-base font-medium leading-relaxed text-black-L4 sm:text-lg sm:leading-relaxed"
            >
              {{ modelValue.text }}
            </p>
          </div>
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const modelValue = defineModel("modelValue");
</script>
