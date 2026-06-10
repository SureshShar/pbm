<template>
  <div class="w-full">
    <label
      :for="name"
      class="text-start mb-1 md:mb-3 block text-base text-gray-400 dark:text-gray-600"
    >
      {{ label }}
    </label>

    <textarea
      :value="modelValue"
      :id="name"
      :name="name"
      :placeholder="placeholder"
      :rows="rows"
      @input="event => modelValue = event.target.value"
      class="dark:text-white dark:shadow-two w-full rounded-sm border bg-white-D1 px-2 md:px-6 py-1 md:py-3 text-base text-black-L2 outline-none border-gray-300 dark:bg-black-L3 dark:focus:shadow-none"
    ></textarea>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: "Your Message",
  },
  name: {
    type: String,
    default: "message",
  },
  placeholder: {
    type: String,
    default: "Enter your message",
  },
  rows: {
    type: Number,
    default: 1,
  },
});

const modelValue = defineModel("modelValue");
</script>

<!-- <script setup>
const message = ref('')
</script>

<template>
<GenericTextAreaInput
v-model=""
class="mb-8"
name="message"
:rows="5"
placeholder="Enter your Message"
label="Your Message"
/>
</template> -->
