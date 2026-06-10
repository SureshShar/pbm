<template>
  <div>
    <GenericHeader />
    <div class="overflow-hidden pt-20 md:pt-20 lg:pt-28 mx-4">
      <GenericLoadMoreDrawer title="show user list">
        <!-- Fileter Options: -->
        <UniversalCard bgClass="bg-gradient-to-br from-purple-400 to-primary">
          <div class="flex flex-wrap gap-4 p-2 md:p-4">
            <div
              v-for="(visible, field) in fieldVisibility"
              :key="field"
              class="flex items-center"
            >
              <GenericCheckboxInput
                v-model="fieldVisibility[field]"
                :label="camelToTitle(field)"
              />
            </div>
          </div>
        </UniversalCard>

        <!-- User List: -->
        <UniversalCard>
          <ul
            role="list"
            class="divide-y divide-gray-100 text-bgblack dark:text-bglight"
          >
            <li
              v-for="(user, idx) in userList"
              :key="idx"
              class="flex justify-between gap-x-6 py-3"
            >
              <div class="flex items-center gap-2 flex-wrap min-w-0 gap-x-4">
                <!-- Numbering: -->
                <div class="text-emerald-500">
                  {{ (currentPage - 1) * limit + idx + 1 }}
                </div>

                <!-- User Page Details: -->
                <template v-for="(value, key) in user" :key="key">
                  <NuxtLink
                    v-if="key === 'page_id'"
                    :to="`/${value}`"
                    target="_blank"
                    class="text-xs text-gray-100 dark:text-bglight rounded-md bg-gray-500 px-2 py-1"
                  >
                    View
                  </NuxtLink>
                  <p
                    v-if="fieldVisibility[key]"
                    class="flex flex-col mt-1 truncate leading-5 text-xs md:text-base"
                  >
                    <span
                      class="text-xs font-semibold text-gray-400 dark:text-bglight pr-2"
                    >
                      {{ camelToTitle(key) }}:
                    </span>
                    <span :class="customClasses[key].class">
                      <span v-if="value">
                        {{ customClasses[key].value(value) }}
                      </span>
                      <span v-else class="text-red-600 font-semibold">Null</span>
                    </span>
                  </p>
                </template>
              </div>
            </li>
          </ul>
        </UniversalCard>

        <!-- Pagination Controls -->
        <UniversalCard v-if="totalPages > 1">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700 dark:text-white">
              Showing {{ ((currentPage - 1) * limit) + 1 }} to {{ Math.min(currentPage * limit, total) }} of {{ total }} results
            </div>
            <div class="flex gap-2">
              <button
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-3 py-1 text-sm bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Previous
              </button>
              <span class="px-3 py-1 text-sm dark:text-white">
                Page {{ currentPage }} of {{ totalPages }}
              </span>
              <button
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 text-sm bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Next
              </button>
            </div>
          </div>
        </UniversalCard>
      </GenericLoadMoreDrawer>
    </div>
  </div>
</template>

<script setup>
const userList = ref([]);
const currentPage = ref(1);
const limit = ref(20);
const total = ref(0);
const totalPages = ref(0);

const fieldVisibility = ref({
  page_id: true,
  user_password: false,
  user_name: true,
  email_id: false,
  contact_number: true,
  // telegram_id: true,
  stars: false,
  karma: false,
  created_at: false,
  updated_at: false,
  last_login_at: false,
  is_active: false,
  topup_start_at: false,
  topup_end_at: false,
  user_available: false,
  page_layout: false,
});

const { getLocalData } = useLocalStorage();
const authToken = computed(() => getLocalData("superAdminAuthToken"));

const customClasses = ref({
  page_id: {
    class: "text-primary",
    value: (val) => val,
  },
  user_password: {
    class: "text-red-600 font-semibold italic",
    value: (val) => val, // hides password; change if needed
  },
  user_name: {
    class: "text-blue-600 font-bold",
    value: (val) => val,
  },
  email_id: {
    class: "text-yellow-600 font-bold",
    value: (val) => val,
  },
  contact_number: {
    class: "text-purple-600 font-medium",
    value: (val) => val,
  },
  // telegram_id: {
  //   class: "text-sky-600",
  //   value: (val) => val,
  // },
  stars: {
    class: "text-amber-500 font-bold",
    value: (val) => val ?? 0,
  },
  karma: {
    class: "text-emerald-500 font-semibold",
    value: (val) => val ?? 0,
  },
  created_at: {
    class: "text-gray-600 dark:text-gray-400",
    value: (val) => new Date(val).toLocaleString(),
  },
  updated_at: {
    class: "text-gray-600 dark:text-gray-400 italic",
    value: (val) => new Date(val).toLocaleString(),
  },
  last_login_at: {
    class: "text-gray-700 dark:text-gray-300",
    value: (val) => (val ? new Date(val).toLocaleString() : "Never"),
  },
  is_active: {
    class: "font-bold dark:text-bglight",
    value: (val) => val,
    // value: (val) => (val ? "🟢 Active" : "🔴 Inactive"),
  },
  topup_start_at: {
    class: "text-gray-600 dark:text-gray-400",
    value: (val) => (val ? new Date(val).toLocaleString() : "Not started"),
  },
  topup_end_at: {
    class: "text-gray-600 dark:text-gray-400",
    value: (val) => (val ? new Date(val).toLocaleString() : "Not ended"),
  },
  user_available: {
    class: "text-fuchsia-600 font-bold",
    value: (val) => val,
  },
  page_layout: {
    class: "text-cyan-600 font-semibold",
    value: (val) => val,
  },
});

async function fetchUserList(page = 1) {
  try {
    const response = await useApi("god/getList", {
      authToken: authToken.value,
      page,
      limit: limit.value
    });
    if (response.data) {
      userList.value = response.data || [];
      total.value = response.total || 0;
      totalPages.value = response.totalPages || 0;
      currentPage.value = response.page || 1;
    }
  } catch (error) {
    console.error("Error fetching user list:", error);
  }
};

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchUserList(page);
  }
};

onMounted(fetchUserList);
</script>
