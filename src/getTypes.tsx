/**
 * Summary: From a given object with action functions declared returns a new object with the type names of those actions.
 *
 * @param {{[key]:(state, payload)=> nextState}}   actions  An object with {key: value} format that define an action of an state
 *
 * @return {{[key]: type}                          types    An object with all the names of the types inside
 */

export default function getTypes(actions) {
  let o = {};
  for (let action in actions) {
    o = { ...o, [actions[action].name]: actions[action].name };
  }
  return o;
}
