import React from 'react';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { Link } from 'react-router-dom';

const Bouble = () => (
  <>
    <FloatButton.Group
      trigger="click"
      type="primary"
      style={{
        right: 60,
      }}
      icon={<CustomerServiceOutlined />}
    >
      <Link to="/"> 
        <FloatButton />
      </Link>
      <Link to="/other-page"> 
        <FloatButton icon={<CommentOutlined />} />
      </Link>
    </FloatButton.Group>
  </>
);

export default Bouble;
