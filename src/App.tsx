import { remote } from 'electron';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { appStore } from './store';

// Components
import Navigation from './components/Navigation';

@Component({
  components: {
    Navigation,
  },
})
export default class App extends Vue {
  public created() {
    if (!this.locale) {
      appStore.setLanguage(remote.app.getLocale());
    }
  }

  public render() {
    return (
      <v-app dark id="app">
        <main>
          <Navigation />
          <router-view/>
        </main>
      </v-app>
    );
  }

  public get locale(): string | undefined {
    return appStore.language;
  }

  /**
   * @description Watches changes of locale
   * @see {@link store/App.ts}
   * @param {string | undefined} newLocale
   */
  @Watch('locale')
  public localeChanged(newLocale: string | undefined) {
    this.$i18n.locale = newLocale ? newLocale : this.$i18n.fallbackLocale;
  }
}
