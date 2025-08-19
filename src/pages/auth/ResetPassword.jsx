import { useCrudModal, useService } from '@/hooks';
import { AuthService } from '@/services';
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Result } from 'antd';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Notfound } from '../result';

const ForgotPassword = () => {
  const resetPassword = useService(AuthService.resetPassword);
  const modal = useCrudModal();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const onFinish = async (values) => {
    const { isSuccess, message } = await resetPassword.execute({ ...values, token: token });
    if (isSuccess) {
      navigate('/auth/login');
    } else {
      modal.show.paragraph({
        data: {
          content: <Result status="error" title="Gagal reset kata sandi" subTitle={message} />
        }
      });
    }
    return isSuccess;
  };

  if (!token) {
    return <Notfound />;
  }

  return (
    <Card className="w-full max-w-md px-4">
      <div className="mb-5 mt-4 flex w-full flex-col items-center justify-center gap-y-2">
        <div className="mb-4 flex flex-col items-center justify-center gap-y-2 text-center">
          <h1 className="text-xl font-semibold">Atur Kembali Kata Sandi</h1>
        </div>
      </div>
      <Form name="login" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          label="Kata Sandi Baru"
          name="password_baru"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan kata sandi!'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Kata Sandi"
            size="large"
            suffix={passwordVisible ? <EyeOutlined onClick={() => setPasswordVisible(false)} /> : <EyeInvisibleOutlined onClick={() => setPasswordVisible(true)} />}
          />
        </Form.Item>
        <Form.Item
          label="Konfirmasi Kata Sandi Baru"
          name="konfirmasi_password_baru"
          dependencies={['password_baru']}
          rules={[
            {
              required: true,
              message: 'Mohon masukkan konfirmasi kata sandi!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password_baru') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Kata sandi tidak cocok!'));
              }
            })
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Kata Sandi"
            size="large"
            suffix={passwordVisible ? <EyeOutlined onClick={() => setPasswordVisible(false)} /> : <EyeInvisibleOutlined onClick={() => setPasswordVisible(true)} />}
          />
        </Form.Item>
        <Form.Item>
          <Button loading={resetPassword.isLoading} block type="primary" htmlType="submit" size="large">
            Reset Kata Sandi
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ForgotPassword;
