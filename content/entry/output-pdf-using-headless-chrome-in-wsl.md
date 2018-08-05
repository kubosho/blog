---
title: Windows Subsystem for Linux(WSL)上のChromiumでPDF出力をする
date: 2018-08-05T19:30:00+09:00
categories: ["技術記事"]
tags: ["Headless Chrome", "Windows Subsystem for Linux", "Ubuntu"]
---

Windows Subsystem for Linux(WSL)上でHeadless Chromeを使って、PDF出力をしてみました。
やり方としては次に示すコマンドを実行すれば、Cドライブ上のTempフォルダの中にGoogleをスクリーンショットした `output.pdf` が出力されます。

```shell
sudo apt install chromium-browser
chromium-browser --headless --disable-gpu --print-to-pdf=/mnt/c/Temp/output.pdf https://www.google.com
```
