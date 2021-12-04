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
    <a href="#" @click.prevent="$emit('changeStep', 'RecoverStep')">
      Esqueceu a senha?
    </a>
    <hr />
    <Button
      text="Criar nova conta"
      accent
      @click="$emit('changeStep', 'RegisterStep')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button, InputField } from '@/components/atoms'
import { useAuth } from '@/store'
import { translateError } from '@/utils/errorTranslate'
import { mapActions } from 'pinia'
import { FeedbackTitle, NotificationType } from '@/@types/notification'

export default defineComponent({
  components: { Button, InputField },
  computed: {
    isButtonDisabled(): boolean {
      const { email, password } = this.credentials

      return !email || !password || password.length < 8 || this.isAuthenticating
    }
  },
  data: () => ({
    credentials: {
      email: '',
      password: ''
    },
    isAuthenticating: false
  }),
  methods: {
    ...mapActions(useAuth, ['login']),
    async handleLogin() {
      try {
        await this.login(this.credentials)

        this.$router.push({ name: 'feed' })
      } catch (error) {
        this.$notify({
          title: FeedbackTitle.ERROR,
          text: translateError((error as Error).message),
          type: NotificationType.ERROR
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
  name: 'LoginStep'
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
