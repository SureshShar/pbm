<template>
  <header
    :class="[
      'header left-0 top-0 z-40 flex w-full items-center',
      sticky
        ? 'fixed z-[9999] bg-bglight !bg-opacity-80 shadow-sticky backdrop-blur-sm transition dark:bg-black-L1/60 dark:shadow-sticky-dark'
        : 'absolute bg-bglight bg-opacity-30 dark:bg-black-L1/60 dark:bg-opacity-10',
    ]"
  >
    <div class="container">
      <div class="relative flex items-center justify-between">
        <!-- Logo or user_ image -->
        <div class="w-60 max-w-full px-2 xl:mr-12">
          <NuxtLink to="/" class="header-logo w-full flex">
            <SvgIconsPage class="h-14 p-2 text-black-L2 dark:text-bglight" />
            <!-- <UniversalH1>Pageby <span class="block -mt-2 text-tertiary">.me</span></UniversalH1> -->
          </NuxtLink>
        </div>

        <div class="flex w-full items-center justify-between px-4">
          <!-- Mobile Menu Button -->
          <div>
            <button
              @click="toggleNavbar"
              aria-label="Mobile Menu"
              class="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
            >
              <span
                :class="[
                  'relative my-1.5 block h-0.5 w-[30px] bg-bgblack transition-all duration-300 dark:bg-bglight',
                  navbarOpen ? 'top-[7px] rotate-45' : '',
                ]"
              />
              <span
                :class="[
                  'relative my-1.5 block h-0.5 w-[30px] bg-bgblack transition-all duration-300 dark:bg-bglight',
                  navbarOpen ? 'opacity-0' : '',
                ]"
              />
              <span
                :class="[
                  'relative my-1.5 block h-0.5 w-[30px] bg-bgblack transition-all duration-300 dark:bg-bglight',
                  navbarOpen ? 'top-[-8px] -rotate-45' : '',
                ]"
              />
            </button>

            <!-- Navigation -->
            <nav
              :class="[
                'navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-black-L4/50 bg-bglight px-6 py-4 duration-300 dark:border-black-L4/20 dark:bg-black-L2 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100',
                navbarOpen
                  ? 'visibility top-full opacity-100'
                  : 'invisible top-[120%] opacity-0',
              ]"
            >
              <ul class="block lg:flex lg:space-x-12">
                <li
                  v-for="(menuItem, index) in menuData"
                  :key="index"
                  class="group relative"
                >
                  <NuxtLink
                    :to="menuItem.path"
                    :class="[
                      'flex py-2 text-base font-bold lg:mr-0 lg:inline-flex lg:px-0 lg:py-6',
                      route.path === menuItem.path
                        ? 'text-primary dark:text-bglight'
                        : 'text-black-L2 hover:text-primary dark:text-bglight/70 dark:hover:text-bglight',
                    ]"
                  >
                    {{ menuItem.title }}
                  </NuxtLink>

                  <!-- <template v-if="menuItem.path">
                    <button
                      v-if="menuItem.isSignOut"
                      :class="[
                        'flex py-2 text-base font-bold lg:mr-0 lg:inline-flex lg:px-0 lg:py-6',
                        route.path === menuItem.path
                          ? 'text-primary dark:text-bglight'
                          : 'text-black-L2 hover:text-primary dark:text-bglight/70 dark:hover:text-bglight',
                      ]"
                      @click="logoutUser"
                    >
                      {{ menuItem.title }}
                    </button>
                    <NuxtLink
                      v-else
                      :to="menuItem.path"
                      :class="[
                        'flex py-2 text-base font-bold lg:mr-0 lg:inline-flex lg:px-0 lg:py-6',
                        route.path === menuItem.path
                          ? 'text-primary dark:text-bglight'
                          : 'text-black-L2 hover:text-primary dark:text-bglight/70 dark:hover:text-bglight',
                      ]"
                    >
                      {{ menuItem.title }}
                    </NuxtLink>
                  </template> -->
                  <!-- Suba manu -->
                  <!-- <template v-else> -->
                  <!-- <p
                    @click="handleSubmenu(index)"
                    class="flex cursor-pointer items-center justify-between py-2 text-base text-black-L2 group-hover:text-primary dark:text-bglight/70 dark:group-hover:text-bglight lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                  >
                    {{ menuItem.title }}
                    <span class="pl-3">
                      <SvgIconsArrowDown class="w-7 h-7" />
                    </span>
                  </p> -->

                  <!-- <div
                    :class="[
                      'submenu relative left-0 top-full rounded-sm bg-bglight transition-[top] duration-300 group-hover:opacity-100 dark:bg-black-L2 lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full',
                      openIndex === index ? 'block' : 'hidden',
                    ]"
                  >
                    <NuxtLink
                      v-for="(submenuItem, i) in menuItem.submenu"
                      :key="i"
                      :to="submenuItem.path"
                      class="block rounded py-2.5 text-sm text-black-L2 hover:text-primary dark:text-bglight/70 dark:hover:text-bglight lg:px-3"
                    >
                      {{ submenuItem.title }}
                    </NuxtLink>
                  </div> -->
                  <!-- </template> -->
                </li>
              </ul>
            </nav>
          </div>

          <!-- Right Side -->
          <div class="flex items-center justify-end pr-16 lg:pr-0">
            <GenericThemeToggle />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
// Submenu handler
const openIndex = ref(-1);
const sticky = ref(false);
const navbarOpen = ref(false);

const route = useRoute();
const menuData = computed(() => [
  {
    id: 1,
    title: "Admin",
    path: "/admin",
    newTab: false,
  },
  {
    id: 2,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 3,
    title: "Term & Condition",
    path: "/termCondition",
    newTab: false,
  },
]);

function toggleNavbar() {
  navbarOpen.value = !navbarOpen.value;
}

function handleStickyNavbar() {
  sticky.value = window.scrollY >= 80;
}

// function handleSubmenu(index) {
//   openIndex.value = openIndex.value === index ? -1 : index;
// }

onMounted(() => {
  window.addEventListener("scroll", handleStickyNavbar);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleStickyNavbar);
});
</script>
