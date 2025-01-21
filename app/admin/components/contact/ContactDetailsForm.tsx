import styles from "../../../utils/adminTable/form.module.css";

interface ContactDetailsProps {
  contact: any;
  onClose: () => void;
}

const ContactDetailsForm: React.FC<ContactDetailsProps> = ({ contact, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label>Name Surname</label>
            <input type="text" value={`${contact.name} ${contact.surname}`} readOnly />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" value={contact.emailAddress} readOnly />
          </div>
          <div className={styles.formGroup}>
            <label>Message</label>
            <textarea value={contact.message} style={{height:"300px"}} readOnly />
          </div>
          <div className={styles.formActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactDetailsForm;
