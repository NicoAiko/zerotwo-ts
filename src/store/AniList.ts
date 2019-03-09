import { action, getter, Module, mutation, VuexModule } from 'vuex-class-component';

// Custom components
import Log from '@/log';
import API from '@/modules/AniList/API';
import {
  AniListScoreFormat,
  AniListType,
  IAniListMediaListCollection,
  IAniListSession,
  IAniListUser,
} from '@/modules/AniList/types';

@Module()
export class AniListStore extends VuexModule {
  private _aniListData: IAniListMediaListCollection = { lists: [] };
  private _refreshRate: number = 15;
  private _session: IAniListSession = {
    accessToken: '',
    authorizationToken: '',
    user: {
      avatar: {
        medium: '',
      },
      bannerImage: '',
      id: -1,
      mediaListOptions: {
        scoreFormat: AniListScoreFormat.POINT_100,
      },
      name: '',
      stats: {
        watchedTime: 0,
      },
      options: {
        displayAdultContent: false,
      },
    },
  };

  @getter
  public get aniListData(): IAniListMediaListCollection {
    return this._aniListData;
  }

  @getter
  public get refreshRate(): number {
    return this._refreshRate;
  }

  @getter
  public get session(): IAniListSession {
    return this._session;
  }

  @action()
  public async refreshAniListData(): Promise<void> {
    if (!this.session.accessToken || !this.session.user.name) {
      return;
    }

    try {
      const userName: string = this.session.user.name;
      const accessToken = this.session.accessToken;

      const user = await API.getUser(accessToken);
      const userList = await API.getUserList(userName, AniListType.ANIME);

      if (userList && user) {
        this.setAniListData(userList);
        this.setUser(user);
      }
    } catch (error) {
      Log.log(Log.getErrorSeverity(), ['aniList', 'store', 'refreshAniListData'], error);
    }
  }

  @mutation
  protected setUser(data: IAniListUser) {
    this._session.user = data;
  }

  @mutation
  protected setAniListData(data: IAniListMediaListCollection) {
    this._aniListData = data;
  }
}

export const aniListModule = AniListStore.ExtractVuexModule(AniListStore);
