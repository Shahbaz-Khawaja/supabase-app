import { supabase } from "supabase/supabase_client";
import { inviteUser, logOutUser, setUsersList } from "store";
import { store } from "store/store";

const INVITE_USER = async ({ email, role }) => {
  try {
    const { data } = await supabase.functions.invoke("invite-user", {
      body: JSON.stringify({
        email: email,
        role: role,
      }),
    });
    const userData = {
      id: data.id,
      email: data.email,
      role: data.user_metadata.role,
      status: data.email_confirmed_at ? "Confirmed" : "In-Progress",
    };
    store.dispatch(inviteUser(userData));
  } catch (error) {
    console.error(error);
  }
};

const LOGOUT_USER = async () => {
  const { error } = await supabase.auth.signOut();
  store.dispatch(logOutUser());
  if (error) {
    throw error;
  }
};

const LIST_USERS = async () => {
  try {
    const { data, error } = await supabase.functions.invoke("list-users");
    if (error) throw error;
    const userData = data.map((user) => ({
      id: user.id,
      email: user.email,
      role: user.user_metadata.role,
      status: user.confirmed_at ? "Confirmed" : "In-Progress",
    }));
    store.dispatch(setUsersList(userData));
  } catch (error) {
    console.error(error.message);
  }
};

const USER_HELPER = { INVITE_USER, LOGOUT_USER, LIST_USERS };
export default USER_HELPER;
