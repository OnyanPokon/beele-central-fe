type ModelKeys = 'pendaftaran' | 'tenant' | 'permission' | 'pengguna' | 'testimoni';

export default abstract class Model {
  static children: { [key in ModelKeys]?: ModelChildren | ModelChildren[] } = {
    pendaftaran: undefined,
    tenant: undefined,
    permission: undefined,
    pengguna: undefined,
    testimoni: undefined
  };
}

export type ModelChildren = new (...args: any[]) => Model;
