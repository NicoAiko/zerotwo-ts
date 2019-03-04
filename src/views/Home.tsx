import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld';
import { appStore } from '../store';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  public render() {
    return (
      <div class="home">
        <h1>{this.version}</h1>
        <img alt="Vue logo" src={require('../assets/logo.png')} />
        <HelloWorld />
      </div>
    );
  }

  private get version() {
    return appStore.version;
  }
}
