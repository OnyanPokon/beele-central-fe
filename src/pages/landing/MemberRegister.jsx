import { Avatar, Button, Card, Checkbox, FloatButton, Form, Tour, Typography } from 'antd';
import { formFields } from '../dashboard/registrants/FormFields';
import { FormItem, Reveal } from '@/components';
import { CheckCircleFilled, QuestionCircleOutlined, RightOutlined, WarningOutlined } from '@ant-design/icons';
import React from 'react';
import { useNotification, useService } from '@/hooks';
import { LandingService } from '@/services';

const MemberRegister = () => {
  const [step, setStep] = React.useState('form');
  const [checked, setChecked] = React.useState(false);
  const [values, setValues] = React.useState(null);
  const [form] = Form.useForm();
  const storeRegistrant = useService(LandingService.memberRegister);
  const { success, error } = useNotification();
  const [openTour, setOpenTour] = React.useState(false);

  const handleNext = () => {
    form.validateFields().then(() => {
      setStep('terms');
      setValues(form.getFieldsValue());
    });
  };

  React.useEffect(() => {
    const tourKey = 'isTourSeen';
    const seen = localStorage.getItem(tourKey);

    if (seen === null) {
      localStorage.setItem(tourKey, 'false');
      setOpenTour(true);
    } else if (seen === 'false') {
      setOpenTour(true);
      localStorage.setItem(tourKey, 'true');
    } else {
      setOpenTour(false);
    }
  }, []);

  const handleSubmit = async () => {
    const { message, isSuccess } = await storeRegistrant.execute({ ...values, status: 'menunggu' });
    if (isSuccess) {
      success('Berhasil', message);
      setStep('form');
      form.resetFields();
    } else {
      error('Gagal', message);
    }
    return isSuccess;
  };

  return (
    <section
      className=""
      style={{
        backgroundImage: `url('/image_asset/background/hero_bg.png')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col items-center justify-center px-6 py-28">
        <div className="my-12 flex flex-col items-center justify-center gap-y-2">
          <Typography.Title level={2} style={{ color: '#fff', textAlign: 'center' }}>
            <Reveal color="#fff">Lorem ipsum dolor sit amet,</Reveal>
          </Typography.Title>
          <p className="max-w-md text-center text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore </p>
        </div>
        <div
          style={{
            backgroundImage: `url('/image_asset/background/member_bg.png')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
          className="h-[45rem] w-full rounded-xl bg-white shadow-lg"
        >
          {step === 'form' && (
            <>
              <Form form={form} layout="vertical" className="flex h-full flex-col justify-between p-6 lg:p-12">
                <div className="body-form mb-4 flex flex-1 flex-col gap-y-4 overflow-y-auto">
                  <FormItem formFields={formFields()} />
                </div>
                <div className="flex flex-col gap-y-4">
                  <Card className="bg-primary-100/20">
                    <div className="relative">
                      <p className="text-secondary-500">mohon pastikan seluruh data yang Anda isi sudah benar dan lengkap. Kesalahan data dapat menghambat proses pendaftaran dan verifikasi UMKM Anda.</p>
                      <Avatar className="absolute -top-11 right-0" style={{ backgroundColor: '#142b71', color: '#fff' }} size="large">
                        <WarningOutlined />
                      </Avatar>
                    </div>
                  </Card>
                  <Button size="large" variant="solid" color="primary" icon={<RightOutlined />} onClick={handleNext}>
                    Berikutnya
                  </Button>
                </div>
              </Form>
            </>
          )}
          {step === 'terms' && (
            <div className="flex h-full flex-col justify-between p-12">
              <Typography.Title level={4}>Syarat dan Ketentuan</Typography.Title>
              <div className="mb-4 flex flex-1 flex-col gap-y-4 overflow-y-auto">
                <div className="flex flex-col gap-y-2 px-4">
                  <div className="flex items-start gap-x-4 text-primary-800">
                    <CheckCircleFilled className="mt-1 text-success-500" />
                    <p className="text-justify text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                      dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
                      ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                      magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>
                  Saya menyetujui syarat dan ketentuan
                </Checkbox>
                <Button disabled={!checked} size="large" variant="solid" color="primary" onClick={handleSubmit}>
                  Proses
                </Button>
                <Button
                  size="large"
                  variant="solid"
                  onClick={() => {
                    setStep('form');
                    setValues(null);
                  }}
                >
                  Kembali
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Tour
        open={openTour}
        onClose={() => setOpenTour(false)}
        steps={[
          {
            title: 'Selamat Datang 👋',
            description: 'Lengkapi data UMKM Anda dan jadilah bagian dari ekosistem kami. Dapatkan berbagai keuntungan eksklusif sebagai mitra resmi Belee.',
            target: () => document.querySelector('.body-form'),
            placement: 'bottom'
          },
          {
            title: 'Nama Toko',
            description: 'Isi kolom ini dengan nama atau brand UMKM Anda.',
            target: () => document.querySelector('.merchant_name')
          },
          {
            title: 'Nama Pemilik',
            description: 'Tuliskan nama lengkap pemilik resmi dari brand atau UMKM Anda di sini, ya!',
            target: () => document.querySelector('.owner_name')
          },
          {
            title: 'Nomor Telp',
            description: 'Lengkapi kolom ini dengan nomor telepon pemilik resmi UMKM Anda, ya!',
            target: () => document.querySelector('.telp')
          },
          {
            title: 'Email',
            description: 'Lengkapi kolom ini dengan Email pemilik resmi UMKM Anda, ya!',
            target: () => document.querySelector('.email')
          },
          {
            title: 'Domain',
            description: 'Tulis domain website yang kamu inginkan untuk UMKM-mu. Domain ini akan menjadi alamat resmi usaha kamu di platform Belee',
            target: () => document.querySelector('.domain')
          }
        ]}
      />
      <FloatButton onClick={() => setOpenTour(true)} icon={<QuestionCircleOutlined />} type="default" style={{ insetInlineEnd: 50 }} />
    </section>
  );
};

export default MemberRegister;
