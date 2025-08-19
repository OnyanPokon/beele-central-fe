import { useCrudModal, useService } from '@/hooks';
import { AuthService } from '@/services';
import { MailOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Result } from 'antd';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const forgotPassword = useService(AuthService.forgotPassword);
  const modal = useCrudModal();
  const onFinish = async (values) => {
    const { isSuccess, message } = await forgotPassword.execute(values);
    if (isSuccess) {
      modal.show.paragraph({
        data: {
          content: <Result status="success" title="Permintaan berhasil" subTitle="Kami telah mengirimkan tautan reset kata sandi ke email Anda. Silakan periksa kotak masuk Anda." />
        }
      });
    } else {
      modal.show.paragraph({
        data: {
          content: <Result status="error" title="Gagal mengirim tautan reset kata sandi" subTitle={message || 'Terjadi kesalahan saat mengirim tautan reset kata sandi. Silakan coba lagi.'} />
        }
      });
    }
    return isSuccess;
  };
  return (
    <Card className="w-full max-w-md px-4">
      <div className="mb-5 mt-4 flex w-full flex-col items-center justify-center gap-y-2">
        <div className="mb-4 flex flex-col items-center justify-center gap-y-2 text-center">
          <h1 className="text-xl font-semibold">Lupa Kata Sandi</h1>
        </div>
      </div>
      <Form name="login" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan Email!'
            },
            {
              type: 'email',
              message: 'Mohon masukkan format email yang valid!'
            }
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Username" size="large" />
        </Form.Item>

        <Form.Item>
          <Button loading={forgotPassword.isLoading} block type="primary" htmlType="submit" size="large">
            Kirim Tautan Reset Kata Sandi
          </Button>
        </Form.Item>
        <Form.Item>
          <span className="m-0 block text-center">
            Urungkan Proses?{' '}
            <Link className="text-color-primary-500 hover:text-color-primary-200 font-bold underline" to="/auth/login">
              Kembali ke halaman login
            </Link>
          </span>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ForgotPassword;
