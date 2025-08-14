type ModelKeys = 'pendaftaran' | 'tenant' | 'permission' | 'pengguna' | 'testimoni' | 'berita';

export default abstract class Model {
  static children: { [key in ModelKeys]?: ModelChildren | ModelChildren[] } = {
    pendaftaran: undefined,
    tenant: undefined,
    permission: undefined,
    pengguna: undefined,
    testimoni: undefined,
    berita: undefined
  };
}

export type ModelChildren = new (...args: any[]) => Model;
