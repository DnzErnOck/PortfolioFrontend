import styles from "../../../utils/adminTable/table.module.css";
import { Edit, Trash } from "lucide-react";

interface CourseTableProps {
  courses: any[];
  onEdit: (course: any) => void;
  onDelete: (id: number) => void;
}
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
const CourseTable: React.FC<CourseTableProps> = ({ courses, onEdit, onDelete }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Instructor</th>
            <th>Date</th>
            <th>Detail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.instructor}</td>
              <td>{formatDate(course.date)}</td>
              <td className={styles.detailCell}>{course.detail}</td>
              <td className={styles.actions}>
                <button className={styles.edit} onClick={() => onEdit(course)}>
                  <Edit size={18} />
                </button>
                <button className={styles.delete} onClick={() => onDelete(course.id)}>
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

export default CourseTable;
