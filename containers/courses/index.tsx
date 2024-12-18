"use client";
import React, { useEffect, useState } from "react";
import { fetchCourses } from "@/services/courseService";
import styles from "./courses.module.css";

// Kurs Arayüzü Tanımı
interface Course {
  id: number;
  name: string;
  instructor: string;
  detail: string;
  date: string;
}

const CoursesContainer: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const data = await fetchCourses();
      setCourses(data);
    } catch (error) {
      console.error("Kurslar çekilirken bir hata oluştu.");
    }
  };

  return (
    <div className={styles.courseContainer}>
      <h1 className={styles.title}>Kurslar</h1>
      {courses.length ? (
        <ul className={styles.courseList}>
          {courses.map((course) => (
            <li key={course.id} className={styles.courseItem}>
              <strong>İsim:</strong> {course.name} <br />
              <strong>Eğitmen:</strong> {course.instructor} <br />
              <strong>Açıklama:</strong> {course.detail} <br />
              <strong>Tarih:</strong> {new Date(course.date).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>Kurs bulunamadı.</p>
      )}
    </div>
  );
};

export default CoursesContainer;
