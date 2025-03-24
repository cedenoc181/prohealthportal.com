const initialOrderedItemsState = {
  data: [],
  notReceived: [],
  loading: false,
  error: null,
};

const orderedItemsReducer = (state = initialOrderedItemsState, action) => {
  switch (action.type) {
    case "FETCH_ORDERED_ITEMS_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case "FETCH_ORDERED_ITEMS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload || "Failed to fetch ordered items",
      };
    case "FETCH_ORDERED_GROUPED_ITEMS_SUCCESS":
      return {
        ...state,
        notReceived: action.payload,
        loading: false,
      };
    case "FETCH_ORDERED_GROUPED_ITEMS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload || "Failed to fetch grouped ordered items",
      };
      case "FETCH_ALL_ORDERED_GROUPED_ITEMS_SUCCESS":
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      case "FETCH_ALL_ORDERED_GROUPED_ITEMS_ERROR":
        return {
          ...state,
          loading: false,
          error: action.payload || "Failed to fetch all grouped ordered items",
        };
    case "CREATE_ORDERED_ITEMS_SUCCESS":
      return {
        ...state,
        data: [...state.data, action.payload],
        loading: false,
      };
    case "CREATE_ORDERED_ITEMS_ERROR":
      return {
        ...state,
        error: action.payload || "Failed to create ordered item",
        loading: false,
      };
    case "UPDATE_ORDERED_ITEMS_SUCCESS":
      return {
        ...state,
        data: state.data.map((orderedItems) =>
          orderedItems.id === action.payload.id ? action.payload : orderedItems
        ),
        loading: false,
      };
    case "UPDATE_ORDERED_ITEMS_ERROR":
      return {
        ...state,
        error: action.payload || "Failed to update ordered item",
        loading: false,
      };
    case "DELETE_ORDERED_ITEMS_SUCCESS":
      return {
        ...state,
        data: state.data.filter(
          (orderedItems) => orderedItems.id !== action.payload
        ),
        loading: false,
      };
    case "DELETE_ORDERED_ITEMS_ERROR":
      return {
        ...state,
        error: action.payload || "Failed to delete ordered item",
        loading: false,
      };
    default:
      return state;
  }
};
export default orderedItemsReducer;
