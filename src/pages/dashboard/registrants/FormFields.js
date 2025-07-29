import { InputType } from '@/constants';

export const formFields = () => [
  {
    label: `Nama toko`,
    name: 'merchant_name',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Nama toko harus diisi`
      }
    ],
    size: 'large',
    extra: {
      className: 'merchant_name'
    }
  },
  {
    label: `Nama pemilik`,
    name: 'owner_name',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Nama pemilik harus diisi`
      }
    ],
    size: 'large',
    extra: {
      className: 'owner_name'
    }
  },
  {
    label: `Nomor telp`,
    name: 'telp',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Nomor telp harus diisi`
      },
      {
        validator: (_, value) => {
          if (!value || /^628\d{7,10}$/.test(value)) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Nomor telepon harus diawali dengan 628 dan memiliki 10-13 digit'));
        }
      }
    ],
    size: 'large',
    extra: {
      className: 'w-full telp'
    }
  },
  {
    label: `Email`,
    name: 'email',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Email harus diisi`
      },
      { type: 'email', message: 'Gunakan email yang valid' }
    ],
    size: 'large',
    extra: {
      className: 'email'
    }
  },
  {
    label: `Nama Domain (Masukan nama domain toko yang anda inginkan)`,
    name: 'domain',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Nama Domain harus diisi`
      }
    ],
    size: 'large',
    extra: {
      addonBefore: 'http://',
      addonAfter: '.belee.id',
      className: 'domain'
    }
  }
];
