<template>
  <section id="contact" class="overflow-hidden pt-32 md:pt-20 lg:pt-28 mx-4">
    <UniversalCard>
      <UniversalH2 class="mb-3">
        Go to admin page.
        <span class="text-sm md:text-base block pt-2"> यदि आपका पेज है </span>
      </UniversalH2>

      <!-- Submit button -->
      <div class="w-full my-8">
        <UniversalButton heading="Admin" @clicked="navigateTo('/admin')" />
      </div>
    </UniversalCard>

    <UniversalCard>
      <UniversalH2 class="mb-3">
        Enter your User ID to view it.
        <span class="text-sm md:text-base block pt-2">
          अपना यूज़र आईडी डालें और देखें।
        </span>
      </UniversalH2>

      <div class="flex flex-wrap">
        <GenericTextInput
          v-model="userId"
          class="w-full md:w-1/2"
          type="text"
          label=""
          placeholder="Enter your ID number"
        />

        <!-- Submit button -->
        <div class="w-full my-8">
          <UniversalButton
            heading="Show Page"
            @clicked="navigateTo(`/mypage?pageId=${userId}`)"
            :disabled="!userId"
          />
        </div>
      </div>
    </UniversalCard>
  </section>
</template>

<script setup>
const userId = ref("");
</script>
