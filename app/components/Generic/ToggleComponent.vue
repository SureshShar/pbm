<template>
  <div>
    <slot :visibleCompId="visibleCompId"></slot>
    <div class="mx-4 mt-8">
      <UniversalCard class="w-full">
        <UniversalH2 class="mb-3">
          Hello admin, switch your permissions.
        </UniversalH2>

        <!-- Submit button -->
        <div class="w-full my-8 flex gap-4">
          <UniversalButton
            :isActive="visibleCompId === 'superAdmin'"
            heading="SuperAdmin"
            @clicked="visibleCompId = 'superAdmin'"
          />
          <UniversalButton
            :isActive="visibleCompId === 'listings'"
            heading="listings"
            @clicked="visibleCompId = 'listings'"
          />
        </div>
      </UniversalCard>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  initialVisibleCompId: {
    type: String,
    default: "",
  },
});

const visibleCompId = ref(props.initialVisibleCompId);
</script>
