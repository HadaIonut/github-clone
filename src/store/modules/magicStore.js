import {addRoute, createStore, store} from '../../os-store-replacer/createStore'
import {BASE, ENDPOINTS} from "../../../constants/routes";

createStore({
    mutations: {
        wildMutate(state, items) {
            console.log(state, items)
        }
    },
    actions: {
      wildAct({commit}, payload) {
          console.log(commit, payload)
      }
    }
});

addRoute({
    resourceName: 'magicCall',
    initialValue: [],
    endPoint: `${BASE}/${ENDPOINTS['commits']}`,
    serializer: (response) => {
        console.log('SERIALIZING');
        return {...response}
    },
    customActions: ['wildAct'],
    customMutations: ['wildMutate']
})

export default store;