import { PrimaryButton } from '../../components/buttons';
import { Card, CenteredPageContainer } from '../../components/containers';
import { FadeInUp } from '../../components/animations';
import PasswordInput from '../../components/PasswordInput';
import { SubTitle, Title } from '../../components/Typography';
import TextInput from '../../components/TextInput';
import { useLogin } from '../../shared';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const SecondaryButton = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  margin-top: 20px;
`;

function LoginPage() {
  const { signIn, loading, email, setEmail, password, setPassword } =
    useLogin();
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

          <SecondaryButton to='/register'>
            Do not have an account? Register
          </SecondaryButton>
        </Card>
      </FadeInUp>
    </CenteredPageContainer>
  );
}

export default LoginPage;
