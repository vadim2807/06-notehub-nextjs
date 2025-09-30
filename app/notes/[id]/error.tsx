'use client';

import css from './error.module.css';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className={css.container}>
      <p>Could not fetch note details. {error.message}</p>
      <button className={css.button} onClick={reset}>
        Try again
      </button>
    </div>
  );
}
