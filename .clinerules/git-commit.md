# Git Commit Rules

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
