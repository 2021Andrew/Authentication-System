import Form from "../components/form"; // Ensure correct case

function Login() {
  console.log("Login component rendered");
  return (
    <div>
      <h2>Login Page</h2>
      <Form route="/api/token/" method="POST" />
    </div>
  );
}

export default Login;
