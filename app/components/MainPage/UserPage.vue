<template>
  <template v-if="pageData && pageData.header">
    <ContentTypeHeader
      v-model="pageData.header"
      :isUserPage="true"
      :shopStatus="userAvailableState"
    />
    <ContentTypeHeroSection
      v-model="pageData.heroSection"
      :userId="userId"
      :userMetaData
    />
    <ContentTypeImageCard
      v-if="pageData.about"
      v-model="pageData.about.items[0]"
    />
    <!-- <ContentTypeAlSection v-if="pageData.aiImage" v-model="pageData.aiImage" /> -->

    <template v-for="(section, i) in pageData.page.sections" :key="section.id">
      <!-- v-if="section.blocks[0].type !== 'message' || (section.blocks[0].type === 'message' && userMetaData.telegram_id)" -->
      <!-- :telegramId="userMetaData.telegram_id" -->
      <ContentTypeMainContentType
        v-model="pageData.page.sections[i]"
        :showEditor="false"
        :isBackground="i % 2 === 0"
        :layout="userMetaData?.page_layout"
        :hideVegNonVegIcon="pageData.extra?.hideVegNonVegIcon"
      />
    </template>
  </template>
  <Generic404 v-else-if="noDateFound" />
  <LoaderPageSkelton v-else />
</template>

<script setup>
const pageData = ref(null);
const noDateFound = ref(false);

const route = useRoute();
const { setInstanceData, getInstanceData } = useLocalStorage();

const userId = computed(() => route.query.pageId);
// const path = computed(() => route.path);

// Shop Open, Closed, null not available
const userAvailableState = computed(() => getInstanceData("userMetaData")?.user_available); 
const userMetaData = computed(() => getInstanceData("userMetaData") || {});

useHead({
  title: "My all content you find here",
  meta: [
    // SEO robots
    {
      name: "robots",
      content: "noindex, nofollow", // allow indexing for public pages
    },
    // Open Graph (Facebook, WhatsApp, LinkedIn)
    {
      property: "og:title",
      content: "Look more in one tap!",
    },
    {
      property: "og:description",
      content: "Your digital card!",
    },
    {
      property: "og:image",
      content: "/images/card.png",
    },
    {
      property: "og:url",
      content: "https://pageby.me",
    },
    {
      property: "og:type",
      content: "website",
    },

    // Twitter (X)
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Look more in one tap!",
    },
    {
      name: "twitter:description",
      content: "Your digital card!",
    },
    {
      name: "twitter:image",
      content: "https://pageby.me/images/card.png",
    },
  ],
});

// Lazy async data fetching (runs in SSR + client)
// const { data } = await useLazyAsyncData(`userData_${userId.value}`, () => useApi("userData", { id: userId.value }));

// watch(
//   data,
//   (newValue) => {
//     if (newValue && newValue.success && newValue.data) {
//       pageData.value = newValue.data.page_data;
//       setUserPageInstaneData(response, setInstanceData);
//     }
//   },
//   { immediate: true }
// );

onMounted(async () => {
  try {
    const response = await useApi("userData", { id: userId.value });

    if (response && response.success && response.data) {
      pageData.value = response.data.page_data;
      setUserPageInstaneData(response, setInstanceData);
      noDateFound.value = false;
    } else {
      noDateFound.value = true;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});
</script>
