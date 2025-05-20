import { Session } from "@supabase/supabase-js";
import { useState } from "react";

const [session, setSession] = useState<Session | null>(null);

const userId = session.user.id;
const userEmail = session.user.email;


