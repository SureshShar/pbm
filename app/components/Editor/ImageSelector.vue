<template>
  <div class="flex items-center">
    <GenericModal v-model="modelValue">
      <template #header>
        <div class="text-lg font-semibold dark:text-bglight">
          Select an image
        </div>
      </template>

      <div class="container space-y-4">
        <div v-if="uploadedImageUrls">
          <UniversalH2 heading="My uploded images" class="py-4" />
          <!-- Images from uploaded urls -->
          <ul class="grid grid-cols-2 md:grid-cols-3 gap-2">
            <template v-for="(url, index) in uploadedImageUrls" :key="index">
              <li
                :class="{'hidden': !url}"
                class="relative flex items-center bg-bglight dark:bg-black-L2 shadow-three dark:shadow-two rounded"
              >
                <SvgIconsDelete
                  @click="showDeleteConfirmationModel(url)"
                  class="absolute top-0 right-0 w-6 h-6 p-1 text-white-D1 bg-red-500 cursor-pointer"
                />
                <img
                  class="w-full h-auto object-cover cursor-pointer my-auto"
                  :src="'/uploads/'+ url"
                  alt="Image from data"
                  @click="selectedAsset('/uploads/'+ url)"
                />
              </li>
            </template>
          </ul>
        </div>

        <UniversalButton v-if="uploadedImageUrls.length <= 10" @clicked="showUploadModel = true" heading="Upload New" />
        <p v-else class="block text-gray-500 text-base">Don't upload more than 10 images * (Buy pro)</p>

        <UniversalH2 heading="Filter" />

        <!-- Category Buttons -->
        <GenericScrollableGallery classes="gap-2">
          <div class="w-full">
            <div class="flex gap-2" v-for="cat in images" :key="cat">
              <button
                v-for="category in cat"
                :key="category"
                @click="changeCategory(category)"
                :class="[
                  'mr-1 mb-2 px-4 py-2 rounded-md text-sm md:text-lg font-medium transition-colors whitespace-nowrap dark:shadow-feature-2',
                  selectedCategory === category
                    ? 'bg-primary text-bglight'
                    : 'bg-white-D2 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500',
                ]"
              >
                <span class="capitalize">{{ camelToTitle(category) }}</span>
              </button>
            </div>
          </div>
        </GenericScrollableGallery>
        <!-- Image List -->
        <ul class="grid grid-cols-3 md:grid-cols-4 gap-2 mt-5">
          <template
            v-if="imageHelper[selectedCategory]"
            v-for="image in imageHelper[selectedCategory].to"
            :key="image"
          >
            <li
              @click="selectImage(image)"
              class="flex items-centerbg-bglight dark:bg-black-L2 shadow-three dark:shadow-two rounded"
            >
              <img
                class="w-full h-auto object-cover cursor-pointer my-auto"
                :src="
                  imageHelper[selectedCategory].path +
                  '/' +
                  image +
                  '.' +
                  imageHelper[selectedCategory].extension
                "
                alt="Image from data"
              />
            </li>
          </template>
        </ul>
      </div>

      <div class="h-5 w-full"></div>
    </GenericModal>
  </div>
  <GenericConfirmationModal
    v-model="showConfirmation"
    :message="'Are you sure you want to delete this image?'"
    :confirm-btn-text="'Yes, Delete'"
    :cancel-btn-text="'No, Cancel'"
    @userConfirmed="deleteImage"
  />
  <CommonCodeImageUploadModel v-model="showUploadModel" :pageId />
</template>

<script setup>
const selectedCategory = ref("vegetables(सब्जियां)");
const imageHelper = {
  "avatar(अवतार)": {
    to: 16,
    path: "/images/shop/avatar",
    extension: "svg",
  },
  "shopLogo(दुकान का लोगो)": {
    to: 24,
    path: "/images/shop/shopLogo",
    extension: "jpeg",
  },
  "restaurant(रेस्टोरेंट-ढाबा)": {
    to: 83,
    path: "/images/shop/restaurant",
    extension: "jpeg",
  },
  "streetFastFood(फास्ट फूड)": {
    to: 56,
    path: "/images/shop/fastFood",
    extension: "webp",
  },
  "acharNamkin(अचार-नमकिन)": {
    to: 19,
    path: "/images/shop/achar-namkin",
    extension: "jpeg",
  },
  "burgerPizzaWrap(बर्गर-पिज़्ज़ा-रैप)": {
    to: 18,
    path: "/images/shop/burgerPizza",
    extension: "jpg",
  },
  "nonVeg(नॉन-वेज खाना)": {
    to: 34,
    path: "/images/shop/nonVeg",
    extension: "jpeg",
  },
  "southIndian(साउथ इंडियन)": {
    to: 22,
    path: "/images/shop/southIndian",
    extension: "jpeg",
  },
  "chinese(चीनी खाना)": {
    to: 33,
    path: "/images/shop/chinese",
    extension: "jpeg",
  },
  "chaap(चाप)": {
    to: 12,
    path: "/images/shop/chaap",
    extension: "webp",
  },
  "eggFood(अंडा)": {
    to: 27,
    path: "/images/shop/egg",
    extension: "jpeg",
  },
  "parathaPuri(परथा और पुरी)": {
    to: 19,
    path: "/images/shop/parathaPuri",
    extension: "jpeg",
  },
  "cakeBakery(कैक और बैकरी)": {
    to: 25,
    path: "/images/shop/bakery",
    extension: "webp",
  },
  "sweet(मिठाई)": {
    to: 23,
    path: "/images/shop/sweet",
    extension: "jpeg",
  },
  "chaySutta(चाय)": {
    to: 33,
    path: "/images/shop/chaySutta",
    extension: "jpeg",
  },
  "juiceShakes(जुइस-शेक)": {
    to: 47,
    path: "/images/shop/fruitJuice",
    extension: "jpeg",
  },
  "iceCream(आइसी क्रीम)": {
    to: 19,
    path: "/images/shop/IceCream",
    extension: "webp",
  },
  "fruits(फल)": {
    to: 11,
    path: "/images/shop/fruits",
    extension: "webp",
  },
  "vegetables(सब्जियां)": {
    to: 50,
    path: "/images/shop/vegetables",
    extension: "webp",
  },
  "generalStore(किराना दुकान)": {
    to: 58,
    path: "/images/shop/general",
    extension: "jpeg",
  },
  "ricePulse(चावल, दाल)": {
    to: 19,
    path: "/images/shop/ricePulse",
    extension: "jpeg",
  },
  "animalsAndFood(पशु,खाद्य)": {
    to: 49,
    path: "/images/shop/animalFood",
    extension: "jpeg",
  },
  "makeUp(मैकअप)": {
    to: 14,
    path: "/images/shop/makeUpshop",
    extension: "jpeg",
  },
  "salonHairCutting(सालून-नाई)": {
    to: 10,
    path: "/images/shop/salonMan",
    extension: "jpeg",
  },
  "backgroundImage(बैकग्राउंड इमेज)": {
    to: 29,
    path: "/images/background",
    extension: "jpg",
  },
  "dressCloths(ड्रेस कपड़े)": {
    to: 19,
    path: "/images/shop/cloths",
    extension: "webp",
  },
  "construnctionMaterials(निर्माण सामग्री)": {
    to: 44,
    path: "/images/shop/construction",
    extension: "jpeg",
  },
  "farmingConstruction(खेती और शौचालय)": {
    to: 10,
    path: "/images/shop/farmUse",
    extension: "jpeg",
  },
  "electricItems(बिजली सामान)": {
    to: 23,
    path: "/images/shop/electric",
    extension: "jpeg",
  },
  "nursary(पेड़ पौधे)": {
    to: 20,
    path: "/images/shop/nursary",
    extension: "jpeg",
  },
  "perfume(इत्र)": {
    to: 7,
    path: "/images/shop/perfume",
    extension: "webp",
  },
  "tools(औजार)": {
    to: 11,
    path: "/images/shop/tools",
    extension: "jpeg",
  },
  "socialMediaIcons(सोशल मीडिया)": {
    to: 13,
    path: "/images/socialMedia",
    extension: "svg",
  },
  "books(किताबें, पुस्तकें)": {
    to: 8,
    path: "/images/shop/books",
    extension: "jpeg",
  },
  "mobile(मोबाइल)": {
    to: 29,
    path: "/images/shop/mobile",
    extension: "jpeg",
  },
  "wedding(शादी)": {
    to: 16,
    path: "/images/festival/marriage",
    extension: "jpeg",
  },
  "homeCleaners(सफ़ाई)": {
    to: 37,
    path: "/images/shop/cleaners",
    extension: "jpeg",
  },
  "medical(दवाइयाँ)": {
    to: 17,
    path: "/images/shop/medical",
    extension: "jpeg",
  },
  "toysGifts(खिलौने उपहार)": {
    to: 31,
    path: "/images/shop/toysGifts",
    extension: "jpeg",
  },
  "gymSport(जिम और खेल)": {
    to: 31,
    path: "/images/shop/gymSport",
    extension: "jpeg",
  },
  "villageOrgGod(गाँव-संगठन देवता)": {
    to: 38,
    path: "/images/shop/villageGod",
    extension: "jpeg",
  },
};

const showConfirmation = ref(false);
const showUploadModel = ref(false);
const deleteFileUrl = ref(null);
const modelValue = defineModel("modelValue");

const emit = defineEmits(["selectImage"]);
const { getLocalData, setLocalData, getInstanceData, setInstanceData, showError, showSuccess } = useLocalStorage();

const pageId = computed(() => getLocalData("pageId"));
const authId = computed(() => getLocalData("authId"));
const authToken = computed(() => getLocalData("superAdminAuthToken"));
const images = computed(() => splitArrayIntoN(Object.keys(imageHelper), 5));
const uploadedImageUrls = computed(() => getInstanceData("uploadedImageUrls"));

// Filter arrange images into n arrays for showing in n rows in UI
function splitArrayIntoN(arr, n) {
  if (n <= 0) return [];

  const result = [];
  const chunkSize = Math.ceil(arr.length / n);

  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }

  // If result has less than n arrays, add empty ones
  while (result.length < n) {
    result.push([]);
  }

  return result;
}

// Show confirmation modal to delete a image
function showDeleteConfirmationModel(url) {
  showConfirmation.value = true;
  deleteFileUrl.value = url; // Store the key of the image to be deleted
}

async function deleteImage() {
  showConfirmation.value = false;
  try {
    await useApi("userAsset/deleteFile", {
      authId: authId.value,
      authToken: authToken.value,
      filePath: deleteFileUrl.value, // Pass the key of the image to be deleted
    });
    setInstanceData("uploadedImageUrls", uploadedImageUrls.value.filter(url => url !== deleteFileUrl.value)); // Remove the deleted image from local state
    showSuccess("Image deleted successfully!");
  } catch (error) {
    showError("Error deleting uploaded image:" + error.message);
  }
}

// Selectd image url emited to parent component
function selectImage(image) {
  showSuccess("Image selected successfully!");
  emit(
    "selectImage",
    imageHelper[selectedCategory.value].path +
      "/" +
      image +
      "." +
      imageHelper[selectedCategory.value].extension,
  );
  modelValue.value = false;
}

// Selectd image url emited to parent component
function selectedAsset(url) {
  showSuccess("Image selected successfully!");
  emit("selectImage", url);
  modelValue.value = false;
}

// Change filter image category
function changeCategory(category) {
  selectedCategory.value = category;
  setLocalData("selectedImageCategory", category);
}

// Fetch uploaded images on mount according to user
onMounted(() => {
  selectedCategory.value = getLocalData("selectedImageCategory") || "vegetables(सब्जियां)";
  if (!uploadedImageUrls.value) {
    useApi("userAsset/getAll", {
      pageId: pageId.value,
      authId: authId.value,
      authToken: authToken.value,
    })
      .then((response) => {
        if (response.data) {
          setInstanceData("uploadedImageUrls", response.data);
        } else {
          setInstanceData("uploadedImageUrls", []);
        }
      })
      .catch((error) => {
        showError("Error fetching uploaded images:" + error.message);
      });
  }
});
</script>
