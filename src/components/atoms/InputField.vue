<template>
  <input v-model="value" class="input-field" @input="$emit('input', value)" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      value: ''
    }
  },
  emits: ['input'],
  name: 'InputField'
})
</script>

<style lang="scss" scoped>
.input-field {
  background: transparent;
  border: 1px solid $gray-1;
  border-radius: 999px;
  padding: 1.6rem;
  outline: none;
  transition: box-shadow 200ms;
  width: 100%;

  &::placeholder {
    color: $gray-1;
  }

  &:focus {
    border-color: $primary;
    box-shadow: 0 0 0 3px rgba($primary, 0.2);
  }
}
</style>
