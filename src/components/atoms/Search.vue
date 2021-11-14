<template>
  <div class="search">
    <img src="../../assets/icons/svg/search.svg" alt="" />
    <input type="search" placeholder="Pesquisar no Facebook" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Search'
})
</script>

<style lang="scss" scoped>
.search {
  background: $background;
  border-radius: 999px;
  height: 4rem;
  position: relative;
  width: 100%;

  > img {
    bottom: 50%;
    left: 1.6rem;
    position: absolute;
    transform: translate3d(0, -50%, 0);
    top: 50%;
    width: 1.8rem;
  }

  > input {
    background: transparent;
    border: none;
    height: 100%;
    left: 4rem;
    outline: none;
    position: absolute;
    top: 0;
    width: calc(100% - 6rem);
  }
}
</style>
