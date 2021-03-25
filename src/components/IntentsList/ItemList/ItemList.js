import React from "react";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";

import ItemListStyles from "./styles";

export default function ItemList(props) {
  const {
    title,
    items,
    handleToggleAll,
    handleToggle,
    numberOfChecked,
    checked,
  } = props;
  const classes = makeStyles(ItemListStyles)();

  const getTooltipContent = (item) => {
    const expressions = item.trainingData.expressions
      .slice(0, 3)
      .map((expression) => expression.text)
      .join('", "');
    return `${item.description}. For example, expresssions like: "${expressions}". The bot will answer with "${item.reply.text}"`;
  };

  return (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{ "aria-label": "all items selected" }}
            color="primary"
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((item) => {
          const labelId = `item-list-all-item-${item.name}-label`;

          return (
            <ListItem
              key={item.id}
              role="listitem"
              button
              onClick={handleToggle(item)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={
                    checked.findIndex((elem) => elem.id === item.id) !== -1
                  }
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                  color="primary"
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.name} />
              <Tooltip title={getTooltipContent(item)}>
                <InfoOutlinedIcon />
              </Tooltip>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );
}

ItemList.propTypes = {
  /* Displayed on top of the list */
  title: PropTypes.string,
  /* The items to be displayed in the list */
  items: PropTypes.array,
  /* Handler for select all */
  handleToggleAll: PropTypes.func,
  /* Handler for checkbox toggle */
  handleToggle: PropTypes.func,
  /* Function that calculates the number of selected items in one list */
  numberOfChecked: PropTypes.func,
  /* The selected items in the list. Use to determine the state of the checkbox */
  checked: PropTypes.array,
}