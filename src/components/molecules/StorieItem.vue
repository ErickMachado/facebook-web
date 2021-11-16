<template>
  <li class="storie-item">
    <img :src="avatarHandler(profile.avatar)" :alt="profile.name" />
    <div class="storie-item__overlay">
      <button>
        <img src="../../assets/icons/svg/plus.svg" alt="" />
      </button>
      <span>Criar story</span>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Profile } from '../../@types/profile'
import DefaultAvatar from '../../assets/images/default-avatar.jpg'

export default defineComponent({
  methods: {
    avatarHandler(avatar: { url: string } | null) {
      if (!avatar) return DefaultAvatar
      else return avatar.url
    }
  },
  name: 'StorieItem',
  props: {
    profile: {
      required: true,
      type: Object as PropType<Profile>
    }
  }
})
</script>

<style lang="scss" scoped>
.storie-item {
  border-radius: 0.8rem;
  cursor: pointer;
  height: 100%;
  overflow: hidden;
  position: relative;
  top: 0;

  &:hover > img {
    transform: scale(1.02);
  }

  > img {
    height: 100%;
    left: 0;
    object-fit: cover;
    position: absolute;
    transition: transform 300ms;
    top: 0;
    width: 100%;
  }

  &__overlay {
    align-items: center;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 10%,
      rgba(0, 0, 0, 0)
    );
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
    position: absolute;
    width: 100%;
    z-index: 10;

    > button {
      align-items: center;
      background: $primary;
      border: none;
      border-radius: 50%;
      display: flex;
      height: 2.6rem;
      justify-content: center;
      line-height: 1;
      margin-bottom: 0.8rem;
      padding: 0.4rem;
      width: 2.6rem;
    }

    > span {
      color: $white;
      font-size: 1.4rem;
      margin-bottom: 0.8rem;
    }
  }
}
</style>
