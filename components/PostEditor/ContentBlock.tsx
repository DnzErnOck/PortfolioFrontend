import React, { useRef, useEffect, useState } from "react";

interface ContentBlockProps {
  index: number;
  type: string;
  value: string;
  onChangeContent: (index: number, value: string) => void;
  onFileChange: (index: number, file: File | null) => void;
  onRemoveContent: (index: number) => void; // İçerik kaldırma fonksiyonu
}

const ContentBlock: React.FC<ContentBlockProps> = ({
  index,
  type,
  value,
  onChangeContent,
  onFileChange,
  onRemoveContent,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);
  const [fileURL, setFileURL] = useState<string | null>(null); // Geçici URL için state
  return (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      {/* İçeriği silme düğmesi */}
      <button
        onClick={() => onRemoveContent(index)}
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        X
      </button>

      {/* IMAGE Alanı */}
      {type === "IMAGE" && (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              if (file) {
                const url = URL.createObjectURL(file);
                setFileURL(url); // Görüntüleme için URL ayarla
                onFileChange(index, file);
                onChangeContent(index, file.name);
              }
            }}
          />
          {fileURL && (
          <img
            src={fileURL}
            alt="Uploaded"
            style={{ maxWidth: "300px", marginTop: "10px", borderRadius: "8px" }}
          />
        )}  
        </div>
      )}

      {/* TEXT Alanı */}
      {type === "TEXT" && (
        <textarea
          ref={textareaRef}
          style={{
            resize: "none",
            width: "100%",
            minHeight: "50px",
            padding: "10px",
            border: "none",
            outline: "none",
            backgroundColor: "#f9f9f9",
          }}
          placeholder="Write your text here..."
          value={value}
          onChange={(e) => onChangeContent(index, e.target.value)}
        />
      )}

      {/* CODE Alanı */}
      {type === "CODE" && (
        <textarea
          ref={textareaRef}
          style={{
            resize: "none",
            width: "100%",
            minHeight: "50px",
            padding: "10px",
            fontFamily: "monospace",
            backgroundColor: "#f9f9f9",
            border: "none",
            outline: "none",
          }}
          placeholder="Write your code here..."
          value={value}
          onChange={(e) => onChangeContent(index, e.target.value)}
        />
      )}
    </div>
  );
};

export default ContentBlock;
