import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../input/input";
import { useState, type FormEvent } from "react";
import { auth } from "../../services/firebaseConnect";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Alert } from "../../assets/social/components/alerta";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
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
        
        if (!email || !password || !confirmPassword) {
            showBanner("Preencha todos os campos!", null);
            return;
        }
        if (password.length < 6) {
            showBanner("Senha deve ter no mínimo 6 caracteres!", null);
            return;
        }
        if (password !== confirmPassword) {
            showBanner("As senhas não coincidem!", "error");
            return;
        }

        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            showBanner("Conta criada com sucesso!", "success");
            setTimeout(() => navigate("/admin", { replace: true }), 1500);
        })
        .catch((error) => {
            const messages: Record<string, string> = {
                "auth/email-already-in-use": "Este email já está em uso!",
                "auth/invalid-email": "Email inválido!"
            };
            showBanner(messages[error.code] || "Erro ao criar conta.", "error");
        })
        .finally(() => setLoading(false));
    }

    return (
        <>
            {showAlert && (
                <Alert
                    message={alertConfig.message}
                    type={alertConfig.type}
                    autoClose
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
                        <h2 className="text-3xl font-bold text-white">Comece agora mesmo</h2>
                        <p className="text-base text-gray-300 max-w-md">
                            Organize todos os seus links em um só lugar de forma simples.
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
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Criar conta</h2>
                                <p className="text-sm text-gray-600">Preencha os dados para começar</p>
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
                                <label className="block text-sm font-semibold text-gray-900">Senha</label>
                                <Input
                                    placeholder="Mínimo 6 caracteres"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    minLength={6}
                                    required
                                />
                                {password && password.length < 6 && (
                                    <p className="text-xs text-red-600 mt-1">Senha muito curta</p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-semibold text-gray-900">Confirmar senha</label>
                                <Input
                                    placeholder="Digite a senha novamente"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                {confirmPassword && password !== confirmPassword && (
                                    <p className="text-xs text-red-600 mt-1">As senhas não coincidem</p>
                                )}
                                {confirmPassword && password === confirmPassword && password.length >= 6 && (
                                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                        <span>✓</span> Senhas coincidem
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-slate-900 text-white py-3.5 rounded-lg hover:bg-slate-800 transition-all font-semibold hover:shadow-xl active:scale-[0.99] mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                disabled={loading || !email || password.length < 6 || password !== confirmPassword}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Criando conta...
                                    </>
                                ) : (
                                    'Criar conta'
                                )}
                            </button>

                                <p className="text-center text-sm text-gray-600 pt-2">
                                    Já tem uma conta?{' '}
                                    <Link to="/login" className="text-slate-900 hover:text-slate-700 font-bold underline">
                                        Fazer login
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
