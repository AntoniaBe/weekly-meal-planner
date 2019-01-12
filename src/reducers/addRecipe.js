import {
  ADD_RECIPE,
} from "../actions";


export default function recipeReducer(state = {
    recipe: '',
}, action) {
    switch (action.type) {

        case ADD_RECIPE:
            return {
                ...state,
                recipe: action.recipe
            };
        default:
            return state;
    }
}
