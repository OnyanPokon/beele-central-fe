import { DataLoader } from '@/components';
import { useAuth, useNotification, useService } from '@/hooks';
import { AuthService, EmployeesService } from '@/services';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Form, Input, Menu, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';

const ProfileSettings = () => {
  const { token, user, isLoading, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState('profil');
  const { success, error } = useNotification();
  const [form] = Form.useForm();

  const updateUserProfil = useService(EmployeesService.update);
  const updateUserPassword = useService(AuthService.updatePassword);

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [form, user]);

  const onSubmitChangeProfile = async (values) => {
    const { message, isSuccess } = await updateUserProfil.execute(user.id, values, token);
    if (isSuccess) {
      success('Berhasil', message);
    } else {
      error('Gagal', message);
    }
  };

  const onSubmitChangePassword = async (values) => {
    const { message, isSuccess } = await updateUserPassword.execute(token, values);
    if (isSuccess) {
      success('Berhasil', message);
      logout();
    } else {
      error('Gagal', message);
    }
  };

  return (
    <div className="grid w-full grid-cols-12 gap-4">
      {isLoading ? (
        <DataLoader type="profil" />
      ) : (
        <>
          <div className="col-span-12 flex w-full flex-col gap-y-4 lg:col-span-4">
            <Card className="w-full" cover={<img src="/image_asset/background/user_card_bg.png" />}>
              <div className="relative px-4">
                <div className="absolute -top-16">
                  <Avatar shape="square" size={90} icon={<UserOutlined />} style={{ backgroundColor: '#fff', padding: '12px', color: 'black' }} className="shadow-md" />
                </div>
              </div>
              <div className="mt-12 px-4">
                <Typography.Title level={5}>{user?.name}</Typography.Title>
                <Typography.Text>{user?.role}</Typography.Text>
              </div>
            </Card>
            <Card className="w-full">
              <Menu onClick={(e) => setActiveMenu(e.key)} mode="vertical" defaultSelectedKeys={[activeMenu]}>
                <Menu.Item key="profil" icon={<UserOutlined />}>
                  Profil Pengguna
                </Menu.Item>
                <Menu.Item key="password" icon={<LockOutlined />}>
                  Ganti Password
                </Menu.Item>
              </Menu>
            </Card>
          </div>
          <div className="col-span-12 lg:col-span-8">
            {activeMenu === 'profil' ? (
              <Card className="w-full" title="Profile Operator">
                <Form layout="vertical" form={form} onFinish={onSubmitChangeProfile}>
                  <Form.Item className="mb-2">
                    <b>Data Operator</b>
                  </Form.Item>
                  <Form.Item label="Nama Lengkap" name="name" rules={[{ required: true, message: 'Field Nama harus diisi' }]}>
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item label="User Role" name="role" rules={[{ required: true, message: 'Field Role harus diisi' }]}>
                    <Select size="large" disabled>
                      <Select.Option value={'admin'}>Admin</Select.Option>
                      <Select.Option value={'karyawan'}>Pegawai</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={updateUserProfil.isLoading}>
                      Simpan
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            ) : activeMenu === 'password' ? (
              <Card className="w-full" title="Ganti Kata Sandi">
                <Form layout="vertical" onFinish={onSubmitChangePassword}>
                  <Form.Item label="Kata Sandi Lama" name="password_lama" rules={[{ required: true, message: 'Password lama harus diisi' }]}>
                    <Input.Password size="large" placeholder="Masukan Kata Sandi Lama" />
                  </Form.Item>
                  <Form.Item label="Kata Sandi Baru" name="password_baru" rules={[{ required: true, message: 'Password baru harus diisi' }]}>
                    <Input.Password size="large" placeholder="Masukan Kata Sandi Baru" />
                  </Form.Item>
                  <Form.Item label="Ulangi Kata Sandi Baru" name="konfirmasi_password_baru" rules={[{ required: true, message: 'Konfirmasi Password harus diisi' }]}>
                    <Input.Password size="large" placeholder="Konfirmasi Kata Sandi Baru" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={updateUserPassword.isLoading}>
                      Simpan
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            ) : (
              <div>null</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileSettings;
