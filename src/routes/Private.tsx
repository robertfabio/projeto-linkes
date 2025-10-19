import { auth } from '../services/firebaseConnect';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { type ReactNode, useState, useEffect, use } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateProps {
    children: ReactNode;
}

export function Private({ children }: PrivateProps): any{
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userData = {
                    uid: user?.uid,
                    email: user?.email,
                }
                localStorage.setItem("@detailUser", JSON.stringify(userData));
                setLoading(false);
                setSigned(true);
            }
            else {
                localStorage.removeItem("@detailUser");
                setLoading(false);
                setSigned(false);
            }
        });
        
        return () => 
            unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!signed) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}