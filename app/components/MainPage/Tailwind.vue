<template>
  <GenericHeader />
  <div class="container flex flex-col gap-6 px-6 py-20">
    <!-- Colors -->
    <h2 class="text-xl font-bold mb-3 dark:text-bglight">🎨 Colors Showcase</h2>

    <div class="w-full bg-[#006272] text-bglight p-4 rounded shadow">primary</div>
    <div class="w-full bg-[#0092AA] text-bgblack p-4 rounded shadow">primary-1</div>
    <div class="w-full bg-[#00EFD8] text-bgblack p-4 rounded shadow">primary-P2</div>
    <div class="w-full bg-[#E0FF00] text-bgblack p-4 rounded shadow">secondary</div>
    <div class="w-full bg-[#FF6700] text-bgblack p-4 rounded shadow">tertiary</div>

    <!-- <div class="w-full bg-black-L1 text-bglight p-4 rounded shadow">gray-dark</div> -->
    <div class="w-full bg-bgblack text-bglight p-4 rounded shadow">bgblack (Dark theme background)</div>
    <div class="w-full bg-black-L1 text-bglight p-4 rounded shadow">black-L1</div>
    <div class="w-full bg-black-L2 text-bglight p-4 rounded shadow">black-L2</div>
    <div class="w-full bg-black-L3 text-bglight p-4 rounded shadow">black-L3</div>
    <div class="w-full bg-black-L4 text-bglight p-4 rounded shadow">black-L4</div>
    <div class="w-full bg-black-L5 text-bglight p-4 rounded shadow">black-L5</div>

    <div class="w-full bg-bglight text-bgblack p-4 rounded shadow">bglight (light theme background)</div>
    <div class="w-full bg-white-D1 text-bgblack p-4 rounded shadow">white-D1</div>
    <div class="w-full bg-white-D2 text-bgblack p-4 rounded shadow mb-6">white-D2</div>

    <div class="w-full dark:text-bglight p-4 rounded shadow">**currentColor (i.e. take color same with text color) <span class="w-full bg-current text-bglight">currentColor (i.e.take same with text color)</span></div>
    <div class="w-full bg-transparent text-bgblack p-4 rounded shadow"><span class="text-bgblack dark:text-bglight">**transparent (i.e. take color as background)</span></div>
    <div class="w-full bg-[#E0E0E0] text-bgblack p-4 rounded shadow">Background TDV</div>

    <!-- Shadows -->
    <h2 class="text-xl font-bold mb-3 p-6 dark:text-bglight">🌑 Shadows Showcase</h2>

    <div class="w-full p-4 rounded shadow-signUp">shadow-signUp</div>
    <div class="w-full p-4 rounded shadow-submit">shadow-submit</div>
    <div class="w-full p-4 rounded shadow-submit-dark">shadow-submit-dark</div>
    <div class="w-full p-4 rounded shadow-feature-2">shadow-feature-2</div>
    <div class="w-full p-4 rounded shadow-one">shadow-one</div>
    <div class="w-full p-4 rounded shadow-two">shadow-two</div>
    <div class="w-full p-4 rounded shadow-three">shadow-three</div>
    <div class="w-full p-4 rounded shadow-btn">shadow-btn</div>
    <div class="w-full p-4 rounded shadow-btn-hover">shadow-btn-hover</div>
    <div class="w-full p-4 rounded shadow-btn-light">shadow-btn-light</div>
    <div class="w-full p-4 rounded shadow-sticky">shadow-sticky (i.e. only visible in day theme)</div>
    <div class="w-full p-4 rounded shadow-sticky-dark">shadow-sticky-black-L2 (i.e. only visible in dark theme)</div>

    <!-- Drop Shadow -->
    <h2 class="text-xl font-bold mb-3 p-6 dark:text-bglight">💧 Drop Shadows</h2>
    
    <div class="w-full p-4 rounded drop-shadow-three">drop-shadow-three</div>
  </div>
</template>
