import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IntentsService from "../../services/IntentsServices";
import ItemList from "./ItemList/ItemList";
import PropTypes from "prop-types";

import IntentsListStyles from "./styles";

function not(a, b) {
  return a.filter((value) => b.map((elem) => elem.id).indexOf(value.id) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.map((elem) => elem.id).indexOf(value.id) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function IntentsList(props) {
  const classes = makeStyles(IntentsListStyles)();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(props.state.left || []);
  const [right, setRight] = React.useState(props.state.right || []);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const intentsService = new IntentsService();

  useEffect(() => {
    //retrieve data from API in case no navigation between steps happened
    //on navigating to the next step the component is unmounted
    if (!props.state.left && !props.state.right) {
      intentsService.getIntents().then((response) => {
        setLeft(response);
      });
    }
  }, []);

  //everytime the user moves items from one list to another, the state of the step in preserved in the parent component
  //that state will be sent as props when navigating back
  useEffect(() => {
    props.setComponentState(props.index, { left, right });
  }, [left, right]);

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggle = (value) => () => {
    const currentIndex = checked.findIndex((elem) => elem.id === value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <ItemList
          title="What you can choose"
          items={left}
          handleToggleAll={handleToggleAll}
          handleToggle={handleToggle}
          numberOfChecked={numberOfChecked}
          checked={checked}
        />
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <ItemList
          title="What your bot will use"
          items={right}
          handleToggleAll={handleToggleAll}
          handleToggle={handleToggle}
          numberOfChecked={numberOfChecked}
          checked={checked}
        />
      </Grid>
    </Grid>
  );
}

IntentsList.propTypes = {
    /* Index of the step the component is rendered in */
    index: PropTypes.number,
    /* the state previously saved while navigating in the wizard */
    state: PropTypes.shape({
        /* items displayed in the left list */
        left: PropTypes.string,
        /* items displayed in the right list */
        right: PropTypes.string,
    }),
};
