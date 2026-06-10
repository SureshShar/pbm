<template>
  <section id="contact" class="overflow-hidden mx-4">
    <div class="container">
      <!-- <UniversalCard>
        <UniversalH2 class="mb-3">
          Welcome Back, Admin
          <span class="text-base block">वापस स्वागत है, एडमिन</span>
        </UniversalH2>

        <div class="flex flex-wrap gap-4 md:gap-6 mt-4">
          <UniversalButton
            heading="Login"
            @clicked="
              emit('show-login-form');
              scrollToForm();
            "
          />
        </div>
      </UniversalCard> -->

      <UniversalCard>
        <UniversalH2 class="mb-3">
          Create a new account
          <span class="text-base block"
            >स्वागत है, उपयोगकर्ता। नया खाता बनाएं।</span
          >
        </UniversalH2>

        <div class="flex flex-wrap gap-4 md:gap-6 mt-4">
          <UniversalButton
            heading="Create user"
            @clicked="emit('show-signup-form')"
          />
        </div>
      </UniversalCard>
    </div>
  </section>
</template>

<script setup>
const emit = defineEmits(["show-signup-form"]);

// function scrollToForm() {
//   setTimeout(() => {
//     scrollToId("login_form");
//   }, 500);
// }
</script>
