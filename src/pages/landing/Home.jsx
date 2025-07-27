import { FormItem, Reveal } from '@/components';
import { CheckCircleFilled, ShopOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Form, Popconfirm, Rate, Typography } from 'antd';
import gsap from 'gsap';
import { useLayoutEffect, useRef, useState } from 'react';
import { useNotification, useService } from '@/hooks';
import { TestimonialService } from '@/services';
import { formFields } from '../dashboard/testimonials/FormFields';

const Home = () => {
  const cardsWrapperRef = useRef(null);
  const [testimonialValues, setTestimonialValues] = useState({});
  const [form] = Form.useForm();
  const storeTestimonial = useService(TestimonialService.store);
  const { success, error } = useNotification();

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
          <div className="flex flex-[1] flex-col gap-y-2">
            <Typography.Title style={{ color: '#fff' }}>
              <Reveal color="#fff">Lorem ipsum dolor sit amet,</Reveal>
              <Reveal color="#fff">consectetur adipiscing elit,</Reveal>
            </Typography.Title>
            <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <Button className="mt-12 w-fit" size="large">
              Cari Tahu Sekarang
            </Button>
          </div>
          <div className="flex-[1]"></div>
        </div>
        <div className="pointer-events-none absolute bottom-0 flex w-full items-center" ref={cardsWrapperRef}>
          <span className="flex-[1]" />
          <div className="ms-40 flex flex-[1] items-start justify-start">
            <figure className="relative xl:w-[32rem] 2xl:w-[35rem]">
              <img src="/image_asset/figure/man_women.png" />
              <div className="animated-card absolute -left-24 bottom-48 max-w-56">
                <div className="relative rounded-xl border-2 border-gray-100/30 bg-white/20 pb-8 pl-6 pr-5 pt-6 backdrop-blur-lg">
                  <p className="text-sm font-semibold leading-snug text-white">Lorem ipsum dolor sit amet constructur adipesating elit, sed</p>
                  <Avatar className="absolute -left-4 -top-4" style={{ backgroundColor: '#fff', color: '#6ac662' }} size="large">
                    <CheckCircleFilled />
                  </Avatar>
                  <div className="absolute -bottom-2 h-4 w-1/2 rounded-md bg-warning-500" />
                </div>
              </div>
              <div className="animated-card absolute -right-4 top-36 max-w-56">
                <div className="relative rounded-xl border-2 border-gray-100/30 bg-white/20 pb-8 pl-6 pr-5 pt-6 backdrop-blur-lg">
                  <p className="text-sm font-semibold leading-snug text-white">Lorem ipsum dolor sit amet constructur adipesating elit, sed</p>
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
        <div className="">
          <Typography.Title level={3} style={{ color: '#142b71' }}>
            <Reveal>Bagaimana pendapat orang tentang Belee?</Reveal>
          </Typography.Title>
        </div>
        <div className="grid grid-cols-6 gap-4">
          <Card className="relative col-span-2 bg-gray-100/50">
            <div className="mt-4 flex flex-col gap-y-2">
              <Typography.Title level={5} style={{ color: '#142b71' }}>
                <Reveal>Mohamad Rafiq Daud (Owner of UMKM GO)</Reveal>
              </Typography.Title>
              <p className="text-secondary-200">
                <Reveal>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Reveal>
              </p>
            </div>
            <Avatar src="/image_asset/figure/user.png" className="absolute -top-4 left-6 border border-gray-200" size="large" style={{ backgroundColor: '#fff', color: '#396396' }} />
          </Card>
          <Card className="relative col-span-2 bg-gray-100/50">
            <div className="mt-4 flex flex-col gap-y-2">
              <Typography.Title level={5} style={{ color: '#142b71' }}>
                <Reveal>Mohamad Rafiq Daud (Owner of UMKM GO)</Reveal>
              </Typography.Title>
              <p className="text-secondary-200">
                <Reveal>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Reveal>
              </p>
            </div>
            <Avatar src="/image_asset/figure/user.png" className="absolute -top-4 left-6 border border-gray-200" size="large" style={{ backgroundColor: '#fff', color: '#396396' }} />
          </Card>
          <Card className="relative col-span-2 bg-gray-100/50">
            <div className="mt-4 flex flex-col gap-y-2">
              <Typography.Title level={5} style={{ color: '#142b71' }}>
                <Reveal>Mohamad Rafiq Daud (Owner of UMKM GO)</Reveal>
              </Typography.Title>
              <p className="text-secondary-200">
                <Reveal>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Reveal>
              </p>
            </div>
            <Avatar src="/image_asset/figure/user.png" className="absolute -top-4 left-6 border border-gray-200" size="large" style={{ backgroundColor: '#fff', color: '#396396' }} />
          </Card>
        </div>
        <hr />
        <div className="grid grid-cols-6 gap-4">
          <Card className="col-span-2 bg-gray-100/50">
            <Typography.Title level={5}>
              <Reveal>Belee In Your Bussiness</Reveal>
            </Typography.Title>
            <p className="mt-4 text-xs">
              <Reveal>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.
              </Reveal>
            </p>
          </Card>
          <Card
            style={{
              backgroundImage: `url('/image_asset/background/hero_bg.png')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
            className="col-span-4 text-white"
          >
            <div className="flex flex-col gap-y-2 p-4">
              <Typography.Title level={5} style={{ color: '#fff' }}>
                <Reveal color="#fff">Tunggu Apa Lagi?</Reveal>
              </Typography.Title>
              <p className="max-w-lg text-xs">
                <Reveal color="#fff">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                </Reveal>
              </p>
              <Button className="mt-4 w-fit">Daftar Sebagai Mitra</Button>
            </div>
          </Card>
        </div>
      </section>
      <section
        style={{
          backgroundImage: `url('/image_asset/background/testimonial_bg.png')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col items-center justify-center gap-y-12 px-6 py-28">
          <Typography.Title level={3} style={{ color: '#fff' }}>
            Kirim Tetimoni dan Feedback
          </Typography.Title>
          <div
            style={{
              backgroundImage: `url('/image_asset/background/member_bg.png')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
            className="w-full rounded-xl bg-white shadow-lg"
          >
            <Form form={form} layout="vertical" className="flex h-full flex-col justify-between p-12">
              <div className="mb-4 flex flex-1 flex-col gap-y-4 overflow-y-auto">
                <FormItem formFields={formFields()} />
              </div>
              <div className="flex flex-col gap-y-4">
                <Popconfirm
                  title="Seberapa puas kamu?"
                  description={
                    <div className="flex flex-col gap-y-1">
                      Seberapa puas kamu dengan pelayanan yang kami berikan?
                      <Rate onChange={(value) => setTestimonialValues({ ...testimonialValues, rating: value })} />
                    </div>
                  }
                  onConfirm={async () => {
                    try {
                      await form.validateFields();
                      const values = form.getFieldsValue();

                      const payload = {
                        ...testimonialValues,
                        ...values
                      };

                      const { message, isSuccess } = await storeTestimonial.execute(payload);
                      if (isSuccess) {
                        form.resetFields();
                        success('Berhasil', message);
                      } else {
                        error('Gagal', message);
                      }
                      return isSuccess;
                    } catch (err) {
                      console.error(err);
                      return false;
                    }
                  }}
                  onCancel={() => {
                    form.resetFields();
                    setTestimonialValues({});
                  }}
                >
                  <Button size="large" variant="solid" color="primary">
                    Berikutnya
                  </Button>
                </Popconfirm>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
