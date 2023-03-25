<template>
  <h2>{{ fixName(this.name) }}</h2>
  <ul class="lines">
    <li class="list" v-for="({title, author, avg}, index) in this.books" :key="index">
      <b>{{ title }}</b>
      {{ ` by:  ${author}` }}
      <span class="rating"><b>{{ `${avg} / 5.00` }}</b></span>
    </li>
  </ul>
</template>

<script>
export default {
	name: 'BookListTile',
  props: ['name', 'books'],
  watch: {
    books() {
      console.log(this.books);
    }
  },
  methods: {
    fixName(name) {
      const split = name.split('-');
      if (split.length > 1) {
        const res = []
        for (const i in split) {
          let capWord = split[i].charAt(0).toUpperCase() + split[i].slice(1);
          res.push(capWord);
        }
        return res.join(' ');
      }
      const word = split[0];
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
  }
}
</script>