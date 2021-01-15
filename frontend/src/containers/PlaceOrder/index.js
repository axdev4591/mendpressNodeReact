import Header from '../../components/Header/Header';
import './style.css';
import NormalInput from '../../components/UI/NormalInput'
import AddressForm from './AddressForm';
import CartPrice from '../../components/CartPrice';
import DeliveryAddress from './DeliveryAddress';
import RadioButton from '../../components/UI/RadioButton';
import { base_url } from '../../constants/index';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const PlaceOrder = (props) => {

    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const [addresses, setAddresses] = useState([])
    const [address, setAddress] = useState({fullName: "",
                            mobileNumber: "",
                            pinCode: "",
                            locality: "",
                            address: "",
                            cityDistrictTown: "",
                            state: "",
                            landmark: "",
                            alternatePhoneNumber: ""})
    const [order, setOrder] = useState([])
    const [selectedAddress, setSelectedAddress] = useState('')
    const [existingAddress, setExistingAddress] = useState(false)
    const [newAddress, setNewAddress] = useState(false)
    const [isAddressConfirm, setIsAddressConfirm] = useState(false)
    const [isOrderConfirm, setIsOrderConfirm] = useState(false)
    const [selectedPaymentType, setSelectedPaymentType] = useState('COD')
    const [paymentTypes, setPaymentTypes] = useState([
        {id: 1, value: 'card', label: 'Credit Card / Debit Card / ATM Card', isActive: false},
        {id: 2, value: 'netBanking', label: 'Net Banking', isActive: false},
        {id: 3, value: 'paypal', label: 'Paypal', isActive: false},
        {id: 4, value: 'cod', label: 'Cash après livraison', isActive: true},
    ])



    const getAddresses = () => {
        fetch(`${base_url}/user/get-addresses/`+userInfo._id, {
            headers: {
                'auth-token': userInfo.token
            }
        })
        .then(response => {
            if(response.status == 200){
                return response.json();
            }else{
                throw new Error('Something went wrong');
            }
        })
        .then(jsonResponse => {
            console.log(jsonResponse)
            setAddresses(jsonResponse.message.address)
        })
        .catch(error => {
            console.log(error);
        });
    }

    const inputHandler = (e) => {
        const updatedAddress = {
            ...address,
            [e.target.name] :  e.target.value
        }

        setAddress(updatedAddress)
    }

    const  addressSelector = (e) => {
        setSelectedAddress(e.target.value)
        setExistingAddress(true)
        setNewAddress(false)
    }

    const newAddressSelection = (e) => {
        setSelectedAddress('newAddressId')
        setExistingAddress(false)
        setNewAddress(true)
    }

    const addressSubmitHandler = (e) => {
        e.preventDefault()
        console.log(address)

        const address = {
            userId: userInfo._id,
            address: address
        }

       fetch(`${base_url}/user/new-address`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': userInfo.token
            },
            method: 'POST',
            body: JSON.stringify(address)
       })
       .then(response => response.json())
       .then(jsonResponse => {
           console.log('new address');
           console.log(jsonResponse);
           console.log('new address');
          
           const updatedAddressList = jsonResponse.message.address

            setIsAddressConfirm(true)
            setAddress({
                ...this.state.address,
                ...address.address
            })
            setAddresses(updatedAddressList)
            setSelectedAddress(updatedAddressList[updatedAddressList.length - 1]._id)
           
       })
       .catch(error => {
           console.log(error);
       })
    }

    const confirmDeliveryAddress = () => {
        setIsAddressConfirm(true)
    }

    const  confirmOrder = () => {
        setIsOrderConfirm(true)
    }

    const selectPaymentOption = (e) => {
        setSelectedPaymentType(e.target.value)
    }

    const submitOrder = async () => {

        if(!isOrderConfirm){
            return
        }

        if(selectedPaymentType !== 'COD'){
            return;
        }
        
        const order = props.cart.cartItem.map(item => {
            return {
                product: item.product,
                price: item.price,
                quantity: item.quantity
            }
        });

        try{

            const response = await fetch(`${base_url}/order/create`,{
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': userInfo.token
                },
                body: JSON.stringify({
                    user: userInfo._id,
                    address: selectedAddress,
                    order: order,
                    paymentType: 'COD',
                    paymentStatus: 'pending'
                }),
                method: 'POST'
            });

            const jsonResponse = await response.json();
            if(response.status === 201){
                 props.clearCart()
                 props.history.push({
                    pathname: '/thank-you',
                    search: '?orderid='+jsonResponse.message._id,
                    state: jsonResponse.message
                });
            }

        }catch(error){
            console.log(error);
        }
        
    }

        let getaddress;
        if(isAddressConfirm && !newAddress){
            getaddress = addresses.find(address => address._id === selectedAddress);
        }else{
            getaddress = this.state.address;
        }

        return (
            <React.Fragment>
                <Header />
                <div className="Content">
                    <div className="PlaceOrderWrapper">

                        
                        <div className="DeliveryAddress">

                            <div className="Card">
                                <p className="CardText">Login {userInfo ? <i className="fas fa-check"></i> : null}</p>
                                <p className="CardText">Email: {userInfo.email}</p>
                            </div>

                            {
                                isAddressConfirm ? 
                                 <div className="Card">
                                     <p className="CardText">Adresse de livraison {isAddressConfirm ? <i className="fas fa-check"></i> : null}</p>
                                     <p>
                                        <span>{`${getaddress.fullName} - ${getaddress.mobileNumber} - `}</span>
                                        <span>{ `${getaddress.address}, ${getaddress.cityDistrictTown}, ${getaddress.state} - ${getaddress.pinCode}`}</span>
                                        </p>
                                 </div> :
                                 <React.Fragment>
                                <div className="Card">
                                    <h4>Adresse de livraison</h4>
                                    {
                                        addresses.length && addresses.map(address => 
                                            <DeliveryAddress 
                                                key={address._id} 
                                                onAddressSelection={addressSelector} 
                                                value={selectedAddress}
                                                address={getaddress} />
                                        )
                                    }
                                    {
                                        existingAddress ?
                                        <div className="DeliveryButtonContainer" >
                                            <button onClick={confirmDeliveryAddress} className="DeliveryAddressButton">Livrer ici</button>
                                        </div> : null
                                    }
                                    
                                </div>
                                <div className="Card">
                                    <div>
                                        <RadioButton 
                                            name="address"
                                            label="Add new Address"
                                            value={selectedAddress}
                                            onChange={newAddressSelection}
                                        />
                                    </div>
                                    {
                                        newAddress ? 
                                            <AddressForm
                                                address={address}
                                                inputHandler={inputHandler}
                                                addressSubmitHandler={addressSubmitHandler}
                                            /> : null
                                    }
                                    
                                    
                                </div>
                                </React.Fragment>
                            }
                            
                               

                                {
                                    isOrderConfirm ? 
                                    <div className="Card">
                                        <p className="CardText">Résumé de la commande<i className="fas fa-check"></i> </p>
                                    </div> : 
                                     isAddressConfirm ? 
                                    <div className="Card">
                                        <h4 className="CardText">Résumé de la commande</h4>
                                        {
                                             props.cart.cartItem.map(item => (
                                                <div key={item.product} style={{display: 'flex', margin: '5px 0', alignItems: 'center'}}>
                                                    <div style={{width: '60px', height: '60px', overflow: 'hidden', position: 'relative'}}>
                                                        <img style={{maxWidth: '100%', maxHeight: '100%', position: 'absolute', left: '50%', transform: 'translateX(-50%)'}} src={item.imageUrl} alt="" />
                                                    </div>
                                                    <div>
                                                        <h5>{item.name}</h5>
                                                        <h6>Quantity : {item.quantity}</h6>
                                                        <h6>${item.total}</h6>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <button onClick={confirmOrder} className="ContinueButton">Continue</button>
                                    </div>
                                 : null
                                }
                                
                                {
                                    this.state.isOrderConfirm ? 
                                    <div className="Card">
                                    <h4 className="CardText">Option de paiement</h4>
                                    <ul>
                                        {
                                            paymentTypes.map(payment => 
                                            <li className="paymentType" key={payment.id}>
                                                <RadioButton
                                                    key={payment.id} 
                                                    name="paymentType"
                                                    label={payment.label}
                                                    value={payment.value}
                                                    onChange={selectPaymentOption}
                                                />
                                            </li>)
                                        }
                                    </ul>
                                    {
                                        selectedPaymentType !== 'cod' ? 
                                        <p className="ErrorMessage">Désolé, seul le paiment en espèce à la livraison est disponible</p> : null
                                    }
                                    <button className="PaymentConfirm" onClick={submitOrder}>Confirmer la commande</button>

                                </div> : null
                                }
                              
                        
                            </div>

                    <CartPrice />
                            
                    </div>

      
                </div>
                
            </React.Fragment>
        );
    }

export default PlaceOrder