import {addGetRoute, addPostRoute, createStore, store} from '../../os-store-replacer/createStore'
import {BASE, ENDPOINTS} from "../../../constants/routes";

createStore({
    // mutations: {
    //     wildMutate(state, items) {
    //         console.log(state, items)
    //     }
    // },
    // actions: {
    //   wildAct({commit}, payload) {
    //       console.log(commit, payload)
    //   }
    // },
    getters: {
        getMagicCallData(state) {
            return state.getMagicCallEntry.data;
        }
    }
});

addGetRoute({
    resourceName: 'magicCall',
    initialValue: [],
    endPoint: `${BASE}/${ENDPOINTS['commits']}`,
    serializer: (response) => {
        console.log('SERIALIZING');
        return {...response}
    },
    // customActions: ['wildAct'],
    // customMutations: ['wildMutate']
})
addPostRoute({
    resourceName: 'postMagik',
    initialValue: [],
    endPoint: `https://reqres.in/api/users`,
    serializer: (response) => {
        console.log('SERIALIZING');
        return {...response}
    },
    // customActions: ['wildAct'],
    // customMutations: ['wildMutate']
})

export default store;