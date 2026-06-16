<template>
  <UniversalCard class="p-6 md:p-8">
    <!-- Intro -->
    <UniversalP class="mb-4 text-base leading-relaxed">
      अपनी दुकान को पहुँचाएं लोगों के
      <span class="font-semibold text-primary">घर-घर</span> और उनके
      <span class="font-semibold text-primary">मोबाइल तक!</span>
      अब आपकी दुकान लोगों की जेब में ही दिखेगी — उनके मोबाइल पर!
    </UniversalP>

    <!-- Demo Link -->
    <UniversalP class="mb-6 text-base leading-relaxed">
      <!-- नीचे दिए गए लिंक पर जाकर एक सब्जी दुकान की वेबसाइट का नमूना देखें:
      <NuxtLink
        to="/page?id=3"
        class="ml-1 text-primary font-semibold underline hover:text-primary-1"
      >
        👉 Demo Website
      </NuxtLink> -->

      हर तरह की दुकानों के लिए आकर्षक वेबसाइट बन सकती हैं। नीचे दिए गए उदाहरण
      आराम से समय निकालकर देखे करें:
    </UniversalP>

    <!-- Shops Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <NuxtLink
        v-for="(shop, index) in shopLinks"
        :key="shop.to"
        :to="shop.to"
        class="group flex items-center gap-3 p-4 rounded-xl border border-white-1 dark:border-black-3 bg-white dark:bg-black-1 hover:border-primary hover:shadow-two transition"
      >
        <!-- Number -->
        <span
          class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-semibold"
        >
          {{ index + 1 }}
        </span>

        <!-- Label -->
        <span
          class="font-medium text-black-3 dark:text-white group-hover:text-primary transition"
        >
          {{ shop.label }}
        </span>
      </NuxtLink>
    </div>

    <!-- CTA -->
    <UniversalP class="text-base leading-relaxed">
      अगर आप भी इसी तरह की वेबसाइट बनवाना चाहते हैं, तो हमसे संपर्क करें — हम
      बताएँगे कि यह कैसे संभव है!
    </UniversalP>
  </UniversalCard>
</template>

<script setup>
const shopLinks = [
  { to: "/page?id=1", label: "Manoj" },
  { to: "/page?id=2", label: "चाय दुकान" },
  { to: "/page?id=3", label: "सब्जी दुकान" },
  { to: "/page?id=4", label: "पंजाबी ढाबा" },
  { to: "/page?id=5", label: "Electric Shop" },
  { to: "/page?id=6", label: "General Store" },
  { to: "/page?id=7", label: "Juice Shop" },
  { to: "/page?id=8", label: "Makeup Shop" },
  { to: "/page?id=9", label: "प्रधानजी मोमोज़" },
  { to: "/page?id=10", label: "राज ढाबा (No Image)*" },
  { to: "/page?id=11", label: "कपड़ा दुकान" },
  { to: "/page?id=12", label: "Hair salon" },
  { to: "/page?id=13", label: "Bakery Shop" },
  { to: "/page?id=14", label: "Mobile Shop" },
  { to: "/page?id=15", label: "राज आइसक्रीम" },
  { to: "/page?id=16", label: "पानी पूरी दुकान" },
  { to: "/page?id=17", label: "Burger Shop" },
  { to: "/page?id=18", label: "चावल दुकान" },
  { to: "/page?id=19", label: "Pizza Shop" },
  { to: "/page?id=20", label: "मसाला भंडार" },
];
</script>
