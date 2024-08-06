# 体験型広告demoプロダクト

体験型広告コンテンツのdemoプロダクトです。
<br>
ユーザは自身のデバイス（ex:スマホやタブレット.etc）などからインタラクティブに操作を行い、別のディスプレイなどに表示されている広告コンテンツを体験します。
<br>
※海外などの参考事例：https://youtu.be/9G-DZx8hu4U?si=lTBcUgjsX-2k5Zhi

## プロダクトの開始手順

パッケージ管理に[pnpm](https://pnpm.io/ja/installation)を利用しています。

- このリポジトリをcloneします。
- プロジェクトのルートディレクトリで`pnpm install`を実行します。
- ルートディレクトリ内にある`server`ディレクトリへ移動し、`pnpm install`を実行します。
- ルートディレクトリ内に戻ります。

## demoプロダクトの起動手順

- ルートディレクトリ内にある`server`ディレクトリへ移動し、`pnpm build`を実行します。
- `server`ディクレトリ内で`pnpm start`を実行します。　※スマホおよびディスプレイとのsocket通信処理を担う、サーバが起動します。
- ルートディレクトリ内に戻ります。
- ルートディクレトリ内で`pnpm dev`を実行します。　※スマホおよびディスプレイ側の画面を表示するサーバが起動します。
  ※process.env.PORT = 任意のポート番号を設定 (`ルートディレクトリ側`＆`serverディレクトリ側`で同様のポート番号を設定する)

## Related Links

- [Remix](https://remix.run/docs/en/main)
- [Express adapter](https://remix.run/other-api/adapter#createrequesthandler)
- [socket.io](https://socket.io/)
- [socket.io-client](https://www.npmjs.com/package/socket.io-client)
- [pandacss](https://panda-css.com/docs/installation/remix)
