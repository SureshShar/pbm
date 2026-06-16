<template>
  <section
    id="heroSection"
    class="bg-black-L1 relative overflow-hidden h-full w-full bg-cover bg-center bg-no-repeat"
    :style="{backgroundImage: `url( ${modelValue.image.src || useRandomBgUrl()})`}"
  >
    <div class="bg-bgblack bg-opacity-60 pb-24 md:pb-[120px] xl:pb-[160px] pt-32 md:pt-[150px] xl:pt-[180px]">
      <div class="container flex flex-wrap">
        <div class="w-full px-4 rounded-md">
          <div
            class="mx-auto w-full md:w-10/12 text-center py-5"
            data-wow-delay=".2s"
          >
            <h1 class="px-3 mb-5 font-bold text-secondary dark:text-bglight text-xl md:text-2xl lg:text-4xl leading-tight sm:leading-tight md:leading-tight">
              {{ modelValue.title }}
            </h1>
            <p class="px-3 mb-4 md:mb-12 text-base !leading-relaxed text-bglight sm:text-lg md:text-xl">
              {{ modelValue.text }}
            </p>

            <div class="flex items-center justify-center gap-2 flex-wrap mx-4">
              <template v-for="btn in actionButtons" :key="btn.key">
                <component
                  v-if="btn.show"
                  :is="btn.tag"
                  :href="btn.href"
                  @click="btn.onClick"
                  class="rounded-sm px-4 md:px-8 py-2 md:py-4 text-base font-semibold text-bglight duration-300 ease-in-out"
                  :class="btn.class"
                >
                  {{ btn.label }}
                </component>
              </template>
            </div>

            <!-- Utility icon buttons: copy, share, location, socials -->
            <div class="mt-4 flex items-center justify-center gap-4">
              <template v-for="btn in utilityButtons" :key="btn.key">
                <component
                  v-if="btn.show"
                  :is="btn.href ? 'a' : 'button'"
                  :href="btn.href"
                  target="_blank"
                  @click="btn.action"
                  class="inline-flex items-center gap-2 rounded-sm px-3 py-2 text-bglight"
                  :class="btn.class"
                  :aria-label="btn.label"
                >
                  <component :is="btn.icon" class="h-5 w-5 fill-current" />
                  <span class="hidden sm:inline">{{ btn.label }}</span>
                </component>
              </template>
            </div>
          </div>
          <slot />

          <!-- Address Modal and Timing Modal -->
          <GenericModal v-model="showAddress">
            <p
              class="min-h-24 w-full px-3 mb-4 md:mb-12 text-base text-center !leading-relaxed text-bgblack dark:text-bglight sm:text-lg md:text-xl"
            >
              {{ modelValue.address }}
            </p>
          </GenericModal>
          <GenericModal v-model="showTiming">
            <p
              class="w-full min-h-24 px-3 mb-4 md:mb-12 text-base text-center !leading-relaxed text-bgblack dark:text-bglight sm:text-lg md:text-xl"
            >
              {{ modelValue.timing }}
            </p>
          </GenericModal>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SvgIconsCopy from "../SvgIcons/Copy.vue";
import SvgIconsHome from "../SvgIcons/Home.vue";
import SvgIconsShare from "../SvgIcons/Share.vue";
import SvgIconsWatch from "../SvgIcons/Watch.vue";
import SvgIconsLocation from "../SvgIcons/Location.vue";
import SvgIconsDownload from "../SvgIcons/Download.vue";

const props = defineProps({
  userId: {
    type: String,
    default: null,
  },
  userMetaData: {
    type: Object,
    default: () => ({}),
  },
});

const showAddress = ref(false);
const showTiming = ref(false);
const modelValue = defineModel("modelValue");

const url = computed(() => `https://pageby.me/page?id=${props.userId}`);
const actionButtons = computed(() => [
  {
    key: "call",
    show: !!props.userMetaData.contact_number,
    tag: "a", // Use 'a' i.e. anchor tag for tel link
    href: `tel:${props.userMetaData.contact_number}`,
    class: "bg-primary hover:bg-primary/80",
    label: "Call",
  },
  {
    key: "message",
    // show: !!props.userMetaData.telegram_id,
    show: true,
    tag: "button",
    onClick: scrollToTelegram,
    class: "bg-bgblack hover:bg-bgblack90 dark:bg-bglight/10 dark:text-bglight",
    label: "Message",
  },
]);
const utilityButtons = computed(() => [
  {
    key: "copy",
    show: true,
    icon: SvgIconsCopy,
    label: "Copy",
    class: "bg-black-L4/20 hover:bg-black-L4/30 focus:bg-tertiary",
    action: copyPageUrl,
  },
  {
    key: "share",
    show: true,
    icon: SvgIconsShare,
    label: "Share",
    class: "bg-primary hover:bg-primary/80",
    action: sharePage,
  },
  {
    key: "location",
    show: !!modelValue.value?.location,
    icon: SvgIconsLocation,
    label: "Location",
    class: "bg-bgblack hover:bg-bgblack90",
    action: openLocation,
  },
  {
    key: "address",
    show: !!modelValue.value?.address,
    icon: SvgIconsHome,
    label: "Address",
    class: "bg-tertiary/70 hover:bg-tertiary/60",
    action: () => (showAddress.value = true),
  },
  {
    key: "resume",
    show: !!modelValue.value?.resumeLink,
    icon: SvgIconsDownload,
    label: "Document",
    class: "bg-primary/70 hover:bg-primary/60",
    href: modelValue.value?.resumeLink,
  },
  {
    key: "timing",
    show: !!modelValue.value?.timing,
    icon: SvgIconsWatch,
    label: "Timing",
    class: "bg-black-L4/20 hover:bg-black-L4/30",
    action: () => (showTiming.value = true),
  },
]);

function scrollToTelegram() {
  const el = document.getElementById("user_send_message");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.location.hash = "#user_send_message";
  }
}

async function copyPageUrl() {
  try {
    await navigator.clipboard.writeText(url.value);
  } catch (e) {}
}

async function sharePage() {
  try {
    if (navigator.share) {
      await navigator.share({ title: document.title, url: url.value });
      return;
    }
  } catch (e) {}

  copyPageUrl();
}

function openLocation() {
  if (!modelValue.value.location) return;
  const url = String(modelValue.value.location);
  const finalUrl = url.startsWith("http")
    ? url
    : `https://www.google.com/maps?q=${encodeURIComponent(url)}`;
  window.open(finalUrl, "_blank");
}
</script>
