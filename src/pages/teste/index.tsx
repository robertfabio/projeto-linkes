import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Teste() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        console.log('Login:', { username, password });
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Login</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <input 
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all peer placeholder-transparent"
                                id="acct_name" 
                                data-pw="userNameLogin" 
                                data-cy="username" 
                                name="acct_name" 
                                type="text" 
                                autoFocus={true}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />
                            <label 
                                htmlFor="acct_name"
                                className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-semibold text-emerald-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-emerald-600"
                            >
                                Username
                            </label>
                        </div>

                        <div className="relative">
                            <input 
                                className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all peer placeholder-transparent"
                                id="password" 
                                data-pw="passwordLogin" 
                                data-cy="password" 
                                name="password" 
                                type={showPassword ? "text" : "password"}
                                autoComplete="off"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                            <label 
                                htmlFor="password"
                                className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-semibold text-emerald-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-emerald-600"
                            >
                                Password
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3.5 text-slate-400 hover:text-emerald-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <div className="text-sm">
                            <a 
                                href="/account/credentials/password"
                                className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                            >
                                Forgot Username or Password?
                            </a>
                        </div>

                        <button 
                            className="w-full bg-emerald-600 text-white py-3.5 rounded-lg hover:bg-emerald-700 transition-all font-semibold hover:shadow-xl active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            id="login-btn" 
                            data-pw="enterLoginButton" 
                            data-cy="login-btn" 
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Logging in...
                                </>
                            ) : (
                                'Log in'
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-6 bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-6">
                        <div 
                            id="g_id_onload"
                            data-client_id="626213862376-mign5lklfmifpe5q80ark68svlil739r.apps.googleusercontent.com"
                            data-context="use"
                            data-ux_mode="redirect"
                            data-login_uri="https://www.name.com/auth/sso/google?action=signup"
                            data-nonce=""
                            data-auto_prompt="false"
                        />
                        <div 
                            className="g_id_signin"
                            data-type="standard"
                            data-shape="rectangular"
                            data-theme="outline"
                            data-text="signup_with"
                            data-size="large"
                            data-logo_alignment="center"
                            data-width="100%"
                        />
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-slate-500 font-medium">OR</span>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-700 mb-4">Account Details</h3>
                </div>
            </div>
        </div>
    );
}
