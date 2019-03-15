import * as React from 'react';

import { HeaderComponent } from '../../Application/HeaderComponent';
import { FooterComponent } from '../../Application/FooterComponent';
import { OptoutText } from './OptoutText';
import { PrivacyText } from './PrivacyText';

declare global {
  interface Window {
    __gaId__?: string;
    gaOptout?: {
      gaId: string;
      enable: () => void;
      disable: () => void;
      enabled: () => boolean;
    };
  }
}

interface States {
  isOptedout: boolean;
}

export class PrivacyComponent extends React.Component<{}, States> {
  constructor(props: {}, states: States) {
    super(props, states);

    this.state = {
      isOptedout: false,
    };

    this._onClickGAOptoutButton = this._onClickGAOptoutButton.bind(this);
  }

  render(): JSX.Element {
    const { isOptedout } = this.state;

    return (
      <React.Fragment>
        <HeaderComponent />
        <PrivacyText />
        <OptoutText isOptedout={isOptedout} onClickGAOptoutButton={this._onClickGAOptoutButton} />
        <FooterComponent />
      </React.Fragment>
    );
  }

  private _onClickGAOptoutButton() {
    const { isOptedout } = this.state;

    this.setState({
      isOptedout: !isOptedout,
    });

    const { __gaId__, gaOptout } = window;
    gaOptout.gaId = __gaId__;
    this._toggleGAOptoutStatus();
  }

  private _toggleGAOptoutStatus() {
    const { gaOptout } = window;

    if (gaOptout.enabled()) {
      gaOptout.disable();
    } else {
      gaOptout.enable();
    }
  }
}
