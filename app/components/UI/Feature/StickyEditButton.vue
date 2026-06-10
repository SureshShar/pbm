<template>
  <div
    class="fixed bottom-2 left-2 gap-2 flex justify-center pointer-events-none"
  >
    <button
      :class="[classRepeat, 'min-w-10']"
      @click="emit('onEditButtonClick')"
    >
      <SvgIconsPencil v-if="!isEditMode" class="w-5 h-5 text-bglight" />
      <span v-if="isEditMode" class="px-4">Submit</span>
    </button>
    <button
      v-if="isEditMode"
      :class="[classRepeat, 'w-16']"
      @click="setLocalData('editExtraFields', !editExtraFields)"
    >
      Extra
    </button>
    <button v-if="!hideLogoutBtn" :class="[classRepeat, 'min-w-10 bg-rose-500']" @click="emit('onUserLogout')">
      <!-- Name= Back class = min-w-16 -->
      <SvgIconsArrowBack class="w-5 h-5 text-bglight -rotate-90" />
    </button>
  </div>
</template>

<script setup>
defineProps({
  isEditMode: {
    type: Boolean,
    default: false,
  },
  hideLogoutBtn: { // For admin page where logout is required
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["onEditButtonClick", "onUserLogout"]);

const { getLocalData, setLocalData } = useLocalStorage();
const editExtraFields = computed(() => !!getLocalData("editExtraFields"));
const classRepeat = "h-10 pointer-events-auto flex gap-2 cursor-pointer items-center justify-center rounded-md bg-primary text-bglight shadow-md transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp";
</script>
