import { Delete, Edit } from '@/components/dashboard/button';
import Modul from '@/constants/Modul';
import { useAuth, useCrudModal, useNotification, usePagination, useService } from '@/hooks';
import { NewsService } from '@/services';
import { Card, Space, Tag } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { DataTable, DataTableHeader } from '@/components';
import dateFormatter from '@/utils/dateFormatter';
import { Action } from '@/constants';
import { News as NewsModel } from '@/models';
import { useNavigate } from 'react-router-dom';

const { UPDATE, DELETE, READ } = Action;

const News = () => {
  const { token, user } = useAuth();
  const modal = useCrudModal();
  const { success, error } = useNotification();
  const { execute, ...getAllNews } = useService(NewsService.getAll);
  const deleteNews = useService(NewsService.delete);
  const deleteBatchNews = useService(NewsService.deleteBatch);
  const [filterValues, setFilterValues] = useState({ search: '' });
  const pagination = usePagination({ totalData: getAllNews.totalData });
  const [selectedNews, setSelectedNews] = useState([]);
  const navigate = useNavigate();

  const fetchNews = useCallback(() => {
    execute({
      token: token,
      page: pagination.page,
      per_page: pagination.per_page,
      search: filterValues.search
    });
  }, [execute, filterValues.search, pagination.page, pagination.per_page, token]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews, pagination.page, pagination.per_page, token]);

  const news = getAllNews.data ?? [];

  const column = [
    {
      title: 'Judul Berita',
      dataIndex: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
      searchable: true
    },
    {
      title: 'Author',
      dataIndex: ['user', 'name'],
      sorter: (a, b) => a.user.name.length - b.user.name.length,
      searchable: true
    },
    {
      title: 'Tanggal Dibuat',
      dataIndex: 'created_at',
      sorter: (a, b) => a.created_at.length - b.created_at.length,
      searchable: true,
      render: (record) => dateFormatter(record)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
      searchable: true,
      render: (record) => {
        switch (record) {
          case 'draft':
            return <Tag color="blue">Draft</Tag>;
          case 'publikasi':
            return <Tag color="green">Publikasi</Tag>;
          default:
            return <Tag color="error">{record}</Tag>;
        }
      }
    }
  ];

  if (user && user.eitherCan([UPDATE, NewsModel], [DELETE, NewsModel], [READ, NewsModel])) {
    column.push({
      title: 'Aksi',
      render: (_, record) => (
        <Space size="small">
          <Edit
            title={`Edit ${Modul.NEWS}`}
            model={NewsModel}
            onClick={() => {
              navigate(window.location.pathname + `/edit/` + record.slug);
            }}
          />
          <Delete
            title={`Delete ${Modul.NEWS}`}
            model={NewsModel}
            onClick={() => {
              modal.delete.default({
                title: `Delete ${Modul.NEWS}`,
                data: record,
                onSubmit: async () => {
                  const { isSuccess, message } = await deleteNews.execute(record.id, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchNews({ token: token, page: pagination.page, per_page: pagination.per_page });
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
    navigate(window.location.pathname + '/create');
  };

  const onDeleteBatch = () => {
    modal.delete.batch({
      title: `Hapus ${selectedNews.length} ${Modul.NEWS} Yang Dipilih ? `,
      onSubmit: async () => {
        const ids = selectedNews.map((item) => item.id);
        const { message, isSuccess } = await deleteBatchNews.execute(ids, token);
        if (isSuccess) {
          success('Berhasil', message);
          fetchNews(token, pagination.page, pagination.per_page);
          setSelectedNews([]);
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  return (
    <Card>
      <DataTableHeader modul={Modul.NEWS} onStore={onCreate} onDeleteBatch={onDeleteBatch} selectedData={selectedNews} onSearch={(values) => setFilterValues({ search: values })} />
      <div className="w-full max-w-full overflow-x-auto">
        <DataTable data={news} columns={column} loading={getAllNews.isLoading} map={(registrant) => ({ key: registrant.id, ...registrant })} pagination={pagination} handleSelectedData={(_, selectedRows) => setSelectedNews(selectedRows)} />
      </div>
    </Card>
  );
};

export default News;
