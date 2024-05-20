import React, { useCallback, useMemo } from 'react';
import './LoginForm.css';
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

function LoginForm() {
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (
      values: { username: string; password: string; role: string },
      formik: any,
    ) => {
      navigate('/homepage');
      console.log('/homepage');
    },
    [navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Pole nie może być puste!'),
        password: yup
          .string()
          .required('Pole nie może być puste!')
          .min(5, 'Hasło nie może być krótsze niż 5 znaków!'),
        role: yup.string().required('Pole nie może być puste!'),
      }),
    [],
  );

  return (
    <div>
      <Formik
        initialValues={{ username: '', password: '', role: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
      >
        {(formik: any) => (
          <form
            className="Login-form"
            id="signForm"
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <TextField
              id="username"
              name="username"
              label="Nazwa użytkownika"
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && !!formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              id="password"
              name="password"
              label="Hasło"
              variant="standard"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />

            <FormControl component="fieldset">
              <FormLabel component="legend">Role</FormLabel>
              <RadioGroup
                row
                aria-label="role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <FormControlLabel
                  value="reader"
                  control={<Radio />}
                  label="Reader"
                />
                <FormControlLabel
                  value="librarian"
                  control={<Radio />}
                  label="Librarian"
                />
              </RadioGroup>
            </FormControl>

            <Button
              variant="contained"
              startIcon={<LoginIcon />}
              type="submit"
              form="signForm"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Zaloguj się
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
