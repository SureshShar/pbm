<template>
  <div class="flex items-center">
    <button
      class="inline-flex items-center justify-center rounded-md hover:bg-black-L4/10 dark:hover:bg-bglight/10"
      aria-label="Show QR code"
      @click="openModal"
    >
      <!-- QR icon (inline SVG) -->
      <SvgIconsQRcode class="w-6 h-6 text-bgblack dark:text-bglight" />
    </button>

    <GenericModal v-model="showModal">
      <template #header>
        <div class="text-lg font-semibold dark:text-bglight">
          Share or Scan you page
        </div>
      </template>

      <div class="flex flex-col items-center gap-4">
        <div
          v-if="loading"
          class="text-center text-black-L2 dark:text-bglight/80"
        >
          Generating QR…
        </div>
        <img
          v-else
          :src="dataUrl"
          alt="QR code"
          class="w-72 h-72 rounded-md shadow"
        />
        <p
          class="text-xs text-black-L2/70 dark:text-bglight/60 break-words text-center"
        >
          Scan this QR to open: {{ url }}
        </p>
      </div>

      <template #footer>
        <div class="flex items-center gap-2 ml-auto">
          <button
            @click="downloadImage"
            class="px-3 py-1.5 rounded bg-black-L4/20 dark:text-bglight hover:bg-black-L4/30 dark:bg-bglight/10 dark:hover:bg-bglight/20 text-sm"
          >
            Download PNG
          </button>
          <button
            @click="shareImage"
            class="px-3 py-1.5 rounded bg-primary text-bglight hover:bg-primary/80 text-sm"
          >
            Share
          </button>
        </div>
      </template>
    </GenericModal>
  </div>
</template>

<script setup>
const dataUrl = ref("");
const showModal = ref(false);
const loading = ref(false);
const QRCode = ref(null);

const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const url = computed(() => {
  if (import.meta.client) {
    // Include full current URL with query/hash
    return window.location.href;
  }
  // SSR fallback to public siteUrl + route path if provided in runtime config
  const base = runtimeConfig?.public?.siteUrl || "";
  return base ? base.replace(/\/$/, "") + route.fullPath : route.fullPath;
});

async function generateQR() {
  loading.value = true;
  try {
    if (!QRCode.value) {
      QRCode.value = await import("qrcode");
    }

    dataUrl.value = await QRCode.value.toDataURL(url.value, {
      errorCorrectionLevel: "H",
      width: 512,
      margin: 2,
      color: { dark: "#000000", light: "#ffffff" },
    });
  } catch (e) {
    console.error("QR generation failed", e);
  } finally {
    loading.value = false;
  }
}

function openModal() {
  showModal.value = true;
  generateQR();
}

function downloadImage() {
  if (!dataUrl.value) return;
  const a = document.createElement("a");
  a.href = dataUrl.value;
  a.download = "qrcode.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

async function shareImage() {
  if (!url.value) return;

  try {
    if (navigator.share) {
      await navigator.share({ title: document.title, url: url.value });
      return;
    }
  } catch (e) {}
}

watch(showModal, (val) => {
  if (val) {
    document.body.style.overflow = "hidden";
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    document.body.style.overflow = "";
  }
});

onMounted(async () => {
  QRCode.value = await import("qrcode");
});
</script>
