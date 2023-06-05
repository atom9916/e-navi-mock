<template >
  <div class="logout">
  <h2>ログアウトしました</h2>
  <br>
    <button @click="$router.push({ path: '/login' })">再ログイン</button>
</div>
</template>

<style scoped>
.logout{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  flex-direction: column;
}

.logout button {
  margin: 1%;
  border: none;
  background-color: rgb(13, 102, 102);
  color: rgb(255, 255, 255);
  border-radius: 10%;
  cursor: pointer;
}

.logout button:hover {
  
  background-color: rgb(140, 183, 183) 
}
</style>