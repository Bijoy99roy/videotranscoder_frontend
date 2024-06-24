import { useCallback, useEffect, useState } from "react";

interface Error {
    message: string[];
    statusCode: number;
  }

export function useAsync(func: any, dependencies: any = []) {
    const { loading, error, value, execute} = useAsyncInternal(func, dependencies, true)

    useEffect(() => {
        execute()
    }, [execute]);

    return { loading, error, value }
}

export function useAsyncFn(func: any, dependencies = []) {
    return useAsyncInternal(func, dependencies, false)
}

function useAsyncInternal(func: any, dependencies: any, initialLoading = false) {
    const [loading, setLoading] = useState(initialLoading)
    const [error, setError] = useState<Error | undefined>()
    const [value, setValue] = useState<any | undefined>()

    const execute = useCallback((...params: any[]) => {
        console.log("...")
        console.log(params)
        setLoading(true);
        return func(...params).then((data: any )=> {
            setValue(data);
            setError(undefined);
            return data;
        }).catch((error: Error) => {
            setValue(undefined);
            setError(error);
            return Promise.reject(error);
        }).finally(() => {
            setLoading(false);
        })
    }, dependencies)

    return { loading, error, value, execute}
}