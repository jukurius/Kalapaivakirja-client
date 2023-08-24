import PropTypes from "prop-types";

const UserTableRow = ({ users }) => {
  const tableRows = users.map((user) => {
    console.log(user)
    return (
      <tr key={user.user_id} className="bg-white border-b hover:bg-gray-50">
        <th
          scope="row"
          className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={user?.image ? user.image : null} // Lisää placeholder nullin tilalle
            alt="Jese image"
          />
          <div className="pl-3">
            <div className="text-base font-semibold">{user.username}</div>
            <div className="font-normal text-gray-500">thomes@flowbite.com</div>
          </div>
        </th>
        <td className="px-6 py-4">UI/UX Engineer</td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
            Online
          </div>
        </td>
        <td className="px-6 py-4">
          <a href="#" className="font-medium text-blue-600hover:underline">
            Edit user
          </a>
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
