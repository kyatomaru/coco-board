"use client"

import React, { createContext, useContext, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from 'next/navigation';

// Auth Context の型定義
interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isLoading: boolean;
    requireAuth: () => void;
}

// Auth Context の作成
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider の Props 型定義
interface AuthProviderProps {
    children: ReactNode;
}

// Auth Provider コンポーネント
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const router = useRouter();

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (newUser) => {
            if (newUser) {
                setUser(newUser);
                setIsLoading(false);
            } else {
                setUser(null);
                router.replace('/accounts/login');
            }
        });

        return () => unsubscribe();
    }, []);

    // 認証が必要なページで使用する関数
    const requireAuth = React.useCallback(() => {
        if (!isLoading && !user) {
            router.replace('/accounts/login');
        }
    }, [user, isLoading, router]);

    const value: AuthContextType = {
        user,
        setUser,
        isLoading,
        requireAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// useAuth カスタムフック
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth は AuthProvider 内で使用する必要があります");
    }
    return context;
};

// 認証が必要なページで使用するフック
export const useRequireAuth = () => {
    const { requireAuth } = useAuth();
    
    React.useEffect(() => {
        requireAuth();
    }, [requireAuth]);
};

// fetchUser 関数（必要に応じて）
const fetchUser = async (userId: string) => {
    try {
        const userData = await fetch(`/api/auth/?userId=${userId}`)
            .then((response) => response.json())
            .then((data) => {
                return data;
            });

        return userData;
    } catch (error) {
        console.error("ユーザー情報取得エラー:", error);
        return null;
    }
};

export { fetchUser }; 