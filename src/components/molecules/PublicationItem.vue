<template>
  <li class="publication-item">
    <header class="publication-item__header">
      <div class="publication-item__info">
        <img :src="publicationAvatar" :alt="publication.author.name" />
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
      <button>
        <img src="../../assets/icons/svg/like.svg" alt="" />
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
        <img :src="avatar" :alt="getProfile.name" />
        <div>
          <input
            v-model="commentText"
            type="text"
            placeholder="Escreva um comentário..."
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
import { mapState } from 'pinia'
import { useAuth } from '../../store'
import { VuemojiPicker, EmojiClickEventDetail } from 'vuemoji-picker'

export default defineComponent({
  components: { VuemojiPicker },
  computed: {
    ...mapState(useAuth, ['getProfile']),
    avatar(): string {
      const { avatar } = this.getProfile

      return avatar ? avatar.url : DefaultAvatar
    },
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
    isPublicationOwner(): boolean {
      return this.publication.author_id === this.getProfile.id
    },
    publicationAvatar(): string {
      const { avatar } = this.publication.author

      return avatar ? avatar.url : DefaultAvatar
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

      > img {
        margin-right: 0.8rem;
        width: 1.8rem;
      }

      &:hover {
        background: $background;
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
    margin-top: 1.6rem;

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
