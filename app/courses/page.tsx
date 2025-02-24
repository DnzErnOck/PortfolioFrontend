
import CoursesContainer from "@/containers/courses";
import { CourseService } from "@/services/courseService";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    // Kursları alıyoruz
    const data = await CourseService.getAll(0, 10); // 5 tane kurs alıyoruz örnek olarak
    const courseNames = data.content.map((course) => course.name).join(", "); // Kurs isimlerini virgülle ayırıyoruz

    return {
      description: `Explore the courses I have completed, including: ${courseNames}`, // Açıklama kısmına kurs isimlerini ekliyoruz
      keywords: courseNames, // Kurs isimlerini anahtar kelime olarak ekliyoruz
    };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return {
      title: `Courses - My Portfolio`,
      description: "Explore the courses I have completed",
      keywords: "courses, my portfolio", // Genel anahtar kelimeler
    };
  }
}


const CoursesPage: React.FC = () => {
  return (
    <div>
      <CoursesContainer />
    </div>
  );
};

export default CoursesPage;
