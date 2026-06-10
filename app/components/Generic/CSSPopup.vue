<template>
  <div class="container">
    <div class="relative group">
      <!-- <a
          class="flex items-center justify-center gap-2 bg-white/20 rounded-full overflow-hidden p-2"
        >
          <img
            src="/images/agent-girl.webp"
            alt="phone icon"
            class="inline rounded-full"
            width="32"
          />
          <span class="mb-0 flex gap-3 text-[1.25rem]">
            <span class="text-tdv-tertiary font-mont_bold"> Llámenos: </span>
            <span class="text-tdv-quaternary font-mont_bold pe-4">{{
              contactNumber
            }}</span>
          </span>
        </a> -->
      <slot name="main"></slot>

      <!-- Tooltip -->
      <div
        class="tooltip-feature bg-white p-4 rounded-lg w-full absolute top-16 left-[-4rem] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out shadow-lg"
      >
        <slot name="tooltip"></slot>

        <!-- <div class="text-xl font-mont_semibold">
            Ventajas de reservar con un agente.
          </div>
          <div class="flex gap-6 mt-2">
            <div class="flex flex-col gap-2">
              <div class="point-wrap flex items-center gap-2">
                <SvgLogoTickMark class="text-tdv-quaternary" />
                <div class="font-mont">Ofertas disponibles solo para llamar</div>
              </div>
              <div class="flex items-center gap-2">
                <SvgLogoTickMark class="text-tdv-quaternary" />
                <div class="font-mont">Cambios gratuitos dentro de 24 horas</div>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <SvgLogoTickMark class="text-tdv-quaternary" />
                <div class="font-mont">Asistencia personalizada en viajes</div>
              </div>
              <div class="flex items-center gap-2">
                <SvgLogoTickMark class="text-tdv-quaternary" />
                <div class="font-mont">Asistencia de agente en español</div>
              </div>
            </div>
          </div> -->
      </div>
    </div>
  </div>
</template>
