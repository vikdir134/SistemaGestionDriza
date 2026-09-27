import type {
  ReactNode
} from 'react';

import {
  Space,
  Typography
} from 'antd';


const {
  Title,
  Text
} = Typography;


type Props = {
  title: ReactNode;
  description?: ReactNode;
  extra?: ReactNode;
};


function PageHeader({
  title,
  description,
  extra
}: Props) {
  return (
    <div className="gd-page-header">

      <div className="gd-page-header-copy">

        <Title
          level={2}
          className="gd-page-header-title"
        >
          {title}
        </Title>

        {description && (
          <Text
            type="secondary"
            className="gd-page-header-description"
          >
            {description}
          </Text>
        )}

      </div>


      {extra && (
        <Space
          wrap
          className="gd-page-header-extra"
        >
          {extra}
        </Space>
      )}

    </div>
  );
}


export default PageHeader;
