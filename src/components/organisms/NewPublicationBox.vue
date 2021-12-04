<template>
  <div class="new-post-box">
    <header class="new-post-box__header">
      <img :src="avatarHandler(getProfile.avatar)" :alt="getProfile.name" />
      <div @click="isPublicationModalOpen = true">
        <span>No que voce esta pensando, {{ firstName }}?</span>
      </div>
    </header>
    <hr />
    <footer class="new-post-box__footer">
      <div>
        <img src="@/assets/icons/svg/video.svg" alt="" />
        <span>Video ao vivo</span>
      </div>
      <div>
        <img src="@/assets/icons/svg/image.svg" alt="" />
        <span>Foto/video</span>
      </div>
      <div>
        <img src="@/assets/icons/svg/mood.svg" alt="" />
        <span>Sentimento/atividade</span>
      </div>
    </footer>
    <NewPublicationModal
      v-show="isPublicationModalOpen"
      @close="isPublicationModalOpen = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { NewPublicationModal } from '@/components/molecules'
import { useAuth } from '@/store'
import { avatarHandler } from '@/utils/avatarHandler'

export default defineComponent({
  components: { NewPublicationModal },
  computed: {
    ...mapState(useAuth, ['getProfile']),
    firstName(): string {
      return this.getProfile.name.split(' ')[0]
    }
  },
  data() {
    return {
      isPublicationModalOpen: false
    }
  },
  methods: { avatarHandler },
  name: 'NewPublicationBox'
})
</script>

<style lang="scss" scoped>
.new-post-box {
  background: $white;
  border-radius: 0.8rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 2.4rem;

  &__header {
    align-items: center;
    display: flex;

    img {
      border-radius: 50%;
      height: 4rem;
      width: 4rem;
    }

    > div {
      background: $background;
      border-radius: 999px;
      cursor: pointer;
      margin-left: 0.8rem;
      padding: 0.8rem 1.6rem;
      transition: filter 300ms;
      width: 100%;

      &:hover {
        filter: brightness(95%);
      }
    }
  }

  > hr {
    display: block;
    margin: 1.2rem 0;
    opacity: 0.3;
  }

  &__footer {
    align-items: center;
    display: flex;
    gap: 0.8rem;
    justify-content: space-between;

    > div {
      align-items: center;
      border-radius: 0.8rem;
      display: flex;
      flex: 1;
      justify-content: center;
      padding: 0.8rem;
      transition: background 300ms;

      &:hover {
        background: $background;
        cursor: pointer;
      }

      span {
        font-size: 1.4rem;
        font-weight: 500;
        margin-left: 0.8rem;
      }
    }
  }
}
</style>
