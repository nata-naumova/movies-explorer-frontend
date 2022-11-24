import './Login.css';
import Form from '../Form/Form';

const inputs = [
  { caption: 'E-mail', name: 'email' },
  { caption: "Пароль", name: 'password' }
];

function Login() {
  return (
    <main className="auth">
      <Form 
        inputs={inputs}
        title="Рады видеть!"
        formName="login"
        buttonName="Войти"
        text="Еще не зарегистрированы?"
        link="Регистрация"
        linkTarget="/signup"
      />
    </main>
  );
}

export default Login;