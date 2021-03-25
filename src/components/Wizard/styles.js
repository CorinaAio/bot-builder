const WizardStyles = (theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    margin: '0 auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    maxWidth: 500
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
});

export default WizardStyles;
