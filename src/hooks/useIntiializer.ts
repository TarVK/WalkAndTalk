import {useRef} from "react";

/**
 * Works just like useMemo, but ensures initialization is called once
 * @param init The initializer
 * @returns The value
 */
export function useInitializer<T>(init: () => T): T {
    const ref = useRef<{value: T} | undefined>();
    if (!ref.current) ref.current = {value: init()};
    return ref.current.value;
}
