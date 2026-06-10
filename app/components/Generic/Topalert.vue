<template>
  <Teleport to="#teleports">
    <div class="fixed top-5 right-1 z-[99999] space-y-2">
      <TransitionGroup
        name="slideIn"
        tag="div"
        class="space-y-2"
      >
        <div
          v-for="alert in alerts"
          :key="alert.id"
          class="flex items-center w-full max-w-sm p-2 md:p-4 rounded-lg shadow"
          :class="containerClass"
          role="alert"
        >
          <!-- Icon -->
          <div
            class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg"
            :class="getIconWrapperClass(alert.type)"
          >
            <component :is="getIconComponent(alert.type)" class="w-5 h-5" />
            <span class="sr-only">{{ alert.type }} icon</span>
          </div>

          <!-- Message -->
          <div class="ml-3 text-sm font-normal">
            {{ alert.message }}
          </div>

          <!-- Close button -->
          <button
            type="button"
            @click="removeAlert(alert.id)"
            class="ml-auto -mx-1.5 -my-1.5 p-1.5 inline-flex items-center justify-center h-8 w-8 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-700"
            aria-label="Close"
          >
            <span class="sr-only">Close</span>
            <SvgIconsCross class="w-6 h-6" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import SvgIconsCross from '@/components/SvgIcons/Cross.vue'
import SvgIconsCheckCircle from '@/components/SvgIcons/CheckCircle.vue'
import SvgIconsCircleCross from '@/components/SvgIcons/CircleCross.vue'
import SvgIconsCircleExclamation from '@/components/SvgIcons/CircleExclamation.vue'

const containerClass = 'bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400'
const { alerts, removeAlert } = useLocalStorage()

function getIconComponent(type) {
  return {
    success: SvgIconsCheckCircle,
    error: SvgIconsCircleCross,
    warning: SvgIconsCircleExclamation
  }[type]
}

function getIconWrapperClass(type) {
  return {
    success: 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200',
    error: 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200',
    warning: 'text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200'
  }[type]
}
</script>
