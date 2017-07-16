# Aprilskin 주문 조회 시스템
Aprilskin cafe24 주문 정보를 만들어준다.

## 접속 방법
```
http://ec2-13-59-102-169.us-east-2.compute.amazonaws.com/index.html
```
위 주소로 접속 한다.

### 사용법
시작 날짜 ex)2017-07-16 20:00:00

끝 날짜 ex)2017-07-16 24:00:00


### 배포하는 방법
```
cd /var/www/electron_react
git pull
npm run build
rsync -ar /var/www/electron_react/build/ /var/www/html
```

### 재시작 방법
```
/var/www/electron_react
forever list
forever start server
```
