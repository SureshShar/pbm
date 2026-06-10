import { promises as fs } from 'node:fs'
import { resolve, join, extname } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: process.env.SERVER_ENV === "developmentLocal" },
  runtimeConfig: {
    // databaseUrl: process.env.DATABASE_URL,
    telegramBotToken: process.env.BOT_TOKEN,

    // AI
    aiBaseURL: process.env.AI_BASE_URL,
    aiApiKey: process.env.AI_API_KEY,
    aiModel: process.env.AI_MODEL,

    // MySQL
    mysqlHost: process.env.MYSQL_HOST,
    mysqlUser: process.env.MYSQL_USER,
    mysqlPassword: process.env.MYSQL_PASSWORD,
    mysqlDatabase: process.env.MYSQL_DATABASE,
    mysqlPort: process.env.MYSQL_PORT,

    // Super Admin Credentials
    superAdminPassword: process.env.SUPERADMIN_PASSWORD,
    superAdminAuthToken: process.env.SUPERADMIN_AUTH_TOKEN,

    public: {
      serverEnv: process.env.SERVER_ENV, // Developmemt or production
      userId: process.env.USER_ID, // For super admin Login
    },
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-multi-cache"],
  // css: ["./app/assets/css/tailwind.css"],
  // Few page for development only
  extends:
    process.env.SERVER_ENV === "developmentLocal"
      ? ["./addUp/development"]
      : [],
  // extends: ["./addUp/development"],

  // For more info read this https://nuxt-multi-cache.dulnan.net/overview/configuration
  multiCache: {
    debug: process.env.SERVER_ENV === "developmentLocal",
    component: {
      enabled: true,
    },
    route: {
      enabled: true,
    },
    data: {
      enabled: true,
    },
    cdn: {
      enabled: true,
      cacheControlHeader: "CDN-Cache-Control",
      cacheTagHeader: "Cache-Tag",
    },
    disableCacheOverviewLogMessage:
      process.env.SERVER_ENV !== "developmentLocal",
  },
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },

  // hooks: {
  //   'build:done': async () => {
  //     // Path to your target folder in the generated output
  //     const targetDir = resolve('.output/public/json')

  //     try {
  //       const files = await fs.readdir(targetDir)
        
  //       for (const file of files) {
  //         if (extname(file) === '.json') {
  //           const filePath = join(targetDir, file)
  //           const content = await fs.readFile(filePath, 'utf8')
            
  //           // Minify by parsing and re-stringifying without whitespace
  //           const minified = JSON.stringify(JSON.parse(content))
            
  //           await fs.writeFile(filePath, minified, 'utf8')
  //           console.log(`✔ Minified: ${file}`)
  //         }
  //       }
  //     } catch (err) {
  //       console.error('Error minifying JSONs:', err)
  //     }
  //   }
  // }
});
