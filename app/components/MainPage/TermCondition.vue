<template>
  <GenericHeader />

  <!-- Added background context and min-height -->
  <section class="min-h-screen bg-white-0 dark:bg-black-0 pt-20 lg:pt-28 pb-16 transition-colors duration-300">
    <div class="container px-4 max-w-4xl mx-auto">
      
      <!-- Page Title: Improved contrast and hierarchy -->
      <div class="mb-16 text-center">
        <UniversalH1 :heading="termsData.title" class="text-black-0 dark:text-white-0" />
        <div class="flex items-center justify-center gap-2 mt-4">
          <span class="h-px w-8 bg-primary-1"></span>
          <p class="text-xs md:text-sm font-medium uppercase tracking-widest text-black-4 dark:text-black-5">
            Last Updated: {{ termsData.lastUpdated }}
          </p>
          <span class="h-px w-8 bg-primary-1"></span>
        </div>
      </div>

      <!-- Terms Sections -->
      <div class="space-y-8">
        <UniversalCard
          v-for="(section, index) in termsData.sections"
          :key="index"
          class="group p-6 md:p-8 rounded-2xl border border-white-1 dark:border-black-3 
          bg-white-0 dark:bg-black-1 shadow-one hover:shadow-two transition-all duration-300"
        >
          <!-- Section Heading -->
          <div class="flex items-center gap-5 mb-6">
            <!-- Section Number: Using tertiary with a glow/shadow -->
            <div
              class="flex items-center justify-center w-10 h-10 rounded-xl bg-tertiary text-white font-bold text-lg shrink-0 shadow-lg shadow-tertiary/20"
            >
              {{ index + 1 }}
            </div>

            <UniversalH2
              class="leading-tight text-black-0 dark:text-white-0 group-hover:text-primary transition-colors"
              :heading="section.heading"
            />
          </div>

          <!-- Content: Improved list styling -->
          <ul class="space-y-4 pl-2 md:pl-14">
            <li
              v-for="(item, i) in section.content"
              :key="i"
              class="relative flex gap-3 text-black-3 dark:text-black-5"
            >
              <!-- Custom bullet to match theme -->
              <span class="mt-2 h-1.5 w-1.5 rounded-full bg-primary-2 shrink-0"></span>
              
              <UniversalP class="leading-relaxed">
                <!-- Highlighted text (Emails/Links) -->
                <span
                  v-if="item.includes('@')"
                  class="text-primary-1 dark:text-primary-2 font-semibold underline underline-offset-4 decoration-primary-2/30"
                >
                  {{ item }}
                </span>
                <span v-else>
                  {{ item }}
                </span>
              </UniversalP>
            </li>
          </ul>
        </UniversalCard>
      </div>
    </div>
  </section>
</template>

<script setup>
const termsData = {
  title: "Terms & Conditions",
  lastUpdated: "September 12, 2025",
  sections: [
    {
      heading: "User Responsibility",
      content: [
        "Users are solely responsible for all content, information, and materials they publish, upload, or share on pageby.me.",
        "You agree that any content you create or share represents your views alone.",
        "You must ensure that your content complies with applicable laws, regulations, and third-party rights.",
      ],
    },
    {
      heading: "No Liability for User Content",
      content: [
        "pageby.me does not control, monitor, or endorse user-generated content.",
        "We are not responsible or liable for any content posted by users, including but not limited to text, images, videos, or links.",
        "Any consequences arising from user-generated content remain the sole responsibility of the user who created or published it.",
      ],
    },
    {
      heading: "Prohibited Content",
      content: [
        "Users must not post or share content that violates any laws or regulations.",
        "Content that infringes intellectual property rights of others is prohibited.",
        "Content that is harmful, offensive, defamatory, or misleading is not allowed.",
        "Content that promotes violence, hate speech, or illegal activities is strictly prohibited.",
      ],
    },
    {
      heading: "Rights of pageby.me",
      content: [
        "We reserve the right (but not the obligation) to review, remove, or restrict access to any content that violates these Terms.",
        "We may suspend or terminate accounts that repeatedly breach these conditions.",
      ],
    },
    {
      heading: "Limitation of Liability",
      content: [
        "To the fullest extent permitted by law, pageby.me shall not be held liable for any damages, losses, or claims arising from user-generated content.",
        "Use of our platform is at your own risk.",
      ],
    },
    {
      heading: "Changes to Terms",
      content: [
        "We may update these Terms from time to time.",
        "Continued use of pageby.me after changes are made constitutes your acceptance of the revised Terms.",
      ],
    },
    {
      heading: "Contact Us",
      content: [
        "If you have any questions regarding these Terms, please contact us at:",
        "suresh.sharma510@gmail.com",
      ],
    },
  ],
};
</script>