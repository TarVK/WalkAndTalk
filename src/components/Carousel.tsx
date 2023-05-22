import {Box, Button, MobileStepper, Paper, useTheme} from "@mui/material";
import {FC, ReactNode, useState} from "react";
import SwipeableViews from "react-swipeable-views";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {darkText} from "../theme";

export const Carousel: FC<{items: ReactNode[]}> = ({items}) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = items.length;

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <Box flexGrow={1} display="flex" flexDirection="column">
            <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                css={{flexGrow: 1}}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents>
                {items.map((step, index) => (
                    <div key={index}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                sx={{
                                    height: 255,
                                    display: "block",
                                    maxWidth: 400,
                                    overflow: "hidden",
                                    width: "100%",
                                }}>
                                {step}
                            </Box>
                        ) : null}
                    </div>
                ))}
            </SwipeableViews>
            <MobileStepper
                css={{
                    background: theme.palette.primary.light,
                    ".MuiMobileStepper-dotActive": {
                        background: theme.palette.primary.main,
                    },
                }}
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                        css={{color: darkText}}>
                        Next
                        {theme.direction === "rtl" ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        css={{color: darkText}}>
                        {theme.direction === "rtl" ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    );
};
