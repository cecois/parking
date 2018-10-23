import Vue from 'vue'
import Router from 'vue-router'
import Default from '@/components/Default'
// import ATL from '@/components/atl'

Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/:lotset?/:lot?',
    name: 'Default',
    component: Default
  }
  // ,{
  //   path: '/atl',
  //   name: 'ATL',
  //   component: ATL
  // }
  ]
})