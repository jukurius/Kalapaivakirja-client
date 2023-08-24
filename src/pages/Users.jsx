import { useState, useEffect } from 'react';
import UserTableRow from "../components/reuseables/UserTableRow";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const ENDPOINT = "/users"

const Users = () => {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const res = await axiosPrivate(ENDPOINT)
            console.log(res.data);
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    fetchUsers();
  }, [])

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg container mx-auto mt-20">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Käyttäjä
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
          <UserTableRow users={users}/>
      </table>
    </div>
  );
};

export default Users;
