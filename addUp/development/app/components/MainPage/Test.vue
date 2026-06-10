<template>
  <GenericHeader />
  <div class="container">
    <section class="flex flex-col gap-4 overflow-hidden pt-32 md:pt-20 lg:pt-28 mx-4 pb-9">
      <NewContentTypeWeddingCard2 v-model="weddingCard" />
      <NewContentTypeFancyListingImageCard v-model="days" />
      <!-- <NewContentTypePositiveNegativeList v-model="itemListing" /> -->
      <!-- <ContentTypeMainContentType v-model="offerData" :isBackground="true" :isAdminPage="true"/> -->
    </section>
  </div>
</template>

<script setup>
const offer = ref({
  id: "offerCard1",
  type: "offerCard",
  ttl: "Special Offer",
  msg1: "Experience the future of technology with our revolutionary quantum computing solution. Lorem, ipsum dolor sit amet consectetur.",
  msg2: "Use this offer code at checkout:",
  msg3: "10OFF",
  btntxt: "Call Now",
});
const wedding = ref({
  id: "weddingCard",
  bride: "Aisha Negi",
  groom: "Rahul Negi",
  brideImg: "/images/festival/marriage/2.jpeg",
  groomImg: "/images/festival/marriage/4.jpeg",
  bgImg: "/images/festival/marriage/16.jpeg",
  wedDate: "12 December 2026",
  msg: "With love, joy, and endless happiness",
});
const items = ref({
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
          label: "Listing Title 1",
          text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa ut consectetur amet eveniet odio libero? Ratione corrupti, hic mollitia nobis quae aliquam rem! Tempora reprehenderit necessitatibus autem magnam cupiditate quos.",
        },
        {
          id: "n2",
          label: "Listing Title 2",
          text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa ut consectetur amet eveniet odio libero? Ratione corrupti, hic mollitia nobis quae aliquam rem! Tempora reprehenderit necessitatibus autem magnam cupiditate quos.",
        },
        {
          id: "n3",
          label: "Listing Title 3",
          text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa ut consectetur amet eveniet odio libero? Ratione corrupti, hic mollitia nobis quae aliquam rem! Tempora reprehenderit necessitatibus autem magnam cupiditate quos.",
        },
      ],
    },
  ],
});
const itemListing = ref({
  id: "offerCard",
  label: "Inclusions items",
  items: [
    "Private pool BnB stays for all nights",
    "Self‑drive car (pickup/drop at Cancún Airport, full trip use)",
    "Event tickets: Zamna (RÜFÜS, Keinemusik), Tehmplo (Solomun), Day Zero, Black Coffee",
    "Xcaret Park access",
    "Select pre‑curated experiences & entry guidance",
    "Local on‑ground contact & event coordination support",
  ],
});
const weddingCard = ref({
  wedding: wedding.value,
  listing: itemListing.value,
});
const offerData = ref({
  id: "offerCard",
  title: "Your offerCard",
  description: "A brief description of your offerCard.",
  background: "",
  blocks: [
    {
      id: "list-1",
      type: "offerCard",
      items: [offer.value],
    },
  ],
});
const days = ref([
  {
    title: "Cancún- Arrival & First Dip",
    text: "Private BnB with pool Pick up a self‑drive car from Cancún Airport",
    image: {
      src: "",
      alt: "Burger Shop Logo",
    },
    blocks: [
      {
        label: "Morning",
        items: [
          "Land in Cancún, settle in, brunch by the Caribbean coast.",
          "Chill in your pool or nap off the flight.",
          "Rooftop drinks or optional nightlife at Coco Bongo or Mandala Beach Club.",
        ],
      },
    ],
  },
  {
    title: "Cancún- Arrival & First Dip",
    text: "Private BnB with pool Pick up a self‑drive car from Cancún Airport",
    image: {
      src: "",
      alt: "Burger Shop Logo",
    },
    blocks: [
      {
        label: "Morning",
        items: [
          "Land in Cancún, settle in, brunch by the Caribbean coast.",
          "Chill in your pool or nap off the flight.",
          "Rooftop drinks or optional nightlife at Coco Bongo or Mandala Beach Club.",
        ],
      },
    ],
  },
]);

onMounted(() => {
  const { setLocalData } = useLocalStorage();
  setLocalData("editMode", true);
});
</script>
