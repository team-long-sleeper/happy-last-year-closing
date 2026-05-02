import WithHeaderLayout from '@components/layouts/withHeader';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <WithHeaderLayout doTitleBounce>{children}</WithHeaderLayout>;
}
