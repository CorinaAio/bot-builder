import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StepConnector from "./StepConnector/StepConnector";
import StepIcon from "./StepIcon/StepIcon";

import WizardStyles from "./styles";

const useStyles = makeStyles(WizardStyles);

const getInitialStepsState = (stepsLength) => {
  const newStepsState = [];
  for (let i = 0; i < stepsLength; i += 1) {
    newStepsState.push({});
  }

  return newStepsState;
};

export default function Wizard({ steps }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [stepState, setStepState] = useState(
    getInitialStepsState(steps.length)
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //callback function passed to child components in order to retrieve the state in a particular step
  const setComponentState = (index, state) => {
    const newState = [...stepState];
    newState[index] = state;

    setStepState(newState);
  };

  //render the component receive from parent with additional props
  //send the state saved while navigating in the wizard
  //send a callback to set the state when internal step state changes
  const renderComponentWithProps = (renderFn) =>
    renderFn({
      index: activeStep,
      setComponentState,
      state: stepState[activeStep],
    });

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<StepConnector />}
      >
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={StepIcon}>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <>
            <Typography
              className={classes.instructions}
              variant="body2"
              align="center"
            >
              All steps completed - you are finished
            </Typography>
            <div className={classes.buttonWrapper}>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          </>
        ) : (
          <div>
            <Typography
              className={classes.instructions}
              variant="body2"
              align="center"
            >
              {steps[activeStep].description}
            </Typography>
            <div className={classes.buttonWrapper}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
                size="small"
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
            {steps[activeStep].renderFn
              ? renderComponentWithProps(steps[activeStep].renderFn)
              : ""}
          </div>
        )}
      </div>
    </div>
  );
}

Wizard.propTypes = {
    /* steps to render in the wizard */
    steps: PropTypes.arrayOf(PropTypes.shape({
        /* what is displayed in the stepper component */
        label: PropTypes.string,
        /* More details for the user to understand what is the purpose of the step */
        description: PropTypes.string,
        /* the component to be rendered for a specific step */
        renderFn: PropTypes.func
    })),
};
