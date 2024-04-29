type ErrorMessageProps = { errorMessage?: string; id: string };

export default function ErrorMessageComponent({
  errorMessage,
}: ErrorMessageProps) {
  return <>{errorMessage && <p>{errorMessage}</p>}</>;
}
