<template>
  <section v-for="(d, i) in modelValue" :key="i" class="scroll-mt-28">
    <div
      class="bg-white-D1 dark:bg-black-L1 rounded-md border border-slate-200 dark:border-black-L1 shadow-two overflow-hidden"
    >
      <!-- Simple Header Row -->
      <header class="p-5 md:p-6 flex items-start justify-between gap-4">
        <div class="flex items-start gap-4">
          <div>
            <h3
              class="text-xl md:text-2xl font-semibold text-primary dark:text-primary-1"
            >
              {{ d.title }}
            </h3>
            <p class="text-base text-slate-600 dark:text-bglight mt-1">
              {{ d.text }}
            </p>
          </div>
        </div>
      </header>

      <!-- Text + Image Grid -->
      <div
        class="p-5 md:p-6 border-t border-slate-200 dark:border-black-L3 grid md:grid-cols-3 gap-6"
      >
        <!-- Left: Text blocks -->
        <div class="grid gap-4 md:col-span-2">
          <div
            v-for="block in d.blocks"
            :key="block.label"
            class="rounded-md bg-slate-50 dark:bg-black-L3 dark:border-none border border-slate-200 p-4"
          >
            <h4
              class="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-bglight"
            >
              {{ block.label }}
            </h4>
            <ul class="mt-2 space-y-2">
              <li
                v-for="(item, i) in block.items"
                :key="i"
                class="flex items-center gap-2"
              >
                <span
                  class="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-secondary"
                ></span>
                <span
                  class="text-slate-800 dark:text-bglight text-base leading-relaxed text-wrap"
                  >{{ item }}</span
                >
              </li>
            </ul>
          </div>
        </div>

        <!-- Right: Image -->
        <div class="flex justify-center items-start shadow-card">
          <img
            :src="d.image.src || useRandomBgUrl()"
            :alt="d.image.alt"
            class="rounded-md shadow-lg object-cover w-full h-full min-h-96"
          />
        </div>
      </div>
    </div>
  </section>
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
