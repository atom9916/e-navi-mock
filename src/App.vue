<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LogoutButton from './components/LogoutButton.vue'
import { useStoreAuth } from './stores/login'
import UserStatus from './components/UserStatus.vue'
import { useUserInfoStore } from './stores/userInfo'

const store = useStoreAuth()
const userInfoStore = useUserInfoStore()
</script>

<template>
  <div class="wrapper">
    <header v-if="store.isLoggedIn">
      <nav>
        <RouterLink to="/" class="nav-left">ホーム</RouterLink><br />
        <RouterLink to="/monthly" class="nav-left">月次勤怠</RouterLink><br />
        <RouterLink to="/daily" class="nav-left">日次勤怠</RouterLink><br />
        <span v-if="userInfoStore.userInfo?.admin">
          <RouterLink to="/admin" class="nav-left">管理者画面</RouterLink><br />
        </span>
        <div class="nav-right">
          <UserStatus class="nav-user" />
          <LogoutButton />
        </div>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  background-color: white;
}

nav {
  background-color: #1b5e20;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 80px;
  width: 100vw;
}

.nav-left {
  color: #f7eccf;
  text-decoration: none;
  margin: 10px;
  font-size: 18px;
}

.nav-right {
  position: absolute;
  right: 20px;
  width: 25%;
  display: flex;
}

.nav-user {
  margin-right: 20px;
  color: #f7eccf;
  font-size: 18px;
}
</style>
