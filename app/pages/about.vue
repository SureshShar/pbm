<template>
  <LazyMainPageAboutUs />
</template>

<script setup>
const route = useRoute()

// Multi cache logic
useRouteCache((helper) =>
  helper
    .setCacheable()
    .setMaxAge(604800)
    .addTags([`url:${route.path}`]),
);
</script>
