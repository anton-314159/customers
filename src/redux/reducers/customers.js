const initialState = {
    customerFormVisible: false,
    customerFormData: undefined,
    data: [],
    metaData: {
        status: 'initial',
        approvers: [],
        classes: [],
        teams: []
    }
};

const customerReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CUSTOMER_SHOW_FORM':
            return {
                ...state,
                customerFormVisible: true,
                customerFormData: action.payload
            };

        case 'CUSTOMER_HIDE_FORM':
            return {
                ...state,
                customerFormVisible: false
            };            

        case 'CUSTOMER_DATA_LOADED':
            return {
                ...state,
                data: action.payload
            };

        case 'CUSTOMER_METADATA_LOADED':

            const [loaded, approvers, classes, teams] = action.payload;

            return {
                ...state,
                metaData: {
                    status: loaded ? 'succeed' : 'failed',
                    approvers: [...approvers],
                    classes: [...classes],
                    teams: [...teams]
                }
            }

        case 'CUSTOMER_SAVE_ITEM':

            let data = [...state.data];

            if (action.payload.id === 0) {
                // simulate autoincrement feature od DB engine
                let maxId = Math.max.apply(Math, data.map(c => c.id));
                
                data.push({
                    ...action.payload,
                    id: maxId + 1
                });
            } else {
                data = data.map(obj => [action.payload].find(o => o.id === obj.id) || obj);
            }

            return {
                ...state,
                data: [...data]
            };
        
        case 'CUSTOMER_DELETE_ITEMS':

            let tmp = [...state.data];

            let removeItems = Array.isArray(action.payload) ? action.payload : [action.payload];

            removeItems.forEach(item => {
                tmp = tmp.filter(t => t.id !== item.id);
            });

            return {
                ...state,
                data: [...tmp]
            };
        
        default:
            return state;
    }
};

export default customerReducer;