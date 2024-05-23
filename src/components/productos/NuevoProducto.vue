<template>
    <div class="container">
        <h1 class="text-primary fw-bold">Agregar Nuevo Producto</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Información del Producto
            </div>
            <div class="card-body">
                <form @submit.prevent="guardarProducto">
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre:</label>
                        <input type="text" class="form-control" id="nombre" placeholder="Nombre del Producto"
                            v-model="producto.nombre">
                    </div>
                    <div class="mb-3">
                        <label for="precio" class="form-label">Precio:</label>
                        <input type="number" class="form-control" id="precio" placeholder="Precio del Producto"
                            v-model="producto.precio">
                    </div>
                    <div class="mb-3">
                        <label for="cantidad" class="form-label">Cantidad:</label>
                        <input type="number" class="form-control" id="cantidad" placeholder="Cantidad del Producto"
                            v-model="producto.cantidad">
                    </div>
                    <div class="mb-3">
                        <label for="categoria" class="form-label">Categoría:</label>
                        <select class="form-select" v-model="producto.id_categoria">
                            <option v-for="categoria in categorias" :value="categoria.id" :key="categoria.id">{{
                                categoria.nombre }}</option>
                        </select>
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
    name: 'NuevoProducto',
    data() {
        return {
            producto: {
                nombre: '',
                precio: '',
                cantidad: '',
                id_categoria: ''
            },
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
        async guardarProducto() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/productos', this.producto);
                if (res.status === 200) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'El producto ha sido agregado',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.$router.push({ name: 'ListarProductos' });
                } else {
                    Swal.fire('Error!', 'Hubo un problema al guardar el producto', 'error');
                }
            } catch (error) {
                Swal.fire('Error!', error.response?.data?.message || error.message || 'Hubo un problema al guardar el producto', 'error');
            }
        },
        cancelar() {
            this.$router.push({ name: 'ListarProductos' });
        }
    },
    mounted() {
        this.cargarCategorias();
    }
}
</script>
