import React, { useRef, useEffect, useState } from "react";

interface ContentBlockProps {
  index: number;
  contentType: string;
  value: string;
  imageBase64?: string; // Mevcut resim için base64 verisi
  onChangeContent: (index: number, value: string) => void;
  onFileChange: (index: number, file: File | null) => void;
  onRemoveContent: (index: number) => void;
}

const ContentBlock: React.FC<ContentBlockProps> = ({
  index,
  contentType,
  value,
  imageBase64, // Base64 ile gelen mevcut resim
  onChangeContent,
  onFileChange,
  onRemoveContent,
}) => {
  const [fileURL, setFileURL] = useState<string | null>(null); // Yeni yüklenen resmin URL'si



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
      {contentType === "IMAGE" && (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              if (file) {
                const url = URL.createObjectURL(file); // Yeni resim için URL oluştur
                setFileURL(url); // Yeni resmi göster
                onFileChange(index, file); // File'ı yukarıya gönder
                onChangeContent(index, file.name); // Dosya adını içerik olarak kaydet
              }
            }}
          />
          {/* Yeni resim varsa öncelikli olarak göster, yoksa mevcut resmi göster */}
          {fileURL ? (
            <img
              src={fileURL}
              alt="New Upload"
              style={{
                maxWidth: "300px",
                marginTop: "10px",
                borderRadius: "8px",
              }}
            />
          ) : (
            imageBase64 && (
              <img
                src={imageBase64}
                alt="Existing Image"
                style={{
                  maxWidth: "300px",
                  marginTop: "10px",
                  borderRadius: "8px",
                }}
              />
            )
          )}
        </div>
      )}

      {/* TEXT Alanı */}
      {contentType === "TEXT" && (
        <textarea
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
    </div>
  );
};

export default ContentBlock;
