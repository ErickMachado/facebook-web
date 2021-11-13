<template>
  <div class="recover-step">
    <header>
      <h1>Encontre sua conta</h1>
      <p>Insira seu email ou número de celular para procurar a sua conta.</p>
    </header>
    <form @submit.prevent>
      <InputField
        type="email"
        placeholder="E-mail cadastrado"
        @input="setEmail"
      />
      <Button text="Recuperar acesso" primary :disabled="!email" />
    </form>
    <Button text="Cancelar" @click="$emit('back', 'LoginStep')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button, InputField } from '../atoms'

export default defineComponent({
  components: { Button, InputField },
  data() {
    return {
      email: ''
    }
  },
  emits: ['back'],
  methods: {
    setEmail(email: string) {
      this.email = email
    }
  },
  name: 'Recover'
})
</script>

<style lang="scss" scoped>
.recover-step {
  header {
    h1 {
      font-size: 2.4rem;
    }

    p {
      margin-top: 0.4rem;
      opacity: 0.7;
    }
  }

  > .btn {
    margin-top: 1.6rem;
  }

  > form {
    margin-top: 2.4rem;
    > .btn {
      margin-top: 1.6rem;
    }
  }
}
</style>
