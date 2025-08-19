import { useAuth, useService } from '@/hooks';
import { DashboardService } from '@/services';
import { FileTextOutlined, ShopOutlined, StarOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Card, Skeleton } from 'antd';
import { useEffect } from 'react';

const Dashboard = () => {
  const { token } = useAuth();
  const { execute: executeOverview, ...getAllOverview } = useService(DashboardService.getAllOverview);

  useEffect(() => {
    if (token) {
      if (!getAllOverview.data) executeOverview(token);
    }
  }, [executeOverview, getAllOverview.data, token]);

  const overview = getAllOverview.data ?? {};

  return (
    <div className="grid w-full grid-cols-12 gap-4">
      {getAllOverview.isLoading ? (
        Array.from({ length: 4 }, (_, i) => i).map((index) => (
          <Card key={index} className="col-span-12 h-fit md:col-span-6 lg:col-span-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-y-1">
                <Skeleton.Input active />
                <Skeleton.Button active />
              </div>
              <Skeleton.Node active style={{ width: 24, height: 24 }} />
            </div>
          </Card>
        ))
      ) : (
        <>
          <Card className="col-span-12 h-fit md:col-span-6 lg:col-span-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-y-1">
                <p className="font-semibold capitalize">Total Pendaftar</p>
                <span className="text-xl font-semibold">{overview?.pendaftar}</span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#ECF7FD] p-2 text-2xl text-primary-500">
                <UsergroupAddOutlined />
              </div>
            </div>
          </Card>
          <Card className="col-span-12 h-fit md:col-span-6 lg:col-span-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-y-1">
                <p className="font-semibold capitalize">Total Tenant</p>
                <span className="text-xl font-semibold">{overview?.tenant}</span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#ECF7FD] p-2 text-2xl text-primary-500">
                <ShopOutlined />
              </div>
            </div>
          </Card>
          <Card className="col-span-12 h-fit md:col-span-6 lg:col-span-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-y-1">
                <p className="font-semibold capitalize">Total Berita</p>
                <span className="text-xl font-semibold">{overview?.berita}</span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#ECF7FD] p-2 text-2xl text-primary-500">
                <FileTextOutlined />
              </div>
            </div>
          </Card>
          <Card className="col-span-12 h-fit md:col-span-6 lg:col-span-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-y-1">
                <p className="font-semibold capitalize">Total Testimoni</p>
                <span className="text-xl font-semibold">{overview?.testimoni}</span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#ECF7FD] p-2 text-2xl text-primary-500">
                <StarOutlined />
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default Dashboard;
