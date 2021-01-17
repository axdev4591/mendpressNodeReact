import './style.css';
import Logo from './MEND.png';
import MobileTypeInput from '../../components/UI/MobileTypeInput'
import SubmitGradientButton from '../../components/UI/SubmitGradientButton'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../../store/actions/userActions'
import Error from '../../components/Error';

const Signup = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError]  = useState(false)
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
 
  //const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  const dispatch = useDispatch();

 

  useEffect(() => {
    if (userInfo) {
      props.history.push('/login');
    }
    console.log("user data: "+JSON.stringify(userInfo))
    console.log("error: "+JSON.stringify(error))
    return () => {
      //
    };
  }, [userInfo])
  

   const signupHandler = (e) => {
        e.preventDefault()

        if(firstName === ''){
            setIsError(true)
            setErrorMessage('Enter First Name')
            return
        }
        if(lastName === ''){
            setIsError(true)
            setErrorMessage('Enter Last Name')
            return
        }

        const emailPattern = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
        if(!emailPattern.test(email)){
            setIsError(true)
            setErrorMessage('Invalid Email Address')
            return
        }

        if(email === ''){
            setIsError(true)
            setErrorMessage('Enter email')
            return
        }
        if(password === ''){
            setIsError(true)
            setErrorMessage('Enter password')
            return
        }
        if(repassword === ''){
            setIsError(true)
            setErrorMessage('Confirm password')
            return
        }
        if(password !== repassword){
            setIsError(true)
            setErrorMessage('Password dosent match')
            return
        }
        dispatch(register(firstName, lastName, email, password))
        
        if(!error){
            props.history.push('/login');
        }
    }

  return (
    <div className="LoginContainer" style={{marginBottom: "33px"}}>
        <div className="WelcomeText">
            <h3>Créer un compte</h3>
        </div>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        <img src={Logo} alt="logo" height="80" width="300"/> 
        <div className="LoginWrapper">
            <form onSubmit={signupHandler} autoComplete="off">

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{width: '49%'}}>
                        <MobileTypeInput 
                            type="text"
                            placeholder="Nom"
                            value={firstName}
                            textChange={(e) => setFirstName(e.target.value)}
                            name="firstName"
                        />
                    </div>
                    <div style={{width: '49%'}}>
                        <MobileTypeInput 
                            type="text"
                            placeholder="Prenom"
                            value={lastName}
                            textChange={(e) => setLastName(e.target.value)}
                            name="lastName"
                        />
                    </div>
                </div>
                
                
                <MobileTypeInput 
                    type="text"
                    placeholder="Email"
                    value={email}
                    textChange={(e) => setEmail(e.target.value)}
                    name="email"
                />
                <MobileTypeInput 
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    textChange={(e) => setPassword(e.target.value)}
                    name="password"
                />
                <MobileTypeInput 
                    type="password"
                    placeholder="Confirmation de mot de passe"
                    value={repassword}
                    textChange={(e) => setRepassword(e.target.value)}
                    name="repassword"
                />
                
                <Error>
                    {errorMessage}
                </Error>

                <SubmitGradientButton 
                    label="S'inscrire"
                    style={{marginTop: '30px'}}
                />
            </form>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Link to="/login">Se connecter</Link>
            <Link to="/forget-password">Mot de passe oublié ?</Link>
        </div>
        
        
    </div>
)

}


export default Signup

