
export default function Login() {
  return (
  
      <div className="form-box" id="login-box" >
        <div className="header">Sign In</div>
        <form action="../../index.html" method="post">
          <div className="body bg-gray">
            <div className="form-group">
              <input
                type="text"
                name="userid"
                className="form-control"
                placeholder="User ID"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <input type="checkbox" name="remember_me" /> Remember me
            </div>
          </div>
          <div className="footer">
            <button type="submit" className="btn bg-olive btn-block">
              Sign me in
            </button>
            <p>
              <a href="#">I forgot my password</a>
            </p>
            <a href="register.html" className="text-center">
              Register a new membership
            </a>
          </div>
        </form>
        
      </div>

   
  );
}
