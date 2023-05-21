import {FC, memo} from "react";

export const DateUI: FC<{timestamp: number}> = memo(({timestamp}) => {
    const data = new Date(timestamp);
    return <>{data.toLocaleDateString()}</>;
});
