import Model from './Model';

export interface IncomingApiData {
  id: number;
  nama_toko: string;
  nama_pemilik: string;
  email: string;
  telepon: string;
  domain: string;
  status: 'aktif' | 'nonaktif' | 'menunggu';
  created_at: string;
  updated_at: string;
}

interface FormValue {
  merchant_name: string;
  owner_name: string;
  email: string;
  telp: string;
  domain: string;
  status: 'aktif' | 'nonaktif' | 'menunggu';
}

export interface OutgoingApiData {
  nama_toko: string;
  nama_pemilik: string;
  email: string;
  telepon: string;
  domain: string;
  status: 'aktif' | 'nonaktif' | 'menunggu';
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class Registrants extends Model {
  constructor(
    public id: number,
    public merchant_name: string,
    public owner_name: string,
    public email: string,
    public telp: string,
    public domain: string,
    public status: 'aktif' | 'nonaktif' | 'menunggu',
    public created_at: string,
    public updated_at: string
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, Registrants> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, Registrants>;
    return new Registrants(apiData.id, apiData.nama_toko, apiData.nama_pemilik, apiData.email, apiData.telepon, apiData.domain, apiData.status, apiData.created_at, apiData.updated_at) as ReturnType<T, IncomingApiData, Registrants>;
  }

  public static toApiData<T extends FormValue | FormValue[]>(registrant: T): ReturnType<T, FormValue, OutgoingApiData> {
    if (Array.isArray(registrant)) return registrant.map((object) => this.toApiData(object)) as ReturnType<T, FormValue, OutgoingApiData>;
    const apiData: OutgoingApiData = {
      nama_toko: registrant.merchant_name,
      nama_pemilik: registrant.owner_name,
      email: registrant.email,
      telepon: registrant.telp,
      domain: registrant.domain,
      status: registrant.status
    };

    return apiData as ReturnType<T, FormValue, OutgoingApiData>;
  }
}
