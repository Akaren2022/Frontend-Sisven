<template>
    <div class="container">
        <h1 class="text-primary fw-bold">Agregar Nuevo Método de Pago</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Información del Método de Pago
            </div>
            <div class="card-body">
                <form @submit.prevent="guardarMetodoPago">
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre:</label>
                        <input type="text" class="form-control" id="nombre" placeholder="Nombre del Método de Pago"
                            v-model="metodo.nombre">
                    </div>
                    <div class="mb-3">
                        <label for="observacion" class="form-label">Observación:</label>
                        <textarea class="form-control" id="observacion" placeholder="Observación del Método de Pago"
                            v-model="metodo.observacion"></textarea>
                    </div>
                    <button class="btn btn-primary" type="submit">Guardar</button>
                    <button class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'NuevoMetodo',
    data() {
        return {
            metodo: {
                nombre: '',
                observacion: ''
            }
        }
    },
    methods: {
        async guardarMetodoPago() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/metodos', this.metodo);
                if (res.status === 200) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'El método de pago ha sido agregado',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.$router.push({ name: 'ListarMetodo' });
                } else {
                    Swal.fire('Error!', 'Hubo un problema al guardar el método de pago', 'error');
                }
            } catch (error) {
                Swal.fire('Error!', error.response?.data?.message || error.message || 'Hubo un problema al guardar el método de pago', 'error');
            }
        },
        cancelar() {
            this.$router.push({ name: 'ListarMetodo' });
        }
    }
}
</script>
