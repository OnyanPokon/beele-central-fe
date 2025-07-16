import { Action } from '@/constants';
import strings from '@/utils/strings';
import { EditOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import PropTypes from 'prop-types';

export default function Edit({ title = strings('edit'), onClick }) {
  return (
    <Tooltip title={title}>
      <Button variant="link" color="primary" icon={<EditOutlined />} onClick={onClick} />
    </Tooltip>
  );
}

Edit.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  model: PropTypes.func.isRequired,
  action: PropTypes.oneOf(Object.values(Action))
};
