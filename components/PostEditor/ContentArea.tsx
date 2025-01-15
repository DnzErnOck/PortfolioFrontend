import React, { useEffect } from "react";
import ContentBlock from "./ContentBlock";

interface ContentAreaProps {
  contents: { contentType: string; content: string; imageBase64?: string }[]; // Base64 alanı eklendi
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
  useEffect(() => {
    console.log("ContentArea - Elements:", contents); // Gelen elemanları kontrol et
  }, [contents]);

  return (
    <div>
      {contents.map((content, index) => (
        <ContentBlock
          key={index}
          index={index}
          contentType={content.contentType}
          value={content.content} // İçeriğin text ya da content kısmı
          imageBase64={content.imageBase64} // Base64 alanını geçiriyoruz
          onChangeContent={onChangeContent}
          onFileChange={onFileChange}
          onRemoveContent={onRemoveContent}
        />
      ))}
    </div>
  );
};

export default ContentArea;
