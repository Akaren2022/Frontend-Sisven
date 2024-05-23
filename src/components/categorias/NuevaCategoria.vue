<template>
    <div class="container">
        <h1 class="text-primary fw-bold">Agregar Nueva Categoría</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Información de la Categoría
            </div>
            <div class="card-body">
                <form @submit.prevent="guardarCategoria">
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
    name: 'NuevaCategoria',
    data() {
        return {
            categoria: {
                nombre: '',
                descripcion: ''
            }
        }
    },
    methods: {
        async guardarCategoria() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/categorias', this.categoria);
                if (res.status === 200) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'La categoría ha sido agregada',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.$router.push({ name: 'ListarCategorias' });
                } else {
                    Swal.fire('Error!', 'Hubo un problema al guardar la categoría', 'error');
                }
            } catch (error) {
                Swal.fire('Error!', error.response?.data?.message || error.message || 'Hubo un problema al guardar la categoría', 'error');
            }
        },
        cancelar() {
            this.$router.push({ name: 'ListarCategorias' });
        }
    }
}
</script>
