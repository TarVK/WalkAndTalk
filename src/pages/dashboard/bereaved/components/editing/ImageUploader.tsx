import {FC, ChangeEvent, useState} from "react";
import {Box, Button, CircularProgress} from "@mui/material";
import {theme} from "../../../../../theme";

export const ImageUploader: FC<{
    onUploaded: (image: string) => void;
    text?: string;
    media?: string;
    onStart?: () => void;
}> = ({onUploaded, media, onStart, text}) => {
    const [loading, setLoading] = useState(false);
    const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        const file = event.target.files?.[0];
        if (!file) return;

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result;
            setLoading(false);
            if (result) onUploaded(result as string);
        };
        reader.onerror = () => setLoading(false);
    };

    return (
        <Box>
            <Box
                css={{
                    position: "relative",
                    input: {
                        position: "absolute",
                        zIndex: 1,
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        opacity: 0,
                    },
                }}
                onClick={onStart}>
                {!loading && (
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/png, image/jpeg"
                        onChange={onChange}
                    />
                )}
                <Button
                    css={{flexGrow: 1, width: "100%"}}
                    variant="contained"
                    color="primary"
                    disabled={loading}>
                    {text ?? "Select image "}
                    {loading && (
                        <Box marginLeft={2}>
                            <CircularProgress size={30} color="secondary" />
                        </Box>
                    )}
                </Button>
            </Box>
            {media && (
                <Box
                    css={{
                        maxHeight: 80,
                        overflow: "hidden",
                        marginTop: theme.spacing(2),
                        position: "relative",
                    }}>
                    <Box
                        css={{
                            position: "absolute",
                            left: -4,
                            top: 0,
                            right: -4,
                            bottom: 0,
                            zIndex: 1,
                            boxShadow: "inset #0000003b 0px 0px 7px 0px;",
                        }}
                    />
                    <img
                        src={media}
                        width={"100%"}
                        css={{
                            position: "relative",
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};
