import { Delete, Detail, Edit } from '@/components/dashboard/button';
import Modul from '@/constants/Modul';
import { useAuth, useCrudModal, useNotification, usePagination, useService } from '@/hooks';
import { RegistrantsService } from '@/services';
import { Card, Space, Tag } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { formFields } from './FormFields';
import { DataTable, DataTableHeader } from '@/components';
import { Registrants as RegistrantsModel } from '@/models';
import dateFormatter from '@/utils/dateFormatter';
import { InputType } from '@/constants';

const Registrants = () => {
  const { token, user } = useAuth();
  const modal = useCrudModal();
  const { success, error } = useNotification();
  const { execute, ...getAllRegistrants } = useService(RegistrantsService.getAll);
  const storeRegistrant = useService(RegistrantsService.store);
  const updateResgitrant = useService(RegistrantsService.update);
  const deleteRegistrant = useService(RegistrantsService.delete);
  const deleteBatchRegistrants = useService(RegistrantsService.deleteBatch);
  const [filterValues, setFilterValues] = useState({ search: '' });

  const pagination = usePagination({ totalData: getAllRegistrants.totalData });

  const [selectedRegistrants, setSelectedRegistrants] = useState([]);

  const fetchRegistrants = useCallback(() => {
    execute({
      token: token,
      page: pagination.page,
      per_page: pagination.per_page,
      search: filterValues.search
    });
  }, [execute, filterValues.search, pagination.page, pagination.per_page, token]);

  useEffect(() => {
    fetchRegistrants();
  }, [fetchRegistrants, pagination.page, pagination.per_page, token]);

  const registrants = getAllRegistrants.data ?? [];

  const column = [
    {
      title: 'Nama Toko',
      dataIndex: 'merchant_name',
      sorter: (a, b) => a.merchant_name.length - b.merchant_name.length,
      searchable: true
    },
    {
      title: 'Nama Pemilik',
      dataIndex: 'owner_name',
      sorter: (a, b) => a.owner_name.length - b.owner_name.length,
      searchable: true
    }
  ];

  if (user) {
    column.push({
      title: 'Aksi',
      render: (_, record) => (
        <Space size="small">
          <Edit
            title={`Edit ${Modul.REGISTRANTS}`}
            model={RegistrantsModel}
            onClick={() => {
              modal.edit({
                title: `Edit ${Modul.REGISTRANTS}`,
                data: { ...record, domain: record.domain.replace(/^http:\/\//, '').replace(/\.belee\.id$/, '') },
                formFields: [
                  ...formFields(),
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
                        label: 'Diterima',
                        value: 'diterima'
                      },
                      {
                        label: 'Ditolak',
                        value: 'ditolak'
                      },
                      {
                        label: 'Menunggu',
                        value: 'menunggu'
                      }
                    ],
                    size: 'large'
                  }
                ],
                onSubmit: async (values) => {
                  const { message, isSuccess } = await updateResgitrant.execute(record.id, { ...values, domain: `http://${values.domain}.belee.id`, status: 'menunggu' }, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchRegistrants({ token: token, page: pagination.page, per_page: pagination.per_page });
                  } else {
                    error('Gagal', message);
                  }
                  return isSuccess;
                }
              });
            }}
          />
          <Detail
            title={`Detail ${Modul.REGISTRANTS}`}
            model={RegistrantsModel}
            onClick={() => {
              modal.show.description({
                title: record.merchant_name,
                data: [
                  {
                    key: 'merchant_name',
                    label: `Nama Toko`,
                    children: record.merchant_name
                  },
                  {
                    key: 'owner_name',
                    label: `Nama Pemilik`,
                    children: record.owner_name
                  },
                  {
                    key: 'email',
                    label: `Email`,
                    children: record.email
                  },
                  {
                    key: 'telp',
                    label: `Telepon`,
                    children: record.telp
                  },
                  {
                    key: 'domain',
                    label: `Domain`,
                    children: record.domain
                  },
                  {
                    key: 'status',
                    label: `Status `,
                    children: (() => {
                      let statusTag;
                      switch (record.status) {
                        case 'diterima':
                          statusTag = <Tag color="blue">Diterima</Tag>;
                          break;
                        case 'ditolak':
                          statusTag = <Tag color="red">Ditolak</Tag>;
                          break;
                        case 'menunggu':
                          statusTag = <Tag color="warning">Menunggu</Tag>;
                          break;
                        default:
                          statusTag = <Tag color="error">{record.status}</Tag>;
                      }
                      return statusTag;
                    })()
                  },
                  {
                    key: 'created_at',
                    label: `Tanggal Registrasi`,
                    children: dateFormatter(record.created_at)
                  }
                ]
              });
            }}
          />
          <Delete
            title={`Delete ${Modul.REGISTRANTS}`}
            model={RegistrantsModel}
            onClick={() => {
              modal.delete.default({
                title: `Delete ${Modul.REGISTRANTS}`,
                data: record,
                formFields: formFields,
                onSubmit: async () => {
                  const { isSuccess, message } = await deleteRegistrant.execute(record.id, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchRegistrants({ token: token, page: pagination.page, per_page: pagination.per_page });
                  } else {
                    error('Gagal', message);
                  }
                  return isSuccess;
                }
              });
            }}
          />
        </Space>
      )
    });
  }

  const onCreate = () => {
    modal.create({
      title: `Tambah ${Modul.REGISTRANTS}`,
      formFields: formFields,
      onSubmit: async (values) => {
        const { message, isSuccess } = await storeRegistrant.execute({ ...values, domain: `http://${values.domain}.belee.id`, status: 'menunggu' }, token);
        if (isSuccess) {
          success('Berhasil', message);
          fetchRegistrants({ token: token, page: pagination.page, per_page: pagination.per_page });
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  const onDeleteBatch = () => {
    modal.delete.batch({
      title: `Hapus ${selectedRegistrants.length} ${Modul.REGISTRANTS} Yang Dipilih ? `,
      onSubmit: async () => {
        const ids = selectedRegistrants.map((item) => item.id);
        const { message, isSuccess } = await deleteBatchRegistrants.execute(ids, token);
        if (isSuccess) {
          success('Berhasil', message);
          fetchRegistrants(token, pagination.page, pagination.per_page);
          setSelectedRegistrants([]);
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  return (
    <Card>
      <DataTableHeader onStore={onCreate} modul={Modul.REGISTRANTS} onDeleteBatch={onDeleteBatch} selectedData={selectedRegistrants} onSearch={(values) => setFilterValues({ search: values })} />
      <div className="w-full max-w-full overflow-x-auto">
        <DataTable
          data={registrants}
          columns={column}
          loading={getAllRegistrants.isLoading}
          map={(registrant) => ({ key: registrant.id, ...registrant })}
          pagination={pagination}
          handleSelectedData={(_, selectedRows) => setSelectedRegistrants(selectedRows)}
        />
      </div>
    </Card>
  );
};

export default Registrants;
