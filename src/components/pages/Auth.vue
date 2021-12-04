<template>
  <Container class="auth-page">
    <div class="auth-page__presentation">
      <img src="@/assets/images/logo.svg" alt="Facebook" />
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
import { Container } from '@/components/bosons'
import { AuthBox } from '@/components/organisms'

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
  name: 'Auth'
})
</script>

<style lang="scss" scoped>
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(-50px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(50px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.auth-page {
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 450px;
  height: 100vh;
  width: 100%;

  &__presentation {
    animation: fadeInRight 500ms ease forwards;

    > img {
      width: 250px;
    }

    p {
      font-size: 2.4rem;
      margin-top: 1.6rem;
      max-width: 480px;
    }
  }

  .auth-box {
    animation: fadeInLeft 500ms ease backwards;
    animation-delay: 500ms;
  }
}
</style>
