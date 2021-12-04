<template>
  <ul class="stories-list">
    <StorieItem :profile="getProfile" />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { StorieItem } from '@/components/molecules'
import { mapState } from 'pinia'
import { useAuth } from '@/store'

export default defineComponent({
  components: { StorieItem },
  computed: {
    ...mapState(useAuth, ['getProfile'])
  },
  name: 'StoriesList'
})
</script>

<style lang="scss" scoped>
.stories-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 120px);
  grid-auto-flow: column;
  grid-auto-columns: 120px;
  gap: 0.8rem;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
