<template>
  <div class="container my-4">
    <h2 class="text-center mb-4">Reservar Mesas</h2>

    <div class="mb-4">
      <label for="date" class="form-label">Selecione uma data:</label>
      <!-- <input
        type="date"
        id="date"
        class="form-control"
        v-model="selectedDate"
        @change="fetchMesas"
      /> -->
    </div>

    <div class="row g-4">
      <div
        v-for="mesa in mesas"
        :key="mesa.id"
        class="col-8 col-md-6 col-lg-3"
      >
        <div
          class="mesa-card p-3 gap-2 d-flex align-items-center justify-content-center"
          @click="openModal(mesa)"
        >
          <img src="../assets/icon-mesa.svg" alt="Icone de mesa" class="" />
          <span>{{ mesa.nome }}</span>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="reservaModal"
      tabindex="-1"
      aria-labelledby="reservaModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="reservaModalLabel">
              Reservar {{ selectedMesa?.nome }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <label for="modalDate" class="form-label">Data:</label>
            <input
              type="date"
              id="modalDate"
              class="form-control mb-3"
              v-model="modalDate"
            />

            <label for="modalTime" class="form-label">Horário:</label>
            <input
              type="time"
              id="modalTime"
              class="form-control"
              v-model="modalTime"
            />
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
              class="btn btn-primary"
              @click="confirmarReserva"
            >
              Confirmar Reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import api from '../services/api';

export default {
  name: 'ReservaView',
  data() {
    return {
      mesas: [], // Lista de mesas
      selectedDate: new Date().toISOString().split('T')[0], // Data selecionada (hoje por padrão)
      selectedMesa: null, // Mesa selecionada para reserva
      modalDate: new Date().toISOString().split('T')[0], // Data no modal
      modalTime: '', // Horário no modal
    };
  },
  methods: {
    // Busca as mesas disponíveis na API
    async fetchMesas() {
      try {
        const response = await api.get('/mesa', {
          params: { date: this.selectedDate },
        });
        this.mesas = response.data;
      } catch (error) {
        console.error('Erro ao buscar mesas:', error);
        toast('Erro ao buscar mesas disponíveis.', { type: 'error' });
      }
    },
    // Abre o modal para reservar a mesa
    openModal(mesa) {
      // if (!mesa.disponivel) {
      //   toast('Esta mesa já está reservada!', { type: 'warning' });
      //   return;
      // }
      this.selectedMesa = mesa;
      const modal = new bootstrap.Modal(document.getElementById('reservaModal'));
      modal.show();
    },
    // Confirma a reserva da mesa
    confirmarReserva() {
      if (!this.modalTime) {
        toast('Por favor, selecione um horário.', { type: 'warning' });
        return;
      }

      api
        .post('/api/reservas', {
          mesaId: this.selectedMesa.id,
          date: this.modalDate,
          time: this.modalTime,
        })
        .then(() => {
          toast(`Mesa ${this.selectedMesa.nome} reservada com sucesso!`, {
            type: 'success',
          });
          this.fetchMesas(); // Atualiza a lista de mesas
          const modal = bootstrap.Modal.getInstance(
            document.getElementById('reservaModal')
          );
          modal.hide();
        })
        .catch((error) => {
          console.error('Erro ao reservar mesa:', error);
          toast('Erro ao reservar a mesa.', { type: 'error' });
        });
    },
  },
  mounted() {
    this.fetchMesas(); // Busca as mesas ao carregar a página
  },
};
</script>

<style scoped>
/* Estilo do grid de mesas */
.mesa-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: #ddd;
  height: 80px;
}

.mesa-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.mesa-disponivel {
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.mesa-indisponivel {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  cursor: not-allowed;
}

.mesa-card h5 {
  margin: 0;
  font-size: 1.25rem;
}

.mesa-card p {
  margin: 0;
  font-size: 0.9rem;
}
</style>
