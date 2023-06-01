<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LogoutButton from './components/LogoutButton.vue';
import { useStoreAuth } from './stores/login';
import UserStatus from './components/UserStatus.vue';

const store = useStoreAuth()

</script>

<template>
  <header v-if="store.isLoggedIn">
    <nav>
      <RouterLink to="/">ホーム</RouterLink><br />
      <RouterLink to="/monthly">月次勤怠</RouterLink><br />
      <RouterLink to="/daily">日次勤怠</RouterLink><br />
      <RouterLink to="/admin">管理者画面</RouterLink><br>
      <UserStatus/>
      <LogoutButton/>
    </nav>
  </header>
<h2>e-navi-mock</h2>
<RouterView/>
</template>
