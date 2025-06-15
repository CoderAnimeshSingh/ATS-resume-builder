
import React from 'react';
import { ResumeProvider } from '../context/ResumeContext';
import ResumeBuilder from '../components/builder/ResumeBuilder';

const Index = () => {
  return (
    <ResumeProvider>
      <ResumeBuilder />
    </ResumeProvider>
  );
};

export default Index;
