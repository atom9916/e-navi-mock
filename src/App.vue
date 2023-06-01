<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LogoutButton from './components/LogoutButton.vue';
import { useStoreAuth } from './stores/login';
import UserStatus from './components/UserStatus.vue';
import { useUserInfoStore } from './stores/userInfo'


const store = useStoreAuth()
const userInfoStore = useUserInfoStore()

</script>

<template>
  <header v-if="store.isLoggedIn">
    <nav>
      <RouterLink to="/">ホーム</RouterLink><br />
      <RouterLink to="/monthly">月次勤怠</RouterLink><br />
      <RouterLink to="/daily">日次勤怠</RouterLink><br />
      <span v-if="userInfoStore.userInfo?.admin">
      <RouterLink to="/admin">管理者画面</RouterLink><br>
      </span>
      <UserStatus/>
      <LogoutButton/>
    </nav>
  </header>
<h2>e-navi-mock</h2>
<RouterView/>
</template>
