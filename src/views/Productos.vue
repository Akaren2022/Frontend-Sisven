<template>
    <div class="container">
        <h1 class="text-primary fw-bold">Lista de Productos</h1>
        <button class="btn btn-success mb-3" @click="nuevoProducto">Agregar Producto</button>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="producto in productos" :key="producto.id">
                    <td>{{ producto.id }}</td>
                    <td>{{ producto.nombre }}</td>
                    <td>{{ producto.precio }}</td>
                    <td>{{ producto.cantidad }}</td>
                    <td>{{ producto.nombreCategoria }}</td>
                    <td>
                        <button class="btn btn-primary" @click="editarProducto(producto.id)">Editar</button>
                        <button class="btn btn-danger" @click="eliminarProducto(producto.id)">Eliminar</button>
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
    name: 'ListarProductos',
    data() {
        return {
            productos: []
        }
    },
    methods: {
        async cargarProductos() {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/productos');
                if (res.status === 200) {
                    this.productos = res.data.productos;
                } else {
                    Swal.fire('Error!', 'Hubo un problema al cargar los productos', 'error');
                }
            } catch (error) {
                Swal.fire('Error!', error.response?.data?.message || error.message || 'Hubo un problema al cargar los productos', 'error');
            }
        },
        nuevoProducto() {
            this.$router.push({ name: 'NuevoProducto' });
        },
        editarProducto(id) {
            this.$router.push({ name: 'EditarProducto', params: { id: id } });
        },
        async eliminarProducto(id) {
            try {
                const res = await axios.delete(`http://127.0.0.1:8000/api/productos/${id}`);
                if (res.status === 200 && res.data.success) {
                    this.cargarProductos();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'El producto ha sido eliminado',
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    Swal.fire('Error!', 'Hubo un problema al eliminar el producto', 'error');
                }
            } catch (error) {
                Swal.fire('Error!', error.response?.data?.message || error.message || 'Hubo un problema al eliminar el producto', 'error');
            }
        }
    },
    mounted() {
        this.cargarProductos();
    }
}
</script>
