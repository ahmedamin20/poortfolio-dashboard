import { lazy, useEffect } from "react";
import { formikInstance } from "../../../utility/formik/formikHelper";
import loginSchema from "../validation/LoginSchema";
import LoginService from "../services/loginService";
import { HttpResponse } from "../../../constants/api";
import { useNavigate } from "react-router-dom";
import { DEFAULT_ROUTE } from "../../../constants/routes";
import { isUserLoggedIn } from "../utils/authHelper";

const LoginView = lazy(() => import("../views/LoginView"));

const LoginContainer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isUserLoggedIn()) {
      navigate(DEFAULT_ROUTE);
    }
  }, [navigate]);

  const { handleLogin, isLoading, code } = LoginService();
  const formik = formikInstance({
    initialValues: { username: "", password: "" },
    validationSchema: loginSchema(),
    onSubmit: (values) => handleLogin(values),
  });

  useEffect(() => {
    if (code === HttpResponse.OK) {
      navigate(DEFAULT_ROUTE, { replace: true });
    }
  }, [code]);

  return (
    <LoginView
      handleSubmit={formik.handleSubmit}
      formikValues={formik.values}
      handleChange={formik.handleChange}
      formikErrors={formik.errors}
      isSubmitting={isLoading}
    />
  );
};

export default LoginContainer;
