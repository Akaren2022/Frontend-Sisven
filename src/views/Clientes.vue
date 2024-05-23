<template>
    <div class="container">
        <h1 class="text-primary fw-bold">Lista de Clientes</h1>
        <button class="btn btn-success mb-3" @click="nuevoCliente">Agregar Cliente</button>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Número de Documento</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Dirección</th>
                    <th>Cumpleaños</th>
                    <th>Celular</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cliente in clientes" :key="cliente.id">
                    <td>{{ cliente.numero_documento }}</td>
                    <td>{{ cliente.nombre }}</td>
                    <td>{{ cliente.apellido }}</td>
                    <td>{{ cliente.direccion }}</td>
                    <td>{{ cliente.cumpleaños }}</td>
                    <td>{{ cliente.celular }}</td>
                    <td>{{ cliente.correo }}</td>
                    <td>
                        <button class="btn btn-primary" @click="editarCliente(cliente.id)">Editar</button>
                        <button class="btn btn-danger" @click="eliminarCliente(cliente.id)">Eliminar</button>
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
    name: 'ListarClientes',
    data() {
        return {
            clientes: []
        }
    },
    methods: {
        async cargarClientes() {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/clientes');
                if (res.status === 200) {
                    this.clientes = res.data.clientes;
                } else {
                    Swal.fire('Error!', 'Hubo un problema al cargar los clientes', 'error');
                }
            } catch (error) {
                Swal.fire('Error!', error.response?.data?.message || error.message || 'Hubo un problema al cargar los clientes', 'error');
            }
        },
        nuevoCliente() {
            this.$router.push({ name: 'NuevoCliente' });
        },
        editarCliente(id) {
            this.$router.push({ name: 'EditarCliente', params: { id: id } });
        },
        async eliminarCliente(id) {
            try {
                const res = await axios.delete(`http://127.0.0.1:8000/api/clientes/${id}`);
                if (res.status === 200 && res.data.success) {
                    this.cargarClientes();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'El cliente ha sido eliminado',
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    Swal.fire('Error!', 'Hubo un problema al eliminar el cliente', 'error');
                }
            } catch (error) {
                Swal.fire('Error!', error.response?.data?.message || error.message || 'Hubo un problema al eliminar el cliente', 'error');
            }
        }
    },
    mounted() {
        this.cargarClientes();
    }
}
</script>
