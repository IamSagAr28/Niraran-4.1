const axios = require('axios');

// Environment variables
const SHOPIFY_STORE = process.env.SHOPIFY_STORE; // e.g., 'your-store.myshopify.com'
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN; // Admin API Access Token
const API_VERSION = '2024-01';

if (!SHOPIFY_STORE || !SHOPIFY_ADMIN_TOKEN) {
  console.error('❌ Missing Shopify Admin configuration. Check SHOPIFY_STORE and SHOPIFY_ADMIN_TOKEN.');
}

const shopifyClient = axios.create({
  baseURL: `https://${SHOPIFY_STORE}/admin/api/${API_VERSION}`,
  headers: {
    'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
    'Content-Type': 'application/json',
  },
});

/**
 * Find a customer by email.
 * @param {string} email 
 * @returns {Promise<Object|null>} Customer object or null
 */
async function findCustomerByEmail(email) {
  try {
    const response = await shopifyClient.get(`/customers/search.json?query=email:${email}`);
    if (response.data.customers && response.data.customers.length > 0) {
      return response.data.customers[0];
    }
    return null;
  } catch (error) {
    console.error('Error finding Shopify customer:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Create a new customer in Shopify.
 * @param {Object} userData - { firstName, lastName, email }
 * @returns {Promise<Object>} Created customer object
 */
async function createCustomer({ firstName, lastName, email }) {
  try {
    const payload = {
      customer: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        verified_email: true,
        send_email_welcome: false,
      },
    };

    const response = await shopifyClient.post('/customers.json', payload);
    return response.data.customer;
  } catch (error) {
    console.error('Error creating Shopify customer:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Find or create a customer based on Google profile data.
 * @param {Object} googleProfile 
 * @returns {Promise<Object>} Shopify Customer
 */
async function findOrCreateCustomer(googleProfile) {
  const { email, given_name, family_name } = googleProfile;

  let customer = await findCustomerByEmail(email);

  if (customer) {
    console.log(`✅ Found existing Shopify customer: ${customer.id}`);
    return customer;
  }

  console.log(`✨ Creating new Shopify customer for ${email}`);
  customer = await createCustomer({
    firstName: given_name,
    lastName: family_name,
    email: email,
  });

  return customer;
}

/**
 * Subscribe an email to newsletter (creates/updates customer with marketing consent)
 * @param {string} email - Email address to subscribe
 * @returns {Promise<Object>} Result object with success status and customer info
 */
async function subscribeToNewsletter(email) {
  try {
    // Check if customer already exists
    let customer = await findCustomerByEmail(email);

    if (customer) {
      // Update existing customer to enable marketing
      const updatePayload = {
        customer: {
          id: customer.id,
          accepts_marketing: true,
          email_marketing_consent: {
            state: 'subscribed',
            opt_in_level: 'single_opt_in',
            consent_updated_at: new Date().toISOString()
          }
        }
      };

      const response = await shopifyClient.put(`/customers/${customer.id}.json`, updatePayload);
      console.log(`✅ Updated existing customer ${customer.id} with marketing consent`);

      return {
        success: true,
        message: 'Successfully subscribed to newsletter',
        customer: response.data.customer,
        isNew: false
      };
    } else {
      // Create new customer with marketing consent
      const createPayload = {
        customer: {
          email: email,
          verified_email: false,
          send_email_welcome: false,
          accepts_marketing: true,
          email_marketing_consent: {
            state: 'subscribed',
            opt_in_level: 'single_opt_in',
            consent_updated_at: new Date().toISOString()
          }
        }
      };

      const response = await shopifyClient.post('/customers.json', createPayload);
      console.log(`✨ Created new newsletter subscriber: ${response.data.customer.id}`);

      return {
        success: true,
        message: 'Successfully subscribed to newsletter',
        customer: response.data.customer,
        isNew: true
      };
    }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = {
  findCustomerByEmail,
  createCustomer,
  findOrCreateCustomer,
  subscribeToNewsletter,
};
