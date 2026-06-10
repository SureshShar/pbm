<template>
  <UniversalCard>
    <!-- File select input -->
    <div class="flex flex-col-reverse items-center w-full py-4">
      <input
        type="file"
        ref="fileInput"
        @change="onFileSelect"
        multiple
        accept=".jpg,.jpeg,.png,.gif,.webp,.svg,.pdf"
        class="dark:text-white dark:shadow-two w-full rounded-sm px-2 md:px-6 py-1 md:py-3 text-base text-black-L2 outline-none border border-gray-300 bg-white-D1 dark:bg-black-L3"
      />

      <div class="w-full flex flex-col md:flex-row items-center gap-2 text-primary p-2">
        <SvgIconsUpload class="w-8 h-8"/>
        <UniversalP>Supported: JPG, PNG, GIF, WebP, SVG, PDF (Max {{ constant.MAX_SIZE }} each)</UniversalP>
      </div>
    </div>

    <!-- Selected files name preview -->
    <div v-if="selectedFiles.length > 0" class="">
      <UniversalH3>Selected Files ({{ selectedFiles.length }})</UniversalH3>
      <div
        v-for="(file, index) in selectedFiles"
        :key="index"
        class="flex items-center justify-between mb-2"
      >
        <UniversalP class="file-info">
          <span class="file-name mr-2">{{ file.name }}</span>
          <span class="text-xs text-gray-400">({{ formatFileSize(file.size) }})</span>
        </UniversalP>

        <SvgIconsCross
          @click="removeFile(index)"
          class="w-6 h-6 cursor-pointer bg-red-600 rounded-md text-bglight shadow-submit"
        />
      </div>
    </div>

    <!-- Upload button and clear button -->
    <div class="w-full flex items-center justify-between gap-4 mt-4">
      <UniversalButton
        @clicked="uploadFiles"
        :disabled="isUploading || selectedFiles.length === 0"
      >
        {{
          isUploading
            ? "Uploading..."
            : `Upload ${selectedFiles.length} File(s)`
        }}
      </UniversalButton>

      <UniversalButton
        v-if="selectedFiles.length > 0"
        heading="Clear All"
        @clicked="clearFiles"
      />
    </div>
  </UniversalCard>
  <FeaturesImageCompress />
</template>

<script setup>
const props = defineProps({
  pageId: {
    type: String,
    default: null,
  },
});

const fileInput = ref();
const selectedFiles = ref([]);
const isUploading = ref(false);
const modelValue = defineModel("modelValue");

const constant = getContants();
const { setInstanceData, getInstanceData, showSuccess, showError, showWarning } = useLocalStorage();

const uploadedImageUrls = computed(() => getInstanceData("uploadedImageUrls"));

function onFileSelect(event) {
  const files = Array.from(event.target.files || []);
  addFiles(files);
}

function addFiles(files) {
  if (selectedFiles.value.length + files.length > constant.MAX_FILES) {
    showWarning(`You can upload a maximum of ${constant.MAX_FILES} images at once.`, 10);
    return;
  }

  const validFiles = files.filter((file) => {
    if (!constant.ALLOWED_MIME_TYPE.includes(file.type)) {
      showWarning(`This file type is not allowed: ${file.name}`, 10);
      return false;
    }

    if (file.size > constant.MAX_FILE_SIZE) {
      showWarning(`File is too large: (${Math.floor(file.size/1000)} Kb). Max file size: ${constant.MAX_SIZE}. File name ${file.name}`, 20);
      return false;
    }

    return true;
  });

  selectedFiles.value.push(...validFiles);
}

function removeFile(index) {
  selectedFiles.value.splice(index, 1);
}

function clearFiles() {
  selectedFiles.value = [];
  if (fileInput.value) fileInput.value.value = "";
}

function formatFileSize(bytes) {
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

async function uploadFiles() {
  // Prevent emplty upload

  if (isUploading.value || selectedFiles.value.length === 0) return;

  isUploading.value = true;

  const formData = new FormData();

  // ✅ send pageId
  formData.append("pageId", props.pageId);

  // ✅ max 5 images
  selectedFiles.value.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await fetch("/api/userAsset/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      clearFiles();
      setInstanceData("uploadedImageUrls", [...uploadedImageUrls.value, ...data.data]);
      modelValue.value = false; // close modal
      showSuccess("Files uploaded successfully!");
    } else {
      throw new Error(data.message || "Upload failed");
    }
  } catch (err) {
    showError("Upload failed: " + err.message);
  } finally {
    isUploading.value = false;
  }
}
</script>
