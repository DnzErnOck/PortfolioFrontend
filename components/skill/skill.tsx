import { getSkills } from '@/services/skillService';
import React, { useEffect, useState } from 'react';

// SkillTip modelini oluşturuyoruz (örneğin TypeScript'te)
interface Skill {
  id: number;
  imageBase64: string;
  name: string;
}

const Skill: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState<string>(''); // Hata durumu için state

  // Skill servisini çağırıyoruz
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const fetchedSkills = await getSkills(); // Servisten skill verilerini alıyoruz
        setSkills(fetchedSkills);
      } catch (err) {
        setError('Failed to fetch skills'); // Hata durumunda mesaj set ediyoruz
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="skills-container">
      <div className="skills-title">My Skills</div>
      {error && <div className="error-message">{error}</div>} {/* Hata mesajı */}
      <div className="skills-icons">
        {skills.map((skill) => (
          <div className="skill" key={skill.id}> {/* key olarak id kullanılıyor */}
            <div className="icon">
              <img src={skill.imageBase64} alt={skill.name} />
            </div>
            <div className="skill-name">{skill.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skill;
