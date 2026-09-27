import type {
  ReactNode
} from 'react';

import {
  Avatar,
  Card,
  Statistic,
  theme
} from 'antd';


type Tone =
  | 'primary'
  | 'success'
  | 'warning'
  | 'error';


type Props = {
  title: ReactNode;
  value: number;
  precision?: number;
  suffix?: ReactNode;
  prefix?: ReactNode;
  icon: ReactNode;
  tone?: Tone;
  loading?: boolean;
};


function MetricCard({
  title,
  value,
  precision = 0,
  suffix,
  prefix,
  icon,
  tone = 'primary',
  loading = false
}: Props) {
  const {
    token
  } = theme.useToken();


  const palette = {
    primary: {
      background:
        token.colorPrimaryBg,
      color:
        token.colorPrimary
    },

    success: {
      background:
        token.colorSuccessBg,
      color:
        token.colorSuccess
    },

    warning: {
      background:
        token.colorWarningBg,
      color:
        token.colorWarning
    },

    error: {
      background:
        token.colorErrorBg,
      color:
        token.colorError
    }
  };


  const current =
    palette[tone];


  return (
    <Card
      className="gd-metric-card"
      loading={loading}
    >

      <div className="gd-metric-card-content">

        <Avatar
          size={48}
          shape="square"
          icon={icon}
          style={{
            background:
              current.background,
            color:
              current.color
          }}
        />


        <Statistic
          title={title}
          value={value}
          precision={precision}
          suffix={suffix}
          prefix={prefix}
          className="gd-metric-statistic"
        />

      </div>

    </Card>
  );
}


export default MetricCard;
