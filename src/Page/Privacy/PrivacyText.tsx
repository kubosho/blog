import * as React from 'react';

export const PrivacyText = () => (
  <React.Fragment>
    <p>
      当ブログでは内容の改善を目的として、Googleアナリティクスによるアクセス分析をおこなっています。
      <br />
      Googleアナリティクスは、Cookie(クッキー)により、匿名のトラフィックデータを収集しています。
    </p>
    <p>
      Cookieに含まれるデータは利用者の個人情報を特定しません。利用者はCookieを無効にした状態で当サイトにアクセスできます。
      <br />
      詳しくは
      <a href="https://policies.google.com/technologies/partner-sites">
        Google のサービスを使用するサイトやアプリから収集した情報の Google による使用 –
        ポリシーと規約 – Google
      </a>
      を参照してください。
    </p>
  </React.Fragment>
);
