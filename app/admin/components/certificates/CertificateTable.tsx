import styles from "../../../utils/adminTable/table.module.css";
import { Edit, Trash } from "lucide-react";

interface CertificateTableProps {
  certificates: any[];
  onEdit: (certificate: any) => void;
  onDelete: (id: number) => void;
}
const CertificateTable: React.FC<CertificateTableProps> = ({ certificates, onEdit, onDelete }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Organisation Name</th>
            <th>Given Date</th>
            <th>Certificate Site Link</th>
            <th>Serial Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((certificate) => (
            <tr key={certificate.id}>
              <td>{certificate.name}</td>
              <td>{certificate.organisationName}</td>
              <td>{certificate.givenDate}</td>
              <td>{certificate.certificateSiteLink}</td>
              <td>{certificate.serialNumber}</td>
              <td className={styles.actions}>
                <button className={styles.edit} onClick={() => onEdit(certificate)}>
                  <Edit size={18} />
                </button>
                <button className={styles.delete} onClick={() => onDelete(certificate.id)}>
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

export default CertificateTable;
