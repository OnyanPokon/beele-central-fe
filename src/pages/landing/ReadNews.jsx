import { usePagination, useService } from '@/hooks';
import { NewsService } from '@/services';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Avatar, Card, FloatButton, Skeleton, Typography } from 'antd';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import dateFormatter from '@/utils/dateFormatter';
import getInitials from '@/utils/getInitials';

const ReadNews = () => {
  const { execute, ...getAllNews } = useService(NewsService.getAll);
  const { execute: fetchNewsDetail, ...getAllNewsDetail } = useService(NewsService.getBySlug);
  const pagination = usePagination({ totalData: getAllNews.totalData });
  const navigate = useNavigate();
  const { slug } = useParams();

  const fetchNews = useCallback(() => {
    execute({
      page: pagination.page,
      per_page: pagination.per_page
    });
  }, [execute, pagination.page, pagination.per_page]);

  useEffect(() => {
    fetchNews();
    fetchNewsDetail(slug);
  }, [fetchNews, fetchNewsDetail, slug]);

  const news = getAllNews.data ?? [];
  const newsDetail = getAllNewsDetail.data ?? {};

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto mt-4 flex min-h-screen w-full max-w-screen-md flex-col px-6 py-28">
          <div className="mb-8 inline-flex items-center gap-x-2">
            <Avatar style={{ backgroundColor: '#ECF7FD', color: '#518ed6' }}>{getInitials(newsDetail?.user?.name)}</Avatar>
            <div className="flex flex-col gap-y-1">
              <b className="">{newsDetail?.user?.name}</b>
              <p className="text-xs font-medium text-gray-400">{dateFormatter(newsDetail?.created_at)} </p>
            </div>
          </div>
          <Typography.Title level={2}>{newsDetail?.title}</Typography.Title>
          <img src={newsDetail?.thumbnail} style={{ width: '100%' }} className="mb-12 mt-12 rounded-lg" />
          {parse(newsDetail.content ?? '')}
        </div>
      </section>
      <section className="bg-gray-100">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-y-4 px-6 py-24">
          <Typography.Title level={4}>Artikel Terkait</Typography.Title>
          <div className="grid w-full grid-cols-4 gap-6">
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
                    className="col-span-4 w-full md:col-span-2 lg:col-span-1"
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
        </div>
      </section>
      <FloatButton icon={<ArrowUpOutlined />} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })} />
    </>
  );
};

export default ReadNews;
