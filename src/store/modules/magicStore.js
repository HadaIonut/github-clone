import {addRoute, createStore, store} from '../../os-store-replacer/createStore'
import {BASE, ENDPOINTS} from "../../../constants/routes";

createStore();
addRoute({
    resourceName: 'magicCall',
    initialValue: [],
    endPoint: `${BASE}/${ENDPOINTS['commits']}`,
    serializer: (response) => {
        console.log('SERIALIZING');
        return {...response}
    }
})

export default store;