import { Action } from '@/constants';
import strings from '@/utils/strings';
import { InfoOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import PropTypes from 'prop-types';

export default function Detail({ title = strings('detail'), onClick }) {
  return (
    <Tooltip title={title}>
      <Button variant="link" color="green" onClick={onClick} size="middle" icon={<InfoOutlined />} />
    </Tooltip>
  );
}

Detail.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  model: PropTypes.func.isRequired,
  action: PropTypes.oneOf(Object.values(Action))
};
