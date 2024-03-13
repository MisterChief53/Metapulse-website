import { AlertDialogDemo } from '../alertDialog';
import '../login/login.css';
import { AlertDialog
 } from '@radix-ui/react-alert-dialog';
function Login() {
  return (
    <div className="login">
      <h1  style={{ margin: '20px' }}><strong>USER LOGIN</strong></h1>
      <form>
        <input placeholder="Username" type="text" id="usuario" name="usuario" />
        <input placeholder="Password" type="password" id="contrasena" name="contrasena" />
        <button type="submit">LOGIN</button>
      </form>
      <div className="circle-image">
    
      </div>
    </div>

  );
}

export default Login;
