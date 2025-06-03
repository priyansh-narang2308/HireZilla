"use client";

import { UserDetailContext } from '@/contexts/UserDetailContext';
import { supabase } from '@/services/supabase-client';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Provider = ({ children }) => {

    const [user, setUser] = useState("");

    useEffect(() => {
        createNewUser();
    }, []);

    const createNewUser = async () => {

        supabase.auth.getUser().then(async ({ data: { user } }) => {
            // check if user already exists
            let { data: Users, error } = await supabase
                .from('Users')
                .select("*")
                .eq("email", user?.email);

            console.log(Users);
            if (error) {
                toast.error("Error: ", error);
            }

            // if not there then create it the new user
            if (Users?.length === 0) {
                const { data, error } = await supabase.from("Users").insert(
                    [
                        {
                            name: user?.user_metadata?.name,
                            email: user?.email,
                            picture: user?.user_metadata?.picture
                        }
                    ]
                );
                console.log(data);
                setUser(data);
                if (error) {
                    toast.error("Error: ", error);
                }
                return;
            }
            setUser(Users[0]);
        });

    };

    return (
        <UserDetailContext.Provider value={{ user, setUser }}>
            <div>{children}</div>
        </UserDetailContext.Provider>
    );
};

export default Provider;

export const useUser = () => {
    const context = useContext(UserDetailContext);
    return context
};