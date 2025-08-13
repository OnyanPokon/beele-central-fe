import { Delete, Detail, Edit } from '@/components/dashboard/button';
import Modul from '@/constants/Modul';
import { useAuth, useCrudModal, useNotification, usePagination, useService } from '@/hooks';
import { Badge, Button, Card, Popconfirm, Space, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { DataTable, DataTableHeader } from '@/components';
import { InputType } from '@/constants';
import { EmployeesService } from '@/services';
import { formFields } from './FormFields';
import { Employees as EmployeesModel } from '@/models';
import { CheckCircleOutlined, LockOutlined } from '@ant-design/icons';

const Employees = () => {
  const { token, user } = useAuth();
  const modal = useCrudModal();
  const { success, error } = useNotification();
  const { execute, ...getAllEmployees } = useService(EmployeesService.getAll);
  const { execute: fetchPermissions, ...getAllPermissions } = useService(EmployeesService.getAllPermissions);
  const storeEmployee = useService(EmployeesService.store);
  const updateEmployee = useService(EmployeesService.update);
  const deleteEmployee = useService(EmployeesService.delete);
  const deleteBatchEmployees = useService(EmployeesService.deleteBatch);
  const resetPassword = useService(EmployeesService.resetPassword);
  const updatePermissions = useService(EmployeesService.updatePermissions);
  const [filterValues, setFilterValues] = useState({ search: '' });

  const pagination = usePagination({ totalData: getAllEmployees.totalData });

  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const fetchEmployees = useCallback(() => {
    execute({
      token: token,
      page: pagination.page,
      per_page: pagination.per_page,
      search: filterValues.search
    });
  }, [execute, filterValues.search, pagination.page, pagination.per_page, token]);

  useEffect(() => {
    fetchEmployees();
    fetchPermissions(token);
  }, [fetchEmployees, fetchPermissions, pagination.page, pagination.per_page, token]);

  const employees = (getAllEmployees.data ?? []).filter((item) => item.role.name !== 'admin');
  const permissions = getAllPermissions.data ?? [];

  const column = [
    {
      title: 'Nama',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      searchable: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      searchable: true
    }
  ];

  if (user) {
    column.push({
      title: 'Aksi',
      render: (_, record) => (
        <Space size="small">
          <Edit
            title={`Edit ${Modul.EMPLOYEE}`}
            model={EmployeesModel}
            onClick={() => {
              modal.edit({
                title: `Edit ${Modul.EMPLOYEE}`,
                data: { ...record, role: record.role.name },
                formFields: formFields(),
                onSubmit: async (values) => {
                  const { message, isSuccess } = await updateEmployee.execute(record.id, { ...values, role: 'karyawan' }, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchEmployees({ token: token, page: pagination.page, per_page: pagination.per_page });
                  } else {
                    error('Gagal', message);
                  }
                  return isSuccess;
                }
              });
            }}
          />
          <Detail
            title={`Detail ${Modul.EMPLOYEE}`}
            model={EmployeesModel}
            onClick={() => {
              modal.show.description({
                title: record.name,
                data: [
                  {
                    key: 'name',
                    label: `Nama ${Modul.EMPLOYEE}`,
                    children: record.name
                  },
                  {
                    key: 'email',
                    label: `Email`,
                    children: record.email
                  },
                  {
                    key: 'role',
                    label: `Role`,
                    children: record.role.name
                  },
                  {
                    key: 'permission',
                    label: 'Permission',
                    children: (
                      <div className="flex flex-col gap-y-1">
                        {record.role?.permission?.map((item, index) => (
                          <Badge key={`role-perm-${index}`} color="blue" text={item} />
                        ))}

                        {record.permissions?.map((item, index) => (
                          <Badge key={`perm-${index}`} color="green" text={item} />
                        ))}
                      </div>
                    )
                  }
                ]
              });
            }}
          />

          <Delete
            title={`Delete ${Modul.EMPLOYEE}`}
            model={EmployeesModel}
            onClick={() => {
              modal.delete.default({
                title: `Delete ${Modul.EMPLOYEE}`,
                data: { ...record, role: record.role.id },
                onSubmit: async () => {
                  const { isSuccess, message } = await deleteEmployee.execute(record.id, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchEmployees({ token: token, page: pagination.page, per_page: pagination.per_page });
                  } else {
                    error('Gagal', message);
                  }
                  return isSuccess;
                }
              });
            }}
          />
          <Tooltip title="Reset Password">
            <Popconfirm
              title="Reset Password"
              description="Reset Password Pengguna?"
              onConfirm={async () => {
                const { isSuccess, message } = await resetPassword.execute(record.id, token);
                if (isSuccess) {
                  success('Berhasil', message);
                  fetchEmployees({ token: token, page: pagination.page, per_page: pagination.per_page });
                } else {
                  error('Gagal', message);
                }
                return isSuccess;
              }}
              okText="Ok"
              cancelText="Batal"
            >
              <Button loading={resetPassword.isLoading} icon={<LockOutlined />} variant="link" color="danger"></Button>
            </Popconfirm>
          </Tooltip>
          <Tooltip title="Permission">
            <Button
              variant="link"
              color="primary"
              icon={<CheckCircleOutlined />}
              onClick={() => {
                modal.edit({
                  title: `Edit Permission ${Modul.EMPLOYEE}`,
                  data: { ...record, permissions: record.permissions },
                  formFields: [
                    {
                      label: `Permission ${Modul.EMPLOYEE}`,
                      name: 'permissions',
                      type: InputType.SELECT,
                      mode: 'multiple',
                      rules: [
                        {
                          required: true,
                          message: `Permission ${Modul.EMPLOYEE} harus diisi`
                        }
                      ],
                      options: permissions.map((item) => ({
                        label: item.name,
                        value: item.name
                      }))
                    }
                  ],
                  onSubmit: async (values) => {
                    const { message, isSuccess } = await updatePermissions.execute(record.id, values, token);
                    if (isSuccess) {
                      success('Berhasil', message);
                      fetchEmployees({ token: token, page: pagination.page, per_page: pagination.per_page });
                    } else {
                      error('Gagal', message);
                    }
                    return isSuccess;
                  }
                });
              }}
            />
          </Tooltip>
        </Space>
      )
    });
  }

  const onCreate = () => {
    modal.create({
      title: `Tambah ${Modul.EMPLOYEE}`,
      formFields: [...formFields()],
      onSubmit: async (values) => {
        const { message, isSuccess } = await storeEmployee.execute({ ...values, password: '12345678', role: 'karyawan' }, token);
        if (isSuccess) {
          success('Berhasil', message);
          fetchEmployees({ token: token, page: pagination.page, per_page: pagination.per_page });
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  const onDeleteBatch = () => {
    modal.delete.batch({
      title: `Hapus ${selectedEmployees.length} ${Modul.EMPLOYEE} Yang Dipilih ? `,
      onSubmit: async () => {
        const ids = selectedEmployees.map((item) => item.id);
        const { message, isSuccess } = await deleteBatchEmployees.execute(ids, token);
        if (isSuccess) {
          success('Berhasil', message);
          fetchEmployees(token, pagination.page, pagination.per_page);
          setSelectedEmployees([]);
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  return (
    <Card>
      <DataTableHeader onStore={onCreate} modul={Modul.EMPLOYEE} onDeleteBatch={onDeleteBatch} selectedData={selectedEmployees} onSearch={(values) => setFilterValues({ search: values })} />
      <div className="w-full max-w-full overflow-x-auto">
        <DataTable
          data={employees}
          columns={column}
          loading={getAllEmployees.isLoading}
          map={(registrant) => ({ key: registrant.id, ...registrant })}
          pagination={pagination}
          handleSelectedData={(_, selectedRows) => setSelectedEmployees(selectedRows)}
        />
      </div>
    </Card>
  );
};

export default Employees;
