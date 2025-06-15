
import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
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
}

export interface Skill {
  id: string;
  name: string;
  level: string;
}

export interface ResumeSection {
  id: string;
  type: 'personal' | 'experience' | 'education' | 'skills';
  title: string;
  isVisible: boolean;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  sections: ResumeSection[];
}

interface ResumeState {
  resume: ResumeData;
  activeSection: string;
}

type ResumeAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'ADD_EXPERIENCE'; payload: Experience }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; data: Partial<Experience> } }
  | { type: 'DELETE_EXPERIENCE'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'UPDATE_SKILL'; payload: { id: string; data: Partial<Skill> } }
  | { type: 'DELETE_SKILL'; payload: string }
  | { type: 'REORDER_SECTIONS'; payload: ResumeSection[] }
  | { type: 'SET_ACTIVE_SECTION'; payload: string }
  | { type: 'LOAD_RESUME'; payload: ResumeData };

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  sections: [
    { id: 'personal', type: 'personal', title: 'Personal Information', isVisible: true },
    { id: 'experience', type: 'experience', title: 'Work Experience', isVisible: true },
    { id: 'education', type: 'education', title: 'Education', isVisible: true },
    { id: 'skills', type: 'skills', title: 'Skills', isVisible: true }
  ]
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
