---
title: プライバシーポリシー
date: 2018-05-19T22:19:21+09:00
type: page
layout: page
---

<script>
  const gaId = window.__gaId__ || '';

  function toggleGAOptoutStatus() {
    if (gaOptout.isGADisabled()) {
      gaOptout.enableGA();
      return;
    }

    gaOptout.disableGA();
  }

  function showGAOptoutStatus() {
    const outputElement = document.querySelector('#google-analytics-tracking-status')
      .querySelector('output');

    outputElement.textContent = gaOptout.isGADisabled() ? '無効' : '有効';
  }

  function onClickGAOptoutButton() {
    gaOptout.gaId = gaId;
    toggleGAOptoutStatus();
    showGAOptoutStatus();
  }

  document.addEventListener('DOMContentLoaded', showGAOptoutStatus);
</script>

当ブログでは内容の改善を目的として、Googleアナリティクスによるアクセス分析をおこなっています。

Googleアナリティクスは、Cookie(クッキー)により、匿名のトラフィックデータを収集しています。
Cookieに含まれるデータは利用者の個人情報を特定しません。利用者はCookieを無効にした状態で当サイトにアクセスできます。

詳しくは[Google のサービスを使用するサイトやアプリから収集した情報の Google による使用 – ポリシーと規約 – Google](https://policies.google.com/technologies/partner-sites)を参照してください。

## Google Analyticsによるトラッキングの状態を変更する

Googleアナリティクスは以下のボタンから無効・有効を切り替えられます。

<button onclick="onClickGAOptoutButton()">Googleアナリティクスのオプトアウト状況を変更する</button>

<div id="google-analytics-tracking-status">
  現在、Googleアナリティクスによるトラッキングは<output>有効</output>になっています。
</div>
