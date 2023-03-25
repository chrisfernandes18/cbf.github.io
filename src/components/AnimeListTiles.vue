<template>
  <Loading
    v-model:active="this.allLoaded"
    :is-full-screen="false"
    loader="bars"
    :height="150"
    :width="130"
  />
  <div v-if="!this.allLoaded">
    <h1>Anime List</h1>
    <h2>{{ `Current ${this.season} Anime ${this.year}` }}</h2>
    <h4>Source: anichart.net</h4>
    <div class="anime-manga-container">
      <div v-if="!this.loadedMyAnime"></div>
      <div v-if="this.loadedMyAnime" class="anime-manga-card" v-for="(show, index) in this.aniChartAnime" :key="index">
        <a :href="officialSite(show.externalLinks.filter(exlink => exlink.site === 'Official Site'))">
          <img :src="show.coverImage.extraLarge" alt="Show Cover Image"/>
        </a>
        <p>{{ show.title.romaji }}</p>
        <div class="layer-slidedown">
          <div class="layer-slidedown-text">{{ airingStatus(show.nextAiringEpisode) }}</div>
          <div class="layer-slidedown-text">{{ removeTags(show.description) }}</div>
        </div>
      </div>
    </div>
    <h2>My Anime List</h2>
    <h4>Source: myanimelist.net</h4>
    <div class="anime-manga-container">
      <div v-if="!this.loadedMyAnime"></div>
      <div v-if="this.loadedMyAnime" class="anime-manga-card" v-for="(val, index) in this.myAnime.response.data" :key="val.node.id" :style="{ backgroundColor: val.node.color }">
        <a :href="'https://myanimelist.net/anime/' + val.node.id">
          <img :src="val.node.main_picture.large" alt="Show Cover"/>
        </a>
        <p>{{val.node.title}}</p>
        <div class="layer-slidedown">
          <div class="layer-slidedown-text">{{ val.list_status.status === 'watching' ? "Currently watching." : val.list_status.status === 'completed' ? "Completed." : val.list_status.status === 'plan_to_watch'? "Plan to watch." : 'Dropped.' }}</div>
          <div></div>
          <div class="layer-slidedown-text">{{ `Watched: ${val.list_status.num_episodes_watched}/${val.node.num_episodes}` }}</div>
          <div></div>
          <div class="layer-slidedown-text">{{ `Score: ${val.list_status.score}/10` }}</div>
          <div></div>
          <div class="layer-slidedown-text"><a :href="'https://myanimelist.net/anime/' + val.node.id" >{{ "MAL Link" }}</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { removeTags, timezone } from '@/util/Helpers.util.js';
import Loading from 'vue-loading-overlay';

export default {
  name: "AnimeListTiles",
  data() {
    return {
      APILink: 'https://wf7u6z3z05.execute-api.us-east-1.amazonaws.com/prod/',
      myAnime: {},
      loadedMyAnime: false,
      date: new Date(),
      year: 0,
      season: "",
      aniChartAnime: {},
      loadedAniChart: false,
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
        'operation': 'get_anime_list'
      })
    };
    const response = await fetch(this.APILink, options);
    this.myAnime = await response.json();
    
    // set boolean for loaded MAL data
    this.loadedMyAnime = true;

    // update some data variables
    this.year = this.date.getFullYear();
    const m = this.date.getMonth();
    this.season = m >= 0 && m <= 2 ? "Winter" : m >= 3 && m <= 5 ? "Spring" : m >= 6 && m <= 8 ? "Summer" : "Fall";

    // make AniChart call
    this.aniChartAnime = await this.getAniChartData(this.season.toUpperCase(), this.year);

    // set booleana for loaded AniChart data
    this.loadedMyAnime = true;

    // everything loaded
    this.allLoaded = !!(this.loadedMyAnime && this.loadedAniChart);
  },
  watch: {
    myAnime() {
      if (this.myAnime.status_code == 200) {
        this.addColor(this.myAnime);
      }
    }
  },
  methods: {
    /**
     * @description
     * Given response from lambda check watch list status
     * to add background color matching watching list status.
     * 
     * @param {Object} animes 
     * @returns {Void}
     */
    addColor(animes) {
      for (const index in animes.response.data ) {
        switch (animes.response.data[index].list_status.status) {
          case 'watching':
            animes.response.data[index].node['color'] = '#E6ADD8';
            break;
          case 'plan_to_watch':
            animes.response.data[index].node['color'] = '#D7E6AD';
            break;
          case 'dropped':
            animes.response.data[index].node['color'] = '#E6BBAD';
            break;
          case 'completed':
            animes.response.data[index].node['color'] = '#E7F3F7';
            break;
          default:
            animes.response.data[index].node['color'] = '#F6FCFC';
        };
      }
    },
    /**
     * @description
     * Given the current season and year
     * returns the AniChart data showing that
     * season's current anime.
     * 
     * @param {String} season 
     * @param {Number} seasonYear 
     * @returns {Object} GraphQL query response
     */
    async getAniChartData(season, seasonYear) {
      // GraphQL filter parameters
      const vars = {
        season: season,
        page: 1,
        perPage: 20,
        seasonYear: seasonYear,
      };

      // GrahpQL query
      const query = `
      query ($season: MediaSeason, $page: Int, $perPage: Int, $seasonYear: Int) {
        page: Page(page: $page, perPage: $perPage) {
          pageInfo: pageInfo {
            total
            perPage
            currentPage
            lastPage
            hasNextPage
          }
          anime: media(season: $season, seasonYear: $seasonYear, sort:POPULARITY_DESC) {
            title {
              native
              romaji
              english
            }
            description
            startDate {
              year
              month
              day
            }
            endDate {
              year
              month
              day
            }
            coverImage {
              extraLarge
              large
              medium
              color
            }
            bannerImage
            genres
            startDate {
              year
              month
              day
            }
            nextAiringEpisode {
              airingAt
              timeUntilAiring
              episode
            }
            popularity
            externalLinks {
              id
              url
              site
            }
          }
        }
      }
      `;
    
      const url = 'https://graphql.anilist.co';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: vars
        })
      };
      // fetch call to graphql 
      const response = await fetch(url, options)
        .then(response => response.json())
        .then(data => {
          return data.data.page.anime;
        })
        .catch(error => console.log(error));
      return response;
    },
    /**
     * @description
     * Given an array of objects filters down to get official site
     * for the anime. If none is given, returns current webpage.
     * 
     * @param {Array} externalLinks 
     * @returns {String} url or current web page
     */
    officialSite(externalLinks) {
      const filteredSites = externalLinks.filter(exlink => exlink.site === "Official Site");
      if (filteredSites.length !== 0) {
        return filteredSites[0].site === 'Official Site' ? filteredSites[0].url : '/animelist'; 
      }
      return '/animelist';
    },
    /**
     * @description
     * Given an object of potential airing date, returns
     * a string indicating whether the show has competed airing
     * or the next date and time the show airs.
     * 
     * @param {Object} nextAiringEpisode
     * @returns {String} completed or next airing date and time
     */
    airingStatus(nextAiringEpisode) {
      const airing = nextAiringEpisode?.airingAt ?? 'Completed';
      if (airing === 'Completed') {
        return 'Finished Airing';
      }
      const time = new Date(airing * 1000);
      return ''.concat('Airing on ', (time.getMonth() + 1).toString(), '-', time.getDate(), '-', time.getFullYear(), ' at ', time.getHours(), ':', time.getMinutes() < 10? "0" + time.getMinutes(): time.getMinutes(), ' ', timezone())
    },
    // Imported functions to be used as methods
    timezone,
    removeTags,
  },
};
</script>