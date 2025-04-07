<template>
  <div
    class="bg-dark d-flex"
  >
    <h1 class="mx-auto align-items-center d-flex text-white text-center">
      Reserva Restaurante 🥗
    </h1>
    <div
      class="card border-0 shadow-lg p-4 w-100 h-100 d-flex flex-column justify-content-center rounded-0"
      style="max-width: 500px; min-height: 90vh;"
    >
      <h2 class="text-center mb-4">
        {{ isLogin ? 'Login' : 'Criar Conta' }}
      </h2>

      <form @submit.prevent="handleSubmit">
        <transition name="fade" mode="out-in">
          <div :key="isLogin" class="form-section">
            <div v-if="!isLogin" class="mb-3">
              <label class="form-label">Nome</label>
              <input type="text" class="form-control" v-model="nome" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                v-model="email"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Senha</label>
              <input
                type="password"
                class="form-control"
                v-model="password"
                required
              />
            </div>
            <div v-if="!isLogin" class="mb-3">
              <label class="form-label">Confirmar Senha</label>
              <input
                type="password"
                class="form-control"
                v-model="confirmPassword"
                @input="validatePasswords"
                required
              />
              <small v-if="passwordMismatch" class="text-danger">
                As senhas não coincidem.
              </small>
            </div>
          </div>
        </transition>

        <button type="submit" class="btn btn-primary w-100">
          {{ isLogin ? 'Entrar' : 'Criar Conta' }}
        </button>
      </form>

      <div class="text-center mt-3">
        <p>
          {{ isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?' }}
          <a href="#" @click.prevent="toggleForm">
            {{ isLogin ? 'Criar Conta' : 'Login' }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'
import Cookies from 'js-cookie';
import { useAuthStore } from '../stores/auth.ts'

const auth = useAuthStore()

export default {
  data() {
    return {
      isLogin: true,
      nome: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin
    },
    validatePasswords() {
      this.passwordMismatch = this.password !== this.confirmPassword;
    },
    async handleSubmit() {
      if (!this.isLogin && this.passwordMismatch) {
        console.error('As senhas não coincidem!')
        return
      }

      try {
        const endpoint = this.isLogin ? '/login' : '/usuario'
        const payload = this.isLogin
          ? { email: this.email, senha: this.password }
          : { nome: this.nome, email: this.email, senha: this.password }

        const response = await api.post(endpoint, payload)
        const { user, token } = response.data
        // Salvar o token nos cookies
        if (token) {
          auth.setToken(token)
        }
        if (user) {
          auth.setUser(user)
        }
        this.$router.push({ name: 'home' });
      } catch (error) {
        console.error(error.response)
        if (error.response.data.errors) {
          error.response.data.errors.forEach(error => {
            console.error(error.message)
          })
        } else {
          console.error(error.response.data.message)
        }
      }
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.menu-nav {
  display: none;
}
</style>
