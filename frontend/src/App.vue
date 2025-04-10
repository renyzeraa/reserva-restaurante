<template>
  <div>
    <ul class="header" v-if="router.currentRoute.value.name !== 'login'">
      <li class="left">
        <router-link :to="{name: 'home'}">Início</router-link>
      </li>
      <div class="right d-flex align-items-center">
        <li>
          <router-link :to="{name: 'painel'}">{{ auth?.user?.admin ? 'Painel' : 'Minhas reservas' }}</router-link>
        </li>
        <li>
          <template v-if="auth.isAuthenticated">
            <span>Olá {{ auth?.user?.nome }}</span>
            <button type="button" @click="logout">
              Sair
            </button>
          </template>
          <template v-else>
            <router-link :to="{name: 'login'}">Entrar</router-link>
          </template>
        </li>
      </div>
    </ul>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';
import 'vue3-toastify/dist/index.css';

const auth = useAuthStore();
const router = useRouter();

function logout(){
  auth.clearAuth();
  router.push({name:'login'});
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
}

.header .left {
  margin-left: 1rem;
}

.header .right {
  display: flex;
  gap: 1rem;
  margin-right: 1rem;
}

.header li {
  display: inline;
}

.header a {
  text-decoration: none;
  color: #007bff;
}

.header a:hover {
  text-decoration: underline;
}

.header button {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
}

.header button:hover {
  text-decoration: underline;
}

</style>
