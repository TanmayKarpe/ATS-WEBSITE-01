/**
 * GLOBAL EMAIL UTILITY - ENFORCED CC RULE
 * ALL emails sent through this website MUST include ats@nmu.ac.in in CC
 * This is non-negotiable and applies to all email-triggering actions
 * 
 * Uses mailto: to open user's default email client (Outlook, Apple Mail, etc.)
 */

const ATS_COORDINATOR_EMAIL = 'ats@nmu.ac.in';

type EmailRecipient = string | string[];

type EmailParams = {
  to: EmailRecipient;
  cc?: EmailRecipient;
  subject?: string;
  body?: string;
};

const encodeList = (value?: EmailRecipient) => {
  if (!value) return '';
  return Array.isArray(value) ? value.join(',') : value;
};

/**
 * Builds mailto: URL with ENFORCED CC to ATS Coordinator
 * The CC is automatically injected and cannot be bypassed
 * Opens in user's default email client
 */
export const buildGmailUrl = ({ to, cc, subject, body }: EmailParams) => {
  const toAddress = encodeList(to);
  
  // ENFORCE CC: Always include ATS Coordinator, merge with any additional CC
  let ccList = [ATS_COORDINATOR_EMAIL];
  if (cc) {
    const additionalCC = Array.isArray(cc) ? cc : [cc];
    ccList = [...ccList, ...additionalCC];
  }
  const encodedCC = encodeURIComponent(ccList.join(','));
  
  const subjectParam = subject ? `&subject=${encodeURIComponent(subject)}` : '';
  const bodyParam = body ? `&body=${encodeURIComponent(body)}` : '';
  
  // Development logging (verify CC is present)
  if (process.env.NODE_ENV === 'development') {
    console.log('[Email Debug] mailto: URL generated');
    console.log('[Email Debug] CC enforced:', ATS_COORDINATOR_EMAIL);
  }
  
  // mailto: format - opens in default email client
  return `mailto:${toAddress}?cc=${encodedCC}${subjectParam}${bodyParam}`;
};

export const openGmailCompose = (params: EmailParams) => {
  const mailtoUrl = buildGmailUrl(params);
  
  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[Email Debug] Opening default email client');
  }
  
  // Open in default email client (Outlook, Apple Mail, Thunderbird, etc.)
  window.location.href = mailtoUrl;
};
