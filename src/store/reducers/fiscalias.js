import {
  CREATE_FISCALIA,
  RETRIEVE_FISCALIAS,
  UPDATE_FISCALIA,
  DELETE_FISCALIA,
} from "../actions/types";
const initialState = [];
function fiscaliaReducer(fiscalias = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_FISCALIA:
      return [...fiscalias, payload];
    case RETRIEVE_FISCALIAS:
      return payload;
    case UPDATE_FISCALIA:
      return fiscalias.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            ...payload,
          };
        } else {
          return item;
        }
      });
    case DELETE_FISCALIA:
      return fiscalias.filter(({ id }) => id !== payload.id);

    default:
      return fiscalias;
  }
}
export default fiscaliaReducer;
