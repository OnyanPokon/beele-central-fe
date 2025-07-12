import { useStyle } from '@/hooks';
import { ConfigProvider as StyleProvider } from 'antd';
import PropTypes from 'prop-types';

export default function AntdConfigProviders({ children }) {
  const { styles } = useStyle();
  return (
    <StyleProvider
      theme={{
        token: {
          fontFamily: 'Plus Jakarta Sans',
          colorPrimary: '#518ed6',
          colorInfo: '#33a6df',
          colorSuccess: '#6ac662',
          colorWarning: '#fbd23a',
          colorError: '#e71544',
          colorTextBase: '#000000'
        },
        components: {
          Button: {
            yellow: '#fbd23a'
          }
        }
      }}
      button={{
        className: styles.customButton
      }}
      drawer={{
        padding: 0
      }}
    >
      {children}
    </StyleProvider>
  );
}
AntdConfigProviders.propTypes = {
  children: PropTypes.node.isRequired
};
