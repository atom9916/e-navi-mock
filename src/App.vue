<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LogoutButton from './components/LogoutButton.vue';
import { useStoreAuth } from './stores/login';

const store = useStoreAuth()

</script>

<template>
  <header v-if="store.isLoggedIn">
    <nav>
      <RouterLink to="/">ホーム</RouterLink><br />
      <RouterLink to="/monthly">月次勤怠</RouterLink><br />
      <RouterLink to="/daily">日次勤怠</RouterLink><br />
      <LogoutButton/>
    </nav>
  </header>
<h2>e-navi-mock</h2>
<RouterView/>
</template>

<!-- 後学のためとりあえず一旦、残してますが後で消す -->
<!-- <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
