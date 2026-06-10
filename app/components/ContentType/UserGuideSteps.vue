<template>
  <div class="mb-8">
    <div class="flex justify-between items-center mb-6">
      <UniversalH2 class="mb-4" :heading="section.title[lang]" />
      <button
        @click="toggleLang"
        class="py-1 w-32 text-base text-center font-medium rounded-md bg-secondary text-primary transition"
      >
        {{ lang === "en" ? "Hindi" : "English" }}
      </button>
    </div>

    <!-- Description -->
    <p
      class="mb-4 text-base font-medium leading-relaxed text-black-L4 sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed"
    >
      {{ section.description[lang] }}
    </p>

    <!-- Steps -->
    <div class="space-y-8 text-left">
      <div v-for="step in section.steps" :key="step.step">
        <!-- class="rounded-lg border border-gray-300 dark:border-gray-700 p-6 shadow-sm" -->
        <h3
          class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4"
          v-html="step.title[lang]"
        ></h3>
        <ul class="list-disc pl-6 space-y-2">
          <li
            v-for="(detail, index) in step.details[lang]"
            :key="index"
            class="text-base text-gray-700 dark:text-gray-300"
            v-html="detail"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<!-- 
  <button @click="modelValue = !modelValue">Open Modal</button>
  <GenericModal v-model="modelValue">
    <ContentTypeUserGuideSteps />
  </GenericModal>
  const modelValue = ref(false); 
-->

<script setup>
const props = defineProps({
  stepType: {
    type: String,
    default: "telegramID",
  },
});

const content = {
  telegramID: {
    title: {
      en: "Get Messaging Access by Starting the PageSea Telegram Bot and Finding Your Telegram ID",
      hi: "PageSea Telegram Bot शुरू करके मैसेजिंग एक्सेस पाएँ और अपना Telegram ID प्राप्त करें",
    },
    description: {
      en: "Follow the steps below carefully. Each link will open directly in the Telegram app.",
      hi: "नीचे दिए गए चरणों का ध्यान से पालन करें। हर लिंक सीधे Telegram ऐप में खुलेगा।",
    },
    steps: [
      {
        step: 1,
        title: {
          en: "Install and Open Telegram",
          hi: "Telegram इंस्टॉल करें और खोलें",
        },
        details: {
          en: [
            "Download the Telegram app from the App Store or Google Play.",
            "You can also use Telegram Web if you are on desktop.",
            "Make sure you are logged in to your Telegram account.",
          ],
          hi: [
            "App Store या Google Play से Telegram ऐप डाउनलोड करें।",
            "डेस्कटॉप पर Telegram Web का भी उपयोग कर सकते हैं।",
            "सुनिश्चित करें कि आप अपने Telegram अकाउंट में लॉगिन हैं।",
          ],
        },
      },
      {
        step: 2,
        title: {
          en: "Open and Start the PageSea Bot",
          hi: "PageSea Bot खोलें और Start करें",
        },
        details: {
          en: [
            "Click on this link: <a href='https://t.me/PageSea_bot' target='_blank'><strong>PageSea_bot 👆</strong></a>.",
            "You will be redirected to the Telegram app automatically.",
            "Once the bot opens, tap the <strong>Start</strong> button at the bottom.",
            "You are now successfully subscribed to the PageSea Bot.",
          ],
          hi: [
            "इस लिंक पर क्लिक करें: <a href='https://t.me/PageSea_bot' target='_blank'><strong>PageSea_bot 👆</strong></a>।",
            "आप सीधे Telegram ऐप में रीडायरेक्ट हो जाएँगे।",
            "बॉट खुलने के बाद नीचे <strong>Start</strong> बटन पर टैप करें।",
            "अब आप PageSea Bot को सफलतापूर्वक सब्सक्राइब कर चुके हैं।",
          ],
        },
      },
      {
        step: 3,
        title: {
          en: "Get Your Telegram User ID",
          hi: "अपना Telegram User ID प्राप्त करें",
        },
        details: {
          en: [
            "Click this link: <a href='https://t.me/userinfobot' target='_blank'><strong>@userinfobot 👆</strong></a>.",
            "The link will open the bot inside the Telegram app.",
            "Tap the <strong>Start</strong> button.",
            "The bot will instantly reply with your Telegram User ID.",
          ],
          hi: [
            "इस लिंक पर क्लिक करें: <a href='https://t.me/userinfobot' target='_blank'><strong>@userinfobot 👆</strong></a>।",
            "लिंक Telegram ऐप में बॉट को खोलेगा।",
            "<strong>Start</strong> बटन पर टैप करें।",
            "बॉट तुरंत आपका Telegram User ID भेज देगा।",
          ],
        },
      },
      {
        step: 4,
        title: {
          en: "Copy Your Telegram User ID",
          hi: "अपना Telegram User ID कॉपी करें",
        },
        details: {
          en: [
            "From the @userinfobot reply, locate your Telegram User ID.",
            "Copy only the numeric Telegram ID shown in the message.",
            "Keep this ID ready for the next step.",
          ],
          hi: [
            "@userinfobot के उत्तर में अपना Telegram User ID देखें।",
            "सिर्फ दिखाई गई संख्यात्मक Telegram ID को कॉपी करें।",
            "अगले चरण के लिए इस ID को सुरक्षित रखें।",
          ],
        },
      },
      {
        step: 5,
        title: {
          en: "Paste the Telegram ID Back on the Page",
          hi: "Telegram ID को वापस पेज पर पेस्ट करें",
        },
        details: {
          en: [
            "Return to the page or form where you opened these instructions.",
            "Paste your copied Telegram User ID into the required input field.",
            "Submit or save to complete the process.",
          ],
          hi: [
            "उस पेज या फ़ॉर्म पर वापस जाएँ जहाँ से आपने ये निर्देश खोले थे।",
            "कॉपी की गई Telegram User ID को दिए गए इनपुट फ़ील्ड में पेस्ट करें।",
            "प्रक्रिया पूरी करने के लिए सबमिट या सेव करें।",
          ],
        },
      },
      {
        step: 6,
        title: {
          en: "Done 🎉",
          hi: "हो गया 🎉",
        },
        details: {
          en: [
            "You are now subscribed to the PageSea Bot.",
            "Your Telegram User ID has been successfully added.",
            "You can now receive messages and access the service.",
          ],
          hi: [
            "अब आप PageSea Bot को सब्सक्राइब कर चुके हैं।",
            "आपकी Telegram User ID सफलतापूर्वक जोड़ दी गई है।",
            "अब आप मैसेज प्राप्त कर सकते हैं और सेवा का उपयोग कर सकते हैं।",
          ],
        },
      },
    ],
  },
  imagePost: {
    title: {
      en: "How to Upload and Optimize Images with Postimages.org",
      hi: "Postimages.org पर इमेज अपलोड और ऑप्टिमाइज़ कैसे करें",
    },
    description: {
      en: "Follow these steps to upload, resize, and compress your images properly:",
      hi: "इन चरणों का पालन करके अपनी इमेज को सही ढंग से अपलोड, रीसाइज़ और कम्प्रेस करें:",
    },
    steps: [
      {
        step: 1,
        title: {
          en: "Open Postimages.org and Login",
          hi: "Postimages.org खोलें और लॉगिन करें",
        },
        details: {
          en: [
            "Go to <strong> <a href='https://postimages.org' target='_blank'>https://postimages.org</a></strong> in your browser.",
            "Click on 'Sign In' at the top-right corner.",
            "Log in using your account or create a new one if you don’t have it.",
          ],
          hi: [
            "अपने ब्राउज़र में <strong>https://postimages.org</strong> खोलें।",
            "ऊपर-दाईं ओर 'Sign In' पर क्लिक करें।",
            "अपने अकाउंट से लॉगिन करें या नया अकाउंट बनाएँ।",
          ],
        },
      },
      {
        step: 2,
        title: {
          en: "Upload Your Image",
          hi: "अपनी इमेज अपलोड करें",
        },
        details: {
          en: [
            "Click on 'Choose images' and select your picture.",
            "You can also drag and drop the file into the upload box.",
          ],
          hi: [
            "'Choose images' पर क्लिक करें और अपनी तस्वीर चुनें।",
            "आप फ़ाइल को अपलोड बॉक्स में ड्रैग और ड्रॉप भी कर सकते हैं।",
          ],
        },
      },
      {
        step: 3,
        title: {
          en: "Resize the Image to Width 400px",
          hi: "इमेज को 400px चौड़ाई में रीसाइज़ करें",
        },
        details: {
          en: [
            "Before uploading, choose the 'Resize' option.",
            "Select width = 400px.",
            "The height will adjust automatically to preserve the aspect ratio.",
          ],
          hi: [
            "अपलोड करने से पहले 'Resize' विकल्प चुनें।",
            "चौड़ाई = 400px चुनें।",
            "ऊँचाई अपने-आप अनुपात में एडजस्ट हो जाएगी।",
          ],
        },
      },
      {
        step: 4,
        title: {
          en: "Compress and Use WebP Format",
          hi: "कम्प्रेस करें और WebP फॉर्मेट का उपयोग करें",
        },
        details: {
          en: [
            "For best optimization, select WebP format if available.",
            "This reduces file size without losing quality.",
            "Make sure compression is set to minimum size.",
          ],
          hi: [
            "बेहतर ऑप्टिमाइज़ेशन के लिए WebP फॉर्मेट चुनें (यदि उपलब्ध हो)।",
            "इससे क्वालिटी खराब किए बिना फ़ाइल साइज कम होता है।",
            "कम्प्रेशन को न्यूनतम साइज पर सेट करें।",
          ],
        },
      },
      {
        step: 5,
        title: {
          en: "Copy the Link of the Uploaded Image",
          hi: "अपलोड की गई इमेज का लिंक कॉपी करें",
        },
        details: {
          en: [
            "After upload, you’ll get different types of links (Direct Link, HTML, BBCode).",
            "Copy the Direct Link (URL) to use the image wherever needed.",
          ],
          hi: [
            "अपलोड के बाद आपको अलग-अलग प्रकार के लिंक मिलेंगे (Direct Link, HTML, BBCode)।",
            "इमेज का उपयोग करने के लिए Direct Link (URL) कॉपी करें।",
          ],
        },
      },
      {
        step: 6,
        title: {
          en: "Done 🎉",
          hi: "हो गया 🎉",
        },
        details: {
          en: [
            "Your image is now uploaded, resized to width 400px, and compressed in WebP format for best performance.",
          ],
          hi: [
            "आपकी इमेज अब अपलोड हो चुकी है, 400px चौड़ाई में रीसाइज़ और WebP फॉर्मेट में कम्प्रेस होकर बेहतरीन प्रदर्शन के लिए तैयार है।",
          ],
        },
      },
    ],
  },
};

const lang = ref("en");
const section = computed(() => content[props.stepType]);

function toggleLang() {
  lang.value = lang.value === "en" ? "hi" : "en";
}
</script>
