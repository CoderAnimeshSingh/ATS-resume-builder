import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';

// Form components
import PersonalInfoForm from './forms/PersonalInfoForm';
import SocialLinksForm from './forms/SocialLinksForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import TechnicalSkillsForm from './forms/TechnicalSkillsForm';
import ExperienceForm from './forms/ExperienceForm';
import ProjectsForm from './forms/ProjectsForm';
import PositionsForm from './forms/PositionsForm';
import CertificationsForm from './forms/CertificationsForm';

// Other components
import ResumePreview from '../preview/ResumePreview';
import ExportButton from './ExportButton';
import ThemeToggle from './ThemeToggle';
import ResumeValidator from './ResumeValidator';
import Header from './Header';
import BrandingFooter from './BrandingFooter';

// Icons
import { 
  User, 
  Link, 
  GraduationCap, 
  Code, 
  Briefcase, 
  FolderOpen, 
  Trophy, 
  Award,
  FileText,
  Eye,
  Settings
} from 'lucide-react';

const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState('personal');

  const formSections = [
    { id: 'personal', label: 'Personal Info', icon: User, component: PersonalInfoForm },
    { id: 'social', label: 'Social Links', icon: Link, component: SocialLinksForm },
    { id: 'education', label: 'Education', icon: GraduationCap, component: EducationForm },
    { id: 'skills', label: 'Skills', icon: Code, component: SkillsForm },
    { id: 'technical', label: 'Technical Skills', icon: Settings, component: TechnicalSkillsForm },
    { id: 'experience', label: 'Experience', icon: Briefcase, component: ExperienceForm },
    { id: 'projects', label: 'Projects', icon: FolderOpen, component: ProjectsForm },
    { id: 'positions', label: 'Positions', icon: Trophy, component: PositionsForm },
    { id: 'certifications', label: 'Certifications', icon: Award, component: CertificationsForm },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-full mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Builder Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Resume Builder</h2>
                <Badge variant="secondary" className="text-xs">Professional</Badge>
              </div>
              <div className="flex items-center space-x-3">
                <ThemeToggle />
                <ExportButton />
              </div>
            </div>

            <ResumeValidator />

            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Resume Sections</span>
                </CardTitle>
                <CardDescription>
                  Fill in your information to create a professional, ATS-friendly resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <ScrollArea className="w-full">
                    <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 gap-1 h-auto p-1">
                      {formSections.map((section) => {
                        const Icon = section.icon;
                        return (
                          <TabsTrigger
                            key={section.id}
                            value={section.id}
                            className="flex flex-col items-center space-y-1 p-3 text-xs data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                          >
                            <Icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{section.label}</span>
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>
                  </ScrollArea>

                  <Separator className="my-4" />

                  <ScrollArea className="h-[600px] w-full">
                    {formSections.map((section) => {
                      const Component = section.component;
                      return (
                        <TabsContent key={section.id} value={section.id} className="mt-0">
                          <Component />
                        </TabsContent>
                      );
                    })}
                  </ScrollArea>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Eye className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Live Preview</h2>
                <Badge variant="outline" className="text-xs">A4 Format</Badge>
              </div>
            </div>

            <Card className="shadow-lg">
              <CardContent className="p-0">
                <ResumePreview />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <BrandingFooter />
    </div>
  );
};

export default ResumeBuilder;
