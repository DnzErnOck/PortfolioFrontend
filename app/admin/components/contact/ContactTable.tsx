import styles from "../../../utils/adminTable/table.module.css";
import { Trash, Eye } from "lucide-react";

interface ContactTableProps {
  contacts: any[];
  onView: (contact: any) => void;
  onDelete: (id: number) => void;
}

const ContactTable: React.FC<ContactTableProps> = ({ contacts, onView, onDelete }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name Surname</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{`${contact.name} ${contact.surname}`}</td>
              <td>{contact.emailAddress}</td>
              <td className={styles.actions}>
                <button className={styles.view} onClick={() => onView(contact)}>
                  <Eye size={18} />
                </button>
                <button className={styles.delete} onClick={() => onDelete(contact.id)}>
                  <Trash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
