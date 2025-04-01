import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type AsyncCallback = (...args: unknown[]) => Promise<unknown>;

export class UseAsyncHandler {
  data: any = null;
  loading: boolean = false;
  error: any = null;
  fetch: AsyncCallback = async () => {};
}

export const INITIAL_ASYNC_HANDLER = new UseAsyncHandler();

export function useAsync<F extends AsyncCallback>(cb: F) {
  const [error, setError] = useState<null | Error | unknown>(null);
  const [loading, setLoading] = useState(false);
  const promises = useRef<Promise<unknown>[]>([]);
  const [data, setData] = useState<Awaited<ReturnType<F>> | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (promises.current.length) {
          const res = (await Promise.all(promises.current)).pop();
          if (res) {
            setData(res as Awaited<ReturnType<F>>);
            promises.current = [];
          }
        }
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    })();
  }, [promises.current.length]);

  const fetch = useCallback(
    (...params: Parameters<F>) => {
      setLoading(true);
      const promise = cb(...params);
      promises.current.push(promise);
      return promise as ReturnType<F>;
    },
    [cb]
  );

  const reset = useCallback(() => {
    promises.current = [];
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return useMemo(
    () => ({ data, error, loading, fetch, reset }),
    [data, error, loading, fetch, reset]
  );
}

export function useAsyncOnMount<F extends AsyncCallback>(cb: F) {
  const handler = useAsync(cb);
  useEffect(() => {
    handler.fetch(...([] as unknown as Parameters<F>));
  }, []);
  return handler;
}

export function useAsyncOnChange<F extends AsyncCallback>(
  cb: F,
  params: Parameters<F>
) {
  const [cached, setCached] = useState<Parameters<F> | null>(null);
  const handler = useAsync(cb);
  const { fetch } = handler;

  useEffect(() => {
    if (!params) return;
    setCached((current) => {
      if (JSON.stringify(current) !== JSON.stringify(params)) {
        fetch(...params);
        return params;
      }
      return current;
    });
  }, [params]);

  const refetch = useCallback(
    () => fetch(...(cached || ([] as unknown as Parameters<F>))),
    [cached, fetch]
  );
  return { ...handler, cache: cached, refetch };
}

export function useAsyncCatcher<F extends AsyncCallback>(
  cb: F,
  handle: (e: unknown) => void
) {
  const handler = useAsync(cb);
  useEffect(() => {
    if (handler.error) handle(handler.error);
  }, [handler.error]);
  return handler;
}

export function useAsyncCatcherOnMount<F extends AsyncCallback>(
  cb: F,
  handle: (e: unknown) => void
) {
  const handler = useAsyncOnMount(cb);
  useEffect(() => {
    if (handler.error) handle(handler.error);
  }, [handler.error]);
  return handler;
}

export function useAsyncInterval<F extends AsyncCallback>(cb: F, ms: number) {
  const interval = useRef<NodeJS.Timeout | null>(null);
  const handler = useAsync(cb);

  const init = useCallback(() => {
    if (interval.current) clearInterval(interval.current);
    if (ms)
      interval.current = setInterval(() => {
        handler.fetch(...([] as unknown as Parameters<F>));
      }, ms);
    else interval.current = null;
  }, [ms, cb]);

  useEffect(() => {
    init();
  }, []);

  const fetch = useCallback<(...args: Parameters<F>) => ReturnType<F>>(
    (...params: Parameters<F>) => {
      init();
      return handler.fetch(...params);
    },
    [init, handler.fetch]
  );

  useEffect(() => {
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, []);

  return { ...handler, fetch };
}
