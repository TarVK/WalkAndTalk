import {FC} from "react";

export const OverflowText: FC<{children: string; rows?: number}> = ({
    children,
    rows = 2,
}) => (
    <div
        css={{
            overflow: "hidden",
            whiteSpace: "normal",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: rows,
        }}>
        {children}
    </div>
);
