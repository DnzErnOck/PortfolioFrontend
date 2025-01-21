import styles from "../../../utils/adminTable/table.module.css";
import { Edit } from "lucide-react";

interface UserTableProps {
  user: any; // Tek bir kullanıcı
  onEdit: () => void; // Düzenleme işlemi için
}

const UserTable: React.FC<UserTableProps> = ({ user, onEdit }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.username}</td>
            <td>{user.emailAddress}</td>
            <td className={styles.actions}>
              <button className={styles.edit} onClick={onEdit}>
                <Edit size={18} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
