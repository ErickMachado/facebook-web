<template>
  <Container class="auth-page">
    <div class="auth-page__presentation">
      <img src="../../assets/images/logo.svg" alt="Facebook" />
      <p>
        O Facebook ajuda você a se conectar e compartilhar com as pessoas que
        fazem parte da sua vida.
      </p>
    </div>
    <AuthBox />
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Cookies from 'js-cookie'
import { Container } from '../bosons'
import { AuthBox } from '../organisms'

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    const token = Cookies.get('facebook:token')

    if (token) next({ name: 'feed' })
    else next()
  },
  components: { AuthBox, Container },
  created() {
    document.title = 'Facebook - entre ou cadastre-se'
  },
  data() {
    return {
      email: ''
    }
  },
  name: 'Auth'
})
</script>

<style lang="scss" scoped>
.auth-page {
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 450px;
  height: 100vh;
  width: 100%;

  &__presentation {
    > img {
      width: 250px;
    }

    p {
      font-size: 2.4rem;
      margin-top: 1.6rem;
      max-width: 480px;
    }
  }
}
</style>
