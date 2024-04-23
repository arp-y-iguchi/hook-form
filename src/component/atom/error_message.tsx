type ErrorMessageProps = { errorMessage?: string };

export default function ErrorMessageComponent({
  errorMessage,
}: ErrorMessageProps) {
  return <>{errorMessage && <p>{errorMessage}</p>}</>;
}
