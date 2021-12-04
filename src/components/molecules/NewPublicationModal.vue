<template>
  <div @click.self="handleCloseModal" class="new-publication-modal">
    <div class="new-publication-modal__modal">
      <header>
        <h2>Criar publicação</h2>
        <div @click="handleCloseModal">
          <img src="@/assets/icons/svg/close.svg" alt="" />
        </div>
      </header>
      <hr />
      <main>
        <div class="new-publication-modal__profile">
          <img :src="avatarHandler(getProfile.avatar)" :alt="getProfile.name" />
          <p>{{ getProfile.name }}</p>
        </div>
        <div class="new-publication-modal__textarea">
          <textarea
            v-model="publicationSubtitle"
            :placeholder="`No que voce esta pensando, ${firstName}?`"
          ></textarea>
        </div>
        <div
          v-show="isImagePreviewOpen"
          class="new-publication-modal__preview-container"
        >
          <div class="new-publication-modal__preview">
            <div @click="isImagePreviewOpen = false">
              <img src="@/assets/icons/svg/close.svg" alt="" />
            </div>
            <p>Adicione uma imagem</p>
            <span>Ou arraste e solte</span>
            <input
              type="file"
              ref="publicationImageInput"
              @input="handlePublicationImagePreview"
            />
            <img v-show="imagePreviewURL" :src="imagePreviewURL" alt="" />
          </div>
        </div>
        <div class="new-publication-modal__file">
          <h3>Adicionar a sua publicacao</h3>
          <ul>
            <li @click="isImagePreviewOpen = true">
              <img src="@/assets/icons/svg/image.svg" alt="" />
            </li>
            <li>
              <img src="@/assets/icons/svg/mood.svg" alt="" />
            </li>
          </ul>
        </div>
        <Button
          text="Publicar"
          primary
          :disabled="(!imagePreviewURL && !publicationSubtitle) || isPublishing"
          @click="handlePublicationSubmit"
        />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth, usePublication } from '@/store'
import { Button } from '@/components/atoms'
import { avatarHandler } from '@/utils/avatarHandler'
import { mapActions, mapState } from 'pinia'

export default defineComponent({
  computed: {
    ...mapState(useAuth, ['getProfile']),
    firstName() {
      return this.getProfile.name.split(' ')[0]
    }
  },
  components: { Button },
  data: () => ({
    isImagePreviewOpen: false,
    isPublishing: false,
    publicationImageBlob: {} as File | null,
    imagePreviewURL: '',
    publicationSubtitle: ''
  }),
  methods: {
    ...mapActions(usePublication, ['publish']),
    avatarHandler,
    handlePublicationImagePreview() {
      this.publicationImageBlob = (
        this.$refs.publicationImageInput as HTMLInputElement
      ).files![0]

      this.imagePreviewURL = URL.createObjectURL(this.publicationImageBlob)
    },
    async handlePublicationSubmit() {
      try {
        this.isPublishing = true

        const formData = new FormData()

        formData.append('subtitle', this.publicationSubtitle)
        formData.append('image', this.publicationImageBlob || '')

        await this.publish(formData)

        this.handleCloseModal()
      } catch (error) {
        this.$notify({
          title: 'Ops! Algo deu errado',
          text: (error as Error).message,
          type: 'error'
        })
      } finally {
        this.isPublishing = false
      }
    },
    handleCloseModal() {
      this.isImagePreviewOpen = false
      this.imagePreviewURL = ''
      this.publicationSubtitle = ''
      this.$emit('close')
    }
  },
  name: 'NewPublicationModal'
})
</script>

<style lang="scss" scoped>
.new-publication-modal {
  align-items: center;
  background: rgba($white, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;

  &__modal {
    background: $white;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 0.8rem;
    min-width: 450px;
    padding-bottom: 2.4rem;

    header {
      padding: 2.4rem;
      position: relative;

      h2 {
        font-size: 2rem;
        text-align: center;
      }

      > div {
        align-items: center;
        background: $background;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        height: 3.2rem;
        justify-content: center;
        position: absolute;
        right: 0.8rem;
        transition: background 300ms;
        top: 0.8rem;
        width: 3.2rem;

        &:hover {
          background: $gray-1;
        }
      }
    }

    hr {
      opacity: 0.3;
    }

    main {
      margin-top: 2.4rem;
      padding: 0 2.4rem;
    }
  }

  &__profile {
    align-items: center;
    display: flex;

    > img {
      border-radius: 50%;
      height: 4rem;
      width: 4rem;
    }

    p {
      font-size: 1.4rem;
      font-weight: 500;
      margin-left: 0.8rem;
    }
  }

  &__textarea {
    margin-top: 1.6rem;
    height: 5rem;
    width: 100%;

    > textarea {
      border: none;
      height: 100%;
      outline: none;
      padding: 0.8rem;
      resize: none;
      width: 100%;
    }
  }

  &__preview-container {
    border: 1px solid $gray-1;
    border-radius: 0.8rem;
    height: 25rem;
    margin: 0.8rem 0;
    padding: 0.8rem;
    width: 100%;
  }

  &__preview {
    align-items: center;
    background: $background;
    border-radius: 0.8rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    overflow: hidden;
    position: relative;
    transition: filter 300ms;
    width: 100%;

    &:hover {
      filter: brightness(95%);
    }

    > div {
      align-items: center;
      background: $background;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      height: 3.2rem;
      justify-content: center;
      position: absolute;
      right: 0.8rem;
      transition: background 300ms;
      top: 0.8rem;
      width: 3.2rem;
      z-index: 10;

      &:hover {
        background: $gray-1;
      }
    }

    > span {
      font-size: 1.4rem;
      opacity: 0.5;
    }

    > input {
      cursor: pointer;
      height: 100%;
      left: 0;
      opacity: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 8;
    }

    > img {
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 9;
    }
  }

  &__file {
    align-items: center;
    border: 1px solid $gray-1;
    border-radius: 0.8rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.6rem;
    padding: 0.8rem;

    > h3 {
      font-size: 1.4rem;
      font-weight: 500;
      max-width: 15rem;
    }

    ul {
      display: flex;
      gap: 0.8rem;

      li {
        align-items: center;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        height: 4rem;
        justify-content: center;
        position: relative;
        transition: background 300ms;
        width: 4rem;

        &:hover {
          background: $background;
        }
      }
    }
  }

  .btn {
    padding: 0.8rem 0;
  }
}
</style>
