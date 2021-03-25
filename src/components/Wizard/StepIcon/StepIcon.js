import React from "react";
import PropTypes from "prop-types";
import Check from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import StepIconStyles from "./styles";

export default function StepIcon(props) {
  const classes = makeStyles(StepIconStyles)();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

StepIcon.propTypes = {
  /* Whether this step is active */
  active: PropTypes.bool,
  /* Mark the step as completed. Is passed to child components */
  completed: PropTypes.bool,
};
