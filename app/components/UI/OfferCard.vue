<template>
  <div class="">
    <GenericScrollableGallery>
      <NewContentTypeOfferCard
        v-for="(item, idx) in modelValue"
        :key="idx"
        :ttl="item.ttl"
        :msg1="item.msg1"
        :msg2="item.msg2"
        :msg3="item.msg3"
        :btntxt="item.btntxt"
        :gdType="idx + 1"
      >
        <LazyEditorSectionBlock
          v-if="isEditMode"
          v-model="modelValue[idx]"
          @deleteItem="deleteItem(idx)"
          class="w-0 h-0"
          positionClass="absolute right-1 -top-8 w-6 h-6 p-1"
        />
      </NewContentTypeOfferCard>
    </GenericScrollableGallery>

    <SvgIconsPlus
      v-if="isEditMode"
      @click="addItem"
      class="w-7 h-7 p-1 bg-primary text-white-D1 rounded cursor-pointer ml-3 mt-3"
    />
  </div>
</template>

<script setup>
const modelValue = defineModel("modelValue");

// Global edit mode via local storage
const { getLocalData } = useLocalStorage();
const isEditMode = computed(() => getLocalData("editMode") === true);

function addItem() {
  const newItem = {
    id: getUserId(),
    type: "offerCard",
    ttl: "Special Offer",
    msg1: "Experience the future of technology with our revolutionary quantum computing solution. Lorem, ipsum dolor sit amet consectetur.",
    msg2: "Use this offer code at checkout:",
    msg3: "10OFF",
    btntxt: "",
  };

  modelValue.value.unshift(newItem);
}

function deleteItem(index) {
  if (Array.isArray(modelValue.value)) {
    modelValue.value.splice(index, 1);
  }
}
</script>
