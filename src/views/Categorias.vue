<template>
    <div class="container">
        <h1 class="text-primary fw-bold">Lista de Categorías</h1>
        <button class="btn btn-success mb-3" @click="nuevaCategoria">Agregar Categoría</button>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="categoria in categorias" :key="categoria.id">
                    <td>{{ categoria.id }}</td>
                    <td>{{ categoria.nombre }}</td>
                    <td>{{ categoria.descripcion }}</td>
                    <td>
                        <button class="btn btn-primary" @click="editarCategoria(categoria.id)">Editar</button>
                        <button class="btn btn-danger" @click="eliminarCategoria(categoria.id)">Eliminar</button>
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
    name: 'ListarCategorias',
    data() {
        return {
            categorias: []
        }
    },
    methods: {
        async cargarCategorias() {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/categorias');
                if (res.status === 200) {
                    this.categorias = res.data.categorias;
                } else {
                    Swal.fire('Error!', 'Hubo un problema al cargar las categorías', 'error');
                }
            } catch (error) {
                Swal.fire('Error!', error.response?.data?.message || error.message || 'Hubo un problema al cargar las categorías', 'error');
            }
        },
        nuevaCategoria() {
            this.$router.push({ name: 'NuevaCategoria' });
        },
        editarCategoria(id) {
            this.$router.push({ name: 'EditarCategoria', params: { id: id } });
        },
        async eliminarCategoria(id) {
            try {
                const res = await axios.delete(`http://127.0.0.1:8000/api/categorias/${id}`);
                if (res.status === 200 && res.data.success) {
                    this.cargarCategorias();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'La categoría ha sido eliminada',
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    Swal.fire('Error!', 'Hubo un problema al eliminar la categoría', 'error');
                }
            } catch (error) {
                Swal.fire('Error!', error.response?.data?.message || error.message || 'Hubo un problema al eliminar la categoría', 'error');
            }
        }
    },
    mounted() {
        this.cargarCategorias();
    }
}
</script>
