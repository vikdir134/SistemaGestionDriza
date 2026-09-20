import {
  App as AntdApp,
  ConfigProvider
} from 'antd';

import esES
  from 'antd/locale/es_ES';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import type {
  ReactNode
} from 'react';

import {
  getGestionDrizaTheme,
  THEME_STORAGE_KEY
} from './themeConfig';

import type {
  ThemeMode
} from './themeConfig';


type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (
    mode: ThemeMode
  ) => void;
  toggleTheme: () => void;
};


const GestionDrizaThemeContext =
  createContext<
    ThemeContextValue | null
  >(null);


const obtenerTemaInicial =
  (): ThemeMode => {
    const guardado =
      localStorage.getItem(
        THEME_STORAGE_KEY
      );

    if (
      guardado === 'dark' ||
      guardado === 'light'
    ) {
      return guardado;
    }

    return window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
      ? 'dark'
      : 'light';
  };


type Props = {
  children: ReactNode;
};


function GestionDrizaThemeProvider({
  children
}: Props) {
  const [
    mode,
    setMode
  ] = useState<ThemeMode>(
    obtenerTemaInicial
  );


  useEffect(() => {
    localStorage.setItem(
      THEME_STORAGE_KEY,
      mode
    );

    document.documentElement
      .setAttribute(
        'data-gd-theme',
        mode
      );

    document.documentElement
      .style
      .colorScheme = mode;

  }, [
    mode
  ]);


  const value =
    useMemo<ThemeContextValue>(
      () => ({
        mode,

        setMode,

        toggleTheme: () => {
          setMode(
            (actual) =>
              actual === 'light'
                ? 'dark'
                : 'light'
          );
        }
      }),
      [
        mode
      ]
    );


  return (
    <GestionDrizaThemeContext.Provider
      value={value}
    >
      <ConfigProvider
        locale={esES}
        theme={
          getGestionDrizaTheme(
            mode
          )
        }
        form={{
          validateMessages: {
            required:
              '${label} es obligatorio',
            types: {
              email:
                'Ingresa un correo válido'
            }
          }
        }}
      >
        <AntdApp>
          {children}
        </AntdApp>
      </ConfigProvider>
    </GestionDrizaThemeContext.Provider>
  );
}


export const useGestionDrizaTheme =
  () => {
    const context =
      useContext(
        GestionDrizaThemeContext
      );

    if (!context) {
      throw new Error(
        'useGestionDrizaTheme debe utilizarse dentro de GestionDrizaThemeProvider'
      );
    }

    return context;
  };


export default
  GestionDrizaThemeProvider;
