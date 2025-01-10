import styles from "../../../utils/adminTable/table.module.css";
import { Edit, Trash } from "lucide-react";

interface ExperienceTableProps {
  experiences: any[]; // Deneyim verileri
  onEdit: (experience: any) => void; // Düzenleme işlemi için
  onDelete: (id: number) => void; // Silme işlemi için
}

const ExperienceTable: React.FC<ExperienceTableProps> = ({ experiences, onEdit, onDelete }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Department</th>
            <th>Workplace</th>
            <th>Position</th>
            <th>Details</th> {/* Yeni sütun */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((experience) => (
            <tr key={experience.id}>
              <td>{experience.departmentTitle}</td>
              <td>{experience.workplace}</td>
              <td>{experience.position}</td>
              <td>{experience.detail}</td> {/* Yeni veri */}
              <td className={styles.actions}>
                <button className={styles.edit} onClick={() => onEdit(experience)}>
                  <Edit size={18} />
                </button>
                <button className={styles.delete} onClick={() => onDelete(experience.id)}>
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

export default ExperienceTable;
