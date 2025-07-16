import { Avatar, Button, Card, Checkbox, Form, Typography } from 'antd';
import { formFields } from '../dashboard/registrants/FormFields';
import { FormItem } from '@/components';
import { CheckCircleFilled, RightOutlined, WarningOutlined } from '@ant-design/icons';
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

  const handleNext = () => {
    form.validateFields().then(() => {
      setStep('terms');
      setValues(form.getFieldsValue());
    });
  };

  const handleSubmit = async () => {
    const { message, isSuccess } = await storeRegistrant.execute({ ...values, domain: `http://${values.domain}.belee.id`, status: 'menunggu' });
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
      <div className="mx-auto flex min-h-screen w-full max-w-screen-md items-center justify-center px-6 py-28">
        <div
          style={{
            backgroundImage: `url('/image_asset/background/member_bg.png')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
          className="h-[45rem] w-full rounded-xl bg-white shadow-lg"
        >
          {step === 'form' && (
            <Form form={form} layout="vertical" className="flex h-full flex-col justify-between p-12">
              <div className="mb-4 flex flex-1 flex-col gap-y-4 overflow-y-auto">
                <FormItem formFields={formFields()} />
              </div>
              <div className="flex flex-col gap-y-4">
                <Card className="bg-primary-100/20">
                  <div className="relative">
                    <p className="text-primary-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <Avatar className="absolute -top-10 right-0" style={{ backgroundColor: '#396396', color: '#fff' }} size="large">
                      <WarningOutlined />
                    </Avatar>
                  </div>
                </Card>
                <Button size="large" variant="solid" color="primary" icon={<RightOutlined />} onClick={handleNext}>
                  Berikutnya
                </Button>
              </div>
            </Form>
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
    </section>
  );
};

export default MemberRegister;
