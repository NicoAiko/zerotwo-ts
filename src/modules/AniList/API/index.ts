import Axios, { AxiosInstance } from 'axios';
import { readFileSync } from 'fs';

// Custom Components
import Log from '@/log';
import { AniListType } from '../types';

const axios: AxiosInstance = Axios.create({
  baseURL: 'https://graphql.anilist.co/',
  timeout: 60000,
  headers: {
    'Access-Origin-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Queries
const getUserList = readFileSync('./queries/getUserList.graphql');

export default class AniListAPI {
  public static async getUserList(userName: string, type: AniListType) {
    try {
      const response = await axios.post('/', {
        query: getUserList,
        variables: {
          userName,
          type,
        },
      });

      return response.data.data.list;
    } catch (error) {
      Log.log(Log.getErrorSeverity(), ['aniList', 'api', 'getUserList'], error);
    }
  }

  private constructor() {}
}
