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
