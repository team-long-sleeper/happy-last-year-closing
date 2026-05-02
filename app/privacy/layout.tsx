import TermsHeader from '@components/common/header/termsHeader';
import WithHeaderLayout from '@components/layouts/withHeader';

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <WithHeaderLayout
      doTitleBounce
      showMenu={false}
      stickyBottom={<TermsHeader title="개인정보처리방침" subtitle="시행일: 2025년 05월 01일" />}
    >
      {children}
    </WithHeaderLayout>
  );
}
