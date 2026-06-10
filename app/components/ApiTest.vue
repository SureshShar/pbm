<template>
  <button @click="testApi">Test Button</button>
</template>

<script setup>
const pageId = "suresh";
const authToken = "e1d8691c-0538-4bed-90e8-e127d4be7e16";
const apiType = 1;

async function testApi() {
    if (apiType === 1) {
        try {
          const response = await useApi("userAsset/getAll", {
            pageId,
            authToken,
          });
          console.log("API Response:", response);
        } catch (error) {
          console.error("API Error:", error);
        }
    } else if (apiType === 2) {
        try {
          const response = await useApi("userAsset/getAll", {
            pageId,
            authToken,
          });
          console.log("API Response:", response);
        } catch (error) {
          console.error("API Error:", error);
        }
    }
}
</script>
