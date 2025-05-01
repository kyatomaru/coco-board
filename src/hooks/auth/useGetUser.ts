import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";
import { hasValidSubscription } from "@/libs/data";

export const useGetUser = () => {
    const [user, setUser] = React.useState(null);
    const [isSubscriptionValid, setIsSubscriptionValid] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        onAuthStateChanged(auth, (newUser) => {
          if (newUser) {
            setUser(newUser)
            getIsSubscriptionValid(newUser)
          }
          setIsLoading(false)
        })
    }, []);

    const getIsSubscriptionValid = async (user) => {
        const isSubscriptionValid = await hasValidSubscription(user.uid)
        setIsSubscriptionValid(isSubscriptionValid)
    }

    return [user, setUser, isSubscriptionValid, isLoading]
}

const fetchUser = async (userId) => {
  const userData = await fetch(`/api/auth/?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
          return data
      })

  return userData
}