# ローカル環境でのデータベースの構築

## 1️⃣ Docker CE の導入

まず、Docker CE（Community Edition）をインストールします。

### 1.1 既存の Docker の削除

既に Docker がインストールされている場合は、以下のコマンドで削除します。

```bash
sudo apt remove docker docker-engine docker.io containerd runc
```

### 1.2 必要なパッケージのインストール

Docker をインストールするために必要なパッケージをインストールします。

```bash
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release
```

### 1.3 Docker の GPG キーを追加

公式の Docker GPG キーを追加します。

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

### 1.4 Docker リポジトリを追加

Docker の公式リポジトリを追加します。

```bash
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 1.5 Docker CE のインストール

パッケージリストを更新し、Docker CE をインストールします。

```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io
```

### 1.6 インストールの確認

以下のコマンドで Docker のバージョンを確認します。

```bash
docker --version
```

`Docker version 24.0.0, build 123abc` のように表示されれば、インストールは成功です。

## 2️⃣ Docker Compose の導入

次に、Docker Compose をインストールします。

### 2.1 Docker Compose のインストール

以下のコマンドで Docker Compose をインストールします。

```bash
sudo apt install -y docker-compose
```

### 2.2 インストールの確認

以下のコマンドで Docker Compose のバージョンを確認します。

```bash
docker-compose --version
```

バージョン情報が表示されれば、インストールは成功です。

### 2.3 Dockerソケットへのアクセス権限を追加

```bash
sudo usermod -aG docker $USER
```

グループに含まれたかどうか確認します。

```bash
grep docker /etc/group
```

> Linux 環境（WSL含む）で Docker を実行するには、Docker ソケット /var/run/docker.sock にアクセスする必要があります。このファイルは通常、root または docker グループのメンバーだけがアクセス可能です。
> $USER は 現在のログインユーザー名 を指す 環境変数

⚠上記を実行したにも関わらず、dockerコマンドがエラーとなる場合は、VSCodeを再起動してみてください。

## 3️⃣ データベースの構築

### 3.1 ファイルの準備

`compose.yaml`、`image/postgres/Dockerfile`、`init/create_schema.sql` ファイルを準備します。これらのファイルは、データベースの構成、イメージの構築、初期スキーマの作成に使用されます。

- `compose.yaml`: Docker Compose の設定ファイル。データベースのコンテナ設定、ポート、ボリューム、環境変数などを定義します。

  ```yaml
  services:
    postgres:
      container_name: atman_hub_db_dev # {app_name}_db_{env}
      build: ./image/postgres # Build the image from the Dockerfile in the image/postgres directory
      restart: unless-stopped # Restart the container automatically unless it was explicitly stopped
      ports:
        - 5432:5432
      volumes:
        - atman_hub_db_dev_data:/data/db # {app_name}_db_{env}_data
        - ./init:/docker-entrypoint-initdb.d
      environment:
        POSTGRES_USER: user
        POSTGRES_PASSWORD: password
        POSTGRES_DB: atman_hub_db_dev # {app_name}_db_{env}

  volumes:
    atman_hub_db_dev_data:
  ```

- `image/postgres/Dockerfile`: PostgreSQL イメージを構築するための Dockerfile。

  ```dockerfile
  FROM postgres:17
  ```

- `init/create_schema.sql`: データベースの初期スキーマを作成するための SQL ファイル。

  ```sql
  CREATE SCHEMA IF NOT EXISTS atman_hub;
  COMMENT ON SCHEMA atman_hub IS 'Schema for the Atman Hub database';
  ```

これらのファイルが `tools/database-local/` ディレクトリに存在することを確認してください。

### 3.2 データベースの起動

Docker Compose を使用してデータベースを起動します。

```bash
docker-compose -f tools/database-local/compose.yaml up -d
```

このコマンドは、`tools/database-local/compose.yaml` ファイルで定義された設定を使用して、PostgreSQL データベースをバックグラウンドで起動します。

### 3.3 データベースの確認

データベースが起動していることを確認します。

```bash
docker ps
```

このコマンドは、実行中の Docker コンテナのリストを表示します。`atman_hub_db_dev` という名前のコンテナがリストに表示されていれば、データベースは正常に起動しています。

### 3.4 データベースへの接続

以下のコマンドでデータベースに接続します。

```bash
docker exec -it atman_hub_db_dev psql -U user -d atman_hub_db_dev
```

接続後、以下のコマンドでスキーマを確認できます。

```sql
\dn
```

`atman_hub` スキーマが作成されていることを確認してください。

現在のスキーマの確認と変更は、以下のコマンドで行います。

```sql
SHOW search_path;
SET search_path TO atman_hub;
SHOW search_path;
```

### 3.5 データベースへの接続終了

```bash
\q
```

このコマンドは、PostgreSQL クライアントを終了します。

## 4️⃣ 開発時の Docker コンテナの起動と停止

### 4.1 開発時の Docker コンテナの起動

開発を開始する際には、以下のコマンドで Docker コンテナを起動します。

```bash
docker compose -f tools/database-local/compose.yaml start
```

このコマンドは、Docker Composeを使用してPostgreSQLデータベースを起動します。

### 4.2 開発時の Docker コンテナの停止

開発を終了する際には、以下のコマンドで Docker コンテナを停止します。

```bash
docker compose -f tools/database-local/compose.yaml stop
```

このコマンドは、Docker Composeを使用してPostgreSQLデータベースを停止します。
