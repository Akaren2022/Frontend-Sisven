<template>
    <div class="container">
        <h1 class="text-primary fw-bold">Editar Cliente</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Información del Cliente
            </div>
            <div class="card-body">
                <form @submit.prevent="actualizarCliente">
                    <div class="row mb-3">
                        <label for="id" class="form-label">Código</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="ID Cliente" disabled
                                v-model='cliente.id'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="numero_documento" class="form-label">Documento: </label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="numero_documento"
                                placeholder="Documento del Cliente" v-model='cliente.numero_documento'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="nombre" class="form-label">Nombre: </label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="user" /></div>
                            <input type="text" class="form-control" id="nombre" placeholder="Nombre del Cliente"
                                v-model='cliente.nombre'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="apellido" class="form-label">Apellido: </label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="user" /></div>
                            <input type="text" class="form-control" id="apellido" placeholder="Apellido del Cliente"
                                v-model='cliente.apellido'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="direccion" class="form-label">Dirección: </label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="direccion" placeholder="Dirección del Cliente"
                                v-model='cliente.direccion'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="cumpleaños" class="form-label">Fecha de Nacimiento: </label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="date" class="form-control" id="cumpleaños" v-model='cliente.cumpleaños'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="celular" class="form-label">Teléfono: </label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="phone" /></div>
                            <input type="text" class="form-control" id="celular" placeholder="Teléfono del Cliente"
                                v-model='cliente.celular'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="correo" class="form-label">Email: </label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="email" class="form-control" id="correo" placeholder="Email del Cliente"
                                v-model='cliente.correo'>
                        </div>
                    </div>
                    <button class="btn btn-primary" type="submit">Actualizar</button>
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
    name: 'EditarCliente',
    data() {
        return {
            cliente: {
                id: '',
                numero_documento: '',
                nombre: '',
                apellido: '',
                direccion: '',
                cumpleaños: '',
                celular: '',
                correo: ''
            }
        }
    },
    created() {
        this.cargarCliente();
    },
    methods: {
        async cargarCliente() {
            const id = this.$route.params.id;
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/clientes/${id}`);
                if (res.status === 200) {
                    this.cliente = res.data.cliente;
                } else {
                    Swal.fire('Error!', 'Hubo un problema al cargar el cliente', 'error');
                }
            } catch (error) {
                Swal.fire('Error!', error.response?.data?.message || error.message || 'Hubo un problema al cargar el cliente', 'error');
            }
        },
        async actualizarCliente() {
            const id = this.cliente.id;
            try {
                const res = await axios.put(`http://127.0.0.1:8000/api/clientes/${id}`, this.cliente);
                if (res.status === 200) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'El cliente ha sido actualizado',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.$router.push({ name: 'Cliente' });
                } else {
                    Swal.fire('Error!', 'Hubo un problema al actualizar el cliente', 'error');
                }
            } catch (error) {
                Swal.fire('Error!', error.response?.data?.message || error.message || 'Hubo un problema al actualizar el cliente', 'error');
            }
        },
        cancelar() {
            this.$router.push({ name: 'Cliente' });
        }
    }
}
</script>
