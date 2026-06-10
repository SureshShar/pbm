import { defineMultiCacheOptions } from 'nuxt-multi-cache/server-options'

export default defineMultiCacheOptions({
  route: {
    default: {
      expires: 604800, // 1 week
    },
  },
})
