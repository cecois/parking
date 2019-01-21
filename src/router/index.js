import Vue from 'vue'
import Router from 'vue-router'
import DEFAULT from '@/components/Default'
import TIMELINE from '@/components/timeline'

Vue.use(Router)

export default new Router({
  routes: [
  {
    // path: '/:lot?/:slug?/:map?/:bbox?',
    path: '/',
    name: 'Default',
    component: DEFAULT
  }
  ,{
    path: '/:component?',
    name: 'Timeline',
    component: TIMELINE
  }
  ]
})
