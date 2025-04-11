<template>
  <div class="container my-4">
    <h2 class="text-center mb-4">Minhas Reservas</h2>

    <loading-spinner :isLoading="isLoading" />

    <div v-if="reservas.length === 0" class="text-center text-muted">
      <p>Você ainda não possui reservas.</p>
    </div>

    <div v-else class="row g-3 overflow-auto reservas-container p-3">
      <div
        v-for="reserva in reservas"
        :key="reserva.id"
        class="col-12"
      >
        <div 
          class="card shadow-sm"
          :class="[
            (reserva.status === 'CANCELADA' || reserva.isPast) ? 'card-disabled' : '',
            reserva.isPast && 'card-passada'
          ]"
        >
          <div 
            v-if="(reserva.status === 'CANCELADA' || reserva.isPast)" 
            class="badge-cancelada"
            :class="{'badge-passada': reserva.isPast }"
          >
            {{ reserva.isPast ? 'Reserva passada' : 'Reserva Cancelada'}}
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ reserva.mesa.nome }}</h5>
            <p class="card-text">
              <strong>Data:</strong> {{ formatDate(reserva.data_reserva) }}<br />
              <strong>Hora:</strong> {{ formatTime(reserva.data_reserva) }}
            </p>
            <button
              class="btn"
              :class="{'btn-danger': reserva.status !== 'CANCELADA' && !reserva.isPast}"
              :disabled="reserva.status === 'CANCELADA'"
              @click="openDeleteModal(reserva)"
            >
              {{ !reserva.isPast ? 'Cancelar reserva' : '✅ Concluída' }}
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
            Tem certeza de que deseja deletar a reserva?
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
import { toast } from 'vue3-toastify';

const auth = useAuthStore();

export default {
  name: "PainelView",
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      reservas: [],
      isLoading: false,
      reservaSelecionada: null, // Reserva selecionada para exclusão
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
        console.error("Erro ao buscar reservas:", error);
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
    openDeleteModal(reserva) {
    this.reservaSelecionada = reserva; // Define a reserva selecionada
    const modal = new bootstrap.Modal(
      document.getElementById("deleteModal")
    ); // Inicializa o modal do Bootstrap
    modal.show(); // Exibe o modal
  },
  async deleteReserva() {
    if (!this.reservaSelecionada) return;

    try {
      this.isLoading = true;
      await api.put('/reserva', 
      {
        data_reserva: this.reservaSelecionada.data_reserva,
        id: this.reservaSelecionada.id, 
        mesa_id: this.reservaSelecionada.mesa_id,
        status: "CANCELADA",
      },
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      this.reservaSelecionada = null;
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("deleteModal")
      );
      modal.hide();
      toast("Reserva deletada com sucesso!", {
        type: "success",
      });
      this.fetchReservas(); // Atualiza a lista de reservas
    } catch (error) {
      console.error("Erro ao deletar reserva:", error);
      toast("Erro ao deletar a reserva.", {
        type: "error",
      });
    } finally {
      this.isLoading = false;
    }
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

.reservas-container {
  max-height: 80vh;
  overflow-y: auto !important;
  overflow-x: hidden !important;
}

.card-disabled {
  pointer-events: none;
  cursor: not-allowed;
  background-color: #e2d8d9;
}

.card-passada {
  pointer-events: none;
  background-color: #d7dee4;
}

.badge-cancelada {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #dc3545; /* Vermelho para indicar cancelamento */
  color: white;
  padding: 5px 10px;
  font-size: 0.875rem;
  font-weight: bold;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.badge-passada {
  background-color: #6c757d; /* Cinza para indicar reserva passada */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>