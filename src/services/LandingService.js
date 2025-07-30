import { Registrants } from '@/models';
import api from '@/utils/api';

export default class LandingService {
  /**
   * @param {Registrants} data
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  errors?: { [key: string]: string[] };
   * }}
   */
  static async memberRegister(data) {
    return await api.post('/pendaftar/registrasi', { body: Registrants.toApiData(data) });
  }

  static async domainChecker(data) {
    return await api.post('/pendaftar/cek-domain', { body: data });
  }
}
