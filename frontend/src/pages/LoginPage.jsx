import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

const LoginPage = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const { login, loading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(inputs);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-surface">
            <div className="w-full max-w-md p-8 space-y-6 bg-surface-2 rounded-2xl shadow-md border border-muted">
                <h1 className="text-2xl font-bold text-center text-ink">Log In to Your Account</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-ink/70"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 mt-1 border border-muted rounded-md shadow-sm bg-surface-2 text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                            value={inputs.email}
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-ink/70"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 mt-1 border border-muted rounded-md shadow-sm bg-surface-2 text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>

                    {error && <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded-md">{error}</div>}

                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-medium text-white bg-brand rounded-md hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-70"
                            disabled={loading}
                        >
                            {loading ? 'Logging In...' : 'Log In'}
                        </button>
                    </div>
                </form>
                <p className="text-sm text-center text-ink/70">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-brand hover:brightness-95">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
