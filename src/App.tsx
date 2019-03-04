import { remote } from 'electron';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { appStore } from './store';
@Component
export default class App extends Vue {
  public created() {
    if (!this.locale) {
      appStore.setLanguage(remote.app.getLocale());
    }
  }

  public render() {
    return (
      <div id="app">
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>
        <router-view/>
      </div>
    );
  }

  public get locale(): string | undefined {
    return appStore.language;
  }

  @Watch('locale')
  public localeChanged(newLocale: string | undefined) {
    this.$i18n.locale = newLocale ? newLocale : this.$i18n.fallbackLocale;
  }
}
