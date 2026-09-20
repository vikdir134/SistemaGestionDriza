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
  },

  components: {
    Table: {
      headerBg:
        mode === 'dark'
          ? '#191b20'
          : '#f4f7fb',

      headerColor:
        mode === 'dark'
          ? '#f3f4f6'
          : '#111827',

      headerSplitColor:
        mode === 'dark'
          ? '#343942'
          : '#d7dee8',

      borderColor:
        mode === 'dark'
          ? '#30343b'
          : '#d7dee8',

      rowHoverBg:
        mode === 'dark'
          ? '#242932'
          : '#f2f6fc',

      rowSelectedBg:
        mode === 'dark'
          ? '#172554'
          : '#eaf2ff',

      rowSelectedHoverBg:
        mode === 'dark'
          ? '#1e3a5f'
          : '#dceaff',

      bodySortBg:
        mode === 'dark'
          ? '#1b1f26'
          : '#f7f9fc',

      headerSortActiveBg:
        mode === 'dark'
          ? '#232831'
          : '#e9eef5',

      headerSortHoverBg:
        mode === 'dark'
          ? '#272d36'
          : '#e4eaf2'
    }
  }
});
