import { SignInForm } from "../../components/SingInForm/SignInForm";

import "./style.scss";

export default async function Signin() {
  return (
    <div className="form">
      <h1>Sign In</h1>
      <SignInForm />
    </div>
  );
}
