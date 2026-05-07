export const metadata = {
  title: '개인정보처리방침 — Happy Last Year Closing',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-body-xl font-semibold text-text-default">{title}</h2>
      {children}
    </section>
  );
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-body-l font-semibold text-text-default">{title}</h3>
      {children}
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-body-m text-text-default/80 leading-relaxed">{children}</p>;
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-body-m text-text-default/60 bg-gray/20 rounded-lg px-3 py-2 leading-relaxed">
      {children}
    </p>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray/40">
      <table className="w-full text-body-m">
        <thead>
          <tr className="bg-gray/20">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left px-3 py-2 font-semibold text-text-default whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-gray/30">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 text-text-default/80 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Ol({ items }: { items: string[] }) {
  return (
    <ol className="list-decimal list-inside flex flex-col gap-1">
      {items.map((item, i) => (
        <li key={i} className="text-body-m text-text-default/80 leading-relaxed">
          {item}
        </li>
      ))}
    </ol>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-dvh bg-surface">
      <div className="px-5 py-6 flex flex-col gap-8 max-w-2xl mx-auto pb-16">
        <P>
          Team Long Sleeper(이하 &apos;회사&apos;)는 Happy Last Year Closing(이하
          &apos;서비스&apos;)을 이용하는 개인(이하 &apos;이용자&apos;)의 개인정보를 보호하기 위해
          「개인정보 보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을
          준수하며, 아래와 같이 개인정보처리방침을 수립하여 공개합니다.
        </P>

        {/* 제1조 */}
        <Section title="제1조 방침의 공개 및 변경">
          <Ol
            items={[
              '이용자가 언제든지 본 방침을 확인할 수 있도록 서비스 내 메뉴 화면의 링크를 통해 공개합니다.',
              '본 방침은 개인정보 관련 법령, 지침, 고시 또는 정부·회사 서비스 정책의 변경에 따라 개정될 수 있습니다.',
              '본 방침을 개정하는 경우 서비스 내 공지사항 또는 메인 화면을 통해 고지하며, 이용자 권리에 중요한 변경이 있는 경우에는 시행일 최소 30일 전에, 그 외의 경우에는 최소 7일 전에 공지합니다.',
            ]}
          />
        </Section>

        {/* 제2조 */}
        <Section title="제2조 수집하는 개인정보의 항목 및 수집 방법">
          <Sub title="1) 카카오 소셜 로그인">
            <P>
              본 서비스는 현재 카카오 계정을 통한 소셜 로그인을 제공합니다. 카카오 프로필 이미지는
              수집하지 않으며, 서비스 내 프로필 이미지는 회사가 자체 제공하는 기본 이미지 중
              무작위로 배정됩니다.
            </P>
            <Table
              headers={['구분', '수집 항목', '목적']}
              rows={[
                ['필수', '이름(닉네임)', '계정 생성 및 서비스 내 표시'],
                [
                  '내부 저장',
                  'OAuth 액세스·리프레시 토큰, 토큰 만료 일시',
                  '로그인 상태 유지 및 카카오 API 연동',
                ],
              ]}
            />
            <Note>카카오 OAuth 토큰은 데이터베이스 저장 시 암호화됩니다.</Note>
          </Sub>

          <Sub title="2) 추후 추가 예정인 로그인 방법">
            <P>아래 로그인 방법은 현재 개발 중이며, 서비스 출시 전 본 방침이 업데이트됩니다.</P>

            <p className="text-body-m font-medium text-text-default/70">
              네이버 소셜 로그인 (예정)
            </p>
            <Table
              headers={['구분', '수집 항목', '목적']}
              rows={[
                ['필수', '이름(닉네임)', '계정 생성 및 서비스 내 표시'],
                [
                  '내부 저장',
                  'OAuth 액세스·리프레시 토큰, 토큰 만료 일시',
                  '로그인 상태 유지 및 네이버 API 연동',
                ],
              ]}
            />

            <p className="text-body-m font-medium text-text-default/70 mt-2">
              이메일·비밀번호 회원가입 (예정)
            </p>
            <Table
              headers={['구분', '수집 항목', '목적']}
              rows={[
                ['필수', '이름, 이메일 주소', '계정 생성, 본인 확인, 서비스 공지 발송'],
                ['내부 저장', '비밀번호 (단방향 암호화 해시)', '로그인 인증'],
              ]}
            />
            <Note>
              비밀번호는 회사도 복호화할 수 없는 단방향 해시 방식으로 저장되며, 원문은 저장되지
              않습니다.
            </Note>
          </Sub>

          <Sub title="3) 서비스 이용 중 수집 정보">
            <Table
              headers={['구분', '수집 항목', '목적']}
              rows={[
                [
                  '에피소드',
                  '제목, 날짜, 메모(최대 150자), 방문 장소(이름·주소·좌표·URL), 동행인, 태그, 사진(최대 5장)',
                  '추억 기록 및 조회 서비스 제공',
                ],
                [
                  '연락처/친구',
                  '이름, 카카오 회원번호(연동된 경우)',
                  '에피소드 동행인 등록 및 친구 기능',
                ],
                ['태그', '태그명, 색상 코드', '에피소드 분류'],
              ]}
            />
          </Sub>

          <Sub title="4) 자동 수집 정보">
            <Table
              headers={['수집 항목', '목적']}
              rows={[
                [
                  'IP 주소, 디바이스 정보(User-Agent)',
                  '보안 감사, 비정상 접근 탐지 및 다중 기기 세션 관리',
                ],
                ['서비스 이용 기록, 접속 일시', '서비스 이용 현황 분석 및 부정 이용 방지'],
                ['쿠키 (JWT 액세스 토큰, 리프레시 세션 키)', '로그인 상태 유지 및 자동 토큰 갱신'],
              ]}
            />
            <Note>
              쿠키 안내: 로그인 상태 유지를 위해 쿠키를 사용합니다. 해당 쿠키는 JavaScript에서
              접근할 수 없는 httpOnly 속성이 적용되어 있습니다. 브라우저 설정에서 쿠키 저장을 거부할
              경우 일부 서비스 이용이 제한될 수 있습니다.
            </Note>
          </Sub>

          <Sub title="5) 앱 내 결제 서비스 (추후 제공 예정)">
            <Table
              headers={['구분', '수집 항목', '목적']}
              rows={[
                [
                  '결제 정보',
                  '결제 수단 종류, 결제 금액, 결제 일시, 구독 상태',
                  '유료 기능 제공 및 결제 이력 관리',
                ],
              ]}
            />
            <Note>
              신용카드 번호 등 민감한 결제 수단 정보는 회사가 직접 저장하지 않으며, Apple App Store
              또는 Google Play의 인앱 결제(IAP) 시스템을 통해 처리됩니다. 결제 관련 정보는
              전자상거래 등에서의 소비자보호에 관한 법률에 따라 5년간 보존됩니다.
            </Note>
          </Sub>
        </Section>

        {/* 제3조 */}
        <Section title="제3조 개인정보의 이용 목적">
          <P>
            회사는 수집한 개인정보를 다음 목적으로만 이용하며, 목적이 변경될 경우 이용자의 별도
            동의를 받습니다.
          </P>
          <Ol
            items={[
              '서비스 제공: 에피소드 기록, 장소 검색, 동행인 관리, 통계 제공 등 서비스 핵심 기능 운영',
              '회원 관리: 이용자 식별, 불법·부정 이용 방지, 계정 복구 처리',
              '서비스 개선: 이용 현황 분석 및 서비스 품질 향상',
              '보안·장애 대응: 시스템 오류 감지 및 서비스 안정성 확보',
              '법령 의무 이행: 관계 법령에 따른 기록 보존',
              '유료 서비스 제공(추후): 결제 처리, 구독 관리, 환불 처리',
            ]}
          />
        </Section>

        {/* 제4조 */}
        <Section title="제4조 개인정보의 제3자 제공">
          <P>
            회사는 이용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다. 다만, 이용자가 사전에
            동의한 경우 또는 법령의 규정에 의거하여 수사기관이 요구하는 경우에는 예외로 합니다.
          </P>
        </Section>

        {/* 제5조 */}
        <Section title="제5조 개인정보 처리 위탁 및 국외 이전">
          <Table
            headers={['수탁자', '위탁 업무 내용', '보유 기간']}
            rows={[
              [
                'Cloudflare, Inc. (미국)',
                '에피소드 사진 파일 저장 (Cloudflare R2)',
                '이용자 탈퇴 또는 사진 삭제 시까지',
              ],
              ['Sentry, Inc. (미국)', '서비스 오류 로그 수집 및 모니터링', '수집일로부터 90일'],
              [
                'Google LLC (미국)',
                '장소 썸네일 이미지 조회 (Google Places API)',
                'API 조회 시 일회성 전송 (저장 없음)',
              ],
              ['Apple Inc. / Google LLC (추후 예정)', '앱 내 결제 처리', '결제 대행사 정책에 따름'],
            ]}
          />
        </Section>

        {/* 제6조 */}
        <Section title="제6조 개인정보의 보유 및 이용 기간">
          <Sub title="계정 삭제 유예 기간">
            <P>
              이용자가 계정 삭제를 요청한 경우 삭제 요청일로부터 30일간 유예 기간이 적용됩니다. 유예
              기간 중 계정 복구가 가능하며, 유예 기간 종료 후에는 모든 개인 콘텐츠 및 개인정보가
              영구 삭제됩니다. 카카오 앱 연결은 삭제 요청 즉시 해제됩니다.
            </P>
          </Sub>

          <Sub title="내부 방침에 의한 보존 (가명처리)">
            <P>
              계정 영구 삭제 후에도 서비스 보호를 위해 아래 정보를 최소한으로 보존합니다. 이 정보는
              이용자를 직접 식별할 수 없도록 SHA-256 단방향 해시로 가명처리하여 관리합니다.
            </P>
            <Table
              headers={['보존 정보', '보존 기간', '보존 이유']}
              rows={[
                [
                  '계정 식별자 해시, 계정 생성·삭제 일시, 가입 시 IP 해시',
                  '탈퇴 후 최대 1년',
                  '동일인의 반복 부정 가입·이용 방지',
                ],
                ['서비스 약관 위반·제재 이력', '탈퇴 후 최대 1년', '악성 이용자 재가입 차단'],
              ]}
            />
          </Sub>

          <Sub title="법령에 의한 보존">
            <Table
              headers={['보존 정보', '보존 기간', '근거 법령']}
              rows={[
                ['웹사이트 로그 기록', '3개월', '통신비밀보호법'],
                [
                  '결제·거래 기록 (유료 서비스 도입 시)',
                  '5년',
                  '전자상거래 등에서의 소비자보호에 관한 법률',
                ],
              ]}
            />
          </Sub>
        </Section>

        {/* 제7조 */}
        <Section title="제7조 개인정보의 파기">
          <Table
            headers={['파기 시점', '대상']}
            rows={[
              ['삭제 요청 즉시', '카카오 앱 연결 해제, 모든 기기 세션(리프레시 토큰) 무효화'],
              [
                '유예 기간(30일) 종료 후',
                '이름, 에피소드(제목·메모·장소·동행인·태그), 사진(Cloudflare R2 원본), 연락처, OAuth 토큰',
              ],
            ]}
          />
          <Note>
            전자적 파일은 복구 불가능한 기술적 방법으로 영구 삭제하며, Cloudflare R2에 저장된 사진
            파일은 계정 영구 삭제 시 일괄 삭제됩니다.
          </Note>
        </Section>

        {/* 제8조 */}
        <Section title="제8조 이용자의 권리 및 행사 방법">
          <Ol
            items={[
              '개인정보 열람: 서비스 내 계정 설정에서 확인 가능',
              '개인정보 삭제(계정 탈퇴): 서비스 내 계정 설정 > 계정 삭제를 통해 요청',
              '계정 복구: 삭제 요청 후 30일 이내 서비스 내 계정 복구 메뉴를 통해 가능',
              '처리 정지 요청 및 기타 문의: 아래 개인정보 보호 책임자에게 연락',
            ]}
          />
        </Section>

        {/* 제9조 */}
        <Section title="제9조 개인정보의 안전성 확보 조치">
          <Table
            headers={['조치', '내용']}
            rows={[
              ['카카오 OAuth 토큰 암호화', '암호화 후 DB 저장'],
              ['에피소드 사진 암호화', '암호화 후 클라우드 스토리지 저장'],
              ['접근 통제', 'JWT 기반 인증, httpOnly 쿠키 적용으로 토큰 탈취 방지'],
              ['HTTPS 통신', '전 구간 SSL/TLS 암호화 통신 적용'],
              ['SQL Injection 방지', 'ORM(Prisma) 사용으로 쿼리 인젝션 차단'],
              ['세션 무효화', '로그아웃 또는 계정 삭제 시 모든 기기의 세션 즉시 무효화'],
            ]}
          />
        </Section>

        {/* 제10조 */}
        <Section title="제10조 개인정보 보호 책임자">
          <Table
            headers={['구분', '내용']}
            rows={[
              ['책임자', 'Team Long Sleeper 대표자'],
              ['이메일', 'mnkng0000@gmail.com'],
              ['서비스 도메인', 'happylastyear.xyz'],
            ]}
          />
        </Section>

        {/* 제11조 */}
        <Section title="제11조 권익침해 구제 방법">
          <P>이용자는 아래 기관에 개인정보 침해에 대한 피해구제, 상담 등을 문의할 수 있습니다.</P>
          <ul className="flex flex-col gap-1">
            {[
              ['개인정보보호위원회', 'www.pipc.go.kr', '국번 없이 182'],
              ['한국인터넷진흥원 개인정보침해신고센터', 'privacy.kisa.or.kr', '국번 없이 118'],
              ['대검찰청 사이버수사과', 'www.spo.go.kr', '02-3480-3573'],
              ['경찰청 사이버안전국', 'ecrm.cyber.go.kr', '국번 없이 182'],
            ].map(([name, url, tel]) => (
              <li key={name} className="text-body-m text-text-default/80">
                <span className="font-medium">{name}</span>
                <span className="text-text-default/50 ml-2">
                  {url} / {tel}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <p className="text-body-m text-text-default/40 text-center pt-2">
          시행일: 2025년 05월 01일
        </p>
      </div>
    </div>
  );
}
