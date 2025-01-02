"use client";
import { useState } from "react";
import styles from "./login.module.css";
import { loginUser } from "@/services/loginService";
import { useRouter } from "next/navigation";

const LoginContainer: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false); // Giriş başarılı mı
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginData = { username, password };

    const response = await loginUser(loginData);

    if (response) {
      setError(null);
      setSuccess(true); // Giriş başarılı
      localStorage.setItem("token", response.token); // Token'ı sakla

      // 2 saniye sonra yönlendirme
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 2000);
    } else {
      setSuccess(false);
      setError("Giriş başarısız! Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.sectionTitle}>Admin Paneli Giriş</h1>
        <form onSubmit={handleLogin}>
          {error && <p className={styles.errorMessage}>{error}</p>}
          {success && (
            <p className={styles.successMessage}>Giriş başarılı! Yönlendiriliyorsunuz...</p>
          )}
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.inputLabel}>
              Kullanıcı Adı
            </label>
            <input
              type="text"
              id="username"
              className={styles.inputField}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.inputLabel}>
              Şifre
            </label>
            <input
              type="password"
              id="password"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginContainer;
