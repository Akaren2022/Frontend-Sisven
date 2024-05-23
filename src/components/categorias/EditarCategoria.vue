<template>
    <div class="container">
        <h1 class="text-primary fw-bold">Editar Categoría</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Información de la Categoría
            </div>
            <div class="card-body">
                <form @submit.prevent="actualizarCategoria">
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre:</label>
                        <input type="text" class="form-control" id="nombre" placeholder="Nombre de la Categoría"
                            v-model="categoria.nombre">
                    </div>
                    <div class="mb-3">
                        <label for="descripcion" class="form-label">Descripción:</label>
                        <textarea class="form-control" id="descripcion" placeholder="Descripción de la Categoría"
                            v-model="categoria.descripcion"></textarea>
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
    name: 'EditarCategoria',
    data() {
        return {
            categoria: {
                id: '',
                nombre: '',
                descripcion: ''
            }
        }
    },
    methods: {
        async cargarCategoria() {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/categorias/${this.$route.params.id}`);
                if (res.status === 200) {
                    this.categoria = res.data.categoria;
                } else {
                    Swal.fire('Error!', 'Hubo un problema al cargar la categoría', 'error');
                    this.$router.push({ name: 'ListarCategorias' });
                }
            } catch (error) {
                Swal.fire('Error!', error.response?.data?.message || error.message || 'Hubo un problema al cargar la categoría', 'error');
                this.$router.push({ name: 'ListarCategorias' });
            }
        },
        async actualizarCategoria() {
            try {
                const res = await axios.put(`http://127.0.0.1:8000/api/categorias/${this.categoria.id}`, this.categoria);
                if (res.status === 200) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'La categoría ha sido actualizada',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.$router.push({ name: 'ListarCategorias' });
                } else {
                    Swal.fire('Error!', 'Hubo un problema al actualizar la categoría', 'error');
                }
            } catch (error) {
                Swal.fire('Error!', error.response?.data?.message || error.message || 'Hubo un problema al actualizar la categoría', 'error');
            }
        },
        cancelar() {
            this.$router.push({ name: 'ListarCategorias' });
        }
    },
    mounted() {
        this.cargarCategoria();
    }
}
</script>
