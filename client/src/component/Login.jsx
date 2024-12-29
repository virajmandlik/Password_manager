import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

const Login = () => {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const onSub = async (provider, formData) => {
    const email = formData.get('email');
    const password = formData.get('password');
    const tandc = formData.get('tandc');

    let val = await axios.post("http://localhost:3001/login", { email, password });
    console.log(val);
    setShow(val.data.login);
    if (val.data.msg) {
      setMsg(val.data.msg);
    }
  };

  useEffect(() => {
    if (show) {
      navigate("/password-manager");
    }
  }, [show, navigate]);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const checkLogin = async () => {
      let val = await axios.get("http://localhost:3001/login");
      console.log(val);
      if (val.data.user) {
        navigate("/password-manager");
      }
    };
    checkLogin();
  }, [navigate]);

  return (
    <AppProvider theme={theme}>
      <div className="container" id="formm" style={{ padding: '20px 0' }}>
        <div className="row">
          <div className="col-lg-6 col-md-8 col-12 mx-auto" style={{ paddingBottom: '20px' }}>
            {msg ? (
              <div className="alert alert-danger alert-dismissible">
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                <strong>ERROR!</strong> {msg}
              </div>
            ) : null}
            <br />
            <SignInPage
              signIn={onSub}
              slotProps={{
                emailField: { variant: 'standard', autoFocus: false },
                passwordField: { variant: 'standard' },
                submitButton: { variant: 'outlined' },
                rememberMe: {
                  control: (
                    <Checkbox
                      name="tandc"
                      value="true"
                      color="primary"
                      sx={{ padding: 0.5, '& .MuiSvgIcon-root': { fontSize: 20 } }}
                    />
                  ),
                  color: 'textSecondary',
                  label: 'I agree with the T&C',
                },
              }}
              providers={providers}
            />
            {/* "Don't have an account? Sign Up" Section */}
            <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '10px' }}>
              <span>Don't have an account? </span>
              <NavLink to="/register" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>
                Sign Up
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </AppProvider>
  );
}

export default Login;
