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
  <header v-if="store.isLoggedIn">
    <nav class="nav-menu">
      <RouterLink to="/" class="nav-link">ホーム</RouterLink><br />
      <RouterLink to="/monthly" class="nav-link">月次勤怠</RouterLink><br />
      <RouterLink to="/daily" class="nav-link">日次勤怠</RouterLink><br />
      <span v-if="userInfoStore.userInfo?.admin">
        <RouterLink to="/admin" class="nav-link">管理者画面</RouterLink><br />
      </span>
      <div class="nav-user">
        <UserStatus class="status"/>
        <span class="spacer"></span>
        <LogoutButton class="button"/>
      </div>
    </nav>
  </header>
  <h2>e-navi-mock</h2>
  <RouterView />
</template>

<style scoped>
.nav-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.nav-link {
  margin-right: 10px;
}

.nav-link:last-child {
  margin-right: 0;
}

.nav-user{
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.button{
  background-color: rgb(12, 233, 167);
  border: none;
  cursor: pointer;
}
.button:hover{
  background-color: rgb(183, 241, 223);
}
.spacer{
  margin-right: 10px;
}
</style>
