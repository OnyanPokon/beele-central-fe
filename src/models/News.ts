import asset from '@/utils/asset';
import Model from './Model';

export interface IncomingApiData {
  id: number;
  thumbnail: string;
  judul: string;
  deskripsi: string;
  slug: string;
  status: 'draft' | 'publikasi';
  user: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface OutgoingApiData {
  _method?: 'PATCH';
  thumbnail: string;
  judul: string;
  deskripsi: string;
  status: 'draft' | 'publikasi';
}

interface FormValue {
  _method?: 'PATCH';
  thumbnail: string;
  title: string;
  content: string;
  status: 'draft' | 'publikasi';
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class News extends Model {
  constructor(
    public id: number,
    public thumbnail: string,
    public title: string,
    public content: string,
    public slug: string,
    public status: 'draft' | 'publikasi',
    public user: {
      id: number;
      name: string;
    },
    public created_at: string,
    public updated_at: string
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, News> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, News>;
    return new News(
      apiData.id,
      asset(apiData.thumbnail),
      apiData.judul,
      apiData.deskripsi,
      apiData.slug,
      apiData.status,
      {
        id: apiData.user.id,
        name: apiData.user.name
      },
      apiData.created_at,
      apiData.updated_at
    ) as ReturnType<T, IncomingApiData, News>;
  }

  public static toApiData<T extends FormValue | FormValue[]>(news: T): ReturnType<T, FormValue, OutgoingApiData> {
    if (Array.isArray(news)) return news.map((object) => this.toApiData(object)) as ReturnType<T, FormValue, OutgoingApiData>;
    const apiData: OutgoingApiData = {
      ...(news._method ? { _method: news._method } : {}),
      thumbnail: news.thumbnail,
      judul: news.title,
      deskripsi: news.content,
      status: news.status
    };

    return apiData as ReturnType<T, FormValue, OutgoingApiData>;
  }
}

Model.children.berita = News;
