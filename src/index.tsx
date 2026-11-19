import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost";
  loading?: boolean;
};

/** Accessible button primitive with a consistent disabled/loading contract. */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "solid", loading = false, disabled, className = "", children, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={`ui-button ui-button--${variant} ${className}`.trim()}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading ? <><span className="ui-button__spinner" aria-hidden="true" /> <span>Loading</span></> : children}
    </button>
  ),
);
Button.displayName = "Button";

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

/** Labeled input with linked hint/error text and accessible invalid state. */
export function TextField({ label, hint, error, id, ...props }: TextFieldProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const message = error ?? hint;
  return (
    <div className="ui-field">
      <label className="ui-field__label" htmlFor={inputId}>{label}</label>
      <input {...props} id={inputId} aria-invalid={Boolean(error)} aria-describedby={message ? messageId : undefined} />
      {message && <div id={messageId} className={error ? "ui-field__error" : "ui-field__hint"}>{message}</div>}
    </div>
  );
}

export type NoticeProps = React.PropsWithChildren<{ title?: string; tone?: "info" | "success" | "warning" | "error" }>;
export function Notice({ title, tone = "info", children }: NoticeProps) {
  return <section className={`ui-notice ui-notice--${tone}`} role={tone === "error" ? "alert" : "status"}>
    {title && <strong>{title}</strong>}<div>{children}</div>
  </section>;
}
