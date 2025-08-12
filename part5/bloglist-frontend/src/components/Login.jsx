const Login = ({loginHandler}) => (
    <div>
    <form onSubmit={loginHandler}>
    Username <input name="username" type="text"/><br/>
    Password <input name="password" type="password"/>
    </form>
    </div>
)

export default Login
