<template>
  <div class="photos">
    <h1>Photos</h1>
    <h2>Costa Rica</h2>
    <h3>July 2019</h3>
    <PhotoGallery :photos=costaricaPhotos19 :photosId=0></PhotoGallery>
    <h3>December 2018</h3>
    <PhotoGallery :photos=costaricaPhotos18 :photosId=1></PhotoGallery>
    <h2>Eclipse</h2>
    <h3>August 2017</h3>
    <PhotoGallery :photos=eclipsePhotos :photosId=2></PhotoGallery>
    <h2>Japan</h2>
    <h3>July 2016</h3>
    <PhotoGallery :photos=japanPhotos :photosId=3></PhotoGallery>
  </div>
</template>

<script setup>
import PhotoGallery from '../components/PhotoGallery.vue';
const costaricaPhotos18 = Object.values(import.meta.glob('../assets/costa_rica/2018/*.jpg',  { eager: true, import: 'default', as: "url" }));
const costaricaPhotos19 = Object.values(import.meta.glob('../assets/costa_rica/2019/*.jpg',  { eager: true, import: 'default', as: "url" }));
const eclipsePhotos = Object.values(import.meta.glob('../assets/eclipse/*.jpg',  { eager: true, import: 'default', as: "url" }));
const japanPhotos = Object.values(import.meta.glob('../assets/japan/*.jpg',  { eager: true, import: 'default', as: "url" }));
</script>