<template>
  <ul class="menu-nav">
    <li>
      <router-link :to="{name: 'home'}">Início</router-link>
    </li>
    <li>
      <router-link :to="{name: 'login'}">Login</router-link>
    </li>
    <li>
      <router-link :to="{name: 'painel'}">Painel</router-link>
    </li>
  </ul>
  <router-view />
</template>

<script setup lang="ts"></script>

<style scoped></style>
