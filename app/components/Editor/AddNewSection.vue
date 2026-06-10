<template>
  <div
    class="relative h-0 w-full border-t border-gray-300 dark:border-gray-700"
  >
    <div class="flex items-center justify-end mx-2">
      <SvgIconsSimplePlus
        v-if="isEditMode"
        @click="openEditor"
        class="cursor-pointer bg-tertiary w-6 h-6 text-bglight rounded-b-md p-1"
      />
    </div>

    <!-- Modal -->
    <div class="flex items-center bg-primary/20">
      <GenericSlideUpModal
        v-model="showModal"
        bgClass="bg-gray-300 dark:bg-black-L1"
      >
        <template #header>
          <div class="text-lg font-semibold dark:text-bglight">
            Select section form the given images
          </div>
        </template>

        <!-- Category Buttons -->
        <div class="container space-y-4">
          <GenericScrollableGallery classes="gap-2 p-3">
            <img
              v-for="type in sectionTypes"
              :key="type.id"
              :src="type.src"
              alt="Section Image"
              class="w-full h-96 object-contain rounded mr-3"
              @click="addSection(type.id)"
            />
          </GenericScrollableGallery>
        </div>

        <div class="h-5 w-full"></div>
      </GenericSlideUpModal>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});

const modelValue = defineModel("modelValue");
const showModal = ref(false);
const sectionTypes = ref([
  {
    id: "cartItems",
    title: "Cart Items",
    description: "You can add multiple cart/shop items.",
    src: "/images/contentType/3.png",
  },
  {
    id: "imageCard",
    title: "Image card",
    description: "You can add a image and a title and description.",
    src: "/images/contentType/1.png",
  },
  {
    id: "noticeBoard",
    title: "Notice Board",
    description: "You can add multiple title and description card.",
    src: "/images/contentType/6.png",
  },
  {
    id: "achievement",
    title: "Achievement",
    description: "You can add multiple achievement headings.",
    src: "/images/contentType/4.png",
  },
  {
    id: "imageGallery",
    title: "Image Gallery",
    description: "You can add multiple images with title.",
    src: "/images/contentType/2.png",
  },
  {
    id: "userSendMessage",
    title: "User can send message",
    description: "User can send message to you.",
    src: "/images/contentType/5.png",
  },
  {
    id: "socialMediaLinks",
    title: "Social Media Links",
    description: "You can add multiple social media links.",
    src: "/images/contentType/7.png",
  },
  {
    id: "listings",
    title: "List Items",
    description: "You can add multiple list items.",
    src: "/images/contentType/8.png",
  },
  {
    id: "offerCard",
    title: "Offer Card",
    description: "You can add multiple offer cards.",
    src: "/images/contentType/9.png",
  },
  // In future new section types
  // {
  //   id: "blog",
  //   title: "Blog",
  //   description: "You can add a image and a title and description.",
  // },
]);

const sectionContent = {
  cartItems: {
    id: "cartItems",
    title: "हमारे उत्पाद",
    description: "ताज़ा और कुछ खास उत्पाद।",
    blocks: [
      {
        id: "cakes-1",
        type: "cartItem",
        title: "केक",
        items: [
          {
            id: "1",
            hide: false,
            type: "cartItem",
            title: "Brown Bread",
            srtdsc: "Whole wheat bread, rich in fiber.",
            costs: [
              {
                size: "400g",
                price: 55,
              },
            ],
            category: "bread",
            itemType: "type1",
            isVeg: true,
            image: {
              src: "",
              alt: "Brown Bread",
            },
          },
          {
            id: "2",
            hide: false,
            type: "cartItem",
            title: "White Bread",
            srtdsc: "Soft and fluffy white bread.",
            costs: [
              {
                size: "400g",
                price: 40,
              },
            ],
            category: "cookie",
            itemType: "type2",
            isVeg: true,
            image: {
              src: "",
              alt: "White Bread",
            },
          },
          {
            id: "3",
            hide: false,
            type: "cartItem",
            title: "Chocolate Pastry",
            srtdsc: "Rich chocolate flavor with creamy frosting.",
            costs: [
              {
                size: "Single",
                price: 150,
              },
            ],
            category: "cookie",
            itemType: "type3",
            isVeg: true,
            image: {
              src: "",
              alt: "Chocolate Pastry",
            },
          },
        ],
      },
    ],
  },
  imageCard: {
    id: "imageCard",
    title: "",
    description: "",
    blocks: [
      {
        id: "1",
        type: "imageCard",
        items: [
          {
            title: "Lorem ipsum dolor sit amet",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: {
              src: "",
              alt: "About image",
            },
          },
        ],
      },
    ],
  },
  noticeBoard: {
    id: "notice",
    title: "Notice board",
    description: "Notice board description comes here",
    background: "",
    blocks: [
      {
        id: "notice-1",
        type: "titleCard",
        items: [
          {
            id: "n1",
            label: "Principle demand this for next friday",
            text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa ut consectetur amet eveniet odio libero? Ratione corrupti, hic mollitia nobis quae aliquam rem! Tempora reprehenderit necessitatibus autem magnam cupiditate quos.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa ut consectetur amet eveniet odio libero? Ratione corrupti, hic mollitia nobis quae aliquam rem! Tempora reprehenderit necessitatibus autem magnam cupiditate quos.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa ut consectetur amet eveniet odio libero? Ratione corrupti, hic mollitia nobis quae aliquam rem! Tempora reprehenderit necessitatibus autem magnam cupiditate quos.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa ut consectetur amet eveniet odio libero? Ratione corrupti, hic mollitia nobis quae aliquam rem! Tempora reprehenderit necessitatibus autem magnam cupiditate quos.",
            date: "8-18-2025",
          },
          {
            id: "n2",
            label: "Principle demand this for next friday",
            text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa ut consectetur amet eveniet odio libero? Ratione corrupti, hic mollitia nobis quae aliquam rem! Tempora reprehenderit necessitatibus autem magnam cupiditate quos.",
            date: "8-18-2025",
          },
          {
            id: "n3",
            label: "Principle demand this for next friday",
            text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa ut consectetur amet eveniet odio libero? Ratione corrupti, hic mollitia nobis quae aliquam rem! Tempora reprehenderit necessitatibus autem magnam cupiditate quos.",
            date: "8-18-2025",
          },
        ],
      },
    ],
  },
  achievement: {
    id: "achievement",
    title: "My Proud Achievements",
    description:
      "Every award here tells a story of my hard work and passion—take a look!",
    blocks: [
      {
        id: "ach-1",
        type: "tagsCard",
        title: "",
        items: [
          {
            id: "t2",
            label: "Award two",
            resource: "",
          },
          {
            id: "t3",
            label: "Award three",
            resource: "",
          },
          {
            id: "t4",
            label: "Award four",
            resource: "",
          },
        ],
      },
    ],
  },
  imageGallery: {
    id: "gallery",
    title: "Moments Captured",
    description:
      "Every photo here captures a unique memory and experience—explore the journey through my lens!",
    blocks: [
      {
        id: "gal-1",
        type: "imageTitle",
        title: "Gallery",
        items: [
          {
            id: "g1",
            label: "Picnic Delhi",
            image: {
              src: "",
              alt: "Pic 1",
            },
          },
          {
            id: "g2",
            label: "Picnic Dubai",
            image: {
              src: "",
              alt: "Pic 2",
            },
          },
          {
            id: "g3",
            label: "Award one",
            image: {
              src: "",
              alt: "Award one",
            },
          },
        ],
      },
    ],
  },
  userSendMessage: {
    id: "message",
    type: "chat",
    title: "Send me a message",
    description: "Have a question or want to get in touch? Send me a message directly.",
    blocks: [
      {
        id: "msg-1",
        hide: false,
        unique: true,
        type: "message",
      },
    ],
  },
  socialMediaLinks: {
    id: "socials",
    title: "Social Media",
    description: "",
    hideHader: true,
    blocks: [
      {
        id: "soc-1",
        type: "socialLink",
        title: "Follow me",
        items: [
          {
            id: "s1",
            image: {
              src: "/images/socialMedia/2.svg",
              alt: "facebook",
            },
            href: "https://www.facebook.com/chaysutta",
          },
          {
            id: "s2",
            image: {
              src: "/images/socialMedia/3.svg",
              alt: "instagram",
            },
            href: "https://www.instagram.com/chaysutta",
          },
          {
            id: "s3",
            image: {
              src: "/images/socialMedia/4.svg",
              alt: "whatsapp",
            },
            href: "https://wa.me/910000000000",
          },
        ],
      },
    ],
  },
  listings: {
    id: "listings",
    title: "Your listings",
    description: "A brief description of your listings.",
    background: "",
    blocks: [
      {
        id: "list-1",
        type: "listings",
        items: [
          {
            id: "n1",
            label: "Title 1",
            text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa ut consectetur amet eveniet odio libero? Ratione corrupti, hic mollitia nobis quae aliquam rem! Tempora reprehenderit necessitatibus autem magnam cupiditate quos.",
          },
          {
            id: "n2",
            label: "Title 2",
            text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa ut consectetur amet eveniet odio libero? Ratione corrupti, hic mollitia nobis quae aliquam rem! Tempora reprehenderit necessitatibus autem magnam cupiditate quos.",
          },
          {
            id: "n3",
            label: "Title 3",
            text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa ut consectetur amet eveniet odio libero? Ratione corrupti, hic mollitia nobis quae aliquam rem! Tempora reprehenderit necessitatibus autem magnam cupiditate quos.",
          },
        ],
      },
    ],
  },
  offerCard: {
    id: "offerCard",
    title: "Your offerCard",
    description: "A brief description of your offerCard.",
    background: "",
    blocks: [
      {
        id: "list-1",
        type: "offerCard",
        items: [
          {
            id: "offerCard1",
            type: "offerCard",
            ttl: "Special Offer",
            msg1: "Experience the future of technology with our revolutionary quantum computing solution. Lorem, ipsum dolor sit amet consectetur.",
            msg2: "Use this offer code at checkout:",
            msg3: "10OFF",
            btntxt: "Call Now",
          },
        ],
      },
    ],
  },
};

const { getLocalData, setLocalData } = useLocalStorage();

// Global edit mode via local storage
const isEditMode = computed(() => getLocalData("editMode") === true);

function openEditor() {
  showModal.value = true;
}

function addSection(type) {
  setLocalData("isUserChangedPageData", true);
  modelValue.value.splice(props.index, 0, sectionContent[type]);
  showModal.value = false;
}
</script>
