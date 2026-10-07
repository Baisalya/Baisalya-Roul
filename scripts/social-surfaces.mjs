import { readFileSync } from 'node:fs';

export const previewSettings = JSON.parse(readFileSync(new URL('./preview-settings.json', import.meta.url), 'utf8'));

export const socialSurfaces = [
  { route: '', key: 'baisalya', name: 'Baishalya Roul', label: 'INDEPENDENT SOFTWARE BUILDER', lines: ['Practical software.', 'Built around your work.'], description: 'Explore practical Android, Windows and web products by Baishalya Roul, with product manuals and workflow guides.', logo: 'assets/brand/br-mark-premium.png', accent: '#7ab8ff' },
  { route: 'devdesk', key: 'devdesk', name: 'DevDesk', label: 'KNOWLEDGE & WORKSPACE', lines: ['Notes, research, APIs and code.', 'One connected workspace.'], description: 'A connected workspace for notes, research, developer tools, APIs and software projects, with a detailed visual user manual.', logo: 'devdesk/assets/img/devdesk-logo-512.png', accent: '#9aa5ff' },
  { route: 'construction-erp', key: 'construction-erp', name: 'Construction ERP', label: 'CONSTRUCTION OPERATIONS', lines: ['Organize project operations.', 'Keep site records connected.'], description: 'Explore Construction ERP project operations, features, deployment information and the user manual.', logo: 'construction-erp/assets/icons/favicon.svg', accent: '#ffbd76' },
  { route: 'shoppilot-erp', key: 'shoppilot', name: 'ShopPilot', label: 'BUSINESS WORKSPACE', lines: ['Sales, stock and daily work.', 'A practical business workspace.'], description: 'ShopPilot business software, with product features, Windows download information, quick start and user manual.', logo: 'shoppilot erp/assets/shoppilot-logo.png', accent: '#61dec5' },
  { route: 'EduSheet', key: 'edusheet', name: 'EduSheet', label: 'TEACHER WORKSPACE', lines: ['Syllabus. Lessons. Progress.', 'Plan teaching and create papers.'], description: 'An offline-first teacher workspace for syllabus management, weekly lessons, teaching progress, classroom resources and question papers.', logo: 'EduSheet/assets/images/edusheet-brand-mark.png', accent: '#91b7ff' },
  { route: 'surveycam', key: 'surveycam', name: 'SurveyCam', label: 'FIELD DOCUMENTATION', lines: ['Where, when and why.', 'GPS photos, notes and reports.'], description: 'Capture GPS and timestamped photos and videos, organize project records, add field notes and create PDF photo reports.', logo: 'surveycam/assets/surveycam-logo.png', accent: '#66d4ff' },
  { route: 'notivault-website', key: 'notivault', name: 'NotiVault', label: 'PRIVATE NOTIFICATION HISTORY', lines: ['Capture notification previews.', 'Keep your history on-device.'], description: 'Keep selected Android notification previews private and searchable on-device after setup. Capture depends on what the notification exposes.', logo: 'notivault-website/public/favicon.svg', accent: '#c2a5ff' },
  { route: 'sitesnap', key: 'sitesnap', name: 'SiteSnap', label: 'OPEN-SOURCE FIELD CAMERA', lines: ['The project behind SurveyCam.', 'Explore the Flutter source.'], description: 'The open-source Flutter and Android field-camera project behind SurveyCam, with GPS, timestamp, notes and project reporting workflows.', logo: 'assets/images/sitesnap-logo.png', accent: '#8be0be' },
  { route: 'brightquest-kids', key: 'brightquest', name: 'BrightQuest Kids', label: 'LEARNING & DISCOVERY', lines: ['Explore the learning app.', 'Find downloads and support.'], description: 'Discover BrightQuest Kids, its learning experience, downloads, privacy information and support.', logo: 'BrightQuest_Kids/assets/images/brightquest-logo.png', accent: '#ffd67d' },
  { route: 'paperaid', key: 'paperaid', name: 'PaperAid', label: 'PAPER CREATION WORKSPACE', lines: ['Prepare your next paper.', 'Explore the app and manual.'], description: 'Explore PaperAid paper creation features, downloads, quick start and the complete user manual.', logo: 'paperaid/assets/paperaid-app-icon.png', accent: '#afa3ff' },
];

export const baseSocialImagePath = (surface) => `assets/social/${surface.key}-20261007.png`;
export function socialImagePath(surface, settings = previewSettings) {
  if (surface.key === 'baisalya') {
    if (!settings.portfolioImage) return baseSocialImagePath(surface);
    if (!/^assets\/social\/[a-z0-9-]+\.png$/.test(settings.portfolioImage)) {
      throw new Error('Invalid portfolio preview path: use a PNG inside assets/social.');
    }
    return settings.portfolioImage;
  }
  const ambassadorImage = settings.ambassadorImages?.[surface.key];
  if (settings.ambassadorEnabled === true && ambassadorImage) {
    if (!/^assets\/social\/[a-z0-9-]+\.png$/.test(ambassadorImage)) {
      throw new Error(`Invalid ambassador preview path for ${surface.key}: use a PNG inside assets/social.`);
    }
    return ambassadorImage;
  }
  return baseSocialImagePath(surface);
}
