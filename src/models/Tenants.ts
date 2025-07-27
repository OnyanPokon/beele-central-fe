import Model from './Model';

export interface IncomingApiData {
  id: number;
  pendaftar: {
    id: number;
    nama_toko: string;
    nama_pemilik: string;
    email: string;
    telepon: string;
    domain: string;
    status: 'aktif' | 'nonaktif' | 'menunggu';
  };
  tanggal_kadaluwarsa: string;
  pilihan_paket: 'standar' | 'premium';
  status: 'aktif' | 'nonaktif';
  data: string;
  created_at: string;
  updated_at: string;
}

interface FormValue {
  registrant_id: number;
  expired_date: string;
  status: 'aktif' | 'nonaktif';
  choosen_package: 'standar' | 'premium';
}
export interface OutgoingApiData {
  pendaftar_id: number;
  tanggal_kadaluwarsa: string;
  status: 'aktif' | 'nonaktif';
  pilihan_paket: 'standar' | 'premium';
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class Tenants extends Model {
  constructor(
    public id: number,
    public registrant: {
      id: number;
      merchant_name: string;
      owner_name: string;
      email: string;
      telp: string;
      domain: string;
      status: 'aktif' | 'nonaktif' | 'menunggu';
    },
    public expired_date: string,
    public choosen_package: 'standar' | 'premium',
    public status: 'aktif' | 'nonaktif',
    public data: string,
    public created_at: string,
    public updated_at: string
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, Tenants> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, Tenants>;
    return new Tenants(
      apiData.id,
      {
        id: apiData.pendaftar.id,
        merchant_name: apiData.pendaftar.nama_toko,
        owner_name: apiData.pendaftar.nama_pemilik,
        email: apiData.pendaftar.email,
        telp: apiData.pendaftar.telepon,
        domain: apiData.pendaftar.domain,
        status: apiData.pendaftar.status
      },
      apiData.tanggal_kadaluwarsa,
      apiData.pilihan_paket,
      apiData.status,
      apiData.data,
      apiData.created_at,
      apiData.updated_at
    ) as ReturnType<T, IncomingApiData, Tenants>;
  }

  public static toApiData<T extends FormValue | FormValue[]>(tenants: T): ReturnType<T, FormValue, OutgoingApiData> {
    if (Array.isArray(tenants)) return tenants.map((object) => this.toApiData(object)) as ReturnType<T, FormValue, OutgoingApiData>;
    const apiData: OutgoingApiData = {
      pendaftar_id: tenants.registrant_id,
      tanggal_kadaluwarsa: tenants.expired_date,
      pilihan_paket: tenants.choosen_package,
      status: tenants.status
    };

    return apiData as ReturnType<T, FormValue, OutgoingApiData>;
  }
}
