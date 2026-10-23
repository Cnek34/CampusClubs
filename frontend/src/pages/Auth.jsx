import { Link, useLocation, useNavigate  } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "@utils/router-path";
import { registration, login } from "@services/api/api";
import { useState } from "react";
import { useUser } from '@services/context/UserContext'

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const { loginUser } = useUser();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')

    const click = async e => {
        e.preventDefault();
        try {
            if (isLogin) {
                await login(email, password);
                loginUser(email);
                navigate('/');
            } else { 
                await registration(email, password, fullName, phone);
                navigate(LOGIN_ROUTE);
            }
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <div className="flex h-screen items-center justify-center p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <form className="card-body">
                    <h2 className="card-title text-2xl font-bold text-center justify-center">{isLogin ? 'Авторизоваться' : 'Создать аккаунт'}</h2>
                    
                    {!isLogin &&
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Полное имя</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Иванов Иван Ивановаич" 
                                className="input input-bordered w-full mt-1"
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                            />
                        </div>
                    }

                    {!isLogin &&
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Телефон</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="+7 (000) 000-00-00" 
                                className="input input-bordered w-full mt-1" 
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                        </div>
                    }

                    <div className="form-control w-full">
                        <label className="label">
                        <span className="label-text font-semibold">Электронная почта</span>
                            </label>
                        <input 
                            type="email" 
                            placeholder="you@example.com" 
                            className="input input-bordered w-full mt-1" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Пароль</span>
                        </label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            className="input input-bordered w-full mt-1"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <label className="label">
                            <span className="label-text-alt text-base-content/60">Минимум 8 символов</span>
                        </label>
                    </div>

                    <div className="form-control mt-6 mx-auto">
                        <button className="btn btn-primary" onClick={click}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
                    </div>

                    <div className="text-center mt-4">
                        <span className="text-sm text-base-content/70">{isLogin ? 'Нет аккаунт? ' : 'Уже есть аккаунт? '}</span>
                        {isLogin ? (
                            <Link to={REGISTRATION_ROUTE} className="link link-primary text-sm">Зарегистрироваться</Link>
                        ) : (
                            <Link to={LOGIN_ROUTE} className="link link-primary text-sm">Войти</Link>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Auth;