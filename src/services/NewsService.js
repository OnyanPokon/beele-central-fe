/* eslint-disable no-unused-vars */
import { News } from '@/models';
import api from '@/utils/api';

export default class NewsService {
  /**
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  data?: News[];
   * }>}
   * */
  static async getAll({ token, ...filters }) {
    const params = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null && value !== undefined && value !== ''));
    const response = await api.get('/berita', { token, params });
    if (!response.data) return response;
    return { ...response, data: News.fromApiData(response.data) };
  }

  /**
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  data?: News;
   * }>}
   * */
  static async getBySlug(slug) {
    const response = await api.get(`/berita/${slug}`);
    if (!response.data) return response;
    return { ...response, data: News.fromApiData(response.data) };
  }

  /**
   * @param {News} data
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  errors?: { [key: string]: string[] };
   * }}
   */
  static async store(data, token, file) {
    return await api.post('/berita', { body: News.toApiData(data), token, file: { thumbnail: file } });
  }

  /**
   * @param {number} id
   * @param {News} data
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  errors?: { [key: string]: string[] };
   * }>}
   */
  static async update({ id, data, token, file }) {
    return await api.post(`/berita/${id}`, { body: News.toApiData(data), token, file: { thumbnail: file } });
  }

  /**
   * @param {number} id
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   * }>}
   */
  static async delete(id, token) {
    return await api.delete(`/berita/${id}`, { token });
  }

  /**
   * @param {number[]} ids
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   * }>}
   */
  static async deleteBatch(ids, token) {
    return await api.delete(`/berita?ids=${ids.join(',')}`, { token });
  }
}
