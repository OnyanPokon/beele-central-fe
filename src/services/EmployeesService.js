/* eslint-disable no-unused-vars */
import { Employees } from '@/models';
import api from '@/utils/api';

export default class EmployeesService {
  /**
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  data?: Employees[];
   * }>}
   * */
  static async getAll({ token, ...filters }) {
    const params = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null && value !== undefined && value !== ''));
    const response = await api.get('/pengguna', { token, params });
    if (!response.data) return response;
    return { ...response, data: Employees.fromApiData(response.data) };
  }

  static async getAllPermissions(token) {
    const response = await api.get(`/permission`, { token });
    if (!response.data) return response;
    return { ...response, data: response.data };
  }

  /**
   * @param {Employees} data
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  errors?: { [key: string]: string[] };
   * }}
   */
  static async store(data, token) {
    return await api.post('/pengguna', { body: Employees.toApiData(data), token });
  }

  /**
   * @param {number} id
   * @param {Employees} data
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  errors?: { [key: string]: string[] };
   * }>}
   */
  static async update(id, data, token) {
    return await api.patch(`/pengguna/${id}`, { body: Employees.toApiData(data), token });
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
    return await api.delete(`/pengguna/${id}`, { token });
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
    return await api.delete(`/pengguna?ids=${ids.join(',')}`, { token });
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
  static async resetPassword(id, token) {
    return await api.patch(`/pengguna/reset-password/${id}`, { token });
  }

  /**
   * @param {number} id
   * @param {Employees} data
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  errors?: { [key: string]: string[] };
   * }>}
   */
  static async updatePermissions(id, data, token) {
    return await api.patch(`/pengguna/akses-kontrol/${id}`, { body: data, token });
  }
}
