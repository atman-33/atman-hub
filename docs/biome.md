# biome の利用

`biome` は、コードのスタイルチェックやフォーマットを行うためのツールです。

## ファイル名に `$` が含まれる場合の注意点

ファイル名に `$` が含まれる場合は、`\` でエスケープする必要があります。

例:

```sh
npx biome check app/routes/_app.users.\$userId_.posts.edit._index/route.tsx
```
