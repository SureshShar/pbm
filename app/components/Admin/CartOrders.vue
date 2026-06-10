<template>
  <div class="max-w-5xl mx-auto px-4 space-y-6">
    <!-- REFRESH BUTTON -->
    <button
      class="flex items-center justify-center gap-2 w-full bg-gray-500 text-white p-3 rounded-2xl font-bold"
      @click="debounceFetchAllRequest"
    >
      <SvgIconsLoader v-if="showLodingState" class="w-5 h-5 text-white animate-spin" />
      <span>Refresh</span>
    </button>

    <!-- EMPTY STATE -->
    <div
      v-if="paginatedItems.length === 0"
      class="flex flex-col items-center justify-center py-20 text-black-L5 dark:text-black-L4"
    >
      <div class="text-xl font-medium">No user requests found</div>
      <p class="text-sm">New requests will appear here as they arrive.</p>
    </div>

    <template v-if="paginatedItems.length">
      <!-- CARDS -->
      <div
        v-for="item in paginatedItems"
        :key="item.id"
        class="relative group border border-white-D1 dark:border-black-L3 rounded-2xl p-6 shadow-one hover:shadow-two bg-white dark:bg-black-L1 transition-all duration-300"
      >
        <!-- Time Tag (Top Left Corner) -->
        <div
          v-if="getTimeTag(item.timestamp)"
          class="absolute top-0 left-0 px-3 py-1 rounded-tl-2xl rounded-br-xl text-[11px] font-black uppercase tracking-widest z-10 shadow-sm"
          :class="getTimeTag(item.timestamp).class"
        >
          {{ getTimeTag(item.timestamp).label }}
        </div>

        <!-- Delete Action -->
        <button
          @click="showDeleteConfirmationModel(item.id)"
          class="absolute top-0 right-0 w-10 h-10 flex items-center justify-center bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-colors rounded-tr-2xl rounded-bl-2xl group"
        >
          <SvgIconsDelete class="w-5 h-5" />
        </button>

        <!-- Header Section -->
        <div class="flex justify-between items-start mb-3 mt-2">
          <h3
            class="font-extrabold text-lg text-primary dark:text-primary-2 leading-tight"
          >
            {{ item.data.title || "Untitled Request" }}
          </h3>
          <div class="text-right mr-5">
            <span
              class="text-xs font-semibold text-black-L4 dark:text-black-L5 bg-white-D2 dark:bg-black-L2 px-2 py-1 rounded"
            >
              {{ item.date }}
            </span>
          </div>
        </div>

        <!-- Content Grid -->
        <ul
          class="grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm border-t border-white-D1 dark:border-black-L3 pt-4"
        >
          <template
            v-for="(value, key) in item.data"
            :key="key"
            class="flex flex-col"
          >
            <li
              v-if="
                value && key !== 'title' && key !== 'status' && key !== 'items'
              "
            >
              <span v-if="key !== 'items'">
                <b
                  class="text-[11px] uppercase text-black-L4 dark:text-black-L5 tracking-wider mr-2"
                  >{{ camelToTitle(key) }}:</b
                >
                <span class="text-black-L2 dark:text-white-0 font-medium">{{
                  value
                }}</span>
              </span>
            </li>
          </template>
          <li v-if="item.data.items" class="col-span-2">
            <b class="text-[11px] uppercase text-black-L4 dark:text-black-L5 tracking-wider">Items:</b>
            <div class="mt-1 space-y-1 grid md:grid-cols-2 gap-x-8">
              <span
                v-for="m in item.data.items || []"
                :key="m"
                class="text-sm text-black-L2 dark:text-white-D1 bg-white-D2 dark:bg-black-L2 px-3 py-1 rounded-lg block w-full border-l-4 border-primary"
                v-html="m"
              ></span>
            </div>
          </li>
        </ul>
      </div>

      <!-- PAGINATION -->
      <div class="flex justify-center items-center gap-4 mt-10">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="flex items-center gap-1 px-4 py-2 text-sm font-bold border border-white-D1 dark:border-black-L3 rounded-xl disabled:opacity-30 hover:bg-white-D2 dark:hover:bg-black-L2 transition-colors dark:text-white-0"
        >
          <span>←</span> Prev
        </button>

        <span
          class="text-sm font-bold text-black-L3 dark:text-white-D2 bg-white-D1 dark:bg-black-L3 px-4 py-2 rounded-full"
        >
          {{ currentPage }} <span class="opacity-50 mx-1">/</span>
          {{ totalPages }}
        </span>

        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="flex items-center gap-1 px-4 py-2 text-sm font-bold border border-white-D1 dark:border-black-L3 rounded-xl disabled:opacity-30 hover:bg-white-D2 dark:hover:bg-black-L2 transition-colors dark:text-white-0"
        >
          Next <span>→</span>
        </button>
      </div>

      <!-- MODAL -->
      <GenericConfirmationModal
        v-model="showConfirmation"
        message="Are you sure you want to delete this order? This action cannot be undone."
        confirm-btn-text="Delete Order"
        cancel-btn-text="Keep It"
        @userConfirmed="deleteRequest"
      />
    </template>
  </div>
</template>

<script setup>
const list = ref(null);
const deleteFileId = ref(null);
const showLodingState = ref(false)
const showConfirmation = ref(false);

const currentPage = ref(1);
const itemsPerPage = 10;

const { showSuccess, showError, getLocalData } = useLocalStorage();

const pageId = computed(() => getLocalData("pageId"));
const authId = computed(() => getLocalData("authId"));

const parsedItems = computed(() => {
  if (!list.value) return [];

  return Object.entries(list.value)
    .map(([id, value]) => {
      let parsed = {};
      try {
        parsed = JSON.parse(value);
      } catch (e) {
        parsed = {};
      }

      const timestamp = Number(id.replace("id_", ""));

      return {
        id,
        timestamp, // Store raw timestamp for time comparisons
        data: parsed,
        date: formatDate(timestamp),
      };
    })
    .sort((a, b) => b.id.localeCompare(a.id));
});

const totalPages = computed(() => Math.ceil(parsedItems.value.length / itemsPerPage),);
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return parsedItems.value.slice(start, start + itemsPerPage);
});

// Helper for dynamic time tags
function getTimeTag(timestamp) {
  const now = Date.now();
  const diffInMinutes = Math.floor((now - timestamp) / 60000);

  if (diffInMinutes < 0) return null; // Future date safety

  if (diffInMinutes <= 15)
    return { label: "New", class: "bg-green-500 text-white" };
  if (diffInMinutes <= 30)
    return { label: "30 Minutes", class: "bg-blue-500 text-white" };
  if (diffInMinutes <= 60)
    return { label: "1 Hour", class: "bg-indigo-500 text-white" };
  if (diffInMinutes <= 120)
    return { label: "2 Hours", class: "bg-purple-500 text-white" };
  if (diffInMinutes <= 360)
    return { label: "6 Hours", class: "bg-orange-500 text-white" };
  if (diffInMinutes <= 360 * 2)
    return { label: "Today", class: "bg-red-500 text-white" };

  // Check if it's the same calendar day
  const itemDate = new Date(timestamp).toDateString();
  const todayDate = new Date().toDateString();
  if (itemDate === todayDate)
    return { label: "Today", class: "bg-gray-500 text-white" };

  return null;
}

let timerFetchAllRequest;
function debounceFetchAllRequest() {
  showLodingState.value= true

  clearTimeout(timerFetchAllRequest);
  timerFetchAllRequest = setTimeout(() => {
    fetchAllRequest();
  }, 2000); // 2000 milliseconds = 2 seconds
}

async function fetchAllRequest() {
  try {
    const res = await useApi("userQuery/getAll", {
      pageId: pageId.value,
      authId: authId.value,
    });

    if (res.success) {
      list.value = res.data;
    }
  } catch (error) {
    showError("Failed to fetch.");
  }
  showLodingState.value= false
}

async function deleteRequest() {
  try {
    await useApi("userQuery/deleteKey", {
      pageId: pageId.value,
      authId: authId.value,
      key: deleteFileId.value,
    });

    delete list.value[deleteFileId.value];
    showConfirmation.value = false;
    deleteFileId.value = null;
    showSuccess("Deleted successfully");
  } catch (error) {
    showError("Delete failed");
  }
}

function showDeleteConfirmationModel(id) {
  showConfirmation.value = true;
  deleteFileId.value = id;
}

onMounted(debounceFetchAllRequest);
</script>
