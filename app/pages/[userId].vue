<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-2xl font-bold mb-4">Redirecting...</h1>
    <p class="text-gray-600">You are being redirected to your page.</p>
  </div>
</template>

<script setup>
// Redirect old /:userId path-based URLs → /page?id=:userId
const route = useRoute()
await navigateTo(`/page?id=${route.params.userId}`, { redirectCode: 301 })
</script>
