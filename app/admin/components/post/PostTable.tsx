import styles from "../../../utils/adminTable/table.module.css";
import { Edit, Trash } from "lucide-react";

interface PostTableProps {
  posts: any[];
  onEdit: (post: any) => void;
  onDelete: (id: number) => void;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const getFirstTextContent = (elements: any[]): string => {
  const textElement = elements.find((element) => element.contentType === "TEXT");
  return textElement?.content || "No text content";
};

const PostTable: React.FC<PostTableProps> = ({ posts, onEdit, onDelete }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Contents</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td className={styles.detailCell}>
                {truncateText(getFirstTextContent(post.elements), 50)}
              </td>
              <td>{formatDate(post.createdDate)}</td>
              <td className={styles.actions}>
                <button className={styles.edit} onClick={() => onEdit(post)}>
                  <Edit size={18} />
                </button>
                <button className={styles.delete} onClick={() => onDelete(post.id)}>
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

export default PostTable;
