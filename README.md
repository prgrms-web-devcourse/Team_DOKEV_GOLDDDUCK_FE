#### :calendar: 프로젝트 기간: 2021.11.26 ~ 2021.12.22

# [🔗 금나와라 뚝딱](https://gold-dduck.netlify.app/)

<img src="https://i.imgur.com/mBsrYSY.png" height= '100px'/>

 저희 도깨비팀의 프로젝트인 금나와라 뚝딱은 이벤트 주최자가 만든 선물을 사용자가 수령하는 서비스입니다.

<div style="display: flex; justify-content: center">
<img alt="React" src ="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=white"/> &emsp;
<img alt="TypeScript" src ="https://img.shields.io/badge/TypeScript-3178C6.svg?&style=for-the-badge&logo=TypeScript&logoColor=white"/> &emsp;
<img alt="Next.js"src="https://img.shields.io/badge/Next.js-000000.svg?&style=for-the-badge&logo=TypeScript&logoColor=white"/> &emsp;
<img alt="Context API" src ="https://img.shields.io/badge/Context API-4dd0e1.svg?&style=for-the-badge&logo=React&logoColor=white"/> &emsp;
<img alt="ESLint" src ="https://img.shields.io/badge/ESLint-4B32C3.svg?&style=for-the-badge&logo=ESLint&logoColor=white"/> &emsp;
<br>
<img alt="Emotion JS" src ="https://img.shields.io/badge/Emotion-af8eb5.svg?&style=for-the-badge&logo=Emotion JS&logoColor=white"/> &emsp;
<img alt="Storybook" src ="https://img.shields.io/badge/Storybook-FF4785.svg?&style=for-the-badge&logo=Storybook&logoColor=white"/> &emsp;
<img alt="Netlify" src ="https://img.shields.io/badge/Netlify-00C7B7.svg?&style=for-the-badge&logo=Netlify&logoColor=white"/>
</div>


<br>

## 프로젝트 소개
- 프로젝트 명: 금나와라 뚝딱
- 기획 이유
  - 다수의 친구나 지인들에게 선물(ex 기프티콘)을 줄 때 일일이 한 명 한 명 전달해 주거나 전화번호를 물어봐야 했던 경험이 있으신가요? 금 나와라 뚝딱은 이러한 불편함을 없애고 선물을 편하고 재미있게 전달하면 어떨까?라는 물음에서 탄생했습니다.
  - 금나와라 뚝딱은 단순히 선물을 지목한 사람에게 주는 형식이 아니라, ‘**랜덤**’ 또는 ‘**눈치게임**’의 방식을 통해 게임처럼 재미있게 선물을 나눌 수 있는 서비스입니다.
  
## 👨‍💻팀 소개
| GitHub | 
| -------- |
| [팀장 문승희](https://github.com/Muntari29)| 
| [팀원 박민수](https://github.com/minsu-zip)|
| [팀원 도가영](https://github.com/young-d)|

## 팀 활동 기록
<a href="https://www.notion.so/backend-devcourse/1-e7e56923feb7463ca64075a2163cd653"><img alt="Notion" src ="https://img.shields.io/badge/Notion-ffffff.svg?&style=for-the-badge&logo=Notion&logoColor=black"/></a>
<a href="https://www.figma.com/file/FBKXfPFNdaUBmJOHv91l9I/%EA%B8%88%EB%82%98%EC%99%80%EB%9D%BC-%EB%9A%9D%EB%94%B1?node-id=233%3A686">
<img alt="Figma" src ="https://img.shields.io/badge/Figma-F24E1E.svg?&style=for-the-badge&logo=Figma&logoColor=white"/> 
</a>
<a href="https://maenguin.atlassian.net/jira/software/c/projects/GD/boards/6/backlog?issueLimit=100">
<img alt="Jira Software" src ="https://img.shields.io/badge/Jira Software-0052CC.svg?&style=for-the-badge&logo=Jira Software&logoColor=white"/> 
</a>

## 🐱 Git branch 전략
- Jira Software를 활용하여 이슈 기반 branch
  - 최대한 작은 단위의 이슈 

## 설치 및 실행
- 실행환경: NodeJS 14.17.6
- 설치
  - $ ```yarn install```<br>
- 실행
  - $ ```yarn start```
- UI 컴포넌트
  - $ ```yarn storybook ```


## API
- [백엔드 Repository](https://github.com/prgrms-web-devcourse/Team_DOKEV_GOLDDDUCK_BE)

## Usage

#### 마이 페이지
- 내가 받은 선물 목록들을 볼 수 있습니다.
- 전체, 미사용, 사용 탭으로 구별 가능합니다.
- 사진 저장 및 토글로 사용 여부를 체크할 수 있습니다.
![마이페이지](https://i.imgur.com/d0KG3tN.gif)

#### 나의 이벤트 탭
- 내가 만든 이벤트 목록들을 볼 수 있습니다.
- 이벤트 상태에 따라 전체, 대기 중, 진행 중, 종료 탭으로 구별 가능합니다.
- 종료된 이벤트의 경우 당첨자 목록을 확인할 수 있습니다.
- 이벤트 삭제도 가능합니다.
![나의 이벤트 탭](https://user-images.githubusercontent.com/52727782/147095579-39ba15ee-6159-413e-9eb0-cfbcbf732dee.gif)

#### 이벤트 등록
- 모든 폼이 입력되어야지 다음 step으로 넘어갑니다.
![이벤트 등록1](https://i.imgur.com/ZsVf61J.gif)

#### 이벤트 등록2
- 제공할 선물들을 등록합니다.
- 참여자 수 보다 더 많은 선물을 등록할 수 없습니다.
![이벤트 등록2](https://i.imgur.com/68NfqJd.gif)

#### 이벤트 등록3
- 이벤트 오픈 시간 : 현재 시간보다 빠르게 설정할 수 없습니다.
- 이벤트 종료 시간 : 이벤트 오픈 시간보다 빠르게 설정할 수 없습니다.
- 이벤트가 성공적으로 등록이 되면, 링크가 생성이 됩니다.
- 링크 복사를 통해 링크를 전달할 수 있습니다.
![이벤트 등록3](https://i.imgur.com/ykL5kxc.gif)

#### 랜덤 선물받기
- 이벤트 작성자는 해당 이벤트에 참여할 수 없습니다.
- 오픈 시간이 되어야지 이벤트에 참여할 수 있습니다.
- 랜덤으로 선물을 받아 가게 됩니다. (꽝 포함)
![랜덤선물받기](https://user-images.githubusercontent.com/52727782/147095150-c2c81936-0841-4faa-ac92-59d207240c86.gif)

### 📃 [시연 영상](https://drive.google.com/file/d/1vDTEiCffnKVNp5GOowVuD8r9RS7-mGk1/view?usp=sharing)
