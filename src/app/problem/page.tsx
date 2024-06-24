"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import Header from '@/components/routes/problem/Header';
import Footer from "@/components/Footer";
import ProblemContentsBox from '@/features/common/contents/box/ProblemCardBox';
import Container from '@mui/material/Container';
import { auth } from '../firebase';
import type { User } from 'firebase/auth';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import LoginPage from '@/features/routes/accounts/login/LoginPage';
import CreateButton from '@/features/routes/problem/CreateButton';
import LeftBar from '@/components/LeftBar';
import AchieveSelectTabs from '@/components/routes/problem/AchieveSelectTabs';

export default function Home(props) {
    const params = useParams()
    const router = useRouter()
    const [menu, setMenu] = React.useState(false);
    const [user, setUser] = React.useState<User | undefined>(null);

    useIsAuth(router)

    React.useEffect(() => {
        // const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(auth.currentUser)
            }
        })
    });

    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-white">
            <LoadingPage />
            {user !== null &&
                <>
                    <Header props={props} setMenu={setMenu} />
                    <LeftBar />
                    <AchieveSelectTabs setMenu={setMenu} />
                    <Container maxWidth="md" sx={{ my: { xs: "80px", sm: "90px", md: "30px" }, px: 0, pl: { md: "120px", lg: "250px" } }}>
                        <CreateButton />
                        <ProblemContentsBox user={user} achieveMenu={menu} />
                    </Container>
                    < Footer />
                </>
            }
        </main >
    )
}
