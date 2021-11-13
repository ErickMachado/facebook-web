<template>
  <button :class="buttonClasses" @click="$emit('click')">{{ text }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    buttonClasses() {
      return [
        'btn',
        { 'is-primary': this.primary },
        { 'is-accent': this.accent },
        { 'is-danger': this.danger }
      ]
    }
  },
  emits: ['click'],
  name: 'Button',
  props: {
    accent: {
      default: false,
      required: false,
      type: Boolean
    },
    danger: {
      default: false,
      required: false,
      type: Boolean
    },
    primary: {
      default: false,
      required: false,
      type: Boolean
    },
    text: {
      required: true,
      type: String
    }
  }
})
</script>

<style lang="scss" scoped>
.btn {
  align-items: center;
  background: $background;
  border: none;
  border-radius: 999px;
  display: flex;
  font-weight: 500;
  justify-content: center;
  line-height: 1.5;
  padding: 1.6rem;
  transition: all 300ms;
  width: 100%;

  &:not(:disabled):hover {
    filter: brightness(90%);
  }

  &.is-primary {
    background: $primary;
    color: $white;
  }

  &.is-accent {
    background: $accent;
    color: $white;
  }

  &.is-danger {
    background: $danger;
    color: $white;
  }
}
</style>
