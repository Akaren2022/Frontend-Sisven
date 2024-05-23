import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Cliente from '../views/Clientes.vue'
import NuevoCliente from '../components/clientes/NuevoCliente.vue'
import EditarCliente from '../components/clientes/EditarCliente.vue'

import ListarCategorias from '../views/Categorias.vue'
import NuevaCategoria from '../components/categorias/NuevaCategoria.vue'
import EditarCategoria from '../components/categorias/EditarCategoria.vue'

import ListarMetodo from '../views/MetodosPago.vue'
import NuevoMetodo from '../components/metodos/NuevoMetodo.vue'
import EditarMetodo from '../components/metodos/EditarMetodo.vue'

import ListarProductos from '../views/Productos.vue'
import NuevoProducto from '../components/productos/NuevoProducto.vue'
import EditarProducto from '../components/productos/EditarProducto.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/clientes',
    name: 'Cliente',
    component: Cliente
  },
  {
    path: '/clientes/nuevo',
    name: 'NuevoCliente',
    component: NuevoCliente
  },
  {
    path: '/editar-cliente/:id',
    name: 'EditarCliente',
    component: EditarCliente
  },
  {
    path: '/categorias',
    name: 'ListarCategorias',
    component: ListarCategorias
  },
  {
    path: '/categorias/nuevo',
    name: 'NuevaCategoria',
    component: NuevaCategoria
  },
  {
    path: '/editar-Categoria/:id',
    name: 'EditarCategoria',
    component: EditarCategoria
  },
  {
    path: '/metodos',
    name: 'ListarMetodo',
    component: ListarMetodo
  },
  {
    path: '/metodos/nuevo',
    name: 'NuevoMetodo',
    component: NuevoMetodo
  },
  {
    path: '/editar-metodo/:id',
    name: 'EditarMetodo',
    component: EditarMetodo
  },
  {
    path: '/productos',
    name: 'ListarProductos',
    component: ListarProductos
  },
  {
    path: '/productos/nuevo',
    name: 'NuevoProducto',
    component: NuevoProducto
  },
  {
    path: '/editar-productos/:id',
    name: 'EditarProducto',
    component: EditarProducto,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
