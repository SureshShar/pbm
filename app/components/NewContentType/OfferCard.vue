<template>
  <section
    class="min-w-full md:min-w-[50%] bg-gradient-to-br from-teal-600 to-cyan-600 text-white rounded-md p-4 md:p-8 shadow-xl"
    :class="colorGradient[gdType] || colorGradient[1]"
  >
    <div
      class="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
    >
      <div>
        <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight">
          {{ ttl }}
        </h2>
        <p class="mt-3 text-white/90 text-lg">
          {{ msg1 }}
        </p>
      </div>
      <div class="w-full">
        <div class="bg-white/10 backdrop-blur rounded-md p-4">
          <p class="text-sm uppercase tracking-wider text-white/80">
            {{ msg2 }}
          </p>
          <p class="text-xl md:text-3xl font-bold">{{ msg3 }}</p>
        </div>
      </div>
    </div>
    <div
      v-if="btntxt && userMetaData.contact_number"
      class="mt-6 flex flex-wrap gap-2"
    >
      <a
        :href="`tel:${userMetaData.contact_number}`"
        class="px-4 py-1 rounded-md bg-white/15 shadow-lg"
      >
        {{ btntxt }}
      </a>
    </div>
    <div class="w-full flex justify-end"><slot /></div>
  </section>
</template>

<script setup>
defineProps({
  userMetaData: {
    type: Object,
    default: () => ({ contact_number: "+917229958503" }),
  },
  gdType: {
    type: Number,
    default: 1,
  },
  ttl: {
    type: String,
    default: "",
  },
  msg1: {
    type: String,
    default: "",
  },
  msg2: {
    type: String,
    default: "",
  },
  msg3: {
    type: String,
    default: "",
  },
  btntxt: {
    type: String,
    default: "",
  },
});

const colorGradient = {
  1: "bg-gradient-to-br from-teal-600 to-cyan-600",
  2: "bg-gradient-to-br from-green-600 to-teal-500",
  3: "bg-gradient-to-br from-orange-500 to-red-500",
  4: "bg-gradient-to-br from-sky-500 to-indigo-500",
  5: "bg-gradient-to-br from-pink-600 to-rose-500",
  6: "bg-gradient-to-br from-rose-500 to-fuchsia-600",
  7: "bg-gradient-to-br from-amber-400 to-orange-600",
  8: "bg-gradient-to-br from-emerald-500 to-lime-400",
  9: "bg-gradient-to-br from-violet-600 to-purple-800",
  10: "bg-gradient-to-br from-purple-700 to-pink-500",
  11: "bg-gradient-to-br from-cyan-500 to-blue-600",
  12: "bg-gradient-to-br from-indigo-600 to-blue-500",
};
</script>
