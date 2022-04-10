
import React from 'react';

import './CustomerForm.scss';

import InputText from '../base/InputText/InputText'
import Select from '../base/Select/Select';

const defaultCustomer = {
    id: 0,
    name: '',
    class: '',
    approver: '',
    team: ''
}

class CustomerForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            customer: defaultCustomer,
            customerNameError: false
        }

        this.sidebarForm = React.createRef(); 

        this.onCloseClick = this.onCloseClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        
        this.onNameChange = this.onNameChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    componentDidUpdate(prevState) {  
        if (this.props.customerFormVisible) {
            setTimeout(() => this.sidebarForm.current.classList.add("show"), 100);

            if (this.props.customerFormMetaData.status === 'initial') {
                this.props.customerLoadMetaData();
            }
        }

        if (prevState.customerFormData !== this.props.customerFormData) {
            if (typeof this.props.customerFormData !== "undefined") {
                this.setState({ 
                    customer: this.props.customerFormData,
                    customerNameError: false
                });
            } else {
                this.setState({
                    customer: defaultCustomer,
                    customerNameError: false
                }); 
            }
        }
    }

    onCloseClick() {
        this.sidebarForm.current.classList.remove("show");

        setTimeout(() => { 
            this.props.customerHideForm() 
            this.props.onClose();
        }, 200);
    }

    onSaveClick() {
        const { customer } = this.state;

        if (customer.name.length === 0) {
            this.setState({
                customerNameError: true
            });
        }
        else if (this.props.customerSaveItem) {
            this.props.customerSaveItem(customer);
            this.onCloseClick();
        }
    }

    onNameChange(e) {
        this.setState(prevState => ({
            customer: {
                ...prevState.customer,
                name: e.target.value
            },
            customerNameError: false
        }));        
    }

    onSelectChange(name, value) {
        this.setState(prevState => ({
            customer: {
                ...prevState.customer,
                [name]: value
            }
        }));
    }

    render() {
        const { customer, customerNameError } = this.state;
        const { customerFormVisible, customerFormMetaData } = this.props;

        if (!customerFormVisible)
            return null;

        return (
            <div className="customer-form">
                <div className="customer-form-wrap">
                    <div className="customer-form-wrap left" onClick={this.onCloseClick}></div>
                    <div className="customer-form-wrap right" ref={this.sidebarForm}>

                        <div className="form-title">
                            { customer.id ? "Edit Customer" : "Create a Customer" }
                            <div className="form-title-close" onClick={this.onCloseClick}></div>
                        </div>

                        <div className="form-content">
                            <div className="form-content-left">
                                <div className="form-content-item">
                                    <div className="form-content-item-label">Customer</div>
                                    <InputText 
                                        className={customerNameError ? "error" : ""}
                                        value={customer.name} 
                                        onChange={this.onNameChange} />
                                </div>
                                <div className="form-content-item">
                                    <div className="form-content-item-label">Class</div>
                                    <Select 
                                        name="class" 
                                        items={customerFormMetaData.classes} 
                                        selectedItem={customer.class}
                                        onChange={this.onSelectChange} />
                                </div>                                                            
                            </div>
                            <div className="form-content-right">
                                <div className="form-content-item">
                                    <div className="form-content-item-label">Approver</div>
                                    <Select 
                                        name="approver" 
                                        items={customerFormMetaData.approvers} 
                                        selectedItem={customer.approver}
                                        onChange={this.onSelectChange} />
                                </div>
                                <div className="form-content-item">
                                    <div className="form-content-item-label">Team</div>
                                    <Select 
                                        name="team" 
                                        items={customerFormMetaData.teams} 
                                        selectedItem={customer.team}
                                        onChange={this.onSelectChange} />
                                </div>                                                                
                            </div>
                        </div>
                        <div className="form-actions">
                            <button className="btn" onClick={this.onCloseClick}>Cancel</button>
                            <button className="btn btn-green" onClick={this.onSaveClick}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CustomerForm;
