// <type>(scope): <subject>

const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'style', 'docs', 'test', 'chore', 'perf', 'wip'],
    ],
    // 한글 허용 (대소문자 규칙 무시)
    'subject-case': [0],
    // subject 문장 마지막에 마침표 금지
    'subject-full-stop': [2, 'never', '.'],
    // 커밋 메시지 전체 72자 제한
    'header-max-length': [2, 'always', 72],
  },
};

export default config;

// type
// feat     새로운 기능
// fix      버그 수정
// refactor 기능 변화 없는 리팩토링
// style    포맷팅, 세미콜론, 공백 (로직 X)
// docs     문서, 주석
// test     테스트 추가/수정
// chore    설정, 빌드, 패키지, CI
// perf     성능 개선
// wip      임시 작업용 (in progress)
