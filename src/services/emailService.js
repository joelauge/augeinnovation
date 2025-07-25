import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

/**
 * Send user signup notification to admin emails
 * @param {Object} userData - User data from Clerk
 * @returns {Promise} EmailJS response
 */
export const sendUserSignupNotification = async (userData) => {
  try {
    // Check if EmailJS is configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS not configured. Skipping email notification.');
      return { success: false, error: 'EmailJS not configured' };
    }

    // Prepare email template parameters
    const templateParams = {
      user_name: `${userData.firstName} ${userData.lastName}`,
      user_email: userData.emailAddresses?.[0]?.emailAddress || 'No email provided',
      user_organization: userData.publicMetadata?.organization || 'Not specified',
      signup_date: new Date().toLocaleString(),
      user_id: userData.id,
      approval_link: `${window.location.origin}/admin`,
      user_details: `
        Name: ${userData.firstName} ${userData.lastName}
        Email: ${userData.emailAddresses?.[0]?.emailAddress || 'No email provided'}
        Organization: ${userData.publicMetadata?.organization || 'Not specified'}
        Signup Date: ${new Date().toLocaleString()}
        User ID: ${userData.id}
      `
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('User signup notification sent successfully:', response);
    return { success: true, response };

  } catch (error) {
    console.error('Error sending user signup notification:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send user approval notification to the user
 * @param {Object} userData - User data from Clerk
 * @returns {Promise} EmailJS response
 */
export const sendUserApprovalNotification = async (userData) => {
  try {
    // Check if EmailJS is configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS not configured. Skipping approval notification.');
      return { success: false, error: 'EmailJS not configured' };
    }

    const templateParams = {
      to_email: userData.emailAddresses?.[0]?.emailAddress,
      user_name: `${userData.firstName} ${userData.lastName}`,
      approval_date: new Date().toLocaleString(),
      dashboard_link: `${window.location.origin}/dashboard`,
      admin_name: 'Auge Innovation Admin Team'
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_approval', // You'll need to create this template
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('User approval notification sent successfully:', response);
    return { success: true, response };

  } catch (error) {
    console.error('Error sending user approval notification:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send user rejection notification to the user
 * @param {Object} userData - User data from Clerk
 * @param {string} reason - Reason for rejection
 * @returns {Promise} EmailJS response
 */
export const sendUserRejectionNotification = async (userData, reason = '') => {
  try {
    // Check if EmailJS is configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS not configured. Skipping rejection notification.');
      return { success: false, error: 'EmailJS not configured' };
    }

    const templateParams = {
      to_email: userData.emailAddresses?.[0]?.emailAddress,
      user_name: `${userData.firstName} ${userData.lastName}`,
      rejection_date: new Date().toLocaleString(),
      rejection_reason: reason || 'Your application did not meet our current requirements.',
      contact_email: 'support@augeinnovation.com',
      admin_name: 'Auge Innovation Admin Team'
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_rejection', // You'll need to create this template
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('User rejection notification sent successfully:', response);
    return { success: true, response };

  } catch (error) {
    console.error('Error sending user rejection notification:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Initialize EmailJS
 */
export const initializeEmailJS = () => {
  if (EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log('EmailJS initialized successfully');
  } else {
    console.warn('EmailJS public key not found. Email notifications will be disabled.');
  }
}; 