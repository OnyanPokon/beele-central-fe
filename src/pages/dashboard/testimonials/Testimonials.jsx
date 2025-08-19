import { Delete, Detail, Edit } from '@/components/dashboard/button';
import Modul from '@/constants/Modul';
import { useAuth, useCrudModal, useNotification, usePagination, useService } from '@/hooks';
import { Button, Card, Popconfirm, Rate, Space, Tag, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { DataTable, DataTableHeader } from '@/components';
import { Testimonial as TestimonialsModel } from '@/models';
import { TestimonialService } from '@/services';
import { Action, InputType } from '@/constants';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const { UPDATE, DELETE, READ } = Action;

const Testimonials = () => {
  const { token, user } = useAuth();
  const modal = useCrudModal();
  const { success, error } = useNotification();
  const { execute, ...getAllTestimonials } = useService(TestimonialService.getAll);
  const deleteTestimonial = useService(TestimonialService.delete);
  const verificateTestimonial = useService(TestimonialService.verificate);
  const deleteBatchTestimonials = useService(TestimonialService.deleteBatch);
  const [filterValues, setFilterValues] = useState({ search: '' });

  const pagination = usePagination({ totalData: getAllTestimonials.totalData });

  const [selectedTestimonials, setSelectedTestimonials] = useState([]);

  const fetchTestimonials = useCallback(() => {
    execute({
      token: token,
      page: pagination.page,
      per_page: pagination.per_page,
      search: filterValues.search
    });
  }, [execute, filterValues.search, pagination.page, pagination.per_page, token]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials, pagination.page, pagination.per_page, token]);

  const testimonials = getAllTestimonials.data ?? [];

  const column = [
    {
      title: 'Nama',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      searchable: true
    },
    {
      title: 'Instansi',
      dataIndex: 'agency',
      sorter: (a, b) => a.agency.length - b.agency.length,
      searchable: true
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating.length - b.rating.length,
      searchable: true,
      render: (record) => <Rate defaultValue={record} disabled />
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
      searchable: true,
      render: (record) => {
        switch (record) {
          case 'publikasi':
            return <Tag color="blue">Publikasi</Tag>;
          case 'menunggu':
            return <Tag color="warning">Menunggu</Tag>;
          default:
            return <Tag color="error">{record}</Tag>;
        }
      }
    }
  ];

  if (user && user.eitherCan([UPDATE, TestimonialsModel], [DELETE, TestimonialsModel], [READ, TestimonialsModel])) {
    column.push({
      title: 'Aksi',
      render: (_, record) => (
        <Space size="small">
          {record.status === 'publikasi' ? (
            <Tooltip title="Ubah Visibilitas">
              <Popconfirm
                title="Ubah Visibilitas"
                description="Ubah Visibilitas Testimonial?"
                onConfirm={async () => {
                  const { isSuccess, message } = await verificateTestimonial.execute(record.id, { status: 'menunggu' }, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchTestimonials({ token: token, page: pagination.page, per_page: pagination.per_page });
                  } else {
                    error('Gagal', message);
                  }
                  return isSuccess;
                }}
                okText="Ok"
                cancelText="Batal"
              >
                <Button loading={verificateTestimonial.isLoading} icon={<EyeInvisibleOutlined />} variant="link" color="danger"></Button>
              </Popconfirm>
            </Tooltip>
          ) : (
            <Tooltip title="Ubah Visibilitas">
              <Popconfirm
                title="Ubah Visibilitas"
                description="Ubah Visibilitas Testimonial?"
                onConfirm={async () => {
                  const { isSuccess, message } = await verificateTestimonial.execute(record.id, { status: 'publikasi' }, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchTestimonials({ token: token, page: pagination.page, per_page: pagination.per_page });
                  } else {
                    error('Gagal', message);
                  }
                  return isSuccess;
                }}
                okText="Ok"
                cancelText="Batal"
              >
                <Button loading={verificateTestimonial.isLoading} icon={<EyeOutlined />} variant="link" color="primary"></Button>
              </Popconfirm>
            </Tooltip>
          )}
          <Edit
            title={`Edit ${Modul.TESTIMONIAL}`}
            model={TestimonialsModel}
            onClick={() => {
              modal.edit({
                title: `Edit ${Modul.TESTIMONIAL}`,
                data: record,
                formFields: [
                  {
                    label: `Status Testimonial`,
                    name: 'status',
                    type: InputType.SELECT,
                    rules: [
                      {
                        required: true,
                        message: `Status harus diisi`
                      }
                    ],
                    size: 'large',
                    options: [
                      {
                        label: 'Menunggu',
                        value: 'menunggu'
                      },
                      {
                        label: 'Publikasi',
                        value: 'publikasi'
                      }
                    ]
                  }
                ],
                onSubmit: async (values) => {
                  const { message, isSuccess } = await verificateTestimonial.execute(record.id, { ...record, status: values.status }, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchTestimonials({ token: token, page: pagination.page, per_page: pagination.per_page });
                  } else {
                    error('Gagal', message);
                  }
                  return isSuccess;
                }
              });
            }}
          />
          <Detail
            title={`Detail ${Modul.TESTIMONIAL}`}
            model={TestimonialsModel}
            onClick={() => {
              modal.show.description({
                title: record.name,
                data: [
                  {
                    key: 'name',
                    label: `Nama`,
                    children: record.name
                  },
                  {
                    key: 'agency',
                    label: `Instansi`,
                    children: record.agency
                  },
                  {
                    key: 'status',
                    label: `Status `,
                    children: (() => {
                      let statusTag;
                      switch (record.status) {
                        case 'publikasi':
                          statusTag = <Tag color="blue">Publikasi</Tag>;
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
                    key: 'desc',
                    label: `Deskripsi`,
                    children: record.desc
                  },
                  {
                    key: 'rating',
                    label: `Rating`,
                    children: <Rate defaultValue={record.rating} disabled />
                  }
                ]
              });
            }}
          />
          <Delete
            title={`Delete ${Modul.TESTIMONIAL}`}
            model={TestimonialsModel}
            onClick={() => {
              modal.delete.default({
                title: `Delete ${Modul.TESTIMONIAL}`,
                onSubmit: async () => {
                  const { isSuccess, message } = await deleteTestimonial.execute(record.id, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchTestimonials({ token: token, page: pagination.page, per_page: pagination.per_page });
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
      title: `Hapus ${selectedTestimonials.length} ${Modul.TESTIMONIAL} Yang Dipilih ? `,
      onSubmit: async () => {
        const ids = selectedTestimonials.map((item) => item.id);
        const { message, isSuccess } = await deleteBatchTestimonials.execute(ids, token);
        if (isSuccess) {
          success('Berhasil', message);
          fetchTestimonials(token, pagination.page, pagination.per_page);
          setSelectedTestimonials([]);
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  return (
    <Card>
      <DataTableHeader modul={Modul.TESTIMONIAL} onDeleteBatch={onDeleteBatch} selectedData={selectedTestimonials} onSearch={(values) => setFilterValues({ search: values })} />
      <div className="w-full max-w-full overflow-x-auto">
        <DataTable
          data={testimonials}
          columns={column}
          loading={getAllTestimonials.isLoading}
          map={(tenant) => ({ key: tenant.id, ...tenant })}
          pagination={pagination}
          handleSelectedData={(_, selectedRows) => setSelectedTestimonials(selectedRows)}
        />
      </div>
    </Card>
  );
};

export default Testimonials;
