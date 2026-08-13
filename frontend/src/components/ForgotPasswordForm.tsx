import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { usePasswordRecovery } from '../hooks/usePasswordRecovery';
import { getErrorMessage } from '../types/api';
import {
  validateForgotPasswordForm,
  type ForgotPasswordFieldErrors,
  type ForgotPasswordFormValues,
} from '../utils/forgotPasswordValidation';
import { Button } from './Button';
import { InputField } from './InputField';
import './ForgotPasswordForm.css';

const INITIAL_VALUES: ForgotPasswordFormValues = {
  email: '',
};

export function ForgotPasswordForm() {
  const { loading, error, data, requestRecovery, reset } = usePasswordRecovery();
  const [values, setValues] = useState<ForgotPasswordFormValues>(INITIAL_VALUES);
  const [fieldErrors, setFieldErrors] = useState<ForgotPasswordFieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const successMessageId = useId();

  const emailRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const isSuccess = data !== null;

  useEffect(() => {
    if (isSuccess) {
      successRef.current?.focus();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      setFieldErrors({ email: getErrorMessage(error) });
      emailRef.current?.focus();
    }
  }, [error]);

  function clearFieldError() {
    setFieldErrors((current) => {
      const next = { ...current };
      delete next.email;
      return next;
    });
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setValues({ email: event.target.value });
    if (submitted) {
      clearFieldError();
    }
    if (error) {
      reset();
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const errors = validateForgotPasswordForm(values);
    setFieldErrors(errors);

    if (errors.email) {
      emailRef.current?.focus();
      return;
    }

    await requestRecovery({
      email: values.email.trim(),
    });
  }

  const successMessage =
    data?.message ||
    data?.description ||
    data?.title ||
    'We sent a password reset link to your email address.';

  return (
    <form
      className="forgot-password-form"
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={isSuccess ? successMessageId : undefined}
    >
      {isSuccess ? (
        <div
          ref={successRef}
          id={successMessageId}
          className="forgot-password-form__success"
          role="status"
          tabIndex={-1}
        >
          {successMessage}
        </div>
      ) : null}

      <InputField
        ref={emailRef}
        variant="auth"
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        value={values.email}
        onChange={handleEmailChange}
        error={fieldErrors.email}
        required
        disabled={loading || isSuccess}
      />

      <Button
        type="submit"
        variant="auth"
        fullWidth
        loading={loading}
        disabled={isSuccess}
        aria-label="Send me a link"
      >
        {loading ? 'Sending link…' : 'Send me a link'}
      </Button>
    </form>
  );
}

export default ForgotPasswordForm;
