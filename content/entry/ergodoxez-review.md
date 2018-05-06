---
title: "ErgoDox EZを2週間使ってみた感想"
date: 2016-07-04T09:31:27+09:00
categories: ["日記"]
tags: ["ErgoDox EZ", "キーボード", "レビュー"]
---

最近夏コミに向けての執筆やTwitterクライアント作成に忙しいですが、それらを支える物として最近ErgoDox EZが加わりました。

ErgoDox EZが欲しすぎて買おうかどうかを[ErgoDox users meet up](http://eventdots.jp/report/20160610_588645)に行ってから決めようとしていたところを、行く前に購入してしまったくらいErgoDox EZが気になっていたのですが、そんなに気になっていたErgoDox EZが届くまでと実際に使ってみた感想を書いていきます。

## 届くまで

自分は[Indiegogo](https://www.indiegogo.com/projects/ergodox-ez-an-incredible-mechanical-keyboard#/)経由で買い2週間ほどで届きましたが、どうやら[公式ページ](https://ergodox-ez.com/)経由で買ったほうが早く届くようです（Twitterを見ていたら5日くらいで届いたという人がいた）。
Indiegogo経由と公式ページ経由を比較すると、Indiegogoを挟む分Indiegogo経由のほうが遅くなるのでしょうか？

また宅配業者はUPSでしたが、平日しか宅配してくれないのと、再配達が自動的に翌営業日に決められてしまうので、サポートへメールをしてヤマト運輸へ振り替えてもらいました。

なお、注文した後の流れは[はじめてのErgoDox EZ購入ガイド - Qiita](http://qiita.com/moutend/items/dd3ac2b8cffd69809928)という記事が分かりやすく説明されています。

## 使ってみて

実際に使ってみて良い・悪い点両方見えてきたので、以下に記します。

### 良い点

はじめに、セパレート式かつ高さも自由に変えられるので、タイピング時に肩がリラックスした姿勢でタイピングできるようになったことです。
このリラックス状態を知ってしまったらErgoDox EZから離れられそうにないです。
また逆チルト状態にすると自分の手に合って良い感じです。

<blockquote class="twitter-tweet" lang="ja"><p lang="ja" dir="ltr">ErgoDox EZを逆チルトしてみた図 <a href="https://t.co/JyJbnZI7Lx">pic.twitter.com/JyJbnZI7Lx</a></p>&mdash; くぼしょー㌠◎日曜西f47b (@kubosho_) <a href="https://twitter.com/kubosho_/status/749892423539576832">2016年7月4日</a></blockquote>

次に、いろいろとカスタマイズができる点です。
キー配列に関しては、既定のキー配列は癖が結構ありますが、気に入らなければ自分の好きなキー配列にできる点が自由な感じでいいです。
ちなみに現状のキー配列は[GitHubに上げています](https://github.com/kubosho/qmk_firmware/blob/master/keyboard/ergodox_ez/keymaps/kubosho/keymap.c)。

カスタマイズ性というところでは、Cherry MX キースイッチと互換性があるキーキャップに変えられる点もiPhoneケース並の個性主張ができるという点でいいです。
カスタマイズ情報については[ErgoDox EZ カスタマイズ情報のまとめ - Okapies' Archive](http://okapies.hateblo.jp/entry/2016/05/15/164009)にまとまっています。

あとは、タイプ時の音がここちよいです。Happy Hacking Keyboardと同じ押下圧（45g）の赤軸を選びましたが、その選択は間違っていなかったと思ってます。
タイプ時の音についてはHHKBと比べると高い音です。

また、ErgoDox EZは関係ないかもしれませんが、ErgoDox EZを使い始めてからタイピング時の運指を意識するようになりました。
今まで自分は左・右小指で押すべきキーを薬指で押していた癖があった（そして気づいてなかった）ために、使い始めて最初の日はタイプミスが多発しました。
今でも「z」や「0」が若干苦手ですが、使い始めた当初に比べればだいぶマシになりました。
タイピング時に運指を意識するようになった結果がどうなったかという参考に、現状のe-typingsのスコアを貼っておきます。
一番左は使い始めて3日目くらいの記録で、今は全国平均より上回っています。

![e-typingの成績。ErgoDox EZに慣れた結果、全国平均よりも上回ったスコアとなっている](/images/ergodoxez-review/e-typing.png)

最後に、ErgoDox EZはセパレート式という特徴があるので、空いた真ん中のスペースに何かおけるのは良いです。
自分はカーソルを絶対座標で指定できる点がいいと思って[Intuos Art](http://amzn.to/29eZdtJ)を使っていますが、ペンタブは今までキーボードの右端に置くしかありませんでした。しかしErgoDox EZがセパレート式なおかげで写真のように真ん中に置けるようになり、より自然な形でペンタブが使えるようになりました。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">こんな感じかな <a href="https://t.co/uLUmghjI6n">pic.twitter.com/uLUmghjI6n</a></p>&mdash; くぼしょー㌠◎日曜西f47b (@kubosho_) <a href="https://twitter.com/kubosho_/status/743969878382510080">2016年6月18日</a></blockquote>

### 悪い点

リストレストが臭いと他のErgoDox EZのレビュー記事にも書いてあったりしますが、本当に臭いです。
1週間くらいは臭いが消えなかったので、その間は他のリストレストを使うのがいいと思います。

また、タイピングする際に正しい運指をしていないとタイピング速度がガタ落ちします。
自分は使い始めて最初の日、通常の20%くらいしか速度がでませんでした。
とはいえ、これは自分の問題なので人によっては問題ないと思います。

## まとめ

今もこの記事をErgoDox EZで書いています。ここまで記事を書いた感想としては、ErgoDox EZは高い買い物ですが、それに見合うだけの価値はあるということです。
