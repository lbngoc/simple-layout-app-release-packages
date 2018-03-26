<template>
  <div id="app">
    <release-list :items="releases" />
  </div>
</template>

<script>
import ReleaseList from "./ReleaseList"

export default {
  name: 'app',
  components: {
    ReleaseList
  },
  data () {
    return {
      releases: []
    }
  },
  created() {
    fetch('app.packages.json')
    .then(r => r.json())
    .then(releases => {
      if (typeof releases === 'object') {
        this.releases = releases;
      }
    })
  }
}
</script>

<style lang="scss">
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }

// h1, h2 {
//   font-weight: normal;
// }

// ul {
//   list-style-type: none;
//   padding: 0;
// }

// li {
//   display: inline-block;
//   margin: 0 10px;
// }

// a {
//   color: #42b983;
// }
</style>
