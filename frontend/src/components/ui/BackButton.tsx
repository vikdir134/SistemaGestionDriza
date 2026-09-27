import {
  ArrowLeftOutlined
} from '@ant-design/icons';

import {
  Button
} from 'antd';

import {
  useNavigate
} from 'react-router-dom';


type Props = {
  to?: string;
  label?: string;
};


function BackButton({
  to,
  label = 'Volver'
}: Props) {
  const navigate =
    useNavigate();


  return (
    <Button
      type="text"
      icon={
        <ArrowLeftOutlined />
      }
      className="gd-back-button"
      onClick={() => {
        if (to) {
          navigate(to);
          return;
        }

        navigate(-1);
      }}
    >
      {label}
    </Button>
  );
}


export default BackButton;
