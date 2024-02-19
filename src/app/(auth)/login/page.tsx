import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <section className="h-[calc(100vh-100px)] container m-auto px-7 flex justify-center items-center">
      <div className="m-auto bg-white rounded-lg p-5 w-full md:w-2/3">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">Log In</h1>
        <LoginForm/>
      </div>
    </section>
  )
}

export default LoginPage