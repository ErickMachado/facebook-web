<template>
  <div class="publications-list">
    <ul v-if="publications.length" class="publications-list">
      <PublicationItem
        v-for="publication in publications"
        :key="publication.id"
        :publication="publication"
      />
    </ul>
    <div v-else>
      <img src="@/assets/images/no-publications.svg" alt="" />
      <h2>Nenhuma publicacao pra mostrar</h2>
      <p>Seja o primeiro a publicar algo</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Publication } from '@/@types/profile'
import { PublicationItem } from '@/components/molecules'

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
  ul {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  div {
    img {
      margin: 0 auto;
      max-width: 35rem;
    }

    h2 {
      margin-top: 3.2rem;
      text-align: center;
    }

    p {
      opacity: 0.5;
      text-align: center;
    }
  }
}
</style>
