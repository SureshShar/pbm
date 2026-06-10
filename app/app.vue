<template>
  <div class="bg-bglight dark:bg-bgblack min-h-screen">
    <ClientOnly>
      <LazyGenericTopalert />
    </ClientOnly>
 
    <NuxtPage />
    <LazyUniversalTermCondBtn />
    <LazyGenericBottomStickyFeatures />
  </div>

  <!-- <ApiTest /> -->
</template> 

<script setup>
const { initializeAllLocalData } = useLocalStorage();
const route = useRouter();
const domain = "https://pageby.me";
// const domain = "http://localhost:3001";

const metaTitle = "Welcome to Pageby.me – Create Your Own Page Easily";
const metaDescription = "Create your portfolio, visiting card, or shop page in minutes on Pageby.me. Customize and share your profile with ease.";
const metaKeywords = "Pageby.me, page builder, portfolio, visiting card, shop page, create page, customize profile";
const metaUrl = route.path ? domain + "/" + route.path : domain;

// This generates a fresh, random URL every time you call it
function getImgUrl() {
  return `${domain}/images/welcome/${Math.floor(Math.random() * 9) + 1}.jpg`;
}

useHead({
  // 1. Core Page Titles and Canonical Links
  title: metaTitle,
  meta: [
    // 2. Standard Search Engine Metadata
    { 
      name: "description", 
      content: metaDescription
    },
    { 
      name: "keywords", 
      content: metaKeywords
    },
    { 
      name: "robots", 
      content: "index, follow" 
    },
    
    // 3. Open Graph (Facebook / LinkedIn)
    { 
      property: "og:type", 
      content: "website" 
    },
    { 
      property: "og:title", 
      content: metaTitle 
    },
    { 
      property: "og:description", 
      content: metaDescription 
    },
    { 
      property: "og:image", 
      content: getImgUrl() 
    },
    { 
      property: "og:url", 
      content: metaUrl
    },

    // 4. Twitter Cards
    { 
      name: "twitter:card", 
      content: "summary_large_image" 
    },
    { 
      name: "twitter:title", 
      content: metaTitle 
    },
    { 
      name: "twitter:description", 
      content: metaDescription 
    },
    { 
      name: "twitter:image", 
      content: getImgUrl()
    },

    // 5. Mobile and App Optimization
    { 
      name: "viewport", 
      content: "width=device-width, initial-scale=1, maximum-scale=1" 
    },
    { 
      name: "theme-color", 
      content: "#ffffff" 
    }
  ],
  link: [
    { 
      rel: "canonical", 
      href: metaUrl
    }
  ]
});


initializeAllLocalData();
</script>

<style>
/* Fade transition for backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Slide-up transition for modal */
.slide-up-enter-active {
  transition: transform 0.3s ease-out;
}
.slide-up-leave-active {
  transition: transform 0.2s ease-in;
}
.slide-up-enter-from {
  transform: translateY(100%);
}
.slide-up-enter-to {
  transform: translateY(0);
}
.slide-up-leave-from {
  transform: translateY(0);
}
.slide-up-leave-to {
  transform: translateY(100%);
}

/* Slide-down transition for modal */
.slide-down-enter-active {
  transition: transform 0.3s ease-out;
}
.slide-down-leave-active {
  transition: transform 0.2s ease-in;
}
.slide-down-enter-from {
  transform: translateY(-20%);
}
.slide-down-enter-to {
  transform: translateY(0);
}
.slide-down-leave-from {
  transform: translateY(0);
}
.slide-down-leave-to {
  transform: translateY(-20%);
}

/* Mainly used for alert message */
.slideIn-enter-active,
.slideIn-leave-active {
  transition: all 0.3s ease;
}
.slideIn-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.slideIn-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.slideIn-move {
  transition: transform 0.3s ease;
}
</style>
