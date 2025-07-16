import { Action } from '@/constants';
import strings from '@/utils/strings';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import PropTypes from 'prop-types';

export default function Delete({ title = strings('delete'), onClick }) {
  return (
    <Tooltip title={title}>
      <Button variant="link" color="danger" icon={<DeleteOutlined />} onClick={onClick} />
    </Tooltip>
  );
}

Delete.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  model: PropTypes.func.isRequired,
  action: PropTypes.oneOf(Object.values(Action))
};
