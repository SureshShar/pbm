<template>
  <header
    :class="[
      'header z-10 left-0 top-0 flex w-full items-center',
      sticky
        ? 'fixed z-20 bg-white-D2 !bg-opacity-80 shadow-sticky backdrop-blur-sm transition dark:bg-black-L1/60 dark:shadow-sticky-dark'
        : 'absolute bg-white-D2 bg-opacity-30 dark:bg-black-L1/60 dark:bg-opacity-10',
    ]"
  >
    <div class="container">
      <div class="relative flex items-center justify-between">
        <div class="w-full flex items-center gap-2 py-2 lg:py-2 px-2 xl:mr-12">
          <!-- User image -->
          <span v-if="modelValue.image" class="flex">
            <img
              :src="modelValue.image.src"
              alt="User avatar image"
              class="w-11 h-11 rounded-full bg-black-L1 dark:bg-white-D2"
            />
          </span>
          <SvgIconsAvatar
            v-else
            class="w-11 h-11 text-black-L1 dark:text-white-D2"
          />
          <!-- User name -->
          <UniversalH1 :heading="modelValue.title" />
        </div>

        <!-- Theme toggle and qr share -->
        <div class="flex items-center gap-2 md:gap-3 pr-2">
          <slot></slot>
          <span
            v-if="availablityStatus"
            :class="[
              shopStatus === 'open' ? 'bg-green-600' : 'bg-red-600',
              'px-2 py-1 md:py-1 rounded-full shadow-signUp dark:shadow-feature-2 text-xs text-white',
            ]"
          >
            {{ availablityStatus }}
          </span>
          <GenericQrShare v-if="isUserPage" />
          <!-- <p v-else class="bg-primary px-2 text-nowrap py-1 md:py-1 rounded-full shadow-signUp dark:shadow-feature-2 text-xs text-white">UserId: {{ pageId }}</p> -->
          <GenericThemeToggle class="" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  isUserPage: {
    type: Boolean,
    default: false,
  },
  shopStatus: {
    type: String,
    default: "",
  },
});

const sticky = ref(false);
const modelValue = defineModel("modelValue");
// const { getLocalData } = useLocalStorage();

// const pageId = computed(() => getLocalData("pageId"));
const availablityStatus = computed(() => {
  switch (props.shopStatus) {
    case "open":
      return "Open";
    case "closed":
      return "Closed";
    default:
      return "";
  }
});

if (props.isUserPage) {
  function handleStickyNavbar() {
    sticky.value = window.scrollY >= 80;
  }

  onMounted(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleStickyNavbar);
  });
}
</script>
