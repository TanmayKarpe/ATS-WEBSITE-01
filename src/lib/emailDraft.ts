/**
 * GLOBAL EMAIL UTILITY - ENFORCED CC RULE
 * ALL emails sent through this website MUST include ats@nmu.ac.in in CC
 * This is non-negotiable and applies to all email-triggering actions
 * 
 * Uses mailto: to open user's default email client (Outlook, Apple Mail, etc.)
 */

const ATS_COORDINATOR_EMAIL = 'ats@nmu.ac.in';

export const openEmailDraft = (recipientEmail: string, subject: string, body: string) => {
  // Build mailto: URL with enforced CC to ATS Coordinator
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  const encodedCC = encodeURIComponent(ATS_COORDINATOR_EMAIL);
  
  // mailto: format - opens in default email client
  const mailtoUrl = `mailto:${recipientEmail}?cc=${encodedCC}&subject=${encodedSubject}&body=${encodedBody}`;
  
  // Development logging (verify CC is present)
  if (process.env.NODE_ENV === 'development') {
    console.log('[Email Debug] mailto: URL generated');
    console.log('[Email Debug] CC enforced:', ATS_COORDINATOR_EMAIL);
    console.log('[Email Debug] Full URL:', mailtoUrl);
  }
  
  // Open in default email client
  window.location.href = mailtoUrl;
};
