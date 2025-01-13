import styles from "../../../utils/adminTable/table.module.css";
import { Edit, Trash } from "lucide-react";

interface EducationTableProps {
  educations: any[]; // Deneyim verileri
  onEdit: (education: any) => void; // Düzenleme işlemi için
  onDelete: (id: number) => void; // Silme işlemi için
}

const EducationTable: React.FC<EducationTableProps> = ({ educations, onEdit, onDelete }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>Finish Date</th>
            <th>Major</th> {/* Yeni sütun */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {educations.map((education) => (
            <tr key={education.id}>
              <td>{education.name}</td>
              <td>{education.startDate}</td>
              <td>{education.finishDate}</td>
              <td>{education.major}</td> {/* Yeni veri */}
              <td className={styles.actions}>
                <button className={styles.edit} onClick={() => onEdit(education)}>
                  <Edit size={18} />
                </button>
                <button className={styles.delete} onClick={() => onDelete(education.id)}>
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

export default EducationTable;
