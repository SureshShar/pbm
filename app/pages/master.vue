<template>
  <LazySuperAdminPasswordCheck>
    <GenericToggleComponent initialVisibleCompId="superAdmin" v-slot="{ visibleCompId }">
      <transition name="fade">
        <LazyMainPageSuperAdmin v-if="visibleCompId === 'superAdmin'" />
      </transition>
      <transition name="fade">
        <LazyMainPageListing v-if="visibleCompId === 'listings'" />
      </transition>
    </GenericToggleComponent>
  </LazySuperAdminPasswordCheck>
</template>

<script setup>
const route = useRoute();

// Multi cache logic
useRouteCache((helper) =>
  helper
    .setCacheable()
    .setMaxAge(604800)
    .addTags([`url:${route.path}`]),
);
</script>
