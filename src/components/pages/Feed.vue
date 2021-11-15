<template>
  <div class="feed-page">
    <Header />
    <div class="feed-page__feed">
      <NewPublicationBox />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '../../store'
import { Header } from '../molecules'
import { NewPublicationBox } from '../organisms'

export default defineComponent({
  async beforeMount() {
    document.title = 'Facebook'
    await this.authStore.fetchProfileData()
  },
  components: { Header, NewPublicationBox },
  name: 'Feed',
  setup() {
    const authStore = useAuth()

    return { authStore }
  }
})
</script>

<style lang="scss" scoped>
.feed-page {
  height: 100vh;

  &__feed {
    display: grid;
    grid-template-columns: 1fr 640px 1fr;
    grid-template-rows: 210px 1fr;
    height: calc(100% - 56px);
  }

  .new-post-box {
    grid-column: 2;
    margin-top: 6.4rem;
  }
}
</style>
