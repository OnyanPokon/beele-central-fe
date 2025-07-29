import { InputType } from '@/constants';
import { StarFilled } from '@ant-design/icons';

export const formFields = () => [
  {
    label: `Nama`,
    name: 'name',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Nama harus diisi`
      }
    ],
    size: 'large'
  },
  {
    label: `Instansi`,
    name: 'agency',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Instansi harus diisi`
      }
    ],
    size: 'large'
  },

  {
    label: `Deskripsi`,
    name: 'desc',
    type: InputType.LONGTEXT,
    rules: [
      {
        required: true,
        message: `Deskripsi harus diisi`
      }
    ],

    size: 'large'
  }
];

export const additionalField = () => [
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
        label: 'Menunggu',
        value: 'menunggu'
      },
      {
        label: 'Publikasi',
        value: 'publikasi'
      }
    ],
    size: 'large'
  },
  {
    label: `Rating`,
    name: 'rating',
    type: InputType.SELECT,
    rules: [
      {
        required: true,
        message: `rating harus diisi`
      }
    ],
    options: [
      {
        label: (
          <div className="flex items-center">
            <StarFilled style={{ color: '#fadb14' }} />
            <StarFilled style={{ color: '#fadb14' }} />
            <StarFilled style={{ color: '#fadb14' }} />
            <StarFilled style={{ color: '#fadb14' }} />
            <StarFilled style={{ color: '#fadb14' }} />{' '}
          </div>
        ),
        value: 5
      },
      {
        label: (
          <div className="flex items-center">
            <StarFilled style={{ color: '#fadb14' }} />
            <StarFilled style={{ color: '#fadb14' }} />
            <StarFilled style={{ color: '#fadb14' }} />
            <StarFilled style={{ color: '#fadb14' }} />{' '}
          </div>
        ),
        value: 4
      },
      {
        label: (
          <div className="flex items-center">
            <StarFilled style={{ color: '#fadb14' }} />
            <StarFilled style={{ color: '#fadb14' }} />
            <StarFilled style={{ color: '#fadb14' }} />{' '}
          </div>
        ),
        value: 3
      },
      {
        label: (
          <div className="flex items-center">
            <StarFilled style={{ color: '#fadb14' }} />
            <StarFilled style={{ color: '#fadb14' }} />{' '}
          </div>
        ),
        value: 2
      },
      {
        label: (
          <div className="flex items-center">
            <StarFilled style={{ color: '#fadb14' }} />
          </div>
        ),
        value: 1
      }
    ],
    size: 'large'
  }
];
