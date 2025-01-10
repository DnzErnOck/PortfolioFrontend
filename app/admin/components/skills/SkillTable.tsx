import styles from "../../../utils/adminTable/table.module.css";
import { Edit, Trash } from "lucide-react";

interface SkillTableProps {
  skills: any[];
  onEdit: (skill: any) => void;
  onDelete: (id: number) => void;
}
const SkillTable: React.FC<SkillTableProps> = ({ skills, onEdit, onDelete }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill.id}>
              <td>{skill.name}</td>
              <td className={styles.actions}>
                <button className={styles.edit} onClick={() => onEdit(skill)}>
                  <Edit size={18} />
                </button>
                <button className={styles.delete} onClick={() => onDelete(skill.id)}>
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

export default SkillTable;
