import styles from "../../../utils/adminTable/table.module.css";
import { Edit, Download } from "lucide-react";

interface ResumeTableProps {
  resumeExists: boolean;
  resumeName?: string; // Özgeçmiş adı opsiyonel
  onDownload: () => void;
  onEdit: () => void;
}

const ResumeTable: React.FC<ResumeTableProps> = ({
  resumeExists,
  resumeName = "Not Available", // Varsayılan değer
  onDownload,
  onEdit,
}) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Status</th>
            <th>File Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{resumeExists ? "Uploaded" : "Not Uploaded"}</td>
            <td>{resumeExists && resumeName ? resumeName : "No File"}</td>
            <td className={styles.actions}>
              {resumeExists && (
                <button
                  className={styles.download}
                  onClick={onDownload}
                  title="Download Resume"
                >
                  <Download size={18} />
                </button>
              )}
              <button
                className={styles.edit}
                onClick={onEdit}
                title={resumeExists ? "Edit Resume" : "Upload Resume"}
              >
                <Edit size={18} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResumeTable;
