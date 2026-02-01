const { useState, useEffect } = React;

const API_URL = "http://192.168.0.1:8000/api";

// ============ Componente Login ============
function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.detail || 'Error de login');
            }

            const data = await response.json();
            
            // Guardar token y datos del usuario
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            onLoginSuccess(data.user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-indigo-600 mb-2">StocKing</h1>
                    <p className="text-gray-600">Sistema de Gestión</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Usuario
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="lucas"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Ingresando...' : 'Entrar'}
                    </button>
                </form>

                <div className="mt-6 text-xs text-gray-500 text-center">
                    <p>Usuarios de prueba:</p>
                    <p className="mt-1">lucas / 1234 (Jefe Papá)</p>
                    <p>empleado1 / 1234 (Empleado Local Centro)</p>
                </div>
            </div>
        </div>
    );
}

// ============ Dashboard Jefe ============
function DashboardJefe({ user, onLogout }) {
    const [stats, setStats] = useState({ usuarios: 0, locales: 0 });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('token');
            
            const [usersRes, localesRes] = await Promise.all([
                fetch(`${API_URL}/users/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch(`${API_URL}/users/locales`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);

            if (usersRes.ok && localesRes.ok) {
                const users = await usersRes.json();
                const locales = await localesRes.json();
                setStats({ usuarios: users.length, locales: locales.length });
            }
        } catch (err) {
            console.error('Error cargando stats:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-indigo-600">StocKing</h1>
                            <span className="ml-4 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                {user.role === 'jefe_papa' ? '👑 Jefe Papá' : '👑 Jefe Mamá'}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-700">{user.full_name || user.username}</span>
                            <button
                                onClick={onLogout}
                                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                            >
                                Salir
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Panel de Control</h2>
                    <p className="text-gray-600 mt-2">Bienvenido al sistema de gestión</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Locales</p>
                                <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.locales}</p>
                            </div>
                            <div className="bg-indigo-100 p-3 rounded-lg">
                                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Usuarios</p>
                                <p className="text-3xl font-bold text-green-600 mt-2">{stats.usuarios}</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-lg">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Ventas Hoy</p>
                                <p className="text-3xl font-bold text-blue-600 mt-2">$0</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">🎉 Sistema Listo</h3>
                    <p className="text-indigo-100 mb-4">
                        Tu sistema está configurado y listo para usar. Ahora podemos agregar:
                    </p>
                    <ul className="space-y-2 text-indigo-100">
                        <li>✅ Gestión de productos</li>
                        <li>✅ Registro de ventas por local</li>
                        <li>✅ Control de stock</li>
                        <li>✅ Reportes y estadísticas</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

// ============ Dashboard Empleado ============
function DashboardEmpleado({ user, onLogout }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-indigo-600">StocKing</h1>
                            <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                👤 Empleado
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-gray-700 font-medium">{user.full_name || user.username}</p>
                                <p className="text-sm text-gray-500">{user.local_nombre || 'Sin local asignado'}</p>
                            </div>
                            <button
                                onClick={onLogout}
                                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                            >
                                Salir
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Mi Panel</h2>
                    <p className="text-gray-600 mt-2">Gestiona las ventas de tu local</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">📦 Mis Ventas Hoy</h3>
                        <p className="text-3xl font-bold text-green-600">$0</p>
                        <p className="text-gray-500 text-sm mt-2">0 ventas realizadas</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Stock Actual</h3>
                        <p className="text-3xl font-bold text-blue-600">0</p>
                        <p className="text-gray-500 text-sm mt-2">productos en inventario</p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl shadow-lg p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">👋 ¡Bienvenido!</h3>
                    <p className="text-blue-100">
                        Desde aquí podrás registrar ventas y gestionar el stock de tu local.
                        Próximamente habilitaremos todas las funcionalidades.
                    </p>
                </div>
            </div>
        </div>
    );
}

// ============ App Principal ============
function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verificar si hay sesión guardada
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    // Renderizar dashboard según rol
    if (user.role === 'jefe_papa' || user.role === 'jefe_mama') {
        return <DashboardJefe user={user} onLogout={handleLogout} />;
    }

    return <DashboardEmpleado user={user} onLogout={handleLogout} />;
}

// Renderizar la app
ReactDOM.render(<App />, document.getElementById('root'));
