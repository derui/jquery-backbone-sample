# jQueryからBackbone.jsへの書き換えサンプル #
このリポジトリでは、あるjQueryで作られたサンプルを、Backbone.jsベースにしていく経過を追っていくことができるようにしてあります。

## 必要環境 ##
動作はLinuxとMacOS Yosemiteだけで動作を確認しています。全体はNode.jsで構築されているので、Windowsでも動作するとは思います。

Mac/Linux の場合、以下のコマンドを事前に実行してください

```
$ sudo gem install bundler // すでに導入している場合は不要
$ sudo npm install -g gulp bower // すでに導入している場合は不要
```

## 環境を汚したくない場合（こっちがおすすめ） ##
Vagrantでサンプルを動作させられる環境を用意しています。

リポジトリのルートで以下を実行してください。

```
$ vagrant up
```

自動的にboxのダウンロードと必要な処理が行われます。起動完了後、/vagrantへ移動して、サンプルの実行で記述したコマンドを実行してください。

## サンプルの実行 ##
vagrant ssh 後、/vagrantへ移動し、以下を実行してください。

```
$ bundle install
$ npm install
$ cd server
$ npm install
$ cd..
$ bower install
$ gulp serve
```

上記のコマンドを実行することで、以下の処理が実行されます。

- Browserifyのビルド処理
- サンプル用のAPIサーバーの起動

gulp serve を実行後、 http://localhost:8000 へアクセスしてください。

サンプルでは、編集するたびにlivereloadが行われるようになっています。

### Windows環境の場合 ###
`vagrant ssh` をそのままでは実行できないため、cygwinを使うか、もしくは Teraterm/putty などのターミナルを利用してください。
