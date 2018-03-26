<template>
<div>
  <sui-accordion-title :active="isActive">
    <sui-icon name="dropdown" />
    {{ getReleaseTitle() }}
  </sui-accordion-title>
  <sui-accordion-content :active="isActive">
    <h3>Install:</h3>
    <sui-button disabled content="Not Available" icon="clock outline" v-if="!release.ios && !release.android" />
    <div is="sui-button-group">
      <a :href="getBinPath('ios')" v-if="release.ios">
        <sui-button icon="apple">IOS</sui-button>
      </a>
      <sui-button-or v-if="release.ios && release.android" />
      <a :href="getBinPath('android')" v-if="release.android">
        <sui-button positive icon="android">Android</sui-button>
      </a>
    </div>
    <h3>Description:</h3>
    <div v-html="getDescription"></div>
  </sui-accordion-content>
  </div>
</template>

<script>
import marked from 'marked';
export default {
  name: "release-item",
  props: ["release", "isActive"],
  computed: {
    getDescription() {
      let desc = this.release.description;
      if (desc) {
        if (typeof desc === 'object') {
          desc = desc.join('\n');
        }
        return marked(desc);
      }
      return 'N/A';
    }
  },
  methods: {
    getReleaseTitle() {
      let appSettings = window.SETTINGS || {};
      if (typeof appSettings.getReleaseTitle === 'function') {
        return appSettings.getReleaseTitle(this.release);
      }
      return [
        this.release.sprint ? 'Sprint ' + this.release.sprint + ' - ' : '',
        this.release.version ? 'v' + this.release.version : '',
        this.release.buildNumber ? ' build ' + this.release.buildNumber : '',
        this.release.date ? ' (' + this.release.date + ')' : ''
      ].join('');
    },
    getBinPath(os) {
      let appSettings = window.SETTINGS || {};
      let baseUrl = window.location.origin + window.location.pathname,
        appName = appSettings.appName || 'app',
        binDir = appSettings.binDir || 'packages',
        isIOS = (os === 'ios');

      baseUrl = isIOS ? 'itms-services://?action=download-manifest&url=' + baseUrl : '';
      let url = null;
      if (isIOS && typeof this.release.ios === 'string') {
        url = this.release.ios;
      }
      if (!isIOS && typeof this.release.android === 'string') {
        url = this.release.android;
      }
      if (!url) {
        if (typeof appSettings.getBinPath === 'function') {
          url = appSettings.getBinPath(os, this.release);
        } else {
          url = [
            binDir,
            // isIOS ? 'ios' : 'android',
            'v' + this.release.version,
            isIOS ? 'app.plist' : appName + '.apk'
          ].join('/');
        };
      }

      return baseUrl + url;
    },
  },
};
</script>

