import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { removeUser, setUser } from "./userSlice";

export function useAuth() {
    const auth = getAuth();
    const dispatch = useAppDispatch();

    const { email } = useAppSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoading(true);
                dispatch(
                    setUser({
                        email: user.email || "",
                        token: user.refreshToken || "",
                        id: user.uid || "",
                    })
                );
                setIsLoading(false);
            } else {
                dispatch(removeUser());
                setIsLoading(false);
            }
        });

        // ✅ Отписка при размонтировании
        return () => unsubscribe();
    }, [auth, dispatch]);

    return {
        isAuth: !!email,
        email,
        isLoading,
    };
}
