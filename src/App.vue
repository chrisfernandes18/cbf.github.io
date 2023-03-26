<template>
  <div class="App">
    <div class="navigation">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/projects" class="item">Projects</RouterLink>
      <RouterLink to="/photos" class="item">Photos</RouterLink>
      <RouterLink to="/contact" class="item">Contact</RouterLink>
      <div class="dropdown" @click="onClickEvent($event)">
        <div class="extra-items">
          More
          <i class="fa fa-caret-down"></i>
        </div>
        <div class="dropdown-content" id="myDropdown">
          <RouterLink to="/blog" class="item">Blog</RouterLink>
          <RouterLink to="/animelist" class="item">Anime List</RouterLink>
          <RouterLink to="/mangalist" class="item">Manga List</RouterLink>
          <RouterLink to="/booklist" class="item">Book List</RouterLink>
        </div>
      </div>
    </div>

    <RouterView></RouterView>
    
    <div class="container">
      <ul class="footer">
        <Thumbnails></Thumbnails>
      </ul>
    </div>
    <div class="copyright-footer">
      <p class="copyright-text">Designed & Built by Christian Bjerre-Fernandes</p>
    </div>
  </div>
</template>

<script setup>
import './assets/main.css';
import Thumbnails from '@/components/Thumbnails.vue';

/**
 * @description
 * Click event handler to show dropdown menu in navbar
 * 
 * @param {Object} event 
 * @returns {Void}
 */
function onClickEvent(event) {
  document.getElementById('myDropdown').classList.toggle('show-dropdown');
};

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  // catch click target and check to make sure the class isn't .extra-items
  if (!event.target.matches('.extra-items')) {
    // get the dropdown element and if it's toggled to show remove the class to show it
    const myDropdown = document.getElementById('myDropdown');
    if (myDropdown.classList.contains('show-dropdown')) {
      myDropdown.classList.remove('show-dropdown');
    }
  }
};

</script>

<style>
</style>
