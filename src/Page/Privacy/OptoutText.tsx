import * as React from 'react';

enum TrackingStatus {
  enabled = '有効',
  disabled = '無効',
}

interface Props {
  isOptedout: boolean;
  onClickGAOptoutButton: () => void;
}

export const OptoutText = ({ isOptedout, onClickGAOptoutButton }: Props) => {
  const trackingStatus = isOptedout ? TrackingStatus.disabled : TrackingStatus.enabled;

  return (
    <React.Fragment>
      <h2>Google Analyticsによるトラッキングの状態を変更する</h2>
      <p>Googleアナリティクスは以下のボタンから無効・有効を切り替えられます。</p>
      <button onClick={onClickGAOptoutButton}>
        Googleアナリティクスのオプトアウト状況を変更する
      </button>
      <p>
        現在、Googleアナリティクスによるトラッキングは<output>{trackingStatus}</output>
        になっています。
      </p>
    </React.Fragment>
  );
};
