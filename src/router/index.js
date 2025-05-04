import { createRouter, createWebHistory } from 'vue-router'
import SignUpForm from '@/views/SignUpForm.vue'
import VerifyPhoneView from '@/views/VerifyPhoneView.vue'
import PasswordView from '@/views/PasswordView.vue'

const routes = [
  {
    path: '/',
    name: 'signUp',
    component: SignUpForm
  },
  {
    path: '/verify/:phoneNumber',
    name: 'verify',
    component: VerifyPhoneView,
    props: true
  },
  {
    path: '/password/:phoneNumber',
    name: 'password',
    component: PasswordView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
