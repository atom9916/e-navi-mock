<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@firebase/auth';

const auth = getAuth();
const signUpEmail = ref('');
const signUpPassword = ref('');
const email = ref('');
const password = ref('');

const signUp = () => {
  createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log('Sign Up!', user)
    // ...
  })
  .catch((error) => {
    console.log(error.code, error.message)
    // ..
  });
}

const login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Login!', user)
    })
    .catch((error) => {
      console.log(error.code, error.message);
    });
}

const logout = () => {
  signOut(auth).then(() => {
    console.log('Logout!')
  }).catch((error) => {
    console.log(error.code, error.message);
  });
}

const checkAuth = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is signed in!', user)
    } else {
      console.log('User is signed out!')
    }
  });
}

onMounted(() => {
  console.log('LoginTest.vue is mounted!')
})

</script>

<template>
  <div>
    <h2>Sign Up</h2>
    <p>
      <input type="text" v-model="signUpEmail" placeholder="Email">
      <input type="password" v-model="signUpPassword" placeholder="Password">
      <button @click="signUp">Sign Up</button>
    </p>
  </div>

  <div>
    <h2>Login</h2>
    <p>
      <input type="text" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="Password">
      <button @click="login">Login</button>
    </p>
  </div>

  <div>
    <h2>Logout</h2>
    <p>
      <button @click="logout">Logout</button>
    </p>
  </div>

  <div>
    <h2>Check Auth</h2>
    <p>
      <button @click="checkAuth">Check Auth</button>
    </p>
  </div>
</template>
