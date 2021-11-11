<template>
  <div class="auth-box">
    <transition name="auth" mode="out-in">
      <component :is="activeStep" />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LoginStep } from '../molecules'

export default defineComponent({
  components: { LoginStep },
  data() {
    return {
      activeStep: 'LoginStep'
    }
  },
  name: 'AuthBox'
})
</script>

<style lang="scss" scoped>
.auth-box {
  background: $white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 1.6rem;
  padding: 2.4rem;
}
</style>
