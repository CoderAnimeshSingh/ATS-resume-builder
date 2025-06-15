import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  username: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  cgpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface TechnicalSkill {
  id: string;
  category: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  highlights: string[];
}

export interface Position {
  id: string;
  title: string;
  organization: string;
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  provider: string;
  date: string;
  description?: string;
}

export interface ResumeSection {
  id: string;
  type: 'personal' | 'links' | 'experience' | 'education' | 'skills' | 'technicalSkills' | 'projects' | 'positions' | 'certifications';
  title: string;
  isVisible: boolean;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  technicalSkills: TechnicalSkill[];
  projects: Project[];
  positions: Position[];
  certifications: Certification[];
  sections: ResumeSection[];
  template: string;
  theme: 'light' | 'dark';
}

interface ResumeState {
  resume: ResumeData;
  activeSection: string;
}

type ResumeAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'ADD_SOCIAL_LINK'; payload: SocialLink }
  | { type: 'UPDATE_SOCIAL_LINK'; payload: { id: string; data: Partial<SocialLink> } }
  | { type: 'DELETE_SOCIAL_LINK'; payload: string }
  | { type: 'ADD_EXPERIENCE'; payload: Experience }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; data: Partial<Experience> } }
  | { type: 'DELETE_EXPERIENCE'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'UPDATE_SKILL'; payload: { id: string; data: Partial<Skill> } }
  | { type: 'DELETE_SKILL'; payload: string }
  | { type: 'ADD_TECHNICAL_SKILL'; payload: TechnicalSkill }
  | { type: 'UPDATE_TECHNICAL_SKILL'; payload: { id: string; data: Partial<TechnicalSkill> } }
  | { type: 'DELETE_TECHNICAL_SKILL'; payload: string }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; data: Partial<Project> } }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'ADD_POSITION'; payload: Position }
  | { type: 'UPDATE_POSITION'; payload: { id: string; data: Partial<Position> } }
  | { type: 'DELETE_POSITION'; payload: string }
  | { type: 'ADD_CERTIFICATION'; payload: Certification }
  | { type: 'UPDATE_CERTIFICATION'; payload: { id: string; data: Partial<Certification> } }
  | { type: 'DELETE_CERTIFICATION'; payload: string }
  | { type: 'REORDER_SECTIONS'; payload: ResumeSection[] }
  | { type: 'SET_ACTIVE_SECTION'; payload: string }
  | { type: 'SET_TEMPLATE'; payload: string }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'LOAD_RESUME'; payload: ResumeData };

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  },
  socialLinks: [],
  experience: [],
  education: [],
  skills: [],
  technicalSkills: [],
  projects: [],
  positions: [],
  certifications: [],
  sections: [
    { id: 'personal', type: 'personal', title: 'Personal Information', isVisible: true },
    { id: 'links', type: 'links', title: 'Social Links', isVisible: true },
    { id: 'education', type: 'education', title: 'Education', isVisible: true },
    { id: 'skills', type: 'skills', title: 'Skills', isVisible: true },
    { id: 'technicalSkills', type: 'technicalSkills', title: 'Technical Skills', isVisible: true },
    { id: 'experience', type: 'experience', title: 'Work Experience', isVisible: true },
    { id: 'projects', type: 'projects', title: 'Academic Projects', isVisible: true },
    { id: 'positions', type: 'positions', title: 'Positions of Responsibility', isVisible: true },
    { id: 'certifications', type: 'certifications', title: 'Certifications', isVisible: true }
  ],
  template: 'modern',
  theme: 'light'
};

const initialState: ResumeState = {
  resume: initialResumeData,
  activeSection: 'personal'
};

function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        resume: {
          ...state.resume,
          personalInfo: { ...state.resume.personalInfo, ...action.payload }
        }
      };
    case 'ADD_SOCIAL_LINK':
      return {
        ...state,
        resume: {
          ...state.resume,
          socialLinks: [...state.resume.socialLinks, action.payload]
        }
      };
    case 'UPDATE_SOCIAL_LINK':
      return {
        ...state,
        resume: {
          ...state.resume,
          socialLinks: state.resume.socialLinks.map(link =>
            link.id === action.payload.id ? { ...link, ...action.payload.data } : link
          )
        }
      };
    case 'DELETE_SOCIAL_LINK':
      return {
        ...state,
        resume: {
          ...state.resume,
          socialLinks: state.resume.socialLinks.filter(link => link.id !== action.payload)
        }
      };
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        resume: {
          ...state.resume,
          experience: [...state.resume.experience, action.payload]
        }
      };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        resume: {
          ...state.resume,
          experience: state.resume.experience.map(exp =>
            exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
          )
        }
      };
    case 'DELETE_EXPERIENCE':
      return {
        ...state,
        resume: {
          ...state.resume,
          experience: state.resume.experience.filter(exp => exp.id !== action.payload)
        }
      };
    case 'ADD_EDUCATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          education: [...state.resume.education, action.payload]
        }
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          education: state.resume.education.map(edu =>
            edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
          )
        }
      };
    case 'DELETE_EDUCATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          education: state.resume.education.filter(edu => edu.id !== action.payload)
        }
      };
    case 'ADD_SKILL':
      return {
        ...state,
        resume: {
          ...state.resume,
          skills: [...state.resume.skills, action.payload]
        }
      };
    case 'UPDATE_SKILL':
      return {
        ...state,
        resume: {
          ...state.resume,
          skills: state.resume.skills.map(skill =>
            skill.id === action.payload.id ? { ...skill, ...action.payload.data } : skill
          )
        }
      };
    case 'DELETE_SKILL':
      return {
        ...state,
        resume: {
          ...state.resume,
          skills: state.resume.skills.filter(skill => skill.id !== action.payload)
        }
      };
    case 'ADD_TECHNICAL_SKILL':
      return {
        ...state,
        resume: {
          ...state.resume,
          technicalSkills: [...state.resume.technicalSkills, action.payload]
        }
      };
    case 'UPDATE_TECHNICAL_SKILL':
      return {
        ...state,
        resume: {
          ...state.resume,
          technicalSkills: state.resume.technicalSkills.map(skill =>
            skill.id === action.payload.id ? { ...skill, ...action.payload.data } : skill
          )
        }
      };
    case 'DELETE_TECHNICAL_SKILL':
      return {
        ...state,
        resume: {
          ...state.resume,
          technicalSkills: state.resume.technicalSkills.filter(skill => skill.id !== action.payload)
        }
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        resume: {
          ...state.resume,
          projects: [...state.resume.projects, action.payload]
        }
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        resume: {
          ...state.resume,
          projects: state.resume.projects.map(project =>
            project.id === action.payload.id ? { ...project, ...action.payload.data } : project
          )
        }
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        resume: {
          ...state.resume,
          projects: state.resume.projects.filter(project => project.id !== action.payload)
        }
      };
    case 'ADD_POSITION':
      return {
        ...state,
        resume: {
          ...state.resume,
          positions: [...state.resume.positions, action.payload]
        }
      };
    case 'UPDATE_POSITION':
      return {
        ...state,
        resume: {
          ...state.resume,
          positions: state.resume.positions.map(position =>
            position.id === action.payload.id ? { ...position, ...action.payload.data } : position
          )
        }
      };
    case 'DELETE_POSITION':
      return {
        ...state,
        resume: {
          ...state.resume,
          positions: state.resume.positions.filter(position => position.id !== action.payload)
        }
      };
    case 'ADD_CERTIFICATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          certifications: [...state.resume.certifications, action.payload]
        }
      };
    case 'UPDATE_CERTIFICATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          certifications: state.resume.certifications.map(cert =>
            cert.id === action.payload.id ? { ...cert, ...action.payload.data } : cert
          )
        }
      };
    case 'DELETE_CERTIFICATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          certifications: state.resume.certifications.filter(cert => cert.id !== action.payload)
        }
      };
    case 'REORDER_SECTIONS':
      return {
        ...state,
        resume: {
          ...state.resume,
          sections: action.payload
        }
      };
    case 'SET_ACTIVE_SECTION':
      return {
        ...state,
        activeSection: action.payload
      };
    case 'SET_TEMPLATE':
      return {
        ...state,
        resume: {
          ...state.resume,
          template: action.payload
        }
      };
    case 'SET_THEME':
      return {
        ...state,
        resume: {
          ...state.resume,
          theme: action.payload
        }
      };
    case 'LOAD_RESUME':
      return {
        ...state,
        resume: action.payload
      };
    default:
      return state;
  }
}

interface ResumeContextType {
  state: ResumeState;
  dispatch: React.Dispatch<ResumeAction>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(state.resume));
  }, [state.resume]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('resumeData');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        dispatch({ type: 'LOAD_RESUME', payload: parsedData });
      } catch (error) {
        console.error('Failed to load saved resume:', error);
      }
    }
  }, []);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
