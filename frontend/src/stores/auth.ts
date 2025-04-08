import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import Cookies from 'js-cookie';
import api from '../services/api';

interface User {
  admin: boolean;
  name: string;
  email: string;
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(Cookies.get('authToken') || null);
  const user = ref<User | null>(Cookies.get('user') ? JSON.parse(Cookies.get('user') as string) : null);

  function setToken(newToken: string) {
    token.value = newToken;
    Cookies.set('authToken', newToken, { expires: 1 }); // Expira em 1 dia
  }

  function setUser(newUser: User) {
    user.value = newUser;
    Cookies.set('user', JSON.stringify(newUser), { expires: 1 }); // Expira em 1 dia
  }

  function clearAuth() {
    token.value = null;
    user.value = null;
    Cookies.remove('authToken');
    Cookies.remove('user');
  }

  async function validateToken() {
    if (!token.value) {
      return false; // Retorna falso se não houver token
    }
    return api
      .get('/token/validate', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        // Token inválido
        console.error('Erro ao validar token:', error);
        clearAuth(); // Limpa a autenticação se o token for inválido
        return false;
      });
  }

  const isAuthenticated = computed(() => {
    return token.value && user.value;
  })

  return {
    token,
    user,
    setToken,
    setUser,
    clearAuth,
    validateToken,
    isAuthenticated
  };
});