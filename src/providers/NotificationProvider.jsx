/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { notification } from 'antd';
import { NotificationContext } from '@/context';
import { PushpinOutlined } from '@ant-design/icons';

const renderDescription = (description) => {
  if (typeof description === 'string') return <span>{description}</span>;

  if (Array.isArray(description)) {
    return (
      <ul style={{ paddingLeft: '1rem' }}>
        {description.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    );
  }

  if (typeof description === 'object' && description !== null) {
    return (
      <div className="flex flex-col gap-y-2">
        {Object.entries(description).map(([field, messages], index) => (
          <div key={index} className="flex items-start gap-x-1">
            <PushpinOutlined className="mt-1" />
            {(Array.isArray(messages) ? messages : [messages]).map((msg, i) => (
              <span key={i}>{msg}</span>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return <span>{String(description)}</span>;
};

export default function NotificationProvider({ children }) {
  const [api, contextHolder] = notification.useNotification();

  const success = (message, description) => {
    api.success({ message, description: renderDescription(description) });
  };

  const error = (message, description) => {
    api.error({ message, description: renderDescription(description) });
  };

  const info = (message, description) => {
    api.info({ message, description: renderDescription(description) });
  };

  const warning = (message, description) => {
    api.warning({ message, description: renderDescription(description) });
  };

  return (
    <NotificationContext.Provider value={{ success, error, info, warning }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired
};
