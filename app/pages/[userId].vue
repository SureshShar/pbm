<script setup>
// Redirect old /:userId path-based URLs → /mypage?pageId=:userId
const route = useRoute()
await navigateTo(`/mypage?pageId=${route.params.userId}`, { redirectCode: 301 })
</script>
