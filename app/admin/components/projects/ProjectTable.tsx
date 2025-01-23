import styles from "../../../utils/adminTable/table.module.css";
import { Edit, Trash } from "lucide-react";

interface ProjectTableProps {
  projects: any[];
  onEdit: (project: any) => void;
  onDelete: (id: number) => void;
}
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const ProjectTable: React.FC<ProjectTableProps> = ({ projects, onEdit, onDelete }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Detail</th>
            <th>Project Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td className={styles.detailCell}>{project.detail}</td>
              <td>{formatDate(project.projectDate)}</td>
              <td className={styles.actions}>
                <button className={styles.edit} onClick={() => onEdit(project)}>
                  <Edit size={18} />
                </button>
                <button className={styles.delete} onClick={() => onDelete(project.id)}>
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

export default ProjectTable;
