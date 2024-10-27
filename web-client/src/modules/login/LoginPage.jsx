import { PrimaryButton } from '../../components/buttons';
import { Card, CenteredPageContainer } from '../../components/containers';
import { FadeInUp } from '../../components/animations';
import PasswordInput from '../../components/PasswordInput';
import { SubTitle, Title } from '../../components/Typography';
import TextInput from '../../components/TextInput';
import { useLogin } from '@tic-tac/shared';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function LoginPage() {
  const navigate = useNavigate();
  const { signIn, loading, email, setEmail, password, setPassword } = useLogin({
    onSuccess: (data) => {
      localStorage.setItem('auth', data);
      navigate('/home');
      toast.success('Login successful');
    },
  });
  return (
    <CenteredPageContainer image={'../../../images/LoginBg.webp'}>
      <FadeInUp>
        <Card>
          <Title align='center'>Login</Title>
          <SubTitle align='center'>
            Welcome back! Please login to your account.
          </SubTitle>
          <TextInput
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            placeholder='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PrimaryButton disabled={loading} onClick={signIn}>
            Login
          </PrimaryButton>
        </Card>
      </FadeInUp>
    </CenteredPageContainer>
  );
}

export default LoginPage;
