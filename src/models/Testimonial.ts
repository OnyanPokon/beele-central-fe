import Model from './Model';

export interface IncomingApiData {
  id: number;
  nama: string;
  instansi: string;
  status: 'menunggu' | 'publikasi';
  deskripsi: string;
  rating: number;
}

interface FormValue {
  name: string;
  agency: string;
  status: 'menunggu' | 'publikasi';
  desc: string;
  rating: number;
}

export interface OutgoingApiData {
  nama: string;
  instansi: string;
  status: 'menunggu' | 'publikasi';
  deskripsi: string;
  rating: number;
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class Testimonial extends Model {
  constructor(
    public id: number,
    public name: string,
    public agency: string,
    public status: 'menunggu' | 'publikasi',
    public desc: string,
    public rating: number
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, Testimonial> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, Testimonial>;
    return new Testimonial(apiData.id, apiData.nama, apiData.instansi, apiData.status, apiData.deskripsi, apiData.rating) as ReturnType<T, IncomingApiData, Testimonial>;
  }

  public static toApiData<T extends FormValue | FormValue[]>(testimonial: T): ReturnType<T, FormValue, OutgoingApiData> {
    if (Array.isArray(testimonial)) return testimonial.map((object) => this.toApiData(object)) as ReturnType<T, FormValue, OutgoingApiData>;
    const apiData: OutgoingApiData = {
      nama: testimonial.name,
      instansi: testimonial.agency,
      status: testimonial.status,
      deskripsi: testimonial.desc,
      rating: testimonial.rating
    };

    return apiData as ReturnType<T, FormValue, OutgoingApiData>;
  }
}
