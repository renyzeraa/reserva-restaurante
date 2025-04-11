<template>
  <div class="container my-4">
    <loading-spinner :isLoading="isLoading" />
    <h2 class="text-center mb-4">{{ isAdmin ? 'Mesas' : 'Reservar Mesas' }}</h2>

    <div class="mb-4">
      <label for="date" class="form-label">Filtre por uma data:</label>
      <div class="position-relative">
        <input
          type="date"
          id="date"
          class="form-control"
          lang="pt-BR"
          v-model="selectedDate"
          @change="fetchReservas"
        />
        <img
          class="position-absolute top-50 translate-middle-y icone-calendario"
          src="../assets/icon-calendar.svg"
          alt="Icone calendário"
        />
      </div>
      <span v-if="isSunday && !isAdmin" class="text-danger">Reservas não estão disponíveis aos domingos
      </span>
    </div>

    <div class="row g-4">
      <div
        v-for="mesa in mesas"
        :key="mesa.id"
        class="col-8 col-md-6 col-lg-3"
      >
        <div
          class="mesa-card p-3 gap-2 d-flex align-items-center justify-content-center flex-wrap flex-column"
          @click="!isSunday && openModal(mesa)"
          :class="[
            mesa.disponivel && (!isSunday || isAdmin) ? 'mesa-disponivel' : 'mesa-indisponivel',
            isSunday && !isAdmin ? 'disabled-card' : ''
          ]"
        >
          <h4>{{ mesa.nome }}</h4>
          <span
            class="badge rounded-pill d-block tag-disponibilidade"
            :class="mesa.disponivel && (!isSunday || isAdmin) ? 'bg-success' : 'bg-danger'"
            >{{ mesa.disponivel && (!isSunday || isAdmin) ? 'Disponível' : 'Reservada' }}
            </span>
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
            <div class="position-relative">
              <input
                type="date"
                id="modalDate"
                class="form-control mb-3"
                  v-model="modalDate"
                  @change="validateModalDate"
                lang="pt-BR"
              />
              <img
                class="position-absolute top-50 translate-middle-y icone-calendario"
                src="../assets/icon-calendar.svg"
                alt="Icone calendário"
              />
            </div>

            <label for="modalTime" class="form-label">Horário:</label>
            <input
              type="time"
              id="modalTime"
              class="form-control"
              v-model="modalTime"
              @change="validateModalTime"
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
import { useAuthStore } from '../stores/auth';
import LoadingSpinner from "../components/Loading.vue";

const auth = useAuthStore();

export default {
  components: {
    LoadingSpinner,
  },
  name: 'ReservaView',
  computed: {
    isSunday() {
      const date = new Date(this.selectedDate + 'T00:00:00-03:00');
      return date.getDay() === 0; // 0 representa domingo
    },
    isAdmin() {
      return auth?.user?.admin || false;
    },
  },
  data() {
    return {
      reservas: [],
      mesas: [],
      selectedDate: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0],
      selectedMesa: null,
      modalDate: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0],
      modalTime: '',
      isLoading: false,
    };
  },
  methods: {
    async fetchReservas() {
      this.isLoading = true;
      try {
        const response = await api.get(
          '/reserva/forDate/' + this.selectedDate,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`, 
            },
          }
          );
        this.reservas = response.data.data;
        this.setMesasDisponiveis();
        this.isLoading = false;
      } catch (error) {
        auth.user.admin && console.error('Erro ao buscar reservas:', error);
        toast('Erro ao buscar mesas.', { type: 'error' });
        this.isLoading = false;
      }

    },
    // Busca as mesas disponíveis na API
    async fetchMesas() {
      this.isLoading = true;
      try {
        const response = await api.get(
          '/mesa', 
          {
            params: { date: this.selectedDate },
          },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`, 
            },
          }
        );
        this.mesas = response.data.data
        this.setMesasDisponiveis();
        this.isLoading = false;
      } catch (error) {
        auth.user.admin && console.error('Erro ao buscar mesas:', error);
        toast('Erro ao buscar mesas.', { type: 'error' });
        this.isLoading = false;
      }
    },
    setMesasDisponiveis() {
      this.mesas = this.mesas.map((mesa) => {
        mesa.disponivel = true;
        this.reservas.forEach((reserva) => {
          if (mesa.id === reserva.mesa_id) {
            mesa.disponivel = false;
          }
        });
        return mesa;
      });
    },
    // Abre o modal para reservar a mesa
    openModal(mesa) {
      if (this.isAdmin) {
        return;
      }
      if (!mesa.disponivel) {
        toast('Esta mesa já está reservada!', { type: 'warning' });
        return;
      }
      this.selectedMesa = mesa;
      const modal = new bootstrap.Modal(document.getElementById('reservaModal'));
      modal.show();
    },
    // Confirma a reserva da mesa
    async confirmarReserva() {
      if (!this.modalTime) {
        toast('Por favor, selecione um horário.', { type: 'warning' });
        return;
      }
      if (this.isSunday) {
        toast('Reservas não estão disponíveis aos domingos.', { type: 'warning' });
        return;
      }

      this.isLoading = true;

      await api
        .post('/reserva', 
          {
            mesa_id: this.selectedMesa.id,
            data_reserva: `${this.modalDate}T${this.modalTime}`,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`, 
            },
          }
        )
        .then(() => {
          toast(`${this.selectedMesa.nome} reservada com sucesso!`, {
            type: 'success',
          });
          this.fetchReservas();
          const modal = bootstrap.Modal.getInstance(
            document.getElementById('reservaModal')
          );
          modal.hide();
          this.modalTime = '';
          this.isLoading = false;
        })
        .catch((error) => {
          auth.user.admin && console.error('Erro ao reservar mesa:', error);
          if(error?.response?.data?.message){
            toast(error.response.data.message, { type: 'error' });
          } else {
            toast('Erro ao reservar a mesa.', { type: 'error' });
          }
          this.isLoading = false;
        });
    },
    validateModalDate() {
      const selectedDate = new Date(this.modalDate + 'T00:00:00-03:00');
      const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
      if (selectedDate < new Date(today)) {
        toast('Data inválida. Selecione uma data futura.', { type: 'warning' });
        this.modalDate = today;
        return false;
      }
      const date = new Date(this.modalDate + 'T00:00:00-03:00');
      if (date.getDay() === 0) {
        toast('Reservas não estão disponíveis aos domingos.', { type: 'warning' });
        this.modalDate = today;
        return false;
      }
      return true;
    },
    validateModalTime(){
      const [hours, minutes] = this.modalTime.split(':').map(Number);
      if (hours < 18 || (hours === 23 && minutes > 59) || hours > 23) {
        toast('Horário inválido. Reservas são permitidas apenas das 18:00 até as 23:59.', { type: 'warning' });
        this.modalTime = '';
        return false;
      }
      return true;
    }
  },
  mounted() {
    this.fetchReservas(); // Busca as reservas ao carregar a página
    this.fetchMesas(); // Busca as mesas ao carregar a página
  },
};
</script>

<style scoped>
.mesa-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: #ddd;
  min-height: 7rem;
}

.mesa-card:not(.mesa-indisponivel):hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.disabled-card {
  background-color: #f5f5f5;
  color: #aaa;
  cursor: not-allowed;
  opacity: 0.6;
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

.form-control {
  width: auto;
}

.icone-calendario {
  left: 134px;
  pointer-events: none;
  width: 20px;
  height: 20px;
}
</style>
