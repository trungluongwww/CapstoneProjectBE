---

# Hướng dẫn cài đặt dự án Node.js

## Bước 1: Cài đặt môi trường Node.js

Đầu tiên cần cài đặt môi trường Node.js trên máy tính:

1. Truy cập vào đường dẫn sau để tải xuống Node.js: [https://nodejs.org/en](https://nodejs.org/en).
2. Tải xuống phiên bản Node.js phù hợp với hệ điều hành và tiến hành cài đặt.
3. Kiểm tra cài đặt thành công bằng cách mở Terminal (hoặc Command Prompt) và chạy lệnh sau:

```shell
node --version
npm --version
```

Nếu phiên bản của Node.js và npm hiển thị, có nghĩa là cài đặt đã thành công.

## Bước 2: Cài đặt cơ sở dữ liệu PostgreSQL

Dự án yêu cầu cơ sở dữ liệu PostgreSQL để cài đặt và cấu hình PostgreSQL:

1. Truy cập vào đường dẫn sau để tải xuống PostgreSQL: [https://www.postgresql.org/](https://www.postgresql.org/).
2. Tải xuống và cài đặt phiên bản PostgreSQL 12.15.
3. Sau khi cài đặt, mở PostgreSQL và tạo một cơ sở dữ liệu mới có tên "capstone".
4. Khi cài đặt phải setup PostgreSQL chạy trên cổng 5432

## Bước 3: Cài đặt Redis

1. Truy cập vào đường dẫn sau để tải xuống Redis: [https://redis.io/download/](https://redis.io/download/).
2. Tải xuống và cài đặt phiên bản Redis phù hợp với hệ điều hành.
3. Sau khi cài đặt, mở Redis và đảm bảo nó đang chạy trên cổng 6379.

## Bước 4: Mở dự án Node.js

1. Mở Terminal (hoặc Command Prompt) và điều hướng đến thư mục root của dự án.

## Bước 5: Thêm file .env

Để cấu hình các biến môi trường, cần thêm một file .env tại thư mục gốc của dự án. Hãy tạo một file có tên ".env" và
sao chép các biến môi trường sau vào:

```shell
PORT=5000
POSTGRES_PORT=5432
POSTGRES_USER_NAME=<Thêm nếu có>
POSTGRES_USER_PASSWORD=<Thêm nếu có>
POSTGRES_DB_NAME=capstone
POSTGRES_HOST=<Thêm nếu có>
SECRET_JWT=
SECRET_JWT_ADMIN=
S3_ACCESS_KEY= <Khóa truy cập S3 của AWS>
S3_SECRET_KEY= <Mật khẩu truy cập S3 của AWS>
S3_REGION= <Khu vực bucket S3 của AWS>
S3_BUCKET= <Tên bucket S3 của AWS>
SES_USERNAME=<Tài khoản user SES của AWS>
SES_PASSWORD=<Mật khẩu user SES của AWS>
SES_REGION=<Khu vực user SES của AWS>
REDIS_URI=redis://localhost:6379
REDIS_USERNAME=<Thêm nếu có>
REDIS_PASSWORD=<Thêm nếu có>
```

## Bước 6: Cài đặt thư viện

Trước khi chạy dự án, bạn cần cài đặt các thư viện phụ thuộc. Mở Terminal (hoặc Command Prompt) và chạy lệnh sau:

```shell
npm install
```

Chạy lệnh để tải git submodule cho dự án

```shell
git submodule update --init --recursive && \
git submodule foreach git checkout $(branch) && \
git submodule foreach git pull origin $(branch)
```

## Bước 7: Chạy dự án

Chạy lệnh để Run dữ án

Đối với server admin

```shell
npx ts-node cmd/admin/index.ts
```

Đối với server app

```shell
npx ts-node cmd/app/index.ts
```

---
