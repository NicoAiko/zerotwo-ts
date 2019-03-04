import { Module, VuexModule, getter } from 'vuex-class-component';
import { version } from '../../package.json';

/**
 * @module AppStore This store contains general data about the app.
 */
@Module()
export class AppStore extends VuexModule {
  private versionNumber: string = version;

  @getter
  public get version() {
    return this.versionNumber;
  }
}

export const appModule = AppStore.ExtractVuexModule(AppStore);
