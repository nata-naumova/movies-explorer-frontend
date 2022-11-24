import './Register.css';
import Form from '../Form/Form';

const inputs = [
  { caption: "Имя", name: "name" },
  { caption: 'E-mail', name: 'email' },
  { caption: "Пароль", name: 'password' }
];

function Register() {
  return (
    <main className="auth">
      <Form 
        inputs={inputs}
        title="Добро пожаловать!"
        formName="register"
        buttonName="Зарегистрироваться"
        text="Уже зарегистрированы?"
        link="Войти"
        linkTarget="/signin"
      />
    </main>
  );
}

export default Register;