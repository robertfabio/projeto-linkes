import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../input/input";
import { useState, type FormEvent } from "react";
import { auth } from "../../services/firebaseConnect";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Alert } from "../../assets/social/components/alerta";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [alertConfig, setAlertConfig] = useState<{
        message: string;
        type: 'success' | 'error' | null;
    }>({ message: '', type: null });
    const navigate = useNavigate();

    const showBanner = (message: string, type: 'success' | 'error' | null) => {
        setAlertConfig({ message, type });
        setShowAlert(true);
    };

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (email === "" || password === "") {
            showBanner("Preencha todos os campos!", null);
            return;
        }

        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            showBanner("Login realizado com sucesso!", "success");
            setEmail("");
            setPassword("");
            setTimeout(() => {
                navigate("/admin", { replace: true });
            }, 1500);
        })
        .catch(() => {
            showBanner("Erro ao fazer login. Verifique suas credenciais.", "error");
        })
        .finally(() => setLoading(false));
    }

    async function handleGoogleLogin() {
        setLoadingGoogle(true);
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
            showBanner("Login com Google realizado!", "success");
            setTimeout(() => {
                navigate("/admin", { replace: true });
            }, 1500);
        } catch (error) {
            showBanner("Erro ao fazer login com Google.", "error");
        } finally {
            setLoadingGoogle(false);
        }
    }

    return (
        <>
            {/* Banner de Alerta */}
            {showAlert && (
                <Alert
                    message={alertConfig.message}
                    type={alertConfig.type}
                    autoClose={true}
                    duration={3000}
                    onClose={() => setShowAlert(false)}
                />
            )}

            <div className="flex w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 to-slate-800 p-10 flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 -left-4 w-96 h-96 bg-white rounded-full blur-3xl" />
                        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-violet-300 rounded-full blur-3xl" />
                    </div>
                    
                    <Link to="/" className="relative z-10">
                        <h1 className="font-extrabold text-4xl text-white">↓Linkes</h1>
                    </Link>

                    <div className="relative z-10 space-y-4">
                        <h2 className="text-3xl font-bold text-white">Praticidade e organização</h2>
                        <p className="text-base text-gray-300 max-w-md">
                            Organize seus links de forma prática e eficiente.
                        </p>
                    </div>

                    <p className="relative z-10 text-gray-400 text-xs">© 2025 Linkes</p>
                </div>

                <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    <div className="w-full max-w-md">
                        <div className="space-y-6 sm:space-y-8">
                            <Link to="/" className="lg:hidden block text-center mb-4">
                                <h1 className="font-extrabold text-4xl sm:text-5xl">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-violet-500">
                                        ↓Linkes
                                    </span>
                                </h1>
                            </Link>

                            <div className="space-y-2 text-center lg:text-left">
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Bem-vindo de volta</h2>
                                <p className="text-sm text-gray-600">Entre na sua conta para continuar</p>
                            </div>

                            <button
                                onClick={handleGoogleLogin}
                                disabled={loadingGoogle}
                                className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-all font-semibold hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loadingGoogle ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Entrando...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                        </svg>
                                        Continuar com Google
                                    </>
                                )}
                            </button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-3 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-500">ou</span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="block text-sm font-semibold text-gray-900">Email</label>
                                <Input 
                                    placeholder="exemplo@email.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-semibold text-gray-900">Senha</label>
                                    <a href="#" className="text-xs text-slate-700 hover:text-slate-900 font-semibold">
                                        Esqueceu?
                                    </a>
                                </div>
                                <Input
                                    placeholder="Digite sua senha"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-slate-900 text-white py-3.5 rounded-lg hover:bg-slate-800 transition-all font-semibold hover:shadow-xl active:scale-[0.99] mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                disabled={loading || !email || !password}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Entrando...
                                    </>
                                ) : (
                                    'Entrar na conta'
                                )}
                            </button>

                                <p className="text-center text-sm text-gray-600 pt-2">
                                    Não tem uma conta?{' '}
                                    <Link to="/register" className="text-slate-900 hover:text-slate-700 font-bold underline">
                                        Criar conta
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}