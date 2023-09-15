import PropTypes from "prop-types";
import { IconQuestionMark } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const UserTableRow = ({ users }) => {
  const navigate = useNavigate();
  const handleRowClick = (username) => {
    navigate(`/kayttajat/${username}`);
  };
  const tableRows = users.map((user) => {
    console.log(user);
    return (
      <tr
        key={user.user_id}
        onClick={() => handleRowClick(user.username)}
        className="bg-white border-b hover:bg-gray-50 cursor-pointer"
      >
        <th
          scope="row"
          className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {user?.image ? (
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={user.image}
              alt="Jese image"
            />
          ) : (
            <div className="bg-gray-200 rounded-full">
              <IconQuestionMark size={40} />
            </div>
          )}
          <div className="pl-3">
            <div className="text-base font-semibold">{user.username}</div>
          </div>
        </th>
        <td className="px-6 py-4">
          {user?.fishingMethod ? user.fishingMethod : "Ei tiedossa"}
        </td>

        <td className="px-6 py-4">
          <div className="flex items-center">
            {user?.experience ? user.experience : "Ei tiedossa"}
          </div>
        </td>
        <td className="px-6 py-4">
          {user?.postCount || user?.postCount === 0
            ? user.postCount
            : "Ei tiedossa"}
        </td>
        <td className="px-6 py-4">
          {user?.created ? user.created : "Ei tiedossa"}
        </td>
      </tr>
    );
  });
  return <tbody>{tableRows}</tbody>;
};

UserTableRow.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
};

export default UserTableRow;
