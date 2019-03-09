import { action, getter, Module, mutation, VuexModule } from 'vuex-class-component';

// Custom components
import API from '@/modules/AniList/API';
import { AniListType, IAniListMediaListCollection, IAniListSession } from '@/modules/AniList/types';

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
      name: '',
      stats: {
        watchedTime: 0,
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

  @mutation
  public setAniListData(data: IAniListMediaListCollection) {
    this._aniListData = data;
  }

  @action()
  public async refreshAniListData(): Promise<void> {
    if (!this.session.accessToken) {
      return;
    }

    // TODO: Add AniList API calls here
    const userList = await API.getUserList(this.session.user.name, AniListType.ANIME);
    this.setAniListData(userList);
  }
}
