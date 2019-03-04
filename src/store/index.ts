import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { userSettingsModule, UserSettings } from './UserSettings';
import { AppStore, appModule } from './App';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},
  modules: {
    userSettingsModule,
    appModule,
  },
  // To keep mutated changes in local Storage
  plugins: [new VuexPersistence().plugin],
});

/**
 * @module UserSettings This module consists of all user settings
 * @description This creates a proxy for the Vue Templates to use.
 */
export const userStore = UserSettings.CreateProxy(store, UserSettings);
/**
 * @module AppStore This module contains all general App data
 */
export const appStore = AppStore.CreateProxy(store, AppStore);
