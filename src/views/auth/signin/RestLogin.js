import axios from 'axios'
import { Formik } from 'formik'
import jwt from 'jwt-decode'
import React from 'react'
import { Alert, Button, Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { API_SERVER } from '../../../config/constant'
import { useAuth } from '../../../hooks/useAuth'
import { useLoading } from '../../../hooks/useLoading'
import useScriptRef from '../../../hooks/useScriptRef'

const RestLogin = ({ className, ...rest }) => {
  const dispatcher = useDispatch()
  const scriptedRef = useScriptRef()
  const { setUserData } = useAuth()
  const { Loading } = useLoading()

  const handleSubmit = async (
    values,
    { setErrors, setStatus, setSubmitting },
  ) => {
    try {
      Loading.turnOn()
      setSubmitting(true)
      axios
        .post(API_SERVER + 'users/auth/login', {
          password: values.password,
          username: values.email,
        })
        .then(function (response) {
          const dataUser = jwt(response.data.access_token)
          setUserData(dataUser, response.data.access_token)
          if (scriptedRef.current) {
            setStatus({ success: true })
            setSubmitting(false)
          }
        })
        .catch(function (error) {
          setStatus({ success: false })
          setSubmitting(false)
          const statusCode = error?.response?.data?.statusCode
          if (statusCode !== 500) {
            if (statusCode === 401) {
              if (error?.response?.data?.message === 'Acesso bloqueado!') {
                setErrors({
                  submit: 'Acesso bloqueado.',
                })
              } else {
                setErrors({
                  submit:
                    'Usuário e/ou senha incorretos ou esse usuário não existe.',
                })
              }
            } else {
              setErrors({ submit: error?.response?.data?.message })
            }
          } else {
            setErrors({
              submit:
                'Ops! Houve um erro ao tentar entrar no sistema, por favor entre em contato com o suporte técnico.',
            })
          }
        })
    } catch (err) {
      if (scriptedRef.current) {
        setStatus({ success: false })
        setErrors({ submit: err.message })
        setSubmitting(false)
      }
    } finally {
      Loading.turnOff()
      setSubmitting(false)
    }
  }

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('E-mail inválido!')
            .max(255)
            .required('Email obrigatório!'),
          password: Yup.string().max(255).required('Senha obrigatória!'),
        })}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form
            noValidate
            onSubmit={handleSubmit}
            className={className}
            {...rest}
          >
            <div className="form-group mb-3">
              <input
                className="form-control"
                error={touched.email && errors.email}
                label="Email"
                placeholder="Email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
              />
              {touched.email && errors.email && (
                <small className="text-danger form-text">{errors.email}</small>
              )}
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                error={touched.password && errors.password}
                label="Senha"
                placeholder="Senha"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
              />
              {touched.password && errors.password && (
                <small className="text-danger form-text">
                  {errors.password}
                </small>
              )}
            </div>

            {errors.submit && (
              <Col sm={12}>
                <Alert variant="danger">{errors.submit}</Alert>
              </Col>
            )}

            <div className="custom-control custom-checkbox  text-left mb-4 mt-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Permanecer conectado.
              </label>
            </div>

            <Row>
              <Col mt={2}>
                <Button
                  className="btn-block"
                  color="primary"
                  disabled={isSubmitting}
                  size="large"
                  type="submit"
                  variant="primary"
                >
                  Entrar
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
      <hr />
    </React.Fragment>
  )
}

export default RestLogin
