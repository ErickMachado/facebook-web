<template>
  <Container class="not-found">
    <h1>Ops! Parece que essa página não existe</h1>
    <p>
      O link que você seguiu pode estar quebrado ou a página pode ter sido
      removida.
    </p>
    <img src="../../assets/images/not-found.png" alt="" />
    <RouterLink :to="{ name: 'feed' }">
      Voltar para o feed de notícias
    </RouterLink>
  </Container>
</template>

<script lang="ts">
import { Container } from '../bosons'
import { defineComponent } from 'vue'

export default defineComponent({
  beforeMount() {
    document.title = 'Página não encontrada | Facebook'
  },
  components: { Container },
  name: 'NotFound'
})
</script>

<style lang="scss" scoped>
.not-found {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100%;

  > h1 {
    font-size: 2.4rem;
    margin-bottom: 1.6rem;
    text-align: center;
  }

  > p {
    opacity: 0.7;
    text-align: center;
  }

  > img {
    margin: 6.4rem 0;
    width: 250px;
  }

  > a {
    font-size: 1.4rem;
  }
}
</style>
