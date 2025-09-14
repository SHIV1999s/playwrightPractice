class LoginApiPage {
  constructor(request,expect) {
    this.request = request;
    this.expect = expect;
    this.baseURL = 'https://rahulshettyacademy.com/api/ecom/auth/login';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'Origin': 'https://rahulshettyacademy.com',
      'Referer': 'https://rahulshettyacademy.com/client/'
    };
  }

  // Method to perform login with credentials
  async login(credentials, customHeaders = {}) {
    const headers = { ...this.defaultHeaders, ...customHeaders };
    return await this.request.post(this.baseURL, {
      headers,
      data: credentials
    });
  }

  // Method to perform login with custom data (for testing edge cases)
  async loginWithCustomData(data, customHeaders = {}) {
    const headers = { ...this.defaultHeaders, ...customHeaders };
    
    return await this.request.post(this.baseURL, {
      headers,
      data
    });
  }

  // Method to perform login with invalid JSON
  async loginWithInvalidJson(invalidData, customHeaders = {}) {
    const headers = { ...this.defaultHeaders, ...customHeaders };
    
    return await this.request.post(this.baseURL, {
      headers,
      data: invalidData
    });
  }

  // Validation methods for successful login response
  validateSuccessfulLoginResponse(response, responseBody) {
    // Status code validation
    this.expect(response.status()).toBe(200);

    // Response structure validation
    this.expect(responseBody).toHaveProperty('token');
    this.expect(responseBody).toHaveProperty('userId');
    this.expect(responseBody).toHaveProperty('message');

    // Token format validation (JWT structure)
    this.expect(responseBody.token).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
    this.expect(responseBody.token).toBeTruthy();
    this.expect(typeof responseBody.token).toBe('string');

    // UserId format validation (MongoDB ObjectId)
    this.expect(responseBody.userId).toMatch(/^[0-9a-fA-F]{24}$/);
    this.expect(typeof responseBody.userId).toBe('string');

    // Message validation
    this.expect(responseBody.message).toBe('Login Successfully');

    // Response headers validation
    this.expect(response.headers()['content-type']).toContain('application/json');
  }

  // Validation methods for failed login response
  validateFailedLoginResponse(response, responseBody) {
    // Status code should be 400, 401, or 422
    this.expect([400, 401, 422]).toContain(response.status());

    // Should not contain token on failure
    this.expect(responseBody.token).toBeUndefined();
    
    // Should contain error message
    this.expect(responseBody).toHaveProperty('message');
    this.expect(responseBody.message).toContain("Incorrect email or password.");
  }

  // Validation for missing field responses
  validateMissingFieldResponse(response, responseBody) {
    this.expect([400, 422]).toContain(response.status());
    this.expect(responseBody.token).toBeUndefined();
  }

  // Validation for invalid JSON response
  validateInvalidJsonResponse(response) {
    this.expect([500]).toContain(response.status());
  }

  // JWT token validation
  validateJwtToken(token, expectedEmail) {
    // Decode JWT payload (without verification for testing)
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());

    // Validate JWT payload structure
    this.expect(payload).toHaveProperty('_id');
    this.expect(payload).toHaveProperty('userEmail');
    this.expect(payload).toHaveProperty('userRole');
    this.expect(payload).toHaveProperty('iat');
    this.expect(payload).toHaveProperty('exp');

    // Validate payload values
    this.expect(payload.userEmail).toBe(expectedEmail);
    this.expect(payload.userRole).toBe('customer');

    // Validate token is not expired
    const currentTime = Math.floor(Date.now() / 1000);
    this.expect(payload.exp).toBeGreaterThan(currentTime);

    return payload;
  }

  // CORS headers validation
  validateCorsHeaders(response) {
    const headers = response.headers();
    this.expect(headers['access-control-allow-origin']).toBeDefined();
  }

  // Performance validation
  validateResponseTime(responseTime, maxTime = 5000) {
    this.expect(responseTime).toBeLessThan(maxTime);
  }

  // Utility method to measure response time
  async measureResponseTime(credentials) {
    const startTime = Date.now();
    const response = await this.login(credentials);
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    return { response, responseTime };
  }

  // Method to get response body as JSON
  async getResponseBody(response) {
    return await response.json();
  }

  // Method to log response details
  logResponseDetails(responseBody) {
    console.log('Login response:', {
      token: responseBody.token,
      userId: responseBody.userId,
      message: responseBody.message
    });
  }

  // Method to log JWT payload
  logJwtPayload(payload) {
    console.log('JWT payload:', payload);
  }

  // Method to log response time
  logResponseTime(responseTime) {
    console.log(`Response time: ${responseTime}ms`);
  }
}

module.exports = LoginApiPage;