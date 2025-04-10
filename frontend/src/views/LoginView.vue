<template>
  <div
    class="bg-dark vh-100"
  >
    <div class="d-flex flex-wrap h-100">
      <div class="col-12 col-md-7 p-0 d-none d-md-block">
        <img class="img-fluid h-100 w-100 position-absolute
        " lazyload src="../assets/mesas.jpg" alt="Imagem de mesas de um restaurante">
      </div>
      <div class="col-12 col-md-5 d-flex align-items-center justify-content-center">
        <div
          class="login-content card border-0 shadow-lg p-4 w-100"
          style="max-width: 500px;"
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
                    @change="validatePasswords"
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
              <a href="#" class="btn-login" @click.prevent="toggleForm">
                {{ isLogin ? 'Criar Conta' : 'Login' }}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'
import { useAuthStore } from '../stores/auth.ts'
import { toast } from 'vue3-toastify'

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
  computed: {
    isAdmin() {
      return auth.user.admin
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
        toast("As senhas não coincidem!", {
          type: "error",
          autoClose: 1000,
        })
        return
      }

      try {
        const endpoint = this.isLogin ? '/login' : '/usuario'
        const payload = this.isLogin
          ? { email: this.email, senha: this.password }
          : { nome: this.nome, email: this.email, senha: this.password }

        const response = await api.post(endpoint, payload)
        if(this.isLogin) {
          const { user, token } = response.data
          // Salvar o token nos cookies
          if (token) {
            auth.setToken(token)
          }
          if (user) {
            auth.setUser(user)
          }
          toast("Login realizado com sucesso", {
            type: "success"
          })
          this.$router.push({ name: 'home' });
        }
        else {
          toast("Conta criada, agora realize o login", {
            type: "info"
          })
          this.toggleForm();
        }
      } catch (error) {
        this.isAdmin &&  console.error(error.response)
        if (error.response.data.errors) {
          error.response.data.errors.forEach(error => {
            this.isAdmin && console.error(error.message)
            toast(error.message, {
              type: "error"
            })
          })
        } else {
          toast(error.response.data.message, {
            type: "error"
          })
          this.isAdmin && console.error(error.response.data.message)
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

@media (max-width: 900px) {
  h1 {
    display: none !important;
  }
  .login-content {
    max-width: 100vw !important;
  }
}
</style>
