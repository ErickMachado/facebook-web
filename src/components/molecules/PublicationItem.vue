<template>
  <li class="publication-item">
    <header class="publication-item__header">
      <div class="publication-item__info">
        <img
          :src="avatarHandler(publication.author.avatar)"
          :alt="publication.author.name"
        />
        <div>
          <h3>{{ publication.author.name }}</h3>
          <div class="publication-item__time">
            <span>{{ formatDate(publication.created_at) }}</span>
          </div>
        </div>
      </div>
      <div v-if="isPublicationOwner" class="publication-item__dropdown">
        <img src="../../assets/icons/svg/more-horizontal.svg" alt="" />
      </div>
    </header>
    <main>
      <div class="publication-item__subtitle">
        <p v-if="publication.subtitle">{{ publication.subtitle }}</p>
      </div>
      <div class="publication-item__image">
        <img v-if="publication.image_url" :src="publication.image_url" alt="" />
      </div>
    </main>
    <div class="publication-item__interactions">
      <div class="publication-item__likes">
        <img src="../../assets/icons/svg/like-reaction.svg" alt="" />
        <span>{{ formatedLikes }}</span>
      </div>
      <div class="publication-item__comments">
        <span>{{ formatedComments }}</span>
      </div>
    </div>
    <hr />
    <div class="publication-item__actions">
      <button :class="{ 'has-liked': hasLiked }" @click="handleLike">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#65676B"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"
          ></path>
        </svg>
        Curtir
      </button>
      <button @click="isCommentsVisible = !isCommentsVisible">
        <img src="../../assets/icons/svg/comment.svg" alt="" />
        Comentar
      </button>
      <button>
        <img src="../../assets/icons/svg/share.svg" alt="" />
        Compartilhar
      </button>
    </div>
    <div v-if="isCommentsVisible" class="publication-item__comment">
      <div class="publication-item__comment-input">
        <img :src="avatarHandler(getProfile.avatar)" :alt="getProfile.name" />
        <div>
          <input
            v-model="commentText"
            type="text"
            placeholder="Escreva um comentário..."
            @keypress.enter="handleCommentCreation"
          />
          <VuemojiPicker
            class="emoji-picker"
            v-if="isEmojiPickerVisible"
            :picker-style="{ emojiSize: '18px' }"
            @emojiClick="handleEmojiSelection"
          />
          <img
            src="../../assets/icons/svg/emoji.svg"
            alt=""
            @click="isEmojiPickerVisible = !isEmojiPickerVisible"
          />
        </div>
      </div>
      <ul class="publication-item__comments-list">
        <li v-for="comment in publication.comments" :key="comment.id">
          <div>
            <img
              :src="avatarHandler(comment.author.avatar)"
              :alt="comment.author.name"
            />
            <div class="publication-item__comment-text">
              <h4>{{ comment.author.name }}</h4>
              <p>{{ comment.text }}</p>
            </div>
          </div>
          <span>{{ formatDate(comment.created_at) }}</span>
        </li>
      </ul>
    </div>
  </li>
</template>

<script lang="ts">
import { formatDistance } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { defineComponent, PropType } from 'vue'
import { Publication } from '../../@types/profile'
import DefaultAvatar from '../../assets/images/default-avatar.jpg'
import { mapState, mapActions } from 'pinia'
import { useAuth, usePublication } from '../../store'
import { VuemojiPicker, EmojiClickEventDetail } from 'vuemoji-picker'

export default defineComponent({
  components: { VuemojiPicker },
  computed: {
    ...mapState(useAuth, ['getProfile']),
    formatedLikes(): string {
      const likesAmount = this.publication.likes.length

      return `${likesAmount} ${this.pluralize(
        likesAmount,
        'curtida',
        'curtidas'
      )}`
    },
    formatedComments(): string {
      const commentsAmount = this.publication.comments.length

      return `${commentsAmount} ${this.pluralize(
        commentsAmount,
        'comentário',
        'comentários'
      )}`
    },
    hasLiked(): boolean {
      const { likes } = this.publication
      const hasProfileId = likes.find(
        ({ author_id }) => author_id === this.getProfile.id
      )

      return !!hasProfileId
    },
    isPublicationOwner(): boolean {
      return this.publication.author_id === this.getProfile.id
    }
  },
  data() {
    return {
      commentText: '',
      isCommentsVisible: false,
      isEmojiPickerVisible: false
    }
  },
  methods: {
    ...mapActions(usePublication, ['comment']),
    ...mapActions(usePublication, ['like']),
    avatarHandler(avatar: { url: string } | null) {
      if (!avatar) return DefaultAvatar
      else return avatar.url
    },
    formatDate(date: string | Date) {
      return formatDistance(new Date(date), new Date(), {
        addSuffix: true,
        locale: ptBR
      })
    },
    handleEmojiSelection({ unicode }: EmojiClickEventDetail) {
      this.commentText += unicode
    },
    async handleCommentCreation() {
      try {
        if (!this.commentText) return

        await this.comment({
          publication_id: this.publication.id,
          text: this.commentText
        })

        this.commentText = ''
      } catch (error) {
        this.$notify({
          title: 'Ops! Algo deu errado',
          text: (error as Error).message,
          type: 'error'
        })
      }
    },
    async handleLike() {
      try {
        await this.like({
          author_id: this.getProfile.id,
          publication_id: this.publication.id
        })
      } catch (error) {
        this.$notify({
          title: 'Ops! Algo deu errado',
          text: (error as Error).message,
          type: 'error'
        })
      }
    },
    pluralize(number: number, singularWord: string, pluralWord: string) {
      if (number === 1) return singularWord
      else return pluralWord
    }
  },
  name: 'PublicationItem',
  props: {
    publication: {
      required: true,
      type: Object as PropType<Publication>
    }
  }
})
</script>

<style lang="scss" scoped>
@keyframes like {
  0% {
    transform: scale(1.3) rotate(-45deg);
    transform-origin: center;
  }

  90% {
    transform: scale(1.3) rotate(-45deg);
    transform-origin: center;
  }

  100% {
    transform: scale(1) rotate(0);
    transform-origin: center;
  }
}

.publication-item {
  background: $white;
  border-radius: 0.8rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  &__header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 1.6rem;
  }

  &__info {
    align-items: center;
    display: flex;

    img {
      border-radius: 50%;
      height: 4rem;
      margin-right: 0.8rem;
      width: 4rem;
    }

    h3 {
      font-size: 1.5rem;
      line-height: 1;
    }
  }

  &__time {
    align-items: center;
    display: flex;
    margin-top: 0.8rem;

    span {
      font-size: 1.4rem;
      opacity: 0.5;
    }
  }

  &__subtitle {
    margin-bottom: 1.6rem;
    padding-left: 1.6rem;
  }

  &__interactions {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 0.8rem;
    padding: 0 1.6rem;
  }

  &__likes {
    align-items: center;
    display: flex;

    > span {
      font-size: 1.4rem;
      line-height: 1;
      margin-left: 0.8rem;
      opacity: 0.5;
    }
  }

  &__comments {
    > span {
      font-size: 1.4rem;
      line-height: 1;
      margin-left: 0.8rem;
      opacity: 0.5;
    }
  }

  hr {
    margin: 1.6rem 0 0.8rem;
    opacity: 0.5;
  }

  &__actions {
    display: flex;
    gap: 0.8rem;
    padding: 0 1.6rem;

    button {
      align-items: center;
      background: none;
      border: none;
      border-radius: 0.8rem;
      color: #65676b;
      display: flex;
      font-size: 1.6rem;
      font-weight: 500;
      flex: 1;
      justify-content: center;
      line-height: 1;
      margin-bottom: 0.8rem;
      padding: 0.8rem;
      transition: background 300ms;

      > img,
      svg {
        margin-right: 0.8rem;
        width: 1.8rem;
      }

      &:hover {
        background: $background;
      }

      &.has-liked {
        color: $primary;
      }

      &.has-liked > svg {
        animation: like 1s forwards;
      }

      &.has-liked > svg > path {
        stroke: $primary;
      }
    }
  }

  &__comment {
    border-top: 1px solid rgba(#000, 0.3);
    padding: 1.6rem 1.6rem 0.8rem;
  }

  &__comment-input {
    align-items: center;
    display: flex;

    img {
      border-radius: 50%;
      height: 4rem;
      width: 4rem;
    }

    > div {
      position: relative;
      width: 100%;

      input {
        background: $background;
        border: none;
        border-radius: 999px;
        margin-left: 0.8rem;
        outline: none;
        padding: 0.6rem 1.6rem;
        width: 100%;
      }

      .emoji-picker {
        position: absolute;
        right: 0;
        z-index: 10;
      }

      > img {
        cursor: pointer;
        position: absolute;
        right: 0.8rem;
        top: -0.1rem;
        width: 2.2rem;
      }
    }
  }

  &__comments-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-top: 2.4rem;

    > li {
      img {
        border-radius: 50%;
        height: 3.2rem;
        width: 3.2rem;
      }

      > div {
        align-items: flex-start;
        display: flex;
      }

      > span {
        font-size: 1.2rem;
        margin-left: 4.2rem;
        opacity: 0.5;
      }
    }
  }

  &__comment-text {
    background: $background;
    border-radius: 0.8rem;
    margin-left: 0.8rem;
    padding: 0.8rem;
    width: max-content;

    > h4 {
      font-size: 1.4rem;
      font-weight: 500;
    }

    > p {
      font-size: 1.4rem;
      margin-top: 0.4rem;
    }
  }
}
</style>
