import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';

function DataOperation(props: IProps) {
  const { disabled, type, icon, confirm, onClick, children } = props;
  return confirm ? (
    <Popconfirm
      disabled={disabled}
      title="是否要执行当前操作？"
      okText="确定"
      cancelText="取消"
      onConfirm={onClick}
    >
      <Button disabled={disabled} type={type} icon={icon}>
        {children}
      </Button>
    </Popconfirm>
  ) : (
    <Button disabled={disabled} type={type} icon={icon} onClick={onClick}>
      {children}
    </Button>
  );
}

DataOperation.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.node,
  confirm: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

DataOperation.defaultProps = {
  type: 'primary',
  icon: null,
  confirm: false,
  children: '',
};

export default DataOperation;

interface IProps {
  disabled: boolean;
  type: 'default' | 'primary' | 'ghost' | 'dashed' | 'link';
  icon: string;
  confirm: boolean;
  onClick: (e?: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
}
