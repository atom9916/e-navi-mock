import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue' 
import Login from '../views/LoginView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{requiresAuth:false}
      // バックの実装が完了したらtrueに修正します
    },
    {
      path: '/monthly',
      name: 'monthlyt',
      component: () => import('../views/MonthlyView.vue'),
      meta:{requiresAuth:false}
      // バックの実装が完了したらtrueに修正します
    },
    {
      path: '/dayly',
      name: 'dayly',
      component: () => import('../views/DaylyView.vue'),
      meta:{requiresAuth:false}
      // バックの実装が完了したらtrueに修正します
    },
    {
      path: '/dayly/attendanceRegistration',
      name: 'attendanceRegistration',
      component: () => import('../views/AttendanceRegistrationVeiw.vue'),
      meta:{requiresAuth:false}
      // バックの実装が完了したらtrueに修正します
    },
    {
      path: '/dayly/attendanceRegistration/attendanceCompleted',
      name: 'attendanceCompleted',
      component: () => import('../views/AttendanceCompletedView.vue'),
      meta:{requiresAuth:false}
      // バックの実装が完了したらtrueに修正します
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
    }
  ]
})

// 上記をtrueに設定したらログインが完了してないと、('/login')にリダイレクトする作りにしています
router.beforeEach((to,from,next)=>{
  if(to.meta.requiresAuth){
    const isAuthenticated = false
    if(isAuthenticated){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
})


export default router
