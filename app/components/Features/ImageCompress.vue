<template>
  <div>
    <UniversalCard>
      <UniversalH2 heading="Compress Images (तस्वीर छोटी करे)" />

      <div
        v-for="help in images"
        :key="help.size"
        class="mt-6 flex flex-col gap-4 border-b border-gray-300 dark:border-gray-700 pb-6"
      >
        <div class="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            @change="handleImageUpload($event, help)"
            class="mt-2 block w-full text-base file:mr-4 file:rounded-md file:border-0 file:bg-primary file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white dark:text-white hover:file:bg-primary/30 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
          />

          <img
            v-if="help.imgUrl"
            :src="help.imgUrl"
            class="h-28 w-fit border-gray-300 dark:bg-black-L3 rounded-sm border bg-white-D1 shadow-xl"
          />
        </div>

        <div class="w-full flex flex-col justify-center gap-4 mt-2">
          <UniversalP
            :paragraph="`Selected an image to convert to a height of ${help.size}px while keeping width proportional.`"
          />

          <button
            :class="[
              help.imgUrl
                ? 'cursor-pointer bg-tertiary'
                : 'cursor-not-allowed bg-tertiary/50 hidden',
              'text-white rounded-sm font-bold px-4 py-2 w-fit text-base',
            ]"
            :disabled="!help.imgUrl"
            @click="downloadImage(help)"
          >
            Download
          </button>
        </div>
      </div>
    </UniversalCard>
  </div>
</template>

<script setup>
const images = ref([
  { size: 100, suffix: "resized-100px", imgUrl: null, fileName: "" },
  // { size: 300, suffix: "resized-250px", imgUrl: null, fileName: "" },
  { size: 400, suffix: "resized-400px", imgUrl: null, fileName: "" },
]);

async function handleImageUpload(event, help) {
  const file = event.target.files[0];
  if (!file) return;

  help.fileName = file.name;

  try {
    const [{ default: pica }, { default: Compressor }] = await Promise.all([
      import("pica"),
      import("compressorjs"),
    ]);

    // Compress
    const compressedFile = await new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6,
        success: resolve,
        error: reject,
      });
    });

    // Convert to bitmap
    const imageBitmap = await createImageBitmap(compressedFile);

    // Resize
    const aspectRatio = imageBitmap.width / imageBitmap.height;
    const targetWidth = Math.round(aspectRatio * help.size);

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = help.size;

    const picaInstance = pica();
    await picaInstance.resize(imageBitmap, canvas);

    // Output
    help.imgUrl = canvas.toDataURL("image/jpeg", 0.85);
  } catch (err) {
    alert("Image processing failed: " + err);
  }
}

function downloadImage(help) {
  if (!help.imgUrl || !help.fileName) return;

  const link = document.createElement("a");

  const fileName = help.fileName.replace(
    /(\.[\w\d_-]+)$/i,
    `_${help.suffix}$1`,
  );

  link.download = fileName;
  link.href = help.imgUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>
