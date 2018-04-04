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
    let appSettings = window.SETTINGS || {};
    let appDataPath = appSettings.appData || 'app.packages.json';
    appDataPath += '?v=' + new Date().getTime(); // Force no-cache
    this.$http.get(appDataPath)
      .then(resp => {
        if (resp.status == 200) {
          this.releases = resp.body;
        } else {
          console.log('Get jsondata error', resp);
        }
      }, resp => {
        console.log('Get jsondata error', resp);
      });
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
