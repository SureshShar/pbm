export const categoryMap = {
  // Portfolio
  student_विद्यार्थी: "student",
  advocate_वकील: "student",
  teacher_शिक्षक: "student",

  // Shop
  teaShop_चाय_की_दुकान: "chaySutta",
  vegetableShop_सब्जी_की_दुकान: "vegetableShop",
  dhabaHotelHindi_ढाबा_होटल: "dhabaHotelHindi",
  electricShop_इलेक्ट्रिक_दुकान: "electricShop",
  mobileShop_मोबाइल_दुकान: "mobileShop",
  generalStore_जनरल_स्टोर: "generalStore",
  juiceShop_जूस_सेंटर: "juiceCenter",
  makeUpShop_मेकअप_दुकान: "makeUpShop",
  momosShop_मोमोज़_दुकान: "momosShop",
  restaurant_रेस्टोरेंट: "restaurants",
  clothShop_कपड़ों_की_दुकान: "clothShop",
  dressShop_ड्रेस_दुकान: "clothShop",
  bakeryShop_बेकरी_दुकान: "bakeryShop",
  cakeShop_केक_दुकान: "bakeryShop",
  iceCreamShop_आइसक्रीम_दुकान: "iceCreamShop",
  paniPuriShop_पानीपुरी_दुकान: "paniPuriShop",
  burgerPizzaShop_बर्गर_दुकान: "burgerPizzaShop",
  riceShop_चावल_दुकान: "riceShop",
  animalFood_पशु_आहार: "animalFood",
  teaMashala_चाय_मसाला: "teaMashala",
  gentsSalon_जेंट्स_सैलून: "gentsSalon",
};

export const contentEnum = {
  blockItemType: [
    "tagsCard", // Tags card exapmle skill or attach google drive resources
    "titleCard", // title card example notice board card (title, text, create date)
    "imageTitle", // image with title exaple attach holiday image
    "socialLink", // social link
    "message", // Telegram message box
    "cartItem", // cart item add any item with price
  ],
  platform: [
    "facebook",
    "twitter",
    "youtube",
    "instagram",
    "linkedin",
    "github",
    "telegram",
    "whatsapp",
    "email",
    "Wikipedia",
  ],
  defaultPlatformUrls: {
    facebook: "https://facebook.com/username",
    twitter: "https://twitter.com/username",
    youtube: "https://youtube.com/@username",
    instagram: "https://instagram.com/username",
    linkedin: "https://linkedin.com/in/username",
    github: "https://github.com/username",
    email: "https://mailto:youremail@gmail.com",
    whatsapp: "https://wa.me/9367474839",
    telegram: "https://t.me/@yourTelegramUsername",
    wikipedia: "https://en.wikipedia.org/wiki/YourName",
  },
  aboutItems: ["imageCard", "blog"],
  tone: ["light", "dark"],
  cartItemSize: ["full", "half", "unit"],
  options: [
    { value: "full", label: "Full plate" },
    { value: "half", label: "Half plate" },
    { value: "kg", label: "Per Kg" },
    { value: "gm", label: "Per Gram" },
    { value: "unit", label: "Per unit" },
  ],
  cartItemsOptions: [
    { value: "veg", label: "Veg" },
    { value: "non-veg", label: "Non-Veg" },
    { value: "boy", label: "Boy" },
    { value: "girl", label: "Girl" },
    { value: "child", label: "Child" },
  ],
  cartItems: {
    food: {
      type: ["veg", "non-veg"],
      category: [
        "pizza",
        "chapati",
        "curry",
        "starters",
        "dessert",
        "drink",
        "chaap",
        "soup",
        "thali",
        "salad",
        "snacks",
        "chinese",
        "mainCourse",
      ],
      // categoryNonveg: ["fish", "chicken", "mutton", "egg", "seafood"],
    },
    vegetabFruit: {
      type: ["veg"],
      category: [
        "fruit",
        "vegetable",
        "leafy",
        "beans",
        "root",
        "seasonal",
        "dailyUse",
        "mushroom",
      ],
    },
    grocery: {
      type: "",
      category: [
        "toile",
        "kitchen",
        "bathroom",
        "stationery",
        "cleaning",
        "milk",
      ],
    },
    stationery: {
      type: "",
      category: ["pen", "pencil", "notebook"],
    },
  },
  categoryWiseSectionBlockTypes: {
    student: ["tagsCard", "titleCard", "imageTitle", "message", "socialLink"],
    school: ["tagsCard", "titleCard", "imageTitle", "message", "socialLink"],
    college: ["tagsCard", "titleCard", "imageTitle", "message", "socialLink"],
    shop: ["cartItem", "imageTitle", "message", "socialLink"],
  },
  availableStatusOptions: [
    { value: "open", label: "Open now (खुला)" },
    { value: "closed", label: "Closed now (बंद)" },
    { value: "hide_status", label: "Hide this button (छुपाएं)" },
  ],
  itemLayoutOptions: [
    { value: "with_image", label: "With image (छवि के साथ)" },
    { value: "without_image", label: "Without image (छवि के बिना)" },
  ],
};

export const contentTypes = {
  header: {
    id: "",
    title: "Name",
    image: { src: "/images/avatar.svg", alt: "Avatar" }, // assign image url firom login
    // available: true,
  },
  heroSection: {
    id: "",
    title: "Title message",
    text: "Description message",
    image: { src: "", alt: "Hero section image (1000*700 belo 50 kb)" }, //
    resumeLink: "", // google drive resume link
    location: "https://www.google.com/maps/place/Red+Fort/@28.6584636,77.2204297,6527m",
    timing: "Feel free to call or message me between 7 AM and 10 PM. I’m always happy to assist you with your orders.",
    address: "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  // aiImage: {
  //   id: "ai",
  //   hide: false,
  //   title: "Chat with the Real Me",
  //   text: "Think of me as your friend here—I’ll answer just like if we were having a real conversation. Ask me anything about coding, life, or my experiences!",
  //   trainingData: {
  //     tone: "friendly, helpful, curious",
  //     category: "Student, Developer",
  //     userName: "suresh",
  //     age: 21,
  //     location: "Delhi, India",
  //     hobby: "coding, playing chess, cricket",
  //     likes: "JavaScript, AI projects, open-source",
  //     dislikes: "bugs in code, slow internet, trafic noise",
  //     skill: "Vue.js, Nuxt, Tailwind CSS, Python",
  //     goals: "become a full stack developer",
  //     extra: "write deatail you wannt to share with users",
  //   },
  // },
  tagsCard: { id: "", type: "tagsCard", label: "Html", resource: "" },
  // Card type for notice board
  titleCard: {
    id: "",
    type: "titleCard",
    label: "Card title",
    text: "Card description comes here.",
    createDate: "4567778", // Date in milliseconds
    resource: "",
  },
  // For gallary images as crousal
  imageTitle: {
    id: "",
    type: "imageTitle",
    label: "Picnic image",
    image: { src: "", alt: "Picnic image" },
  },
  // Used to make footer links
  socialLink: {
    id: "s3",
    image: {
      src: "/images/socialMedia/4.svg",
      alt: "whatsapp",
    },
    href: "https://wa.me/910000000000",
  },
  imageCard: {
    id: "",
    hide: false,
    type: "imageCard",
    title: "Add blog title here",
    text: "Here is all you blog information. Yuo change it according to your need",
    image: { src: "", alt: "Image card" },
  },
  // Blog type for blog section
  blog: {
    id: "",
    type: "blog",
    title: "Add blog title here",
    image: { src: "/images/background/5.jpg", alt: "Blog image" },
    paragraphs: [
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Velit iure assumenda quod similique.",
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Velit iure assumenda quod similique.",
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Velit iure assumenda quod similique.",
    ],
  },
  message: {
    id: "",
    hide: false,
    unique: true,
    type: "message",
  },
  cartItem: {
    id: "",
    hide: false,
    type: "Cart item type",
    isVeg: true,
    itemType: "savory/sweet/fresh/cold",
    category: "bread/dessert/snack/bakery/",
    title: "Item name आइटम का नाम",
    srtdsc: "Item description आइटम का विवरण",
    costs: [
      { size: "1kg", price: 200 },
      { size: "2kg", price: 300 },
    ],
    image: { src: "", alt: "item image" },
  },
  extra: {
    cartLabel: "Your flat number",
    hideVegNonVegIcon: true,
  },
};

/**
 * Use it as givenn below
  onMounted(async () => {
    const { categoryWisePageData } = await import("@/utils/standard/constants.js");
    console.log(categoryWisePageData);
  });
*/
