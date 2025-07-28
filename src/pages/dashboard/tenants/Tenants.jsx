import { Delete, Detail, Edit } from '@/components/dashboard/button';
import Modul from '@/constants/Modul';
import { useAuth, useCrudModal, useNotification, usePagination, useService } from '@/hooks';
import { Button, Card, Space, Tag } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { DataTable, DataTableHeader } from '@/components';
import { Tenants as TenantsModel } from '@/models';
import dateFormatter from '@/utils/dateFormatter';
import { TenantsService } from '@/services';
import { formFields } from './FormFields';
import RegistransService from '@/services/RegistrantsService';
import { GlobalOutlined } from '@ant-design/icons';

const Tenants = () => {
  const { token, user } = useAuth();
  const modal = useCrudModal();
  const { success, error } = useNotification();
  const { execute, ...getAllTenants } = useService(TenantsService.getAll);
  const { execute: executeRegistrants, ...getRegistrants } = useService(RegistransService.getAll);
  const updateTenant = useService(TenantsService.update);
  const deleteTenant = useService(TenantsService.delete);
  const deleteBatchTenants = useService(TenantsService.deleteBatch);
  const [filterValues, setFilterValues] = useState({ search: '' });

  const pagination = usePagination({ totalData: getAllTenants.totalData });

  const [selectedTenants, setSelectedTenants] = useState([]);

  const fetchTenants = useCallback(() => {
    execute({
      token: token,
      page: pagination.page,
      per_page: pagination.per_page,
      search: filterValues.search
    });
  }, [execute, filterValues.search, pagination.page, pagination.per_page, token]);

  useEffect(() => {
    fetchTenants();
    executeRegistrants({ token: token });
  }, [executeRegistrants, fetchTenants, pagination.page, pagination.per_page, token]);

  const tenants = getAllTenants.data ?? [];
  const registrants = getRegistrants.data ?? [];

  const column = [
    {
      title: 'Nama Pendaftar',
      dataIndex: ['registrant', 'owner_name'],
      sorter: (a, b) => a.registrant.owner_name.length - b.registrant.owner_name.length,
      searchable: true
    },
    {
      title: 'Kadaluarsa',
      dataIndex: 'expired_date',
      sorter: (a, b) => a.expired_date.length - b.expired_date.length,
      searchable: true
    },
    {
      title: 'Pilihan Paket',
      dataIndex: 'choosen_package',
      sorter: (a, b) => a.choosen_package.length - b.choosen_package.length,
      searchable: true
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
      searchable: true,
      render: (record) => {
        switch (record) {
          case 'aktif':
            return <Tag color="blue">Aktif</Tag>;
          case 'nonaktif':
            return <Tag color="red">Non Aktif</Tag>;
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
            title={`Edit ${Modul.TENANT}`}
            model={TenantsModel}
            onClick={() => {
              modal.edit({
                title: `Edit ${Modul.TENANT}`,
                data: { ...record, registrant_id: record.registrant.id },
                formFields: formFields({ options: { registrants } }),
                onSubmit: async (values) => {
                  const { message, isSuccess } = await updateTenant.execute(record.id, { ...values, expired_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] }, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchTenants({ token: token, page: pagination.page, per_page: pagination.per_page });
                  } else {
                    error('Gagal', message);
                  }
                  return isSuccess;
                }
              });
            }}
          />
          <Detail
            title={`Detail ${Modul.TENANT}`}
            model={TenantsModel}
            onClick={() => {
              modal.show.description({
                title: record.merchant_name,
                data: [
                  {
                    key: 'registrant',
                    label: `Pendaftar`,
                    children: record.registrant.owner_name
                  },
                  {
                    key: 'expired_date',
                    label: `Tanggal Kadaluarsa`,
                    children: record.expired_date
                  },
                  {
                    key: 'choosen_package',
                    label: `Pilihan Paket`,
                    children: record.choosen_package
                  },
                  {
                    key: 'status',
                    label: `Status `,
                    children: (() => {
                      let statusTag;
                      switch (record.status) {
                        case 'aktif':
                          statusTag = <Tag color="blue">Aktif</Tag>;
                          break;
                        case 'nonaktif':
                          statusTag = <Tag color="red">Non - Aktif</Tag>;
                          break;
                        default:
                          statusTag = <Tag color="error">{record.status}</Tag>;
                      }
                      return statusTag;
                    })()
                  },
                  {
                    key: 'data',
                    label: `Data`,
                    children: record.data
                  },
                  {
                    key: 'domain',
                    label: `Domain`,
                    children: (
                      <Button icon={<GlobalOutlined />} onClick={() => window.open(`http://${record.registrant.domain}.belee.id`, '_blank')}>
                        {record.registrant.domain}
                      </Button>
                    )
                  },
                  {
                    key: 'created_at',
                    label: `Tanggal Tenant Terdaftar`,
                    children: dateFormatter(record.created_at)
                  }
                ]
              });
            }}
          />
          <Delete
            title={`Delete ${Modul.TENANT}`}
            model={TenantsModel}
            onClick={() => {
              modal.delete.default({
                title: `Delete ${Modul.TENANT}`,
                onSubmit: async () => {
                  const { isSuccess, message } = await deleteTenant.execute(record.id, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchTenants({ token: token, page: pagination.page, per_page: pagination.per_page });
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

  const onDeleteBatch = () => {
    modal.delete.batch({
      title: `Hapus ${selectedTenants.length} ${Modul.TENANT} Yang Dipilih ? `,
      onSubmit: async () => {
        const ids = selectedTenants.map((item) => item.id);
        const { message, isSuccess } = await deleteBatchTenants.execute(ids, token);
        if (isSuccess) {
          success('Berhasil', message);
          fetchTenants(token, pagination.page, pagination.per_page);
          setSelectedTenants([]);
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  return (
    <Card>
      <DataTableHeader modul={Modul.TENANT} onDeleteBatch={onDeleteBatch} selectedData={selectedTenants} onSearch={(values) => setFilterValues({ search: values })} />
      <div className="w-full max-w-full overflow-x-auto">
        <DataTable data={tenants} columns={column} loading={getAllTenants.isLoading} map={(tenant) => ({ key: tenant.id, ...tenant })} pagination={pagination} handleSelectedData={(_, selectedRows) => setSelectedTenants(selectedRows)} />
      </div>
    </Card>
  );
};

export default Tenants;
