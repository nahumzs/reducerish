/**
 * Summary: Prints the current processing action via the dev console, with it's previous state and the next state after passing inside the reducer.
 *
 * @param {{[key]:(state, payload)=> nextState}}   actions  An object with {key: value} format that define an action of an state
 *
 * @return {{[key]: type}                          types    An object with all the names of the types inside
 */

export default function logger(
  prevState,
  nextState,
  action,
  isFromInterceptor = false
) {
  console.groupCollapsed(
    `${isFromInterceptor ? "⇢" : ""} action: ${
      action.type
    } @ ${new Date().toLocaleTimeString()}`
  );

  // we don't want to showcase payload if it's undefined
  if (typeof action.payload === "undefined") delete action.payload;

  console.log(`%c∙ prev state`, styles.prev, prevState);
  console.log(`%c∙ action`, styles.action, action);
  console.log(`%c✦ next state`, styles.next, nextState);
  console.log(
    `%c∙ finished @ ${new Date().toLocaleTimeString()}`,
    styles.finished
  );
  console.groupEnd();

  return nextState;
}

const styles = {
  prev: `color: #F312A7;`,
  action: `color: #A5DE5D;`,
  next: `color: #25D8FF; font-weight:bold;`,
  finished: `color: #BEBEBE;`,
};
