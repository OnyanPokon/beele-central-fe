import { InputType } from '@/constants';

export const formFields = ({ options }) => [
  {
    label: `Nama Pendaftar`,
    name: 'registrant_id',
    type: InputType.SELECT,
    rules: [
      {
        required: true,
        message: `Nama pendaftar harus diisi`
      }
    ],
    options: options.registrants.map((item) => ({
      label: `${item.owner_name} - ${item.merchant_name}`,
      value: item.id
    })),
    size: 'large'
  },
  {
    label: `Status`,
    name: 'status',
    type: InputType.SELECT,
    rules: [
      {
        required: true,
        message: `Status harus diisi`
      }
    ],
    options: [
      {
        label: 'Aktif',
        value: 'aktif'
      },
      {
        label: 'Non-Aktif',
        value: 'nonaktif'
      }
    ],
    size: 'large'
  },
  {
    label: `Pilihan Paket`,
    name: 'choosen_package',
    type: InputType.SELECT,
    rules: [
      {
        required: true,
        message: `Paket harus diisi`
      }
    ],
    options: [
      {
        label: 'Standar',
        value: 'standar'
      },
      {
        label: 'Premium',
        value: 'premium'
      }
    ],
    size: 'large'
  }
];
