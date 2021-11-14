<template>
  <div class="feed-page">
    <Header />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '../../store'
import { Header } from '../molecules'

export default defineComponent({
  async beforeMount() {
    document.title = 'Facebook'
    await this.authStore.fetchProfileData()
  },
  components: { Header },
  name: 'Feed',
  setup() {
    const authStore = useAuth()

    return { authStore }
  }
})
</script>

<style lang="scss" scoped></style>
