
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
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <div className="max-w-full mx-auto p-3 sm:p-4 lg:p-6">
        {/* Mobile Preview Toggle */}
        <div className="xl:hidden mb-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
          >
            <Eye className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-700">
              {showPreview ? 'Show Builder' : 'Show Preview'}
            </span>
            {showPreview ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 min-h-[calc(100vh-200px)]">
          {/* Builder Section */}
          <div className={`space-y-4 lg:space-y-6 ${showPreview ? 'hidden xl:block' : 'block'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Resume Builder</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary" className="text-xs">Professional</Badge>
                    <Badge variant="outline" className="text-xs">ATS-Ready</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <ThemeToggle />
                <ExportButton />
              </div>
            </div>

            <ResumeValidator />

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3 border-b border-gray-100">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Settings className="w-5 h-5 text-blue-600" />
                  <span>Resume Sections</span>
                </CardTitle>
                <CardDescription className="text-sm">
                  Fill in your information to create a professional, ATS-friendly resume
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <ScrollArea className="w-full">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 h-auto p-1 bg-gray-100/50">
                      {formSections.map((section) => {
                        const Icon = section.icon;
                        return (
                          <TabsTrigger
                            key={section.id}
                            value={section.id}
                            className="flex flex-col items-center space-y-1 p-2 sm:p-3 text-xs data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm transition-all duration-200"
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-center leading-tight">{section.label}</span>
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>
                  </ScrollArea>

                  <Separator className="my-4" />

                  <ScrollArea className="h-[500px] sm:h-[600px] w-full">
                    {formSections.map((section) => {
                      const Component = section.component;
                      return (
                        <TabsContent key={section.id} value={section.id} className="mt-0">
                          <div className="p-2">
                            <Component />
                          </div>
                        </TabsContent>
                      );
                    })}
                  </ScrollArea>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className={`space-y-4 lg:space-y-6 ${!showPreview ? 'hidden xl:block' : 'block'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Live Preview</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">A4 Format</Badge>
                    <Badge variant="secondary" className="text-xs">Print Ready</Badge>
                  </div>
                </div>
              </div>
            </div>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="relative">
                  <ResumePreview />
                </div>
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
