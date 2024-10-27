import { PrimaryButton } from '../../components/buttons';
import TextInput from '../../components/TextInput';
import { Card, CenteredPageContainer } from '../../components/containers';
import { FadeInUp } from '../../components/animations';
import PasswordInput from '../../components/PasswordInput';
import { SubTitle, Title } from '../../components/Typography';
import { useRegister } from '../../shared';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    loading,
    errors,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
  } = useRegister({
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
          <Title align='center'>Register</Title>
          <SubTitle align='center'>
            Welcome! Please register to your account.
          </SubTitle>
          <TextInput
            placeholder='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            label={'Name'}
            error={errors.name}
          />
          <TextInput
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={'Email'}
            error={errors.email}
          />
          <PasswordInput
            placeholder='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={'Password'}
            error={errors.password}
          />
          <PrimaryButton onClick={register} disabled={loading}>
            Register
          </PrimaryButton>
        </Card>
      </FadeInUp>
    </CenteredPageContainer>
  );
}

export default RegisterPage;
