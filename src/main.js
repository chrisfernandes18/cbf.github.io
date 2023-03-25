import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from '@/App.vue';
import Home from '@/views/Home.vue';
import Projects from '@/views/Projects.vue';
import Photos from '@/views/Photos.vue';
import Contact from '@/views/Contact.vue';
import Blog from '@/views/Blog.vue';
import AnimeList from '@/views/AnimeList.vue';
import MangaList from '@/views/MangaList.vue';
import BookList from '@/views/BookList.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
    },
    {
      path: '/photos',
      name: 'Photos',
      component: Photos,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog,
    },
    {
      path: '/animelist',
      name: 'Anime List',
      component: AnimeList,
    },
    {
      path: '/mangalist',
      name: 'Manga List',
      component: MangaList,
    },
    {
      path: '/booklist',
      name: 'Book List',
      component: BookList,
    }
  ]
})

createApp(App)
.use(router)
.mount('#app')
