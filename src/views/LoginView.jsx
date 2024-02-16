import { useState } from "react"
import { Layouts } from "../layouts"
import { Components } from "../components";
import { Services } from "../services";
import { Utils } from "../utils";
import { useNavigate } from 'react-router-dom';
import logoLight from '../assets/images/logo-light.png';
import logo from '../assets/images/logo.png';

export function LoginView() {
    const abortController = new AbortController();

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [errorMessages, setErrorMessages] = useState('');


    const handleLoginSubmit = async e => {
        e.preventDefault()
        setIsDisabled(true);

        try {
            const payload = {
                email,password
            }

            const {admin, tk} = await Services.AuthService.login(
                JSON.stringify(payload),
                abortController.signal
                )

            Utils.Auth.setSessionToken(tk);
            Utils.Auth.setUser(admin);

            navigate('/', {replace: true});
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;
            setErrorMessages(messages);
        } finally {
            setIsDisabled(false);
        }
    }

    return (
        <Layouts.AuthLayout>
            <div className="col-lg-5 mx-auto">
                <div className="card">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center py-2">
                                <a href="index.html" className="logo">
                                    <img src={logo} height="100" alt="logo"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-4">
                        <div className="p-2">
                            <h5 className="mb-5 text-center">
                                Bienvenue à l&apos;epace d&apos;
                                administration {import.meta.env.VITE_APP_NAME}
                            </h5>
                            <Components.ErrorMessages>
                                {errorMessages}
                            </Components.ErrorMessages>
                            <div className="row">
                                <form className="col-md-12" onSubmit={handleLoginSubmit}>
                                    <div className="form-group mb-4">
                                        <label htmlFor="email">Email</label>
                                        <input disabled={isDisabled} type="email" className="form-control" 
                                        id="email" placeholder="Votre email" value={email} 
                                        onChange={e => setEmail(e.target.value)}/>
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="password">Mot de passe</label>
                                        <input disabled={isDisabled} type="password" className="form-control" 
                                        id="password" placeholder="Votre Mot de passe" value={password}
                                        onChange={e => setPassword(e.target.value)}/>
                                    </div>
                                    <div className="mt-4">
                                        <button className="btn btn-success btn-block waves-effect 
                                        waves-light" type="submit" onClick={handleLoginSubmit}>
                                            {isDisabled ? "Chargement..." :  "Connexion"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layouts.AuthLayout>
    )
}