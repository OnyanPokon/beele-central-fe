import { InputType } from '@/constants';
import Modul from '@/constants/Modul';

export const formFields = () => [
  {
    label: `Nama ${Modul.EMPLOYEE}`,
    name: 'name',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Nama ${Modul.EMPLOYEE} harus diisi`
      }
    ]
  },
  {
    label: `Email ${Modul.EMPLOYEE}`,
    name: 'email',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Email ${Modul.EMPLOYEE} harus diisi`
      },
      { type: 'email', message: 'Gunakan email yang valid' }
    ]
  }
];
