import Model from './Model';

export interface IncomingApiData {
  id: number;
  name: string;
  email: string;
  role: {
    name: string;
    permissions: string[];
  };
  permissions: string[];
}

export interface OutgoingApiData {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface FormValue {
  _method?: 'PUT';
  name: string;
  email: string;
  password: string;
  role: string;
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class Employees extends Model {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public role: {
      name: string;
      permission: string[];
    },
    public permissions: string[]
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, Employees> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, Employees>;
    return new Employees(
      apiData.id,
      apiData.name,
      apiData.email,
      {
        name: apiData.role.name,
        permission: apiData.role.permissions
      },
      apiData.permissions
    ) as ReturnType<T, IncomingApiData, Employees>;
  }

  public static toApiData<T extends FormValue | FormValue[]>(employees: T): ReturnType<T, FormValue, OutgoingApiData> {
    if (Array.isArray(employees)) return employees.map((object) => this.toApiData(object)) as ReturnType<T, FormValue, OutgoingApiData>;
    const apiData: OutgoingApiData = {
      name: employees.name,
      email: employees.email,
      password: employees.password,
      role: employees.role
    };

    return apiData as ReturnType<T, FormValue, OutgoingApiData>;
  }
}

Model.children.pengguna = Employees;
