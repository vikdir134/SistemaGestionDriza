import type {
  ThemeConfig
} from 'antd';

import {
  theme as antdTheme
} from 'antd';


export type ThemeMode =
  | 'light'
  | 'dark';


export const THEME_STORAGE_KEY =
  'gestiondriza-theme';


export const getGestionDrizaTheme = (
  mode: ThemeMode
): ThemeConfig => ({
  algorithm:
    mode === 'dark'
      ? antdTheme.darkAlgorithm
      : antdTheme.defaultAlgorithm,

  token: {
    colorPrimary: '#2563eb',
    colorInfo: '#2563eb',
    colorSuccess: '#16a34a',
    colorWarning: '#d97706',
    colorError: '#dc2626',

    colorBgLayout:
      mode === 'dark'
        ? '#0b1120'
        : '#eef2f7',

    colorBorderSecondary:
      mode === 'dark'
        ? '#30343b'
        : '#d7dee8',

    colorSplit:
      mode === 'dark'
        ? '#30343b'
        : '#d7dee8',

    borderRadius: 10,
    borderRadiusLG: 16,

    controlHeight: 42,
    controlHeightLG: 48,

    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  }
});
