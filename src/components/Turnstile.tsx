import { useEffect, useRef } from 'react';

interface TurnstileOptions {
  sitekey: string;
  theme: 'dark';
  callback: (token: string) => void;
  'expired-callback': () => void;
  'error-callback': () => void;
}

interface TurnstileApi {
  render: (container: HTMLElement, options: TurnstileOptions) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);

  return new Promise((resolve, reject) => {
    let script = document.getElementById('cloudflare-turnstile') as HTMLScriptElement | null;
    const handleLoad = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error('Cloudflare Turnstile did not initialize.'));
    };

    if (!script) {
      script = document.createElement('script');
      script.id = 'cloudflare-turnstile';
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.addEventListener('load', handleLoad, { once: true });
      script.addEventListener('error', () => reject(new Error('Unable to load the security check.')), {
        once: true,
      });
      document.head.appendChild(script);
      return;
    }

    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener(
      'error',
      () => reject(new Error('Unable to load the security check.')),
      { once: true },
    );
  });
}

interface TurnstileProps {
  siteKey: string;
  resetKey: number;
  onToken: (token: string) => void;
  onError: (message: string) => void;
}

export default function Turnstile({ siteKey, resetKey, onToken, onError }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onTokenRef.current = onToken;
    onErrorRef.current = onError;
  }, [onToken, onError]);

  useEffect(() => {
    let cancelled = false;
    let api: TurnstileApi | undefined;

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) return;
        api = turnstile;
        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: 'dark',
          callback: (token) => onTokenRef.current(token),
          'expired-callback': () => onTokenRef.current(''),
          'error-callback': () => onErrorRef.current('The security check failed. Please try again.'),
        });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          onErrorRef.current(
            error instanceof Error ? error.message : 'Unable to load the security check.',
          );
        }
      });

    return () => {
      cancelled = true;
      if (api && widgetIdRef.current) {
        api.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  useEffect(() => {
    if (resetKey > 0 && window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetKey]);

  return <div ref={containerRef} aria-label="Security verification" />;
}
