# Git Commit Rules

## コミット
コミットする前は、実行してよいかどうかを確認してください。

## コミットメッセージ

### コミットメッセージの構成

```txt
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

e.g.
```txt
fix(api): prevent racing of requests

Introduce a request id, and add request id to any log message.

BREAKING CHANGE: drop support for Node 6
Refs: #123
```

### コミットのタイプ

- feat: 新しい機能
- fix: バグの修正
- docs: ドキュメントのみの変更
- style: 空白、フォーマット、セミコロン追加など
- refactor: 仕様に影響がないコード改善(リファクタ)
- perf: パフォーマンス向上関連
- test: テスト関連
- chore: ビルド、補助ツール、ライブラリ関連

- コミットメッセージは50文字以内にする
- コミットメッセージの先頭は動詞の原形にする
- コミットメッセージの末尾に句読点をつけない
- コミットメッセージは英語で書く

## プルリクエスト

プルリクエストを作成する際は、以下の手順に従ってください。

1.  まず、PRのbodyを記述した`pr_body.txt`ファイルを作成します。
2.  次に、作成した`pr_body.txt`ファイルを`--body-file`オプションで指定して、`gh pr create`コマンドを実行し、PRを作成します。
3.  PRが作成されたら、不要になった`pr_body.txt`ファイルを削除します。

```txt
## Overview  
<!-- Briefly describe the purpose of this Pull Request. -->

## Changes  

- Change 1  
- Change 2  
- Change 3  

## Related Issue  

- Issue number (e.g., #123)
```
