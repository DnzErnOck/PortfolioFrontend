"use client";

import { useEffect, useState } from "react";
import styles from "../../../utils/adminTable/table.module.css";
import { Edit, Trash } from "lucide-react";

interface AboutTableProps {
  aboutEntries: any[];
  onEdit: (about: any) => void;
  onDelete: (id: number) => void;
}

const AboutTable: React.FC<AboutTableProps> = ({ aboutEntries, onEdit, onDelete }) => {
  const [clientEntries, setClientEntries] = useState<any[]>([]);

  // Hydration hatasını önlemek için useEffect ile veriyi güncelle
  useEffect(() => {
    setClientEntries(aboutEntries);
  }, [aboutEntries]);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>About Text</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clientEntries.map((about) => (
            <tr key={about.id}>
              <td className={styles.detailCell}>{about.aboutText || "No About Text"}</td>
              <td className={styles.actions}>
                <button className={styles.edit} onClick={() => onEdit(about)}>
                  <Edit size={18} />
                </button>
                <button className={styles.delete} onClick={() => onDelete(about.id)}>
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

export default AboutTable;
