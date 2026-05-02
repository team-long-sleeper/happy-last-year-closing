export const metadata = {
  title: '서비스 이용약관 — Happy Last Year Closing',
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

export default function ServicePage() {
  return (
    <div className="min-h-dvh bg-surface">
      <div className="px-5 py-6 flex flex-col gap-8 max-w-2xl mx-auto pb-16">
        {/* 제1조 */}
        <Section title="제1조 목적">
          <P>
            이 약관은 Team Long Sleeper(이하 &apos;회사&apos;)가 제공하는 Happy Last Year
            Closing(이하 &apos;서비스&apos;)의 이용에 관한 회사와 이용자 간의 권리, 의무 및 책임
            사항을 규정함을 목적으로 합니다.
          </P>
        </Section>

        {/* 제2조 */}
        <Section title="제2조 용어 정의">
          <Ol
            items={[
              '"서비스": 회사가 제공하는 Happy Last Year Closing 웹·앱 애플리케이션 및 관련 기능 일체',
              '"이용자": 이 약관에 동의하고 서비스를 이용하는 자',
              '"계정": 이용자가 소셜 로그인을 통해 생성한 서비스 내 식별 정보',
              '"에피소드": 이용자가 서비스 내에 기록하는 추억(장소, 날짜, 사진, 동행인, 메모 등) 콘텐츠',
              '"콘텐츠": 이용자가 서비스에 업로드하거나 생성한 모든 정보(에피소드, 사진, 태그, 메모 등)',
            ]}
          />
        </Section>

        {/* 제3조 */}
        <Section title="제3조 약관의 게시 및 변경">
          <Ol
            items={[
              '회사는 이 약관을 서비스 내 메뉴 화면에 링크 형태로 공개합니다.',
              '회사는 관련 법령을 위반하지 않는 범위에서 이 약관을 변경할 수 있습니다.',
              '약관을 변경하는 경우 적용 일자 및 변경 사유를 명시하여 시행 일자 7일 전부터 서비스 내 공지사항에 공지합니다. 이용자에게 불리한 변경은 30일 전에 공지하며, 이용자가 명시적으로 거부 의사를 표시하지 않으면 변경 약관에 동의한 것으로 간주합니다.',
            ]}
          />
        </Section>

        {/* 제4조 */}
        <Section title="제4조 서비스 이용 자격">
          <P>서비스는 카카오 계정을 통한 소셜 로그인으로 이용할 수 있습니다.</P>
          <P>다음 각 호에 해당하는 경우 서비스 이용이 제한될 수 있습니다.</P>
          <Ol
            items={[
              '타인의 명의 또는 계정을 도용한 경우',
              '이전에 이 약관 위반 등으로 서비스 이용이 제한된 이력이 있는 경우',
              '관련 법령에 따라 이용이 금지된 경우',
            ]}
          />
        </Section>

        {/* 제5조 */}
        <Section title="제5조 서비스 제공">
          <Sub title="1) 서비스 내용">
            <Ol
              items={[
                '에피소드(추억) 기록: 장소, 날짜, 동행인, 사진(최대 5장), 태그, 메모 입력',
                '장소 검색 및 즐겨찾기',
                '연락처/친구 관리 및 에피소드 동행인 등록',
                '태그 관리 및 에피소드 분류',
                '에피소드 통계 (자주 방문한 장소, 자주 함께한 동행인, 사용 태그 등)',
              ]}
            />
          </Sub>
          <Sub title="2) 서비스 제공 시간">
            <P>
              서비스는 원칙적으로 연중무휴, 24시간 제공합니다. 다만 시스템 점검, 서버 장애, 불가항력
              등의 사유가 있는 경우 일시적으로 중단될 수 있습니다.
            </P>
          </Sub>
        </Section>

        {/* 제6조 */}
        <Section title="제6조 이용자의 의무">
          <P>이용자는 다음 행위를 해서는 안 됩니다.</P>
          <Ol
            items={[
              '타인의 개인정보, 계정 정보를 도용하거나 무단으로 이용하는 행위',
              '회사의 지식재산권, 제3자의 저작권, 개인정보 등을 침해하는 콘텐츠를 업로드하는 행위',
              '음란물, 혐오 표현, 불법 정보 등 관련 법령에 위반되는 콘텐츠를 게시하는 행위',
              '서비스의 정상적인 운영을 방해하는 행위 (과도한 트래픽 유발, 자동화 스크립트 사용 등)',
              '회사의 사전 동의 없이 서비스를 영리 목적으로 이용하는 행위',
              '관련 법령 또는 이 약관을 위반하는 행위',
            ]}
          />
        </Section>

        {/* 제7조 */}
        <Section title="제7조 콘텐츠에 관한 권리와 책임">
          <Ol
            items={[
              '이용자가 서비스에 등록한 콘텐츠(사진, 메모, 에피소드 등)에 대한 저작권은 이용자 본인에게 귀속됩니다.',
              '이용자는 서비스에 콘텐츠를 등록함으로써, 회사가 서비스 제공 및 개선에 필요한 범위 내에서 해당 콘텐츠를 저장·처리할 수 있도록 허락합니다.',
              '이용자가 등록한 콘텐츠가 타인의 권리를 침해하는 경우, 이에 대한 법적 책임은 이용자 본인에게 있습니다.',
              '이용자의 콘텐츠(사진 포함)는 암호화되어 저장되며, 이용자 본인만 조회 가능합니다.',
            ]}
          />
        </Section>

        {/* 제8조 */}
        <Section title="제8조 서비스 변경 및 중단">
          <Ol
            items={[
              '회사는 서비스의 내용, 기능 등을 변경하거나 중단할 수 있습니다.',
              '서비스를 영구 종료하는 경우, 종료 30일 전에 서비스 내 공지사항을 통해 고지합니다.',
            ]}
          />
        </Section>

        {/* 제9조 */}
        <Section title="제9조 계정 삭제 및 서비스 이용 제한">
          <Sub title="1) 이용자의 계정 삭제">
            <Ol
              items={[
                '이용자는 서비스 내 계정 설정 > 계정 삭제를 통해 계정 삭제를 요청할 수 있습니다.',
                '삭제 요청 후 30일간 유예 기간이 적용되며, 이 기간 내 계정을 복구할 수 있습니다.',
                '유예 기간 종료 후 모든 콘텐츠 및 개인정보는 복구 불가능한 방식으로 영구 삭제됩니다.',
                '영구 삭제 이후 동일한 카카오 계정으로 재가입이 가능합니다.',
              ]}
            />
          </Sub>
          <Sub title="2) 회사에 의한 이용 제한">
            <P>
              회사는 이용자가 다음 각 호에 해당하는 경우 사전 통지 없이 서비스 이용을 제한하거나
              계정을 삭제할 수 있습니다.
            </P>
            <Ol
              items={[
                '이 약관 제6조를 위반한 경우',
                '관련 법령에 위반되는 행위를 한 경우',
                '타인의 정상적인 서비스 이용을 방해한 경우',
              ]}
            />
          </Sub>
        </Section>

        {/* 제10조 */}
        <Section title="제10조 유료 서비스 (추후 제공 예정)">
          <P>
            회사는 향후 일부 기능을 유료로 제공할 수 있습니다. 유료 서비스 도입 시 별도 안내 및
            이용자 동의 절차를 거치며, 결제는 Apple App Store 또는 Google Play의 인앱 결제 시스템을
            통해 처리됩니다.
          </P>
          <Note>
            유료 서비스 도입 전 본 약관 및 개인정보처리방침이 업데이트되며 이용자에게 사전
            공지됩니다.
          </Note>
        </Section>

        {/* 제11조 */}
        <Section title="제11조 면책 조항">
          <Ol
            items={[
              '회사는 천재지변, 전쟁, 서버 해킹 등 불가항력적 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.',
              '회사는 이용자의 귀책 사유로 발생한 서비스 이용 장애에 대해 책임을 지지 않습니다.',
              '회사는 이용자가 서비스를 통해 제3자와 나눈 상호작용 및 그로 인한 손해에 대해 책임을 지지 않습니다.',
              '이용자가 서비스에 업로드한 콘텐츠의 정확성, 적법성에 대한 책임은 이용자 본인에게 있습니다.',
            ]}
          />
        </Section>

        {/* 제12조 */}
        <Section title="제12조 준거법 및 관할법원">
          <Ol
            items={[
              '이 약관의 해석 및 회사와 이용자 간의 분쟁에 대해서는 대한민국 법을 적용합니다.',
              '서비스 이용과 관련하여 분쟁이 발생할 경우 민사소송법상 관할을 가지는 법원을 관할법원으로 합니다.',
            ]}
          />
        </Section>

        {/* 문의 */}
        <Section title="문의">
          <Table
            headers={['구분', '내용']}
            rows={[
              ['이메일', 'mnkng0000@gmail.com'],
              ['서비스 도메인', 'happylastyear.xyz'],
            ]}
          />
        </Section>

        <p className="text-body-m text-text-default/40 text-center pt-2">
          시행일: 2025년 05월 01일
        </p>
      </div>
    </div>
  );
}
