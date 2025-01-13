import styles from "../../../utils/adminTable/table.module.css";
import { Edit, Trash } from "lucide-react";

interface LanguageTableProps {
  languages: any[]; // Deneyim verileri
  onEdit: (language: any) => void; // Düzenleme işlemi için
  onDelete: (id: number) => void; // Silme işlemi için
}

const LanguageTable: React.FC<LanguageTableProps> = ({ languages, onEdit, onDelete }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {languages.map((language) => (
            <tr key={language.id}>
              <td>{language.name}</td>
              <td>{language.languageLevel}</td>
              <td className={styles.actions}>
                <button className={styles.edit} onClick={() => onEdit(language)}>
                  <Edit size={18} />
                </button>
                <button className={styles.delete} onClick={() => onDelete(language.id)}>
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

export default LanguageTable;
