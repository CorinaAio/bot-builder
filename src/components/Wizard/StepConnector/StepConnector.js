import { withStyles } from "@material-ui/core/styles";
import StepConnector from "@material-ui/core/StepConnector";
import StepConnectorStyles from "./styles";

const CustomStepConnector = withStyles(StepConnectorStyles)(StepConnector);

export default CustomStepConnector;
