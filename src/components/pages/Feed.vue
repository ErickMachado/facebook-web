<template>
  <div class="feed-page">
    <Header />
    <div class="feed-page__feed">
      <StoriesList />
      <NewPublicationBox />
      <PublicationsList :publications="getPublications" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '../../store'
import { Header } from '../molecules'
import { NewPublicationBox, PublicationsList, StoriesList } from '../organisms'
import { mapActions, mapState } from 'pinia'
import { usePublication } from '../../store'

export default defineComponent({
  async beforeMount() {
    document.title = 'Facebook'
    await this.fetchProfileData()
    await this.fetchAllPublications()
  },
  components: { Header, NewPublicationBox, PublicationsList, StoriesList },
  computed: {
    ...mapState(usePublication, ['getPublications'])
  },
  methods: {
    ...mapActions(usePublication, ['fetchAllPublications']),
    ...mapActions(useAuth, ['fetchProfileData'])
  },
  name: 'Feed'
})
</script>

<style lang="scss" scoped>
.feed-page {
  &__feed {
    display: grid;
    grid-template-columns: 1fr 640px 1fr;
    grid-template-rows: 250px 180px 1fr;
    height: calc(100% - 56px);
    padding-bottom: 2.4rem;
  }
  .stories-list {
    grid-column: 2;
    margin-top: 3.2rem;
  }

  .new-post-box {
    grid-column: 2;
    grid-row: 2;
    margin-top: 3.2rem;
  }

  .publications-list {
    grid-column: 2;
    grid-row: 3;
    margin-top: 3.2rem;
  }
}
</style>
