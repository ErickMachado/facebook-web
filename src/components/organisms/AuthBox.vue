<template>
  <div class="auth-box">
    <transition name="auth" mode="out-in">
      <component :is="activeStep" @changeStep="changeStep" @back="changeStep" />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LoginStep, RecoverStep, RegisterStep } from '../molecules'

export default defineComponent({
  components: { LoginStep, RecoverStep, RegisterStep },
  data() {
    return {
      activeStep: 'LoginStep'
    }
  },
  methods: {
    changeStep(componentName: string) {
      this.activeStep = componentName
    }
  },
  name: 'AuthBox'
})
</script>

<style lang="scss" scoped>
.auth-enter,
.auth-leave-to {
  opacity: 0;
  transform: translate3d(30px, 0, 0);
}

.auth-enter-active,
.auth-leave-active {
  transition: all 300ms;
}

.auth-box {
  background: $white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 1.6rem;
  padding: 2.4rem;
}
</style>
