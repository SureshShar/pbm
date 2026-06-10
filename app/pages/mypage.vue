<template>
  <MainPageUserPage />
</template>

<script setup>
const route = useRoute()

// Cache keyed on the pageId query param — each user's page is a separate cache entry
useRouteCache((helper) =>
  helper
    .setCacheable()
    .setMaxAge(604800)
    .addTags([`pageId:${route.query.pageId}`]),
)
</script>
