<template>
    <div class="container">
        <h1 class="text-primary fw-bold">Lista de Métodos de Pago</h1>
        <button class="btn btn-success mb-3" @click="nuevoMetodoPago">Agregar Método de Pago</button>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Observación</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="metodo in metodos" :key="metodo.id">
                    <td>{{ metodo.id }}</td>
                    <td>{{ metodo.nombre }}</td>
                    <td>{{ metodo.observacion }}</td>
                    <td>
                        <button class="btn btn-primary" @click="editarMetodoPago(metodo.id)">Editar</button>
                        <button class="btn btn-danger" @click="eliminarMetodoPago(metodo.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'ListarMetodosPago',
    data() {
        return {
            metodos: []
        }
    },
    methods: {
        async cargarMetodos() {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/metodos');
                if (res.status === 200) {
                    this.metodos = res.data.metodos;
                } else {
                    Swal.fire('Error!', 'Hubo un problema al cargar los métodos de pago', 'error');
                }
            } catch (error) {
                Swal.fire('Error!', error.response?.data?.message || error.message || 'Hubo un problema al cargar los métodos de pago', 'error');
            }
        },
        nuevoMetodoPago() {
            this.$router.push({ name: 'NuevoMetodo' });
        },
        editarMetodoPago(id) {
            this.$router.push({ name: 'EditarMetodo', params: { id: id } });
        },
        async eliminarMetodoPago(id) {
            try {
                const res = await axios.delete(`http://127.0.0.1:8000/api/metodos/${id}`);
                if (res.status === 200 && res.data.success) {
                    this.cargarMetodos();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'El método de pago ha sido eliminado',
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    Swal.fire('Error!', 'Hubo un problema al eliminar el método de pago', 'error');
                }
            } catch (error) {
                Swal.fire('Error!', error.response?.data?.message || error.message || 'Hubo un problema al eliminar el método de pago', 'error');
            }
        }
    },
    mounted() {
        this.cargarMetodos();
    }
}
</script>
