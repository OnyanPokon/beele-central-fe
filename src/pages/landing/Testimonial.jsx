import { Reveal } from '@/components';
import { useCrudModal, useNotification, useService } from '@/hooks';
import { TestimonialService } from '@/services';
import { ShopOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Rate, Result, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router-dom';

const Testimonial = () => {
  const sendTestimonial = useService(TestimonialService.store);
  const navigate = useNavigate();
  const modal = useCrudModal();
  const { success } = useNotification();

  const onFinish = async (values) => {
    const { isSuccess, message } = await sendTestimonial.execute(values);
    if (isSuccess) {
      success('Berhasil', message);
      navigate('/');
    } else {
      modal.show.paragraph({
        data: {
          content: <Result status="error" title="Gagal Mengirim Testimoni" subTitle={message} />
        }
      });
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
            <Reveal color="#fff">Bagaimana Pengalaman Anda Menggunakan Bele?</Reveal>
          </Typography.Title>
          <p className="max-w-md text-center text-white">Informasi ini akan kami gunakan untuk membangun profil dan website profesional untuk usaha Anda.</p>
        </div>
        <div
          style={{
            backgroundImage: `url('/image_asset/background/member_bg.png')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
          className="w-full rounded-xl bg-white shadow-lg"
        >
          <Form onFinish={onFinish} name="login" layout="vertical" initialValues={{ remember: true }} className="flex h-full flex-col justify-between gap-y-4 p-6 lg:p-12">
            <Form.Item
              className="m-0"
              label="Nama"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Mohon masukkan nama!'
                }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Masukan nama" size="large" />
            </Form.Item>
            <Form.Item
              className="m-0"
              label="Instansi"
              name="agency"
              rules={[
                {
                  required: true,
                  message: 'Mohon masukkan instansi!'
                }
              ]}
            >
              <Input prefix={<ShopOutlined />} placeholder="Masukan nama instansi" size="large" />
            </Form.Item>
            <Form.Item
              className="m-0"
              label="Deskripsi"
              name="desc"
              rules={[
                {
                  required: true,
                  message: 'Mohon masukkan deskripsi!'
                }
              ]}
            >
              <TextArea placeholder="Masukan nama instansi" size="large" />
            </Form.Item>
            <Form.Item
              className="m-0"
              label="Seberapa Puas Anda Dengan Belee?"
              name="rating"
              rules={[
                {
                  required: true,
                  message: 'Mohon masukkan rating!'
                }
              ]}
            >
              <Rate />
            </Form.Item>

            <Form.Item>
              <Button loading={sendTestimonial.isLoading} block type="primary" size="large" htmlType="submit">
                Kirim Testimoni
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
