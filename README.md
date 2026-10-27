# 서울 풋살 모임 - 프론트엔드 (Next.js)

서울 풋살장별 모집글을 한곳에서 보고, 함께 뛸 사람을 찾는 서비스입니다. (Level 1)
기획 내용은 [기획서.md](기획서.md)를 보세요. 백엔드는 `futsal-match-level1-backend` 저장소입니다.

> ⏳ 백엔드가 Render 무료 서버라서 첫 접속 때 목록이 뜨기까지 30초~1분 걸릴 수 있습니다. 잠시 기다려 주세요.

## 이렇게 확인해 보세요
- `/` 모집글 목록 → 글을 누르면 상세
- `/posts/new` 모집글 올리기 (빈칸이나 틀린 형식이면 쉬운 안내가 나옵니다)
- 글 수정·삭제는 글을 올릴 때 정한 4자리 비밀번호가 필요합니다. 가상 글의 비밀번호는 `1234`입니다.
- `/stadiums` 경기장 목록, 등록·수정·삭제는 관리자 비밀번호가 필요합니다.
- 모집글·작성자·연락처는 모두 가상 데이터입니다.

## 화면
| 주소 | 화면 |
|---|---|
| `/` | 모집글 목록 |
| `/posts/[id]` | 모집글 상세 (수정·삭제) |
| `/posts/new` | 모집글 올리기 |
| `/posts/[id]/edit` | 모집글 수정 |
| `/stadiums` | 경기장 목록 |
| `/stadiums/new` | 경기장 등록 (관리자 비밀번호 필요) |
| `/stadiums/[id]/edit` | 경기장 수정·삭제 (관리자 비밀번호 필요) |

## 내 컴퓨터에서 실행
백엔드를 먼저 켠 뒤 실행합니다.
```bash
npm install
cp .env.example .env.local   # 백엔드 주소를 확인한다
npm run dev
```
접속: http://localhost:3000

## Vercel에 올리기
1. Vercel에서 **Add New → Project**로 이 저장소를 가져옵니다.
2. Framework Preset은 **Next.js**(자동 인식), Build·Install·Output 설정은 기본값 그대로 둡니다.
3. **Environment Variables**에 아래 값을 넣고 Deploy 합니다.

| 이름 | 뜻 | 예시 |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | 백엔드(Render) 주소. 끝에 `/`를 붙이지 않습니다. | `https://내서비스.onrender.com` |

4. 배포된 Vercel 주소를 백엔드의 `FRONTEND_URL` 값으로 넣어야 화면에서 서버에 접속할 수 있습니다. (값을 바꾸면 Render에서 다시 배포됩니다.)
