import { Reveal } from '@/components';
import { usePagination, useService } from '@/hooks';
import { NewsService } from '@/services';
import dateFormatter from '@/utils/dateFormatter';
import parse from 'html-react-parser';
import { Avatar, Card, FloatButton, Input, Pagination, Select, Skeleton, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import getInitials from '@/utils/getInitials';

const News = () => {
  const { execute, ...getAllNews } = useService(NewsService.getAll);
  const pagination = usePagination({ totalData: getAllNews.totalData });
  const [filterValues, setFilterValues] = useState({ search: '' });
  const navigate = useNavigate();

  const fetchNews = useCallback(() => {
    execute({
      page: pagination.page,
      per_page: pagination.per_page,
      search: filterValues.search
    });
  }, [execute, filterValues.search, pagination.page, pagination.per_page]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const news = getAllNews.data ?? [];

  return (
    <section className="bg-gradient-to-tl from-primary-500 to-primary-300">
      <div className="mx-auto flex min-h-screen w-full max-w-screen-xl flex-col items-center px-6 py-28">
        <div className="my-12 mb-24 flex flex-col items-center justify-center gap-y-2">
          <Typography.Title level={2} style={{ color: '#fff', textAlign: 'center' }}>
            <Reveal color="#fff">Berita UMKM,</Reveal>
          </Typography.Title>
          <p className="max-w-md text-center text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore </p>
        </div>
        <div className="mb-12 flex w-full flex-row items-center justify-between">
          <Input.Search size="large" className="w-full min-w-96 max-w-96" placeholder="Cari topik berita" onSearch={(values) => setFilterValues({ ...filterValues, search: values })} />
          <Select size="large" className="min-w-48" placeholder="Filter">
            <Select.Option>Terbaru</Select.Option>
          </Select>
        </div>
        <div className="mb-12 grid w-full grid-cols-4 gap-6">
          {getAllNews.isLoading ? (
            <>
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="col-span-1 w-full">
                  <div className="flex flex-col gap-y-4">
                    <Skeleton.Image active style={{ width: '100%' }} />
                    <div className="inline-flex items-center gap-x-2">
                      <Skeleton.Avatar active />
                      <div className="flex flex-col gap-y-1">
                        <Skeleton.Input active size="small" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </>
          ) : (
            <>
              {news.map((item) => (
                <Card
                  hoverable
                  onClick={() => navigate('/berita_umkm/' + item.slug)}
                  key={item.id}
                  className="col-span-1 w-full"
                  cover={<img className="p-2 pb-0" alt="example" style={{ height: '180px', objectFit: 'cover' }} src={item.thumbnail} loading="lazy" />}
                >
                  <div className="flex flex-col gap-y-2">
                    <div className="inline-flex items-center gap-x-2">
                      <Avatar style={{ backgroundColor: '#ECF7FD', color: '#518ed6' }}>{getInitials(item.user.name)}</Avatar>
                      <div className="flex flex-col gap-y-1">
                        <b className="text-xs">{item.user.name}</b>
                        <p className="text-[0.60rem] font-medium text-gray-400">{dateFormatter(item.created_at)} </p>
                      </div>
                    </div>
                    <b className="text-base font-extrabold text-primary-600">{item.title}</b>
                    <div className="news-text text-xs">{parse(item.content)}</div>
                  </div>
                </Card>
              ))}
            </>
          )}
        </div>
        <Pagination current={pagination.page} total={pagination.totalData} onChange={pagination.onChange} pageSize={pagination.per_page} />
      </div>
      <FloatButton icon={<ArrowUpOutlined />} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })} />
    </section>
  );
};

export default News;
