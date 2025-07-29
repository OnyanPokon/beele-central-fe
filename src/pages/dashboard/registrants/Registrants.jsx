import { Delete, Detail, Edit } from '@/components/dashboard/button';
import Modul from '@/constants/Modul';
import { useAuth, useCrudModal, useNotification, usePagination, useService } from '@/hooks';
import { RegistrantsService } from '@/services';
import { Button, Card, Popconfirm, Space, Tag, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { formFields } from './FormFields';
import { DataTable, DataTableHeader } from '@/components';
import { Registrants as RegistrantsModel } from '@/models';
import dateFormatter from '@/utils/dateFormatter';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const Registrants = () => {
  const { token, user } = useAuth();
  const modal = useCrudModal();
  const { success, error } = useNotification();
  const { execute, ...getAllRegistrants } = useService(RegistrantsService.getAll);
  const storeRegistrant = useService(RegistrantsService.store);
  const updateRegistrant = useService(RegistrantsService.update);
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
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
      searchable: true,
      render: (record) => {
        switch (record) {
          case 'menunggu':
            return <Tag color="warning">Menunggu</Tag>;
          case 'diterima':
            return <Tag color="blue">Diterima</Tag>;
          case 'ditolak':
            return <Tag color="red">Ditolak</Tag>;
          default:
            return <Tag color="error">{record}</Tag>;
        }
      }
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
                data: record,
                formFields: formFields(),
                onSubmit: async (values) => {
                  const { message, isSuccess } = await updateRegistrant.execute(record.id, { ...values, status: record.status }, token);
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
                    children: `http://${record.domain}.belee.id`
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
          {record.status === 'menunggu' && (
            <>
              <Tooltip title="Terima Pendaftar">
                <Popconfirm
                  title="Proses pendaftaran"
                  description="apakah anda yakin akan menerima pendaftaran?"
                  onConfirm={async () => {
                    const { message: updateStatusMsg, isSuccess: updateStatusSuccess } = await updateRegistrant.execute(
                      record.id,
                      {
                        ...record,
                        status: 'diterima'
                      },
                      token
                    );

                    if (!updateStatusSuccess) {
                      error('Gagal', updateStatusMsg);
                      return false;
                    }

                    success('Berhasil', 'Pendaftaran berhasil diproses');
                    fetchRegistrants({ token: token, page: pagination.page, per_page: pagination.per_page });
                    return true;
                  }}
                >
                  <Button variant="link" color="primary" icon={<CheckOutlined />} />
                </Popconfirm>
              </Tooltip>
              <Tooltip title="Tolak Pendaftar">
                <Popconfirm
                  title="Tolak pendaftaran"
                  description="apakah anda yakin akan menolak pendaftaran?"
                  onConfirm={async () => {
                    const { message: updateStatusMsg, isSuccess: updateStatusSuccess } = await updateRegistrant.execute(
                      record.id,
                      {
                        ...record,
                        status: 'ditolak'
                      },
                      token
                    );

                    if (!updateStatusSuccess) {
                      error('Gagal', updateStatusMsg);
                      return false;
                    }

                    success('Berhasil', 'Pendaftaran berhasil diproses');
                    fetchRegistrants({ token: token, page: pagination.page, per_page: pagination.per_page });
                    return true;
                  }}
                >
                  <Button variant="link" color="danger" icon={<CloseOutlined />} />
                </Popconfirm>
              </Tooltip>
            </>
          )}
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
        const { message, isSuccess } = await storeRegistrant.execute({ ...values, status: 'menunggu' }, token);
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
