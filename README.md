
# Professional Resume Builder

A modern, ATS-friendly resume builder built with React and TypeScript that helps you create professional resumes with ease. Features real-time preview, multiple themes, PDF export, and intelligent resume validation.

![Resume Builder Demo](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-06B6D4)

## ✨ Features

### 🎨 **Professional Templates & Themes**
- Clean, ATS-optimized resume layouts
- Multiple color themes (Light/Dark mode)
- A4 size formatting for professional printing
- Mobile-responsive design

### 📝 **Comprehensive Resume Sections**
- **Personal Information** - Name, contact details, professional summary
- **Social Links** - LinkedIn, GitHub, LeetCode, and custom profiles
- **Education** - Degrees, institutions, CGPA, and academic achievements
- **Technical Skills** - Categorized skill sets with proficiency levels
- **Work Experience** - Professional history with detailed descriptions
- **Academic Projects** - Project showcases with technologies and links
- **Positions of Responsibility** - Leadership roles and responsibilities
- **Certifications** - Professional certifications and achievements

### 🚀 **Advanced Functionality**
- **Real-time Preview** - See changes instantly as you type
- **Resume Validation** - Intelligent scoring system with improvement suggestions
- **ATS Optimization** - Built-in tips for Applicant Tracking System compatibility
- **PDF Export** - High-quality PDF generation with proper formatting
- **Data Persistence** - Auto-save functionality to prevent data loss
- **Drag & Drop** - Reorder sections and items easily

### 🎯 **ATS-Friendly Design**
- Clean, parseable formatting
- Standard section headings
- Optimal keyword placement
- Professional typography
- Consistent spacing and alignment

## 🛠️ Technology Stack

- **Frontend Framework:** React 18.3.1 with TypeScript
- **Styling:** Tailwind CSS with custom components
- **UI Components:** Shadcn/ui component library
- **PDF Generation:** jsPDF with html2canvas
- **Form Handling:** React Hook Form with Zod validation
- **State Management:** React Context API
- **Build Tool:** Vite
- **Icons:** Lucide React

## 🚀 Quick Start

### Prerequisites

- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/professional-resume-builder.git
   cd professional-resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📱 Usage Guide

### Getting Started
1. **Personal Information**: Fill in your basic details and professional summary
2. **Social Links**: Add your professional profiles (LinkedIn, GitHub, etc.)
3. **Education**: Include your academic background with relevant details
4. **Skills**: Categorize your technical skills by type and proficiency
5. **Experience**: Add your work history with detailed descriptions
6. **Projects**: Showcase your best academic and personal projects
7. **Additional Sections**: Include certifications and leadership positions

### Resume Optimization
- Use the **Resume Validator** to get a completion score and improvement suggestions
- Follow **ATS optimization tips** provided in the validation panel
- Ensure all critical sections are completed for maximum impact
- Use relevant keywords from your target job descriptions

### Exporting Your Resume
- Click the **Export PDF** button to generate a professional PDF
- The exported file will be optimized for ATS scanning
- File naming follows professional conventions: `FirstName_LastName_Resume.pdf`

## 🎨 Customization

### Themes
The application supports multiple themes that can be toggled:
- **Light Theme**: Clean, professional appearance
- **Dark Theme**: Modern, eye-friendly alternative

### Layout Customization
- Sections are automatically arranged for optimal readability
- Content adapts to different screen sizes
- Print-optimized formatting ensures perfect A4 layout

## 🔧 Configuration

### Environment Setup
No additional environment variables are required for basic functionality. The application works out of the box after installation.

### Advanced Configuration
For custom deployments or integrations, you can modify:
- Theme colors in `tailwind.config.ts`
- PDF export settings in `src/utils/pdfExport.ts`
- Validation rules in `src/components/builder/ResumeValidator.tsx`

## 📁 Project Structure

```
src/
├── components/
│   ├── builder/           # Resume building components
│   │   ├── forms/        # Form components for each section
│   │   ├── ExportButton.tsx
│   │   ├── ResumeValidator.tsx
│   │   └── ThemeToggle.tsx
│   ├── preview/          # Resume preview components
│   └── ui/               # Reusable UI components
├── context/              # React context for state management
├── utils/                # Utility functions and helpers
├── pages/                # Application pages
└── types/                # TypeScript type definitions
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Follow the existing code style and conventions
2. Write meaningful commit messages
3. Add tests for new functionality
4. Update documentation as needed
5. Ensure all builds pass before submitting

### Setting Up Development Environment
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add some amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the comprehensive icon set
- [jsPDF](https://github.com/parallax/jsPDF) for PDF generation capabilities

## 📞 Support

If you encounter any issues or have questions:

1. **Check the Issues**: Look through existing GitHub issues
2. **Create a New Issue**: If your problem isn't addressed, open a new issue
3. **Documentation**: Refer to this README and inline code comments

## 🎯 Roadmap

- [ ] Additional resume templates
- [ ] Integration with job boards
- [ ] Resume analytics and insights
- [ ] Collaborative editing features
- [ ] Advanced ATS scoring algorithms
- [ ] Multi-language support

---

**Made with ❤️ for job seekers worldwide**

*Build your professional resume with confidence and land your dream job!*
