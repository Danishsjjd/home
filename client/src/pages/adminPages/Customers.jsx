import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { LoadingDialog } from "../../components";
import { API } from "../../libs/axios";
import MountTransition from "../../utils/MountTransition";
import { Users } from "./components";

const Customers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await API.getAllUsers({});
        setUsers(response.data.users);
        setLoading(false);
      } catch (e) {
        toast.error(e?.response?.data?.message || e?.message);
      }
    };
    getUsers();
    return () => {};
  }, []);

  return (
    <MountTransition dashboard>
      {loading ? (
        <LoadingDialog loading={loading} />
      ) : (
        users.map(({ email, avatar, googleAvatar, name }) => (
          <Users
            email={email}
            img={avatar?.url || googleAvatar}
            name={name}
            key={email}
          />
        ))
      )}
    </MountTransition>
  );
};

export default Customers;
