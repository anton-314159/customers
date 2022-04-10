export const customerShowForm = (customer) => ({
    type: 'CUSTOMER_SHOW_FORM',
    payload: customer
});

export const customerHideForm = () => ({
    type: 'CUSTOMER_HIDE_FORM',
    payload: false
});

export const customerLoadData = () => {
    return dispatch => {
        return fetch("/customers/data/customers.json")
            .then(response => response.json())
            .then(json => dispatch({ 
                type: "CUSTOMER_DATA_LOADED", 
                payload: json
            }))
    }
}

export const customerLoadMetaData = () => {
    return dispatch => {
        return Promise.all([
            fetch("/customers/data/customers-approvers.json"),
            fetch("/customers/data/customers-classes.json"),
            fetch("/customers/data/customers-teams.json")
        ]).then(async([r1,r2,r3]) => {
            const approvers = await r1.json();
            const classes = await r2.json();
            const teams = await r3.json();

            dispatch({ 
                type: "CUSTOMER_METADATA_LOADED", 
                payload: [true, approvers, classes, teams]
            });

        }).catch((e) => {
            console.log("customerLoadMetaData error: ", e);

            dispatch({ 
                type: "CUSTOMER_METADATA_LOADED", 
                payload: [false, [], [], []]
            });            
        })
    }
}

export const customerSaveItem = (item) => ({
    type: 'CUSTOMER_SAVE_ITEM',
    payload: item
});

export const customerDeleteItems = (items) => ({
    type: 'CUSTOMER_DELETE_ITEMS',
    payload: items
});