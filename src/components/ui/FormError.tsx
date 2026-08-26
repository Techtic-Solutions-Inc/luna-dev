interface FormErrorProps {
  message: string | null;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) {
    return null;
  }
  return (
    <p className="type-body-69 w-full font-almarai text-[#ff5630]" role="alert">
      {message}
    </p>
  );
}
