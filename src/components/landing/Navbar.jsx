import { landingLink } from '@/data/link';
import { findItemByKey } from '@/utils/landingLink';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Grid, Image, Menu, Skeleton } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const breakpoints = Grid.useBreakpoint();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleMenuClick = (e) => {
    const clickedItem = findItemByKey(landingLink, e.key);
    if (clickedItem) {
      navigate(clickedItem.key);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadingData = false;

  const isDesktop = breakpoints.lg || breakpoints.xl || breakpoints.xxl;

  return (
    <header className={`fixed left-0 right-0 top-0 z-[999] transition-colors duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between gap-x-4 p-4">
        <div className="flex w-fit items-center gap-x-4 lg:w-full">
          {isDesktop ? (
            <>
              {loadingData ? (
                <div className="inline-flex items-center gap-x-2">
                  <Skeleton.Button size="large" active />
                  <Skeleton.Input size="small" active />
                </div>
              ) : (
                <>
                  <Image width={64} preview={false} src={isScrolled ? '/image_asset/logo/brand_icon_colored.png' : '/image_asset/logo/brand_icon_negative.png'} />{' '}
                </>
              )}
              <Menu
                className={`custom-menu ${isScrolled ? 'menu-scrolled' : 'menu-top'}`}
                style={{
                  minWidth: 0,
                  flex: 'auto',
                  border: 'none',
                  backgroundColor: 'transparent'
                }}
                mode="horizontal"
                items={landingLink}
                activeKey=""
                onClick={handleMenuClick}
              />
            </>
          ) : (
            <>
              <Button icon={<MenuOutlined />} onClick={openDrawer} />
              <Drawer open={isDrawerOpen} onClose={closeDrawer} placement="left" width={300}>
                <Menu items={landingLink} mode="inline" onClick={handleMenuClick} />
              </Drawer>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  villageProfile: PropTypes.object
};

export default Navbar;
