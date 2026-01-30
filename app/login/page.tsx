import Landing from '@/app/components/common/Landing';
import LoginButton from '@/app/components/login/LoginButton';

export default function Login() {
  return (
    <>
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-75">
        <LoginButton />
      </div>
      <Landing />
    </>
  );
}
