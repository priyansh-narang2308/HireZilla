"use client"

import { useEffect } from "react";
import { supabase } from "@/services/supabase-client";

export default function AuthHandler() {

    useEffect(() => {
        const hash = window.location.hash;

        if (hash) {
            supabase.auth
                .getSessionFromUrl()
                .then(() => {
                    window.history.replaceState(null, "", window.location.pathname);
                })
                .catch((error) => {
                    console.error("Error parsing URL hash:", error.message);
                });
        }
    }, []);

    return null;
}
