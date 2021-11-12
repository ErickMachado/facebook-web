<template>
  <div class="login-step">
    <form @submit.prevent="handleLogin">
      <InputField
        type="email"
        placeholder="E-mail cadastrado"
        @input="setEmail"
      />
      <InputField type="password" placeholder="Senha" @input="setPassword" />
      <Button text="Entrar" primary :disabled="isButtonDisabled" />
    </form>
    <a href="#" @click.prevent>Esqueceu a senha?</a>
    <hr />
    <Button text="Criar nova conta" accent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button, InputField } from '../atoms'
import { useAuth } from '../../store'
import { translateError } from '../../utils/errorTranslate'

export default defineComponent({
  components: { Button, InputField },
  computed: {
    isButtonDisabled(): boolean {
      const { email, password } = this.credentials

      return !email || !password || password.length < 8 || this.isAuthenticating
    }
  },
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      isAuthenticating: false
    }
  },
  methods: {
    async handleLogin() {
      try {
        await this.auth.login(this.credentials)

        this.$router.push({ name: 'feed' })
      } catch (error) {
        this.$notify({
          title: 'Algo deu errado 😵‍💫',
          text: translateError((error as Error).message),
          type: 'error'
        })
      }
    },
    setEmail(email: string) {
      this.credentials.email = email
    },
    setPassword(password: string) {
      this.credentials.password = password
    }
  },
  name: 'LoginStep',
  setup() {
    const auth = useAuth()

    return { auth }
  }
})
</script>

<style lang="scss" scoped>
.login-step {
  form {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  a {
    font-size: 1.4rem;
    margin: 1.6rem auto 0;
  }

  hr {
    display: block;
    margin: 2.4rem 0;
    opacity: 0.5;
    width: 100%;
  }
}
</style>
