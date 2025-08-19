/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Avatar, Button, Card, Checkbox, FloatButton, Form, Input, Tour, Typography } from 'antd';
import { formFields } from '../dashboard/registrants/FormFields';
import { FormItem, Reveal } from '@/components';
import { CheckCircleFilled, ClockCircleFilled, CloseCircleFilled, QuestionCircleOutlined, RightOutlined, WarningOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { useNotification, useService } from '@/hooks';
import { LandingService } from '@/services';

function debounce(func, delay) {
  let timer;
  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
}

const MemberRegister = () => {
  const [step, setStep] = React.useState('form');
  const [checked, setChecked] = React.useState(false);
  const [values, setValues] = React.useState(null);
  const [form] = Form.useForm();
  const storeRegistrant = useService(LandingService.memberRegister);
  const domainChecker = useService(LandingService.domainChecker);
  const { success, error } = useNotification();
  const [openTour, setOpenTour] = React.useState(false);
  const [checking, setChecking] = React.useState(false);
  const [available, setAvailable] = React.useState(null);
  const [domainError, setDomainError] = React.useState(null);
  const [domainValue, setDomainValue] = React.useState('');
  const currentValue = React.useRef('');

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

  const checkDomain = useCallback(
    debounce(async (value) => {
      setChecking(true);
      setDomainError(null);
      setAvailable(null);
      try {
        const { message, isSuccess } = await domainChecker.execute({
          domain: value
        });
        setAvailable(isSuccess);
        if (!isSuccess) {
          setDomainError(message || 'Domain tidak tersedia');
        }
      } catch (e) {
        setDomainError('Terjadi kesalahan saat memeriksa domain');
        setAvailable(false);
      } finally {
        setChecking(false);
      }
    }, 1000),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setDomainValue(value);
    currentValue.current = value;

    if (value && value.length > 0) {
      checkDomain(value);
    } else {
      setDomainError(null);
      setAvailable(null);
    }

    form.setFieldsValue({ domain: value });
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
            <Reveal color="#fff">Satu Langkah Lagi Menuju Bisnis Digital Anda!</Reveal>
          </Typography.Title>
          <p className="max-w-md text-center text-white">Informasi ini akan kami gunakan untuk membangun profil dan website profesional untuk usaha Anda.</p>
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
                  <Form.Item
                    label="Nama Domain (Masukan nama domain toko yang anda inginkan)"
                    name="domain"
                    rules={[
                      {
                        required: true,
                        message: 'Nama Domain harus diisi'
                      },
                      {
                        validator(_, value) {
                          if (domainError) {
                            return Promise.reject(domainError);
                          }
                          return Promise.resolve();
                        }
                      }
                    ]}
                  >
                    <Input placeholder="Masukan Nama Domain" size="large" addonBefore="http://" addonAfter=".belee.id" onChange={handleChange} value={domainValue} />
                    {checking && (
                      <small className="ms-1">
                        <ClockCircleFilled className="text-warning-500" /> Sedang melakukan pengecek-kan domain...
                      </small>
                    )}
                    {!checking && available === false && (
                      <small className="ms-1">
                        <CloseCircleFilled className="text-danger-500" /> Domain yang kamu inputkan tidak tersedia
                      </small>
                    )}
                    {!checking && available === true && (
                      <small className="ms-1">
                        <CheckCircleFilled className="text-success-500" /> Domain tersedia!
                      </small>
                    )}
                  </Form.Item>
                </div>
                <div className="flex flex-col gap-y-4">
                  <Card className="bg-primary-100/20">
                    <div className="relative">
                      <p className="text-secondary-500">Periksa kembali data Anda. Informasi yang akurat akan mempercepat proses verifikasi dan pembuatan website Anda</p>
                      <Avatar className="absolute -top-11 right-0" style={{ backgroundColor: '#142b71', color: '#fff' }} size="large">
                        <WarningOutlined />
                      </Avatar>
                    </div>
                  </Card>
                  <Button size="large" disabled={available !== true} variant="solid" color="primary" icon={<RightOutlined />} onClick={handleNext}>
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
                      Dengan mendaftar dan menggunakan layanan Platform Belee (&quot;Layanan&quot;), Anda menyatakan telah membaca, mengerti, dan setuju untuk terikat sepenuhnya oleh Syarat dan Ketentuan yang berlaku. Layanan kami merupakan platform
                      digital yang dirancang untuk membantu Pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) dalam membangun identitas usaha online melalui pembuatan situs web (website) otomatis dan alat manajemen bisnis terpadu.
                    </p>
                  </div>
                  <div className="flex items-start gap-x-4 text-primary-800">
                    <CheckCircleFilled className="mt-1 text-success-500" />
                    <p className="text-justify text-sm">
                      Layanan kami merupakan platform digital yang dirancang untuk membantu Pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) dalam membangun identitas usaha online melalui pembuatan situs web (website) otomatis dan alat manajemen bisnis
                      terpadu.
                    </p>
                  </div>
                  <div className="flex items-start gap-x-4 text-primary-800">
                    <CheckCircleFilled className="mt-1 text-success-500" />
                    <p className="text-justify text-sm">
                      Sebagai pengguna, Anda wajib memberikan informasi pendaftaran yang akurat, terkini, dan lengkap serta bertanggung jawab penuh atas segala aktivitas yang terjadi pada akun Anda, termasuk menjaga kerahasiaan kata sandi
                    </p>
                  </div>
                  <div className="flex items-start gap-x-4 text-primary-800">
                    <CheckCircleFilled className="mt-1 text-success-500" />
                    <p className="text-justify text-sm">
                      Seluruh materi dan informasi, termasuk namun tidak terbatas pada foto produk, deskripsi, dan harga (&quot;Konten Pengguna&quot;) yang Anda unggah ke dalam Layanan adalah milik dan tanggung jawab Anda sepenuhnya.
                    </p>
                  </div>
                  <div className="flex items-start gap-x-4 text-primary-800">
                    <CheckCircleFilled className="mt-1 text-success-500" />
                    <p className="text-justify text-sm">
                      Anda setuju untuk menggunakan Layanan hanya untuk tujuan yang sah sesuai hukum yang berlaku di Republik Indonesia dan dilarang keras menggunakan platform untuk tindakan penipuan, penyebaran konten ilegal, atau aktivitas lain
                      yang merugikan pihak ketiga dan Platform Belee.
                    </p>
                  </div>
                  <div className="flex items-start gap-x-4 text-primary-800">
                    <CheckCircleFilled className="mt-1 text-success-500" />
                    <p className="text-justify text-sm">
                      Perlu dipahami bahwa Platform Belee bertindak sebagai penyedia teknologi dan tidak bertanggung jawab atas segala bentuk transaksi, interaksi, maupun sengketa yang terjadi antara Anda dengan pelanggan Anda.
                    </p>
                  </div>
                  <div className="flex items-start gap-x-4 text-primary-800">
                    <CheckCircleFilled className="mt-1 text-success-500" />
                    <p className="text-justify text-sm">Syarat dan Ketentuan ini dapat kami ubah atau perbarui dari waktu ke waktu, dan perubahan tersebut akan kami informasikan kepada Anda melalui pemberitahuan yang wajar</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>
                  Saya menyetujui syarat dan ketentuan
                </Checkbox>
                <Button disabled={!checked} loading={storeRegistrant.isLoading} size="large" variant="solid" color="primary" onClick={handleSubmit}>
                  Proses
                </Button>
                <Button
                  size="large"
                  variant="solid"
                  onClick={() => {
                    setStep('form');
                    setValues(null);
                    setDomainValue(null);
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
