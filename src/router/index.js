import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Cliente from '../views/Clientes.vue'
import NuevoCliente from '../components/clientes/NuevoCliente.vue'
import EditarCliente from '../components/clientes/EditarCliente.vue'

import ListarCategorias from '../views/Categorias.vue'
import NuevaCategoria from '../components/categorias/NuevaCategoria.vue'
import EditarCategoria from '../components/categorias/EditarCategoria.vue'

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
