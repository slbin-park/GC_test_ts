# 그릿지 테스트

## ✨Common

### REST API

REST API의 기본 구성 원리를 반드시 구글링하여 익힌 뒤에 Route를 구성하자.

### Folder Structure

- `src`: 메인 로직
- `src/config` 폴더: `src` 에서 필요한 부차적인 파일들을 모아놓은 폴더
- 도메인 폴더 구조

  > Route - Validation - Controller - Service - DAO -Sql

- Route : Request에서 보낸 라우팅 처리
- Validation : Validation 을 처리하는 미들웨어
- Controller : Request를 처리하고 Response 해주는 곳. (Service에 넘겨주고 다시 받아온 결과값을 형식화), 형식적 Validation
- Service : 비즈니스 로직 처리, 의미적 Validation
- DAO : Data Access Object의 줄임말.
- Sql : Query가 작성되어 있는 곳.

### Comparison

> `Request` -> Route -> Validation -> Controller -> Service -> DAO -> DB

> DB -> DAO -> Service -> Controller -> Route -> `Response`

#### Node.js (패키지매니저 = npm)

> Request(시작) / Response(끝) ⇄ Router (*Route.js) ⇄ Controller (*Controller.js) ⇄ Service (CUD) / Provider (R) ⇄ DAO (DB)

## ✨Structure

```

├── * log                               # 생성된 로그 폴더
├── * node_modules                    	# 외부 라이브러리 폴더 (package.json 의 dependencies)
├── src                     			#
│   ├── app              				# 앱에 대한 코드 작성
│   ├── config                              #
│   │   ├── baseResponse.ts           # Response 시의 Status들을 모아 놓은 곳.
│   │   ├── db.ts                     # 데이터베이스 관련 설정
│   │   ├── env.ts                # 서버 key를 관리하기 위해 env 설정이 │   있는 파일
│   │   ├── response.ts                 # response 기본틀
│   │   ├── winston.js                      # logger 라이브러리 설정
│   ├── User            			# User 도메인 폴더
│ 	│   ├── userRouter.ts          	# User 관련 라우터 처리
│ 	│   ├── user.dao.ts          	# User 관련 데이터베이스
│ 	│   ├── use.controller.js 		# req, res 처리
│ 	│   ├── user.service.js   		# CUD에 해당하는 서버 로직 처리
│ 	│   ├── user.sql.js   		    # sql 파일들이 모여있는 곳
│ 	│   ├── user.Validation.js   	# validation을 처리하는 미들웨어
│   ├── Swagger            			# swagger가 정리되어있는 폴더
│   ├── admin           		# 관리자 페이지 관련 처리
│   ├── auth           		# 인증 관련 처리
│   ├── profile           		# 프로필 관련 처리
│   ├── Middlewares       		# 미들웨어 파일 정리
│   │   ├── adminlog       		# DB에 로그 처리
│   ├── board           		# 피드 관련 처리
│   ├── routes           		# 처음 라우터 처리 폴더
gitignore                     		# git 에 포함되지 않아야 하는 폴더, 파일들을 작성 해놓는 곳
├── * package-lock.json
├── package.json                        # 프로그램 이름, 버전, 필요한 모듈 등 노드 프로그램의 정보를 기술
└── README.md
```

### [Node.js](https://nodejs.org/ko/)

### [Express](https://expressjs.com/ko/)

### [mysql2](https://www.npmjs.com/package/mysql2)

### [winston](https://www.npmjs.com/package/winston)

### [TypeScript](https://www.typescriptlang.org/)

## ✨Usage

로컬에서 npm install을 통해 node_modules 라이브러리 폴더를 생성한다.

[DB 연결 이후 TEST]

1. .env 파일을 생성 후 데이터 베이스를 연결

```env
HOST = 호스트 주소
DBPORT = 디비 포트
NAME = 디비 사용자 이름
PASSWORD = 디비 비밀번호
DATABASE = 디비 스키마 이름
JWT_REFRESH_SECRET = refresh토큰 비밀키
JWT_ACCESS_SECRET = access토큰 비밀키
KAKAO_CLIENT_ID = 카카오 클라이언트 ID
```

2. npm start 를 통해 로컬 서버를 구동시키고 포스트맨을 통해 본인이 만든 API 테스트가 잘 되는지 확인한다.

## ✨License

- BY 소프트스퀘어드
- 본 템플릿의 소유권은 소프트스퀘어드에 있습니다. 본 자료에 대한 상업적 이용 및 무단 복제, 배포 및 변경을 원칙적으로 금지하며 이를 위반할 때에는 형사처벌을 받을 수 있습니다.
