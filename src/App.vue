<template>
  <div>
    <RouterView />
    <notifications position="top right" ignoreDuplicates class="notification" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="scss">
.notification {
  margin-top: 0.8rem;
  margin-right: 0.8rem;
}
</style>
