<template>
  <Loading
    v-model:active="this.allLoaded"
    :is-full-screen="false"
    loader="bars"
    :height="150"
    :width="130"
  />
  <div v-if="!this.allLoaded">
    <h1>My Manga List</h1>
    <div class="anime-manga-container">
      <div class="anime-manga-card" v-for="(val, index) in this.myManga.response.data" :key="val.node.id" :style="{ backgroundColor: val.node.color }">
        <a :href="'https://myanimelist.net/manga/' + val.node.id">
          <img :src="val.node.main_picture.large" alt="Show Cover"/>
        </a>
        <p>{{val.node.title}}</p>
        <div class="layer-slidedown">
          <div class="layer-slidedown-text">{{ val.list_status.status === 'reading' ? "Currently reading." : val.list_status.status === 'completed' ? "Completed." : val.list_status.status === 'plan_to_read'? "Plan to read." : 'Dropped.' }}</div>
          <div></div>
          <div class="layer-slidedown-text">{{ `Read: ${ val.list_status.num_chapters_read }/${ val.node.num_chapters === 0 ? '?' : val.node.num_chapters } Chapters` }}</div>
          <div></div>
          <div class="layer-slidedown-text">{{ `Read: ${ val.list_status.num_volumes_read }/${ val.node.num_volumes === 0 ? '?' : val.node.num_volumes } Volumes` }}</div>
          <div></div>
          <div class="layer-slidedown-text">{{ `Score: ${ val.list_status.score }/10` }}</div>
          <div></div>
          <div class="layer-slidedown-text"><a :href="'https://myanimelist.net/manga/' + val.node.id" >{{ "MAL Link" }}</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';

export default {
  name: "MangaListTiles",
  data() {
    return {
      APILink: 'https://wf7u6z3z05.execute-api.us-east-1.amazonaws.com/prod/',
      myManga: {},
      allLoaded: true,
    };
  },
  components: {
    Loading
  },
  async created() {
    // get MAL data from lambda API
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'operation': 'get_manga_list'
      })
    };
    const response = await fetch(this.APILink, options);
    this.myManga = await response.json();

    // setting value to stop loading component
    this.allLoaded = false;
  },
  watch: {
    myManga() {
      if (this.myManga.status_code === 200) {
        this.addColor(this.myManga);
      }
    },
  },
  methods:  {
    /**
     * @description
     * Given response from lambda check watch list status
     * to add background color matching watching list status.
     * 
     * @param {Object} mangas 
     * @returns {Void}
     */
     addColor(mangas) {
      for (const index in mangas.response.data ) {
        switch (mangas.response.data[index].list_status.status) {
          case 'reading':
            mangas.response.data[index].node['color'] = '#E6ADD8';
            break;
          case 'plan_to_read':
            mangas.response.data[index].node['color'] = '#D7E6AD';
            break;
          case 'dropped':
            mangas.response.data[index].node['color'] = '#E6BBAD';
            break;
          case 'completed':
            mangas.response.data[index].node['color'] = '#E7F3F7';
            break;
          default:
            mangas.response.data[index].node['color'] = '#F6FCFC';
        };
      }
    },
  },
}
</script>