<template>
  <div class="register-step">
    <header>
      <h1>Crie sua conta</h1>
      <p>É rápido e fácil.</p>
    </header>
    <form @submit.prevent="handleRegistration">
      <InputField type="text" placeholder="Nome completo" @input="setName" />
      <InputField
        type="text"
        placeholder="Nome de usuário"
        @input="setUsername"
      />
      <InputField
        type="email"
        placeholder="Seu melhor e-mail"
        @input="setEmail"
      />
      <InputField
        type="password"
        placeholder="Crie uma senha"
        @input="setPassword"
      />
      <Button text="Criar conta" primary :disabled="isButtonDisabled" />
    </form>
    <Button text="Cancelar" @click="$emit('back', 'LoginStep')" />
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
      const { email, name, password, username } = this.user

      return (
        !email ||
        !name ||
        !password ||
        password.length < 8 ||
        !username ||
        this.isRegistering
      )
    }
  },
  data() {
    return {
      user: {
        email: '',
        name: '',
        password: '',
        username: ''
      },
      isRegistering: false
    }
  },
  methods: {
    async handleRegistration() {
      try {
        this.isRegistering = true

        await this.authStore.register(this.user)

        this.$emit('back', 'LoginStep')
      } catch (error) {
        this.$notify({
          title: 'Ops, algo deu errado',
          text: translateError((error as Error).message),
          type: 'error'
        })
      } finally {
        this.isRegistering = false
      }
    },
    setEmail(email: string) {
      this.user.email = email
    },
    setName(name: string) {
      this.user.name = name
    },
    setPassword(password: string) {
      this.user.password = password
    },
    setUsername(username: string) {
      this.user.username = username
    }
  },
  name: 'RegisterStep',
  setup() {
    const authStore = useAuth()

    return { authStore }
  }
})
</script>

<style lang="scss" scoped>
.register-step {
  header {
    h1 {
      font-size: 2.4rem;
    }

    p {
      margin-top: 0.4rem;
      opacity: 0.7;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    margin-top: 2.4rem;
  }

  > .btn {
    margin-top: 1.6rem;
  }
}
</style>
