import {
  MoonOutlined,
  SunOutlined
} from '@ant-design/icons';

import {
  Button,
  Tooltip
} from 'antd';

import {
  useGestionDrizaTheme
} from '../../theme/GestionDrizaThemeProvider';


type Props = {
  size?: 'small' | 'middle' | 'large';
};


function ThemeToggle({
  size = 'middle'
}: Props) {
  const {
    mode,
    toggleTheme
  } = useGestionDrizaTheme();

  const esOscuro =
    mode === 'dark';


  return (
    <Tooltip
      title={
        esOscuro
          ? 'Usar modo claro'
          : 'Usar modo nocturno'
      }
    >
      <Button
        type="text"
        shape="circle"
        size={size}
        aria-label={
          esOscuro
            ? 'Cambiar a modo claro'
            : 'Cambiar a modo nocturno'
        }
        icon={
          esOscuro
            ? <SunOutlined />
            : <MoonOutlined />
        }
        onClick={
          toggleTheme
        }
      />
    </Tooltip>
  );
}


export default ThemeToggle;
