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
        <img :src="avatar" :alt="prettyName" />
        {{ prettyName }}
      </RouterLink>
      <ul class="header__options">
        <li>
          <img src="../../assets/icons/svg/menu.svg" alt="" />
        </li>
        <li>
          <img src="../../assets/icons/svg/messages.svg" alt="" />
        </li>
        <li>
          <img src="../../assets/icons/svg/bell.svg" alt="" />
        </li>
        <li @click="isMenuVisible = !isMenuVisible">
          <img src="../../assets/icons/svg/arrow-down.svg" alt="" />
          <ul v-show="isMenuVisible" class="dropdown">
            <li class="dropdown__profile">
              <img :src="avatar" :alt="prettyName" />
              <div>
                <h3>{{ getProfile.name }}</h3>
                <span>Veja seu perfil</span>
              </div>
            </li>
            <hr />
            <li class="dropdown__feedback">
              <div>
                <img src="../../assets/icons/svg/alert.svg" alt="" />
              </div>
              <div>
                <h3>Dar feedback</h3>
                <span>Ajude-nos a melhorar o novo Facebook</span>
              </div>
            </li>
            <hr />
            <li>
              <div>
                <img src="../../assets/icons/svg/settings.svg" alt="" />
              </div>
              <h3>Configurações e privacidade</h3>
              <img src="../../assets/icons/svg/arrow-right.svg" alt="" />
            </li>
            <li>
              <div>
                <img src="../../assets/icons/svg/help.svg" alt="" />
              </div>
              <h3>Ajuda e suporte</h3>
              <img src="../../assets/icons/svg/arrow-right.svg" alt="" />
            </li>
            <li>
              <div>
                <img src="../../assets/icons/svg/moon.svg" alt="" />
              </div>
              <h3>Tela e acessibilidade</h3>
              <img src="../../assets/icons/svg/arrow-right.svg" alt="" />
            </li>
            <li @click="handleLogout">
              <div>
                <img src="../../assets/icons/svg/logout.svg" alt="" />
              </div>
              <h3>Sair</h3>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '../../store'
import { Search } from '../atoms'
import DefaultAvatar from '../../assets/images/default-avatar.jpg'
import { mapState, mapActions } from 'pinia'

export default defineComponent({
  components: { Search },
  computed: {
    ...mapState(useAuth, ['getProfile']),
    avatar(): string {
      const { avatar } = this.getProfile

      return avatar ? avatar.url : DefaultAvatar
    },
    prettyName(): string {
      const splitedName = this.getProfile.name.split(' ')

      return `${splitedName[0]} ${splitedName[splitedName.length - 1]}`
    }
  },
  data() {
    return {
      isMenuVisible: false
    }
  },
  methods: {
    ...mapActions(useAuth, ['logout']),
    handleLogout() {
      this.logout()
      this.$router.push({ name: 'auth' })
    }
  },
  name: 'Header'
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
            bottom: -1.4rem;
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

  &__profile-options {
    align-items: center;
    display: flex;
  }

  &__options {
    align-items: center;
    display: flex;
    gap: 0.8rem;
    margin-left: 1.6rem;

    > li {
      align-items: center;
      background: $background;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      height: 4rem;
      justify-content: center;
      padding: 0.8rem;
      transition: background 300ms;
      width: 4rem;

      &:hover {
        background: $gray-1;
      }

      &:last-child {
        position: relative;
      }
    }
  }

  &__profile-link {
    align-items: center;
    border-radius: 999px;
    color: $dark;
    display: flex;
    font-size: 1.4rem;
    font-weight: 500;
    padding: 0.4rem 0.8rem;
    transition: background 300ms;

    &:hover {
      background: $background;
      text-decoration: none;
    }

    > img {
      border-radius: 50%;
      margin-right: 0.8rem;
      width: 3.2rem;
    }
  }
}

.dropdown {
  background: $white;
  border-radius: 0.8rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem;
  position: absolute;
  right: 0;
  top: 110%;
  width: max-content;

  li {
    align-items: center;
    border-radius: 0.8rem;
    display: flex;
    padding: 0.4rem;
    transition: background 300ms;

    &:hover {
      background: $background;
    }

    > img {
      justify-self: flex-end;
    }

    &:first-child {
      img {
        border-radius: 50%;
        height: 5rem;
        margin-right: 0.8rem;
        width: 5rem;
      }

      h3 {
        font-weight: 500;
      }
    }

    div:first-child {
      align-items: center;
      background: $background;
      border-radius: 50%;
      display: flex;
      height: 5rem;
      justify-content: center;
      margin-right: 0.8rem;
      padding: 0.8rem;
      width: 5rem;

      img {
        height: 2.6rem;
        width: 2.6rem;
      }
    }

    h3 {
      font-size: 1.6rem;
      font-weight: 400;
    }

    span {
      font-size: 1.4rem;
      opacity: 0.5;
    }
  }

  hr {
    opacity: 0.3;
  }
}
</style>
