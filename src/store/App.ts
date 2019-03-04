import { getter, Module, mutation, VuexModule } from 'vuex-class-component';
import { version } from '../../package.json';

/**
 * @module AppStore This store contains general data about the app.
 */
@Module()
export class AppStore extends VuexModule {
  private versionNumber: string = version;
  private locale?: string = undefined;

  /**
   * @method AppStore.version
   * @returns the current Version string
   */
  @getter
  public get version(): string {
    return this.versionNumber;
  }

  /**
   * @method AppStore.language
   * @returns the current language string or undefined, if not yet set.
   */
  @getter
  public get language(): string | undefined {
    return this.locale;
  }

  @mutation
  public setLanguage(language: string) {
    this.locale = language;
  }
}

export const appModule = AppStore.ExtractVuexModule(AppStore);
