interface FormErrorBannerProps {
  message: string;
}

const FormErrorBanner = ({ message }: FormErrorBannerProps) => (
  <div
    role="alert"
    aria-live="polite"
    className="mb-4 rounded-lg border border-color-45/40 bg-color-45/10 px-4 py-3 text-sm text-color-45"
  >
    {message}
  </div>
);

export default FormErrorBanner;
