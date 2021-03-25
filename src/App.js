import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import ChooseIntents from "./components/ChooseIntents/ChooseIntents";
import Wizard from "./components/Wizard/Wizard";

const steps = [
  {
    label: "Set up intents",
    renderFn: (props) => <ChooseIntents {...props} />,
    description: "Your bot will answer to messages from these categories. You can hover the info icon to see more details about the category and some examples of expressions the bot replies to. In addition to that, you can see the reply your bot will give. ",
  },
  {
    label: "Customise it",
    description: "You can customise your bot however you want. Choose an icon, choose some colours.",
  },
  {
    label: "Review & preview",
    description: "Give your new bot a go and see it in action",
  },
];

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <div className="App">
        <Wizard steps={steps} />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
