# Ứng dụng web crawler theo mô hình hướng dịch vụ (SOA)

> [Link bài thuyết trình](https://www.canva.com/design/DAFeM65W21A/zTCVZ8Cl-McJxzvrmyOegA/edit?utm_content=DAFeM65W21A&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton&fbclid=IwAR0UKGRNCrCdxb5xBzDyEGBU7T6PQ2mmaKmLfBfeBeHi6-tTanPamxgcZdA)

## I. Phân tích và mô hình hóa dịch vụ REST Service và Microservice

### Step 1: Phân tách quy trình

- Bắt đầu ứng dụng crawl web
- Xem các thể loại (và thông tin có thể crawl)
- Gửi thông tin cần crawl
- Nhận thông tin cần crawl
- Kiểm tra thông tin nhận được
- Nếu thông tin kiểm tra không thỏa mãn -> kết thúc
- Gửi các thông tin (các tham số) cho việc crawl
- Nhận các tham số cho việc crawl
- Tiến hành crawl dữ liệu
- Crawl dữ liệu thành công
- Trả về dữ liệu crawl được
- Gửi thông báo crawl thành công
- Kết thúc

<img src="https://github.com/ftvdexcz/garbage_truck_monitoring_system/assets/60183306/38445760-b98f-4bb3-bb5e-962eef7a131b"  />

### Step 2: Lọc bỏ các hành động không phù hợp

- Bắt đầu ứng dụng crawl web
- Crawl dữ liệu thành công

### Step 3: Xác định ứng viên dịch vụ thực thể

> Xác định và phân loại những hành động được coi là bất khả tri (in đậm) :

- **Gửi thông tin cần crawl**
- **Xem các thể loại (và thông tin có thể crawl)**
- Nhận thông tin cần crawl
- Kiểm tra thông tin nhận được
- Nếu thông tin kiểm tra không thỏa mãn -> kết thúc
- **Gửi các thông tin (các tham số) cho việc crawl**
- Nhận các tham số cho việc crawl
- Tiến hành crawl dữ liệu
- **Trả về dữ liệu crawl được**
- **Gửi thông báo crawl thành công**

### Step 4: Xác định logic cụ thể của quy trình

> Các hành động không bất khả tri:

- Nhận thông tin cần crawl
- Kiểm tra thông tin nhận được
- Nếu thông tin kiểm tra không thỏa mãn -> kết thúc
- Nhận các tham số cho việc crawl
- Tiến hành crawl dữ liệu

Chọn “Bắt đầu ứng dụng crawl web” là ứng viên năng lực dịch vụ cho dịch vụ Crawl dữ liệu

### Step 5: Xác định các tài nguyên

> Tài nguyên Category ?

| Entity       | Resource       |
| ------------ | -------------- |
| Notification | /notification/ |
| Content      | /contents/     |
| Crawl        | /crawl/        |

### Step 6: Liên kết khả năng dịch vụ với tài nguyên

- Ứng viên năng lực dịch vụ "Bắt đầu ứng dụng crawl web" liên kết với phương thức POST, tài nguyên Crawler Web

<img src="https://user-images.githubusercontent.com/93438963/231338975-f1fabd07-f4bc-4b0f-86e8-2a49312bc943.png" alt="..." width="250" />

- Ứng viên năng lực dịch vụ gửi thông báo

<img src="https://github.com/ftvdexcz/garbage_truck_monitoring_system/assets/60183306/e9b90935-41c9-4086-be0f-00560d1ff5c3" alt="..." width="250" />

- Ứng viên năng lực dịch vụ gửi tham số và tiến hành crawl liên kết với phương thức POST, tài nguyên Crawl

<img src="https://user-images.githubusercontent.com/93438963/231340112-f6ef6737-b3f5-4934-a736-a36b0d20de54.png" alt="..." width="250" />

- Ứng viên năng lực dịch vụ trả về dữ liệu crawl và lưu dữ liệu crawl vào cơ sở dữ liệu liên kết với tài nguyên Content

<img src="https://user-images.githubusercontent.com/60183306/233848256-64289ee4-1b71-4916-b5e1-b3206d7281cc.png" alt="..." width="250" />

### Step 7: Áp dụng hướng dịch vụ

### Step 8: Xác định các thành phần dịch vụ có thể

<img src="https://github.com/ftvdexcz/garbage_truck_monitoring_system/assets/60183306/95ba81a0-575e-477c-8bed-6c1a0a79ad7a" alt="..."  />

### Step 9: Phân tích yêu cầu xử lý

### Step 10 : Xác định các dịch vụ tiện ích

### Step 11 : Xác định ứng viên Microservice

> Để tăng tính độc lập, xác định phiên bản và yêu cầu triển khai. Đề xuất quá trình xử lý crawl dữ liệu của dịch vụ Crawl ở lớp microservice thay vì entity service layer. Crawl dữ liệu yêu cầu quá trình xử lý lâu nên nên triển khai như các worker chạy ngầm, trả về kết quả là 1 mã định danh ngay khi người dùng thực hiện crawl và sau có thể dùng mã này để truy xuất thông tin đã crawl. Ngoài ra có thể triển khai nhiều worker để mở rộng.

<img src="https://github.com/ftvdexcz/garbage_truck_monitoring_system/assets/60183306/5f3834ae-6b39-427c-978e-d8135fdc8815" alt="..."  />

### Step 12: Áp dụng định hướng dịch vụ

### Step 13: Sửa đổi các thành phần dịch vụ ứng viên

<img src="https://github.com/ftvdexcz/garbage_truck_monitoring_system/assets/60183306/5f3834ae-6b39-427c-978e-d8135fdc8815" alt="..."  />

### Step 14: Sửa đổi định nghĩa tài nguyên và phân nhóm ứng viên khả năng

## II. Thiết kế

### 1. Thiết kế dịch vụ thực thể

<img src="https://github.com/ftvdexcz/garbage_truck_monitoring_system/assets/60183306/eb149443-0504-4751-a681-f2588a052d44" alt="..." />

#### Crawl Web

- Bắt đầu crawl
  <br>

Request endpoint: `/api/v1/crawler`

Request body (json):
<br>

```
{
    "title": "abc",
    "title_type": ["feature","tv_movie","tv_series","tv_episode","tv_special","video_game"],
    "release_date_from": "2001-12-01",
    "release_date_until": "2023-12-12",
    "min_rating": 2.5,
    "max_rating": 10,
    "genres": ["action"],
    "groups": ["top_100"],
    "sort": "alpha,asc",
    "count": 100
}
```

Response (json):
</br>

```
{
    "status": "Thành công",
    "status_code": 200,
    "data": {
        "crawl_id": "407a47c40947",
        "title": "iron man",
        "genres": [
            "action"
        ],
        "release_date_from": "2001-12-01",
        "release_date_until": "2023-12-12",
        "min_rating": 2.5,
        "max_rating": 10,
        "sort": "moviemeter,asc",
        "count": 100
    }
}
```

#### Content

- Trả về dữ liệu crawl
  <br>

Request endpoint: `/api/v1/content/:crawl_id`
</br>

Response (json):
</br>

```
{
"crawl_id": "407a47c40947",
"extracted_movies": [
    {
      "url": "https://www.imdb.com/title/tt0371746/?ref_=adv_li_tt",
      "votes": 1077047,
      "gross": "$318.41M",
      "title": "Người Sắt",
      "ratings": 7.9,
      "durations": "2h 6m",
      "release_date": "May 16, 2008 (Vietnam)",
      "countries": ["United States", "Canada"],
      "genres": ["Action", "Adventure", "Sci-Fi"],
      "directors": ["Jon Favreau"],
      "description": "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a     unique weaponized suit of armor to fight evil."
    },
    ...
]
```

- Lưu dữ liệu đã crawl
  <br>

Request endpoint: `/api/v1/content/`
</br>

Request body (json):
</br>

```
{
"crawl_id": "407a47c40947",
"length": 10,
"extracted_movies": [
    {
      "url": "https://www.imdb.com/title/tt0371746/?ref_=adv_li_tt",
      "votes": 1077047,
      "gross": "$318.41M",
      "title": "Người Sắt",
      "ratings": 7.9,
      "durations": "2h 6m",
      "release_date": "May 16, 2008 (Vietnam)",
      "countries": ["United States", "Canada"],
      "genres": ["Action", "Adventure", "Sci-Fi"],
      "directors": ["Jon Favreau"],
      "description": "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a     unique weaponized suit of armor to fight evil."
    },
    ...
]
```

Response body (json):
</br>

```
{
    "status": "Thành công",
    "status_code": 200,
}
```

### 2. Thiết kế Microservice

#### Crawler microservice (workers)

Crawler nhận thông tin từ message queue (rabbitmq) thực hiện crawl, dễ dàng mở rộng nhiều workers cho ứng dụng, sau khi crawl xong gọi đến khả năng dịch vụ "lưu dữ liệu đã crawl" của Content

### 3. Thiết kế dịch vụ tiện ích

#### Notification Service

Nhận message từ message queue (rabbitmq) gồm crawl_id được gửi từ các worker để gửi thông báo tới client trạng thái xử lý là "đã hoàn thành" <br>
Sử dụng websocket để gửi thông báo realtime

<img src="https://github.com/ftvdexcz/garbage_truck_monitoring_system/assets/60183306/a9b7333f-335f-4e23-85d1-41d36f5bbfb4" alt="..."  />

> Version 2

<img src="https://github.com/ftvdexcz/Api-Lifetek/assets/60183306/6f06a927-f550-45a6-9770-88e6193e6c17" alt="..." />

## III.TechStack

- Client : Javascript
- Server: ExpressJS (Typescript) <br>
  Expressjs là một framework được xây dựng trên nền tảng của Nodejs. Nó cung cấp các tính năng mạnh mẽ để phát triển web hoặc mobile
- Crawler worker: Cheerio <br>
  Thư viện hỗ trợ parse DOM giống như Jquery dùng để lấy dữ liệu trong các thẻ html
- Message broker: RabbitMQ <br>
  RabbitMQ là một message-queuing software có thể được biết đến như là một người vận chuyển message trung gian hoặc một người quản lí các queue
- Deploy: Docker <br>
  Docker là một nền tảng để cung cấp cách để building, deploying và running ứng dụng dễ dàng hơn bằng cách sử dụng các containers (trên nền tảng ảo hóa)

## IV. Cài đặt

### Yêu cầu

- Docker (Docker version 20.10.23)
- RabbitMQ (RabbitMQ version 3.9)
  > Có thể được chạy thông qua Docker

### 1. RabbitMQ

Link tải: https://www.rabbitmq.com/download.html <br>

Hoặc chạy bằng Docker

```
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management
```

### 2. Chạy các service

> Task Service (Crawler Service)

- Build Docker image từ Dockerfile trong /crawler-service

```
docker build --no-cache -t ftvdexcz/crawler-service .
```

- Run Docker container<br>
  Thay đổi biến môi trường trong file .env (example/crawler-service.env) <br>
  Port được expose ra ngoài docker host phải map đúng với port service chạy trong container (-p 3000:3000 đang chạy ở port 3000 trong container)

```
docker run -d --env-file <đường dẫn tới file env> -e PORT=3000 --name crawler-service -p 3000:3000 ftvdexcz/crawler-service
```

> Imdb Crawler Worker

- Build Docker image từ Dockerfile trong /workers/imdb

```
docker build --no-cache -t ftvdexcz/imdb-crawler-worker .
```

- Run Docker container<br>
  Thay đổi biến môi trường trong file .env (example/imdb-worker.env) <br>
  Đường dẫn thư mục lưu file json, ví dụ: "C:\Users\Longdq\Desktop\output" <br>

```
docker run -d --env-file <đường dẫn tới file env> --name imdb-worker -v <đường dẫn thư mục muốn lưu file json output tại máy>:/usr/test_output ftvdexcz/imdb-crawler-worker
```

> Notification Service

- Build Docker image từ Dockerfile trong /notification_service

```
docker build --no-cache -t ftvdexcz/notification_service .
```

- Run Docker container<br>
  Thay đổi biến môi trường trong file .env (example/notification-service.env) <br>
  Port được expose ra ngoài docker host phải map đúng với port service chạy trong container (-p 9000:9000 đang chạy ở port 9000 trong container) <br>

```
docker run -d --env-file <đường dẫn tới file env> -e PORT=9000 -p 9000:9000 --name notification_service ftvdexcz/notification-service
```

#### Update: chạy bằng docker-compose (tùy chỉnh file .env trong example, chạy nhiều worker riêng bằng Dockerfile)

```docker
cd example
docker-compose up
```

### 3. Client

> Chạy file index.html (lưu ý thay đổi url theo task service ở trên và url web socket theo notification service )

### 4. Deploy AWS

- Server: http://54.206.33.42:3000/api/v1/crawler
- Client: http://54.206.33.42:8888/index.html
