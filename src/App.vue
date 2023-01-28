<template>
  <div class="App">
    <div class="navigation">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/projects" className="item">Projects</RouterLink>
      <RouterLink to="/photos" className="item">Photos</RouterLink>
      <RouterLink to="/contact" className="item">Contact</RouterLink>
      <RouterLink to="/blog" className="item">Blog</RouterLink>
    </div>

    <RouterView></RouterView>
    
    <div class="container">
      <ul class="footer">
        <Thumbnails></Thumbnails>
      </ul>
    </div>
    <div className="copyright-footer">
      <p className="copyright-text">Designed & Built by Christian Bjerre-Fernandes</p>
    </div>
  </div>
</template>

<script setup>
import './assets/main.css'
import Thumbnails from './components/Thumbnails.vue'
</script>

<style>
</style>
