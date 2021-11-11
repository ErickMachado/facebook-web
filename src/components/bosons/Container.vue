<template>
  <div class="container">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Container'
})
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 1120px;
  padding: 0 1.5rem;
  width: 100%;
}
</style>
