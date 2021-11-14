<template>
  <header class="header">
    <div class="header__search">
      <img src="../../assets/images/logo-circle.svg" alt="Facebook" />
      <Search />
    </div>
    <nav class="nav">
      <ul class="nav__list">
        <li class="nav__item">
          <RouterLink :to="{ name: 'feed' }">
            <img src="../../assets/icons/svg/home.svg" alt="" />
          </RouterLink>
        </li>
        <li class="nav__item">
          <RouterLink to="{ name: 'watch' }">
            <img src="../../assets/icons/svg/watch.svg" alt="" />
          </RouterLink>
        </li>
        <li class="nav__item">
          <RouterLink to="{ name: 'market' }">
            <img src="../../assets/icons/svg/market.svg" alt="" />
          </RouterLink>
        </li>
        <li class="nav__item">
          <RouterLink to="{ name: 'groups' }">
            <img src="../../assets/icons/svg/groups.svg" alt="" />
          </RouterLink>
        </li>
        <li class="nav__item">
          <RouterLink to="{ name: 'games' }">
            <img src="../../assets/icons/svg/games.svg" alt="" />
          </RouterLink>
        </li>
      </ul>
    </nav>
    <div class="header__profile-options">
      <RouterLink to="" class="header__profile-link">
        <img :src="avatar" :alt="authStore.profile.name" />
        {{ prettyName }}
      </RouterLink>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '../../store'
import { Search } from '../atoms'
import DefaultAvatar from '../../assets/images/default-avatar.jpg'

export default defineComponent({
  components: { Search },
  computed: {
    avatar(): string {
      const { avatar } = this.authStore.profile

      return avatar ? avatar.url : DefaultAvatar
    },
    prettyName(): string {
      const splitedName = this.authStore.profile.name.split(' ')

      return `${splitedName[0]} ${splitedName[splitedName.length - 1]}`
    }
  },
  name: 'Header',
  setup() {
    const authStore = useAuth()

    return { authStore }
  }
})
</script>

<style lang="scss" scoped>
.header {
  background: $white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: grid;
  grid-template-columns: 350px 1fr 450px;
  padding: 0.8rem 1.6rem;

  &__search {
    align-items: center;
    display: flex;

    > img {
      margin-right: 0.8rem;
      width: 4rem;
    }
  }

  .nav {
    align-self: center;
    justify-self: center;

    &__list {
      align-items: center;
      display: flex;
      gap: 6.4rem;
    }

    &__item {
      > a {
        padding: 0 1rem;

        &.router-link-exact-active {
          position: relative;

          &::after {
            background: $primary;
            bottom: -1rem;
            content: '';
            display: block;
            height: 0.3rem;
            left: 0;
            position: absolute;
            width: 100%;
          }
        }

        img {
          width: 2.8rem;
        }
      }
    }
  }

  &__profile-link {
    align-items: center;
    color: $dark;
    display: flex;
    padding: 0.4rem 0.8rem;

    &:hover {
      background: $background;
      border-radius: 999px;
      text-decoration: none;
    }

    > img {
      border-radius: 50%;
      margin-right: 0.8rem;
      width: 3.5rem;
    }
  }
}
</style>
