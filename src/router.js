/*global Vue*/
import Router from 'vue-router'
import TEST from '@/views/home/Test'
import Home from '@/views/home/Home'
import ShiKu from '@/views/home/ShiKu'
import ShiShe from '@/views/home/ShiShe'
import Person from '@/views/home/Person'
import Search from '@/views/home/Search'
import Login from '@/views/home/Login'
import PoetryDetails from '@/views/home/PoetryDetails'
import PoetryLibDetail from '@/views/home/PoetryLibDetail'
import PersonInfo from '@/views/home/PersonInfo'
import CommunityDetail from '@/views/home/CommunityDetail'
import AddPoem from '@/views/home/AddPoem'




Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path:'/addPoem',
      name:'AddPoem',
      component:AddPoem
    },
    {
      path:'/communityDetail',
      name:'CommunityDetail',
      component:CommunityDetail
    },
    {
      path:'/personInfo',
      name:'PersonInfo',
      component:PersonInfo
    },
    {
      path:'/poetryLibDetail',
      name:'PoetryLibDetail',
      component:PoetryLibDetail
    },
    {
      path:'/poetryDetails',
      name:'PoetryDetails',
      component:PoetryDetails
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/shiku',
      name: 'ShiKu',
      component: ShiKu
    },
    {
      path: '/shishe',
      name: 'ShiShe',
      component: ShiShe
    },
    {
      path: '/person',
      name: 'Person',
      component: Person
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path:'/test',
      name:'TEST',
      component:TEST
    }
  ]
})
