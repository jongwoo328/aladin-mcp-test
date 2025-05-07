# aladin mcp for study

mcp 공부를 위해 알라딘 서점 OPEN API와 알라딘 OPEN API 클라이언트를 활용하여 간단한 mcp 서버를 구현했습니다.

## 사용 환경
node v18 이상

## 사용방법
### Claude Desktop
1. 설정 > 일반 > 개발자 > 설정 편집 에서 config 파일을 엽니다.
   - Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
2. 아래 예시처럼 mcpServers에 해당 mcp를 추가합니다.
    ```json
    {
      "globalShortcut": "",
      "mcpServers": {
        "aladin": {
          "command": "npx",
          "args": ["@jongwoo328/test-aladin-mcp", "<YOUR ALADIN_API_KEY>"]
        }
      }
    }
    ```
3. Claude Desktop을 재시작한 후 작동을 확인합니다.

## 지원 기능
- 분야별 도서 카테고리 조회
- 카테고리 id를 이용한 베스트셀러 목록 조회
- 카테고리 id를 이용한 신간 도서 목록 조회
