import React from "react";
import styles from "../../containers/PostEditor/postEditor.module.css";

// Props türü tanımı
// Props türü tanımı
interface ToolbarButtonProps {
    icon: string; // Düğmede gösterilecek ikon
    label: string; // Düğmede gösterilecek etiket
    onClick?: () => void; // Tıklama olayını işlemek için opsiyonel bir fonksiyon
  }
  
  const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon, label, onClick }) => {
    return (
      <button className={styles.toolbarButton} onClick={onClick}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.label}>{label}</span>
      </button>
    );
  };
  
  export default ToolbarButton;
