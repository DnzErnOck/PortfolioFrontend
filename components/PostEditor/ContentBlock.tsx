import React, { useEffect } from "react";

interface ContentBlockProps {
  index: number;
  contentType: string;
  value: string;
  imageBase64?: string; // Resim için base64 verisi
  onChangeContent: (index: number, value: string) => void;
  onFileChange: (index: number, file: File | null) => void;
  onRemoveContent: (index: number) => void;
}

const ContentBlock: React.FC<ContentBlockProps> = ({
  index,
  contentType,
  value,
  imageBase64, // Base64 resmi burada alıyoruz
  onChangeContent,
  onFileChange,
  onRemoveContent,
}) => {
  useEffect(() => {
    console.log(`ContentBlock - Index: ${index}, Value:`, value); // Kontrol için
  }, [value, imageBase64]);

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
                onFileChange(index, file);
              }
            }}
          />
          {/* Eğer `imageBase64` varsa göster */}
          {imageBase64 ? (
            <img
              src={imageBase64} // Base64 verisini göster
              alt="Uploaded"
              style={{
                maxWidth: "300px",
                marginTop: "10px",
                borderRadius: "8px",
              }}
            />
          ) : (
            value && (
              <img
                src={value} // Eğer base64 yoksa `value` ile göster
                alt="Uploaded"
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
