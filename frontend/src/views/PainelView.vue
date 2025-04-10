<template>
  <div class="container my-4">
    <h2 class="text-center mb-4">Minhas Reservas</h2>

    <loading-spinner :isLoading="isLoading" />

    <div v-if="reservas.length === 0" class="text-center text-muted">
      <p>Você ainda não possui reservas.</p>
    </div>

    <div v-else class="row g-3">
      <div
        v-for="reserva in reservas"
        :key="reserva.id"
        class="col-12"
      >
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Mesa: {{ reserva.mesa_id }}</h5>
            <p class="card-text">
              <strong>Data:</strong> {{ formatDate(reserva.data_reserva) }}<br />
              <strong>Hora:</strong> {{ formatTime(reserva.data_reserva) }}
            </p>
            <button
              class="btn btn-danger"
              @click="openDeleteModal(reserva)"
            >
              Cancelar reserva
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmação -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Confirmar Exclusão</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Tem certeza de que deseja deletar a reserva da mesa
            <strong>{{ reservaSelecionada?.mesa_id }}</strong> no dia
            <strong>{{ formatDate(reservaSelecionada?.data_reserva) }}</strong> às
            <strong>{{ formatTime(reservaSelecionada?.data_reserva) }}</strong>?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteReserva"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import LoadingSpinner from "@/components/Loading.vue";
import {useAuthStore} from "../stores/auth";

const auth = useAuthStore();

export default {
  name: "PainelView",
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      reservas: [], // Lista de reservas
      isLoading: false, // Estado de carregamento
    };
  },
  methods: {
    async fetchReservas() {
      this.isLoading = true;
      try {
        const response = await api.get("/reserva/forUser", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        this.reservas = response.data.data;
      } catch (error) {
        auth.user.admin && console.error("Erro ao buscar reservas:", error);
      } finally {
        this.isLoading = false;
      }
    },
    formatDate(dateTime) {
      const date = new Date(dateTime);
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    formatTime(dateTime) {
      const date = new Date(dateTime);
      return date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  mounted() {
    this.fetchReservas(); // Busca as reservas ao carregar a página
  },
};
</script>

<style scoped>
.card {
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.card-text {
  font-size: 1rem;
  color: #555;
}
</style>