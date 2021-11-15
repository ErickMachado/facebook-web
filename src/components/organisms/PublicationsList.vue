<template>
  <ul class="publications-list">
    <PublicationItem
      v-for="publication in publications"
      :key="publication.id"
      :publication="publication"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Publication } from '../../@types/profile'
import { PublicationItem } from '../molecules'

export default defineComponent({
  components: { PublicationItem },
  name: 'PublicationsList',
  props: {
    publications: {
      required: true,
      type: Array as PropType<Publication[]>
    }
  }
})
</script>

<style lang="scss" scoped>
.publications-list {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}
</style>
