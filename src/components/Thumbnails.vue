<template>
  <li class="footer-element" v-for="({icon, link, altText}, index) in socials" :key="index">
    <a :href="link">
      <img
        :src="icon"
        width="50"
        height="50"
        :alt="altText"
      />
    </a>
  </li>
</template>

<script>
import fb from '@/assets/icons/facebook-icon.svg'
import gh from '@/assets/icons/github-icon.svg'
import ig from '@/assets/icons/instagram-icon.png'
import li from '@/assets/icons/linkedin-icon.svg'

export default {
  name: 'Thumbnails',
  data() {
    return {
      socials: [
        {
          icon: fb,
          link: 'https://www.facebook.com/christian.bjerre.fernandes',
          altText: 'Facebook Icon',
        },
        {
          icon: gh,
          link: 'https://github.com/chrisfernandes18',
          altText: 'Github Icon',
        },
        {
          icon: ig,
          link: 'https://www.instagram.com/chrispoof',
          altText: 'Instagram Icon',
        },
        {
          icon: li,
          link: 'https://www.linkedin.com/in/christian-bjerre-fernandes',
          altText: 'Linkedin Icon',
        },
      ],
    };
  },
};
</script>


<style>
.footer-element {
  display: inline-block;
  margin: 3vh 1vw;
}

.footer-element a {
  display: block;
  color: white;
  text-align: center;
  text-decoration: none;
}
</style>