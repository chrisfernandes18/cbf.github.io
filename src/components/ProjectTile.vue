<template>
  <a v-for="({link, projectName, description, language}, index) in projects" :key="index" :href="link" target="blank_" rel="noopener noreferrer">
    <div className="card-container">
      <h3>{{ projectName }}</h3>
      <p>{{ description }}</p>
      <div className="tech-container">
        <text>
          {{ language }}
        </text>
      </div>
      <div className="bottom"></div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'ProjectTile',
  data() {
    return {
      projects: [
        {
          link: ' https://github.com/chrisfernandes18/Command-Line-MAL',
          projectName: 'Command Line MAL',
          description: 'Search MyAnimeList.net from the command line and save searches into a csv file.',
          language: 'Python',
        },
        {
          link: 'https://github.com/chrisfernandes18/Jisho',
          projectName: 'Jisho',
          description: 'Search up Japanese words on https://www.jisho.org from the command line.',
          language: 'Python',
        },
        {
          link: 'https://github.com/chrisfernandes18/Connect4',
          projectName: 'Connect 4',
          description: 'Play Connect 4 on your computer.',
          language: 'Python',
        },
        {
          link: 'https://github.com/chrisfernandes18/functional-project',
          projectName: 'Checkers',
          description: 'Play checkers in a browser.',
          language: 'Elm',
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