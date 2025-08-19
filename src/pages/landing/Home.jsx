import { Reveal } from '@/components';
import { usePagination, useService } from '@/hooks';
import { NewsService, TestimonialService } from '@/services';
import dateFormatter from '@/utils/dateFormatter';
import timeAgo from '@/utils/timeAgo';
import { CheckCircleFilled, ClockCircleOutlined, RightOutlined, ShopOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Carousel, Rate, Skeleton, Tag, Typography } from 'antd';
import gsap from 'gsap';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import getInitials from '@/utils/getInitials';

const Home = () => {
  const { execute: executeNews, ...getAllNews } = useService(NewsService.getAll);
  const { execute: executeTestimonials, ...getAllTestimonials } = useService(TestimonialService.getAll);
  const newsPagination = usePagination({ totalData: getAllNews.totalData });
  const testimonialsPagination = usePagination({ totalData: getAllTestimonials.totalData });
  const cardsWrapperRef = useRef(null);
  const navigate = useNavigate();

  const fetchNews = useCallback(() => {
    executeNews({
      page: newsPagination.page,
      per_page: newsPagination.per_page,
      search: ''
    });
  }, [executeNews, newsPagination.page, newsPagination.per_page]);

  const fetchTestimonials = useCallback(() => {
    executeTestimonials({
      page: testimonialsPagination.page,
      per_page: testimonialsPagination.per_page,
      search: ''
    });
  }, [executeTestimonials, testimonialsPagination.page, testimonialsPagination.per_page]);

  useEffect(() => {
    fetchNews();
    fetchTestimonials();
  }, [fetchNews, fetchTestimonials]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.animated-card');

      cards.forEach((card) => {
        const randomDelay = parseFloat((Math.random() * 0.8).toFixed(2));
        gsap.fromTo(
          card,
          { scale: 0.0 },
          {
            scale: 1,
            duration: 0.5,
            delay: randomDelay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, cardsWrapperRef);

    return () => ctx.revert();
  }, []);

  const news = getAllNews.data ?? [];
  const testimonials = getAllTestimonials.data ?? [];

  return (
    <>
      <section
        className="relative"
        style={{
          backgroundImage: `url('/image_asset/background/hero_bg.png')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="mx-auto flex min-h-screen w-full max-w-screen-xl items-center justify-center gap-x-10 px-6 py-28">
          <div className="flex flex-[1] flex-col">
            <Typography.Title style={{ color: '#fff' }}>
              <Reveal color="#fff">Wajah Baru Bisnis Anda, Siap dalam 5 Menit.</Reveal>
            </Typography.Title>
            <Button className="mt-6 w-fit" size="large" onClick={() => navigate('/member_register')}>
              Jelajahi Belee Lebih Lanjut!
            </Button>
          </div>
          <div className="hidden flex-[1] lg:block"></div>
        </div>
        <div className="pointer-events-none absolute bottom-0 hidden w-full items-center lg:flex" ref={cardsWrapperRef}>
          <span className="flex-[1]" />
          <div className="ms-40 flex flex-[1] items-start justify-start">
            <figure className="relative xl:w-[32rem] 2xl:w-[35rem]">
              <img src="/image_asset/figure/man_women.png" />
              <div className="animated-card absolute -left-24 bottom-48 max-w-56">
                <div className="relative rounded-xl border-2 border-gray-100/30 bg-white/20 pb-8 pl-6 pr-5 pt-6 backdrop-blur-lg">
                  <p className="text-sm font-semibold leading-snug text-white">Biarkan asisten virtual AI melayani pertanyaan dan pesanan pelanggan Anda.</p>
                  <Avatar className="absolute -left-4 -top-4" style={{ backgroundColor: '#fff', color: '#6ac662' }} size="large">
                    <CheckCircleFilled />
                  </Avatar>
                  <div className="absolute -bottom-2 h-4 w-1/2 rounded-md bg-warning-500" />
                </div>
              </div>
              <div className="animated-card absolute -right-4 top-36 max-w-56">
                <div className="relative rounded-xl border-2 border-gray-100/30 bg-white/20 pb-8 pl-6 pr-5 pt-6 backdrop-blur-lg">
                  <p className="text-sm font-semibold leading-snug text-white">Biarkan asisten virtual AI melayani pertanyaan dan pesanan pelanggan Anda.</p>
                  <Avatar className="absolute -right-4 -top-4" style={{ backgroundColor: '#fff', color: '#6ac662' }} size="large">
                    <CheckCircleFilled />
                  </Avatar>
                  <div className="absolute -bottom-2 h-4 w-1/2 rounded-md bg-warning-500" />
                </div>
              </div>
              <div className="animated-card absolute left-0 top-40 max-w-56">
                <div className="relative h-20 w-20 rounded-xl border-2 border-gray-100/30 bg-white/50 backdrop-blur-lg">
                  <div className="absolute bottom-2 right-2 flex h-20 w-20 items-center justify-center rounded-xl bg-white">
                    <ShopOutlined className="text-4xl text-primary-500" />
                  </div>
                </div>
              </div>
              <div className="animated-card absolute bottom-56 right-12 max-w-56">
                <div className="relative h-20 w-20 rounded-xl border-2 border-gray-100/30 bg-white/50 backdrop-blur-lg">
                  <div className="absolute bottom-2 right-2 flex h-20 w-20 items-center justify-center rounded-xl bg-white">
                    <ShoppingCartOutlined className="text-4xl text-success-500" />
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </div>
      </section>
      <section className="mx-auto flex w-full max-w-screen-xl flex-col gap-y-10 px-6 py-32">
        <div className="grid grid-cols-6 gap-4">
          <Card className="col-span-6 bg-gray-100/50 lg:col-span-2">
            <Typography.Title level={5}>
              <Reveal>Lebih dari Platform, </Reveal>
              <Reveal>Kami Mitra Pertumbuhan Anda</Reveal>
            </Typography.Title>

            <p className="mt-4 text-xs">
              <Reveal>
                Di Belee, kami tidak hanya menyediakan teknologi. Kami memberikan Anda kekuatan untuk membangun brand profesional, mengelola operasional secara efisien, dan melayani pelanggan dengan lebih baik. Mulai dari website otomatis hingga
                dashboard analisis, semua dirancang untuk mendukung setiap langkah pertumbuhan usaha Anda.
              </Reveal>
            </p>
          </Card>
          <Card
            style={{
              backgroundImage: "url('/image_asset/background/hero_bg.png')",
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
            className="col-span-6 text-white lg:col-span-4"
          >
            <div className="flex flex-col gap-y-2 p-4">
              <Typography.Title level={5} style={{ color: '#fff' }}>
                <Reveal color="#fff">Tunggu Apa Lagi?</Reveal>
              </Typography.Title>

              <p className="max-w-lg text-xs">
                <Reveal color="#fff">Proses pendaftaran hanya beberapa menit. Dapatkan akses instan ke dashboard Anda dan mulai bangun wajah baru bisnis Anda sekarang juga.</Reveal>
              </p>

              <Button onClick={() => navigate('/member_register')} className="mt-4 w-fit">
                Daftar Sebagai Mitra
              </Button>
            </div>
          </Card>
        </div>
        <hr className="mb-12" />
        <div className="flex flex-col items-center gap-y-2">
          <Typography.Title level={4} style={{ textAlign: 'center' }}>
            Bagaimana pendapat orang?
          </Typography.Title>
          <p className="max-w-lg text-center text-xs md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <Carousel autoplay autoplaySpeed={1000} className="">
          {getAllTestimonials.isLoading ? (
            <>
              <div>
                <div className="mx-auto mb-2 flex max-w-4xl flex-col items-center gap-y-6 text-center">
                  <span className="text-center text-lg font-bold lg:text-2xl">
                    &quot; <Skeleton.Input active /> &quot;
                  </span>
                  <div className="inline-flex items-center gap-x-2">
                    <Skeleton.Avatar active />
                    <Skeleton.Input active /> | <Skeleton.Input active />
                  </div>
                </div>
              </div>
            </>
          ) : (
            testimonials.map((item) => (
              <div key={item.id}>
                <div className="mx-auto mb-2 flex max-w-4xl flex-col items-center gap-y-6 text-center">
                  <span className="text-center text-lg font-bold lg:text-2xl">&quot; {item.desc} &quot;</span>
                  <Rate value={item.rating} />
                  <div className="inline-flex items-center gap-x-2">
                    <Avatar style={{ backgroundColor: '#ECF7FD', color: '#518ed6' }}>{getInitials(item.name)}</Avatar>
                    <span className="text-xs font-bold">Mohamad Rafiq Daud</span> | <p className="m-0 text-xs"> {item.agency} </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </Carousel>
      </section>
      <section className="mx-auto flex w-full max-w-screen-xl flex-col gap-x-10 px-6 pb-32 pt-12 lg:flex-row">
        <div className="flex w-full flex-[1] flex-col gap-y-1 pt-6">
          <Typography.Title level={3}>
            <Reveal>Berita UMKM Terbaru</Reveal>
          </Typography.Title>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <Button className="mt-4 w-fit" variant="solid" color="primary" onClick={() => navigate('/berita_umkm')}>
            Lihat Berita Lainnya
          </Button>
        </div>
        <div className="flex w-full flex-[1] flex-col divide-y">
          {getAllNews.isLoading ? (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="flex flex-col gap-y-2 py-6" key={index}>
                  <Skeleton active />
                </div>
              ))}
            </>
          ) : (
            <>
              {news.slice(0, 3).map((item) => (
                <div key={item.id} className="flex flex-col gap-y-2 py-6">
                  <div className="inline-flex items-center justify-between">
                    <Tag icon={<ClockCircleOutlined />} color="blue">
                      {dateFormatter(item.created_at)}
                    </Tag>
                    <small className="text-gray-400">{timeAgo(item.created_at)}</small>
                  </div>
                  <Typography.Title level={4} style={{ color: '#4172ab' }}>
                    <Reveal> {item.title}</Reveal>
                  </Typography.Title>
                  <p className="news-text text-sm">{parse(item.content)}</p>
                  <div className="mt-2 inline-flex items-center justify-between">
                    <div className="inline-flex items-center gap-x-2 text-xs">
                      <Avatar style={{ backgroundColor: '#ECF7FD', color: '#518ed6' }} size="small">
                        {getInitials(item.user.name)}
                      </Avatar>
                      {item.user.name}
                    </div>
                    <Button onClick={() => navigate('/berita_umkm/' + item.slug)} variant="link" color="primary" icon={<RightOutlined />} iconPosition="end" size="small" className="text-xs">
                      Selengkapnya
                    </Button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
