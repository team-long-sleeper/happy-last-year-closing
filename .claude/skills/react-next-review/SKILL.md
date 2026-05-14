---
name: react-next-review
description: Review React and Next.js (App Router) code for common issues — wrong client/server component boundaries, useEffect overuse, unnecessary re-renders, broken TanStack Query cache keys, weak typing, oversized components, and accessibility gaps. Use this skill whenever the user shares a React or Next.js component, a PR diff, or asks for a code review on frontend code. Trigger even when the user just pastes a `.tsx` file without explicitly saying "review" — proactively offer a structured review. Also trigger for questions like "이 코드 어때?", "리팩토링 해줘", "PR 봐줘", "리뷰해줘", or any code-quality discussion on React/Next.js code.
---

# React / Next.js Code Review

This skill reviews React and Next.js (App Router) code against a focused set of common, high-impact issues. The target stack is:

- Next.js 14+ App Router
- TypeScript
- TanStack Query (server state)
- Zustand (client state)
- Tailwind CSS

## How to use this skill

When the user shares React/Next.js code:

1. **Read the code carefully.** Identify which checks below apply. Do not run checks that aren't relevant.
2. **Classify each issue by severity:**
   - **Critical** (치명) — bugs, broken behavior, security/data issues, will fail in production
   - **Major** (주요) — wrong patterns that hurt maintainability, performance, or correctness in edge cases
   - **Advisory** (어드바이스) — style, naming, minor improvements
3. **For each issue, provide:**
   - **Where** — file path + line range (or quoted snippet if no path given)
   - **What** — one-sentence problem description
   - **Why** — short rationale (1-2 sentences). The reviewer is often a junior developer learning the concept, so explain the principle, not just the rule. Reference `references/concepts.md` when a deeper explanation is needed — read the relevant section before answering "why" questions.
   - **Fix** — actual corrected code, not vague suggestions
4. **Output format:** start with a 1-2 line summary, then group issues by severity. Use the headings: `## 치명 (Critical)`, `## 주요 (Major)`, `## 어드바이스 (Advisory)`. If a section is empty, omit it.
5. **End with a single "Overall" paragraph** — 2-3 sentences on the code's general quality and what to prioritize. Do not pad. If the code is genuinely fine, say so plainly.
   Always respond in the same language the user wrote in. If the user wrote in Korean, write the review in Korean (but keep code snippets in their original language).

**When the user asks "why?" about any finding** — or shows signs of wanting to learn the principle rather than just fix the code — open `references/concepts.md` and find the matching section (numbered 1-8). Explain in your own words drawing from that section. Don't just dump the document; pick the parts that match the user's level and question.

## Checks

Run only the checks that apply. Don't force findings — if a category is clean, skip it.

### 1. 클라이언트 / 서버 컴포넌트 경계 (Client/Server boundary)

App Router에서 가장 자주 깨지는 부분이다.

- **`'use client'` 가 파일 맨 위에 있는데**, 그 컴포넌트가 fetch만 하고 인터랙션이 없다면 → 서버 컴포넌트로 내릴 수 있는지 검토. 데이터 fetching은 가능하면 서버 컴포넌트에서 한다.
- **서버 컴포넌트에서 `useState`, `useEffect`, `onClick` 등을 사용**하고 있다면 → 즉시 치명. 빌드는 통과해도 런타임에서 깨진다.
- **`'use client'` 파일이 거대한 트리의 루트 근처에 있다면** → 자식까지 모두 클라이언트로 끌려간다. 인터랙티브한 최소 단위를 분리해서 leaf 쪽으로 내릴 것.
- **클라이언트 컴포넌트가 서버 전용 모듈(예: `fs`, DB 클라이언트, env secret)을 import 하면** → 치명. 번들에 노출된다.
- **`async` 컴포넌트는 서버 컴포넌트에서만** 가능. `'use client'` 파일에서 `export default async function` 패턴 발견 시 치명.

### 2. useEffect 남용

useEffect는 _외부 시스템과 동기화_ 할 때만 쓰는 게 원칙. 다음 패턴은 거의 항상 잘못이다.

- **파생 상태 동기화**: `useState` + `useEffect` 로 다른 state를 따라가는 패턴.

  ```tsx
  // ❌
  const [filtered, setFiltered] = useState([]);
  useEffect(() => { setFiltered(items.filter(...)); }, [items]);

  // ✅
  const filtered = items.filter(...);
  // 비용 크면 useMemo
  ```

- **fetch + setState**: TanStack Query로 대체 가능. 직접 fetch 하는 useEffect가 보이면 Query 훅으로 옮기는 코드를 제안.
- **이벤트 핸들러 안에서 처리할 일을 useEffect로**: 클릭 후 navigate, 폼 submit 후 토스트 같은 건 이벤트 핸들러 안에서 처리.
- **의존성 배열 누락**: lint가 잡아주는 경우가 많지만, `// eslint-disable-next-line` 가 보이면 _왜_ 무시했는지 코멘트가 있어야 한다. 없으면 지적.

### 3. 불필요한 리렌더링

- **부모 컴포넌트에서 객체/배열/함수 리터럴을 매번 새로 만들어 자식에 prop으로 넘기는 경우** → `useMemo`/`useCallback` 또는 컴포넌트 분리.
- **Context value를 객체로 직접 넘기는 경우** → `useMemo`로 감싸기.
- **거대한 컴포넌트 하나가 잦게 바뀌는 상태와 거의 안 바뀌는 UI를 같이 들고 있는 경우** → 잦은 상태를 자식으로 분리해서 격리.
- **`React.memo` 가 prop으로 함수/객체를 받는데 부모에서 매번 새로 만든다면** → memo가 무의미. 부모도 같이 고쳐야 함.

### 4. TanStack Query 캐시 키

- **문자열 키 (`useQuery({ queryKey: 'posts' })`) 발견 시** → 배열 키로 바꿔야 한다 (`['posts']`). 문자열 키는 v5에서 사실상 안티패턴.
- **키에 파라미터가 빠진 경우**: `['post']` 로 두고 id를 fetcher에만 넘기는 패턴. 캐시 충돌. `['post', id]` 로.
- **키 순서가 일관되지 않은 경우**: 한 곳은 `['posts', { page: 1 }]`, 다른 곳은 `['posts', 1]` → 같은 데이터인데 캐시 분리됨.
- **권장 패턴**: `queryKeys` 같은 팩토리 객체를 별도 파일에 두고 거기서 키를 가져다 쓰는 구조를 제안. 큰 프로젝트에서는 거의 필수.
- **`invalidateQueries` 호출 시** 키 부분 일치가 의도와 맞는지 확인. 너무 넓게 무효화하면 성능 이슈.

### 5. 타입 허술

- **`any` 사용 발견 시**: 왜 any인지 코멘트가 없으면 지적. 거의 항상 `unknown` + 타입 가드, 또는 제너릭으로 대체 가능.
- **`as Type` 단언 남발**: 외부 API 응답 같은 경계가 아니면 의심. zod 등 런타임 검증과 함께 쓰는 게 정석.
- **함수 시그니처에 명시적 반환 타입이 없는 export 함수**: 추론이 깊은 라이브러리 코드라면 명시 권장.
- **옵셔널 체이닝 + non-null assertion 혼용** (`data?.user!.name`): 의도가 모순. 둘 중 하나로 통일.
- **이벤트 핸들러 타입을 `any`로 두는 경우**: `React.ChangeEvent<HTMLInputElement>` 등 구체 타입으로.

### 6. 컴포넌트 크기 / 책임 섞임

- **한 컴포넌트가 200줄 넘으면** → 분리 가능성 검토. 절대적 기준은 아니지만 시그널.
- **fetching + 상태 관리 + 렌더링 + 폼 검증을 한 컴포넌트가 다 하는 경우** → custom hook으로 로직 추출, 렌더링 부분만 남기기.
- **prop이 10개 넘는 컴포넌트**: 책임이 분산되어야 한다는 신호.
- **`if (loading) ... if (error) ... if (empty) ... else ...` 가 4단 이상으로 중첩** → 상태별 컴포넌트로 분리하거나 early return.

### 7. 접근성 (a11y)

- **`<div onClick>` 으로 버튼처럼 쓰는 경우** → `<button>` 으로. 또는 `role="button"` + 키보드 핸들러 + `tabIndex`.
- **이미지에 `alt` 없음**: 장식용이면 `alt=""` 명시.
- **폼 input에 연결된 `<label>` 없음**: `htmlFor` 또는 `aria-label`.
- **포커스 가능한 요소의 outline을 `outline: none` 으로만 제거**한 경우 → 대체 포커스 스타일 필수.
- **색상만으로 상태 전달** (빨강=에러): 아이콘/텍스트 같이 사용.
- **모달/드롭다운에 키보드 탈출(Esc), 포커스 트랩 없음**: 지적.

### 8. 중복 / 추상화

- **거의 같은 컴포넌트 두 개가 약간만 다른 경우** → prop으로 차이만 받는 단일 컴포넌트로 추상화 가능한지 검토. 단, _세 번째 사례가 나올 때 추상화하라 (Rule of Three)_ — 두 번째에서 섣불리 추상화하면 오히려 부담.
- **유틸 함수가 컴포넌트 파일 안에 박혀 있고 다른 곳에서도 쓰일 만한 것** → 별도 파일로 추출 제안.
- **반대 케이스도 본다**: 잘못된 추상화. 추상 컴포넌트에 `variant` prop이 7개 있고 각 분기마다 다른 동작을 한다면 차라리 분리.
- **커스텀 훅으로 묶을 만한 패턴 반복**: 같은 useState + useEffect 조합이 여러 곳에 보이면 훅으로 추출.

## What NOT to do

- 코드를 다시 다 적어주지 마라. 지적한 부분만 수정 코드로 보여줘라.
- "고려해보세요", "검토해보세요" 같은 모호한 표현 금지. 구체적인 수정 코드를 제시.
- 발견 못 한 이슈를 만들지 마라. 코드가 깔끔하면 깔끔하다고 말하라.
- 한 이슈를 여러 번 반복하지 마라.
- 스타일 가이드(들여쓰기, 세미콜론 등)는 지적하지 마라 — Prettier/ESLint의 영역이다.

## Example output

다음 형식을 따른다:

```
요약: TanStack Query 캐시 키 설계와 클라이언트 컴포넌트 경계에서 즉시 고쳐야 할 문제 2건. 나머지는 양호.

## 치명 (Critical)

### 1. `src/app/posts/page.tsx:1` — 서버 컴포넌트에서 useState 사용
**문제:** `'use client'` 지시어 없이 `useState`를 호출. 빌드는 통과해도 런타임에서 깨진다.
**수정:**
\`\`\`tsx
'use client';
import { useState } from 'react';
// ...
\`\`\`
또는 인터랙티브 부분만 자식 컴포넌트로 분리하고 부모는 서버 컴포넌트로 유지.

## 주요 (Major)

### 2. `src/features/posts/usePosts.ts:8` — 캐시 키에 파라미터 누락
**문제:** `queryKey: ['post']` 인데 `id`가 fetcher에만 들어감. 다른 id 요청이 같은 캐시를 덮어쓴다.
**수정:**
\`\`\`ts
queryKey: ['post', id],
\`\`\`

## Overall

전반적인 구조는 깔끔하다. App Router 컨벤션만 정리하면 production 품질에 가깝다. Query 키 팩토리 패턴을 도입하면 앞으로 같은 실수를 막을 수 있다.
```
