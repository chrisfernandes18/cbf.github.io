<template>
	<Loading
    v-model:active="this.loaded"
    :is-full-screen="false"
    loader="bars"
    :height="150"
    :width="130"
  />
	<div v-if="!this.loaded">
		<h1>Book List</h1>
		<div class="anime-list-container" v-for="(shelf, index) in this.myBooks.response">
			<BookListTile
				:name="index"
				:books="shelf"
			/>
		</div>
	</div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import BookListTile from '../components/BookListTile.vue';

export default {
	name: 'BookList',
	data() {
		return {
			APILink: 'https://wf7u6z3z05.execute-api.us-east-1.amazonaws.com/prod/',
			myBooks: {},
			loaded: true,
		};
	},
  components: {
    Loading,
		BookListTile,
  },
	async created() {
		const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'operation': 'get_books_from_all_shelves'
      })
    };
    const response = await fetch(this.APILink, options);
    this.myBooks = await response.json();
	},
	watch: {
		myBooks() {
			if (this.myBooks.status_code === 200) {
        this.loaded = false;
      }
		}
	},
	methods: {

	},
}
</script>