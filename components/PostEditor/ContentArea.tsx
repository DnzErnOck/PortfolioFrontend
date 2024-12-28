import React from "react";
import ContentBlock from "./ContentBlock";

interface ContentAreaProps {
  contents: { type: string; value: string }[];
  onChangeContent: (index: number, value: string) => void;
  onFileChange: (index: number, file: File | null) => void;
  onRemoveContent: (index: number) => void;
}

const ContentArea: React.FC<ContentAreaProps> = ({
  contents,
  onChangeContent,
  onFileChange,
  onRemoveContent,
}) => {
  return (
    <div>
      {contents.map((content, index) => (
        <ContentBlock
          key={index}
          index={index}
          type={content.type}
          value={content.value}
          onChangeContent={onChangeContent}
          onFileChange={onFileChange}
          onRemoveContent={onRemoveContent} // Yeni prop
        />
      ))}
    </div>
  );
};

export default ContentArea;
