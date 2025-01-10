import styles from "../../../utils/adminTable/table.module.css";
import { Edit, Trash } from "lucide-react";

interface SocialMediaTableProps {
  socialMedias: any[];
  onEdit: (socialMedia: any) => void;
  onDelete: (id: number) => void;
}

const SocialMediaTable: React.FC<SocialMediaTableProps> = ({ socialMedias, onEdit, onDelete }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {socialMedias.map((socialMedia) => (
            <tr key={socialMedia.id}>
              <td>{socialMedia.name}</td>
              <td>
                <a href={socialMedia.link} target="_blank" rel="noopener noreferrer">
                  {socialMedia.link}
                </a>
              </td>
              <td className={styles.actions}>
                <button className={styles.edit} onClick={() => onEdit(socialMedia)}>
                  <Edit size={18} />
                </button>
                <button className={styles.delete} onClick={() => onDelete(socialMedia.id)}>
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

export default SocialMediaTable;
