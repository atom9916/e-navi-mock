import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue' 
import Login from '../views/LoginView.vue'
import { useStoreAuth } from '@/stores/login'
import Logout from '../views/LogoutView.vue'
import Admin from '@/views/AdministratorView.vue'
import Approve from '../views/AdminApproveView.vue'
import PaidOff from '../views/AdminPaidOffView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{requiresAuth:true}
    },
    {
      path: '/monthly',
      name: 'monthlyt',
      component: () => import('../views/MonthlyView.vue'),
      meta:{requiresAuth:false}
    },
    {
      path: '/daily',
      name: 'daily',
      component: () => import('../views/DailyView.vue'),
      meta:{requiresAuth:true}
    },
    {
      path: '/daily/attendanceRegistration',
      name: 'attendanceRegistration',
      component: () => import('../views/AttendanceRegistrationVeiw.vue'),
      meta:{requiresAuth:true}
    },
    {
      path: '/daily/attendanceRegistration/attendanceCompleted',
      name: 'attendanceCompleted',
      component: () => import('../views/AttendanceCompletedView.vue'),
      meta:{requiresAuth:true}
    },
    {
      path: '/:pathmatch(.*)*',
      name: 'notFound',
      component: NotFound,
      
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{requiresAuth:false}
      // ここはfalse
    },
    {
      path:'/logout',
      name:'logout',
      component:Logout
    },
    {
      path:'/admin',
      name:'/admin',
      component:Admin
    },
    {
      path:'/admin/paidOff',
      name:'paidOff',
      component:PaidOff
    },
    {
      path:'/admin/approve',
      name:'approve',
      component:Approve
    }

  ]
})

// 上記をtrueに設定したらログインが完了してないと、('/login')にリダイレクトする作りにしています
router.beforeEach((to,from,next)=>{
  if(to.meta.requiresAuth){
    const isAuthenticated = useStoreAuth()
    if(isAuthenticated.isLoggedIn){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
})


export default router
