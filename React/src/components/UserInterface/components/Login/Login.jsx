import "./Login.css";
import UserForm from "./components/UserForm";
import UsersList from "./components/UsersList";

const Login = () => {
  return (
    <div className='login-container'>
      <UserForm />
      <UsersList />
    </div>
  );
};

export default Login;
