// File: tests/loginApi.spec.js
const { test, expect } = require('@playwright/test');
const LoginApiPage = require('../../apiHandlers/loginApi/loginApi');
const TestData = require('../../apiHandlers/loginApi/testData');

test.describe('Login API Tests', { tag: '@loginApiCallTesting' }, () => {
    let loginApiPage;

    test.beforeEach(async ({ request }) => {
        loginApiPage = new LoginApiPage(request,expect);
    });

    test('Successful login with valid credentials', async () => {
        const credentials = TestData.getValidCredentials();

        // Perform login
        const response = await loginApiPage.login(credentials);
        const responseBody = await loginApiPage.getResponseBody(response);

        // Validate response
        loginApiPage.validateSuccessfulLoginResponse(response, responseBody);

        // Log response details
        loginApiPage.logResponseDetails(responseBody);
    });

    test('Failed login with invalid credentials', async () => {
        const credentials = TestData.getInvalidCredentials();
        const customHeaders = TestData.getCustomHeaders();

        // Perform login with invalid credentials
        const response = await loginApiPage.login(credentials, customHeaders);
        const responseBody = await loginApiPage.getResponseBody(response);

        // Validate failed response
        loginApiPage.validateFailedLoginResponse(response, responseBody);
    });

    test('Login with missing email field', async () => {
        const data = TestData.getMissingEmailData();

        // Perform login with missing email
        const response = await loginApiPage.loginWithCustomData(data);
        const responseBody = await loginApiPage.getResponseBody(response);

        // Validate missing field response
        loginApiPage.validateMissingFieldResponse(response, responseBody);
    });

    test('Login with missing password field', async () => {
        const data = TestData.getMissingPasswordData();

        // Perform login with missing password
        const response = await loginApiPage.loginWithCustomData(data);
        const responseBody = await loginApiPage.getResponseBody(response);

        // Validate missing field response
        loginApiPage.validateMissingFieldResponse(response, responseBody);
    });

    test('Login with empty request body', async () => {
        const data = TestData.getEmptyData();

        // Perform login with empty data
        const response = await loginApiPage.loginWithCustomData(data);

        // Validate empty data response
        expect([400, 422]).toContain(response.status());
    });

    test('Login with invalid JSON format', async () => {
        const invalidData = TestData.getInvalidJsonData();

        // Perform login with invalid JSON
        const response = await loginApiPage.loginWithInvalidJson(invalidData);

        // Validate invalid JSON response
        loginApiPage.validateInvalidJsonResponse(response);
        console.log(response.status());
    });

    test('Validate response time performance', async () => {
        const credentials = TestData.getValidCredentials();

        // Measure response time
        const { response, responseTime } = await loginApiPage.measureResponseTime(credentials);

        // Validate response and performance
        expect(response.status()).toBe(200);
        loginApiPage.validateResponseTime(responseTime);
        loginApiPage.logResponseTime(responseTime);
    });

    test('Validate JWT token structure and expiration', async () => {
        const credentials = TestData.getValidCredentials();

        // Perform login
        const response = await loginApiPage.login(credentials);
        const responseBody = await loginApiPage.getResponseBody(response);

        // Validate response status
        expect(response.status()).toBe(200);

        // Validate JWT token
        const payload = loginApiPage.validateJwtToken(responseBody.token, credentials.userEmail);

        // Log JWT payload
        loginApiPage.logJwtPayload(payload);
    });

    test('Validate CORS headers', async () => {
        const credentials = TestData.getValidCredentials();
        const corsHeaders = { 'Origin': 'https://rahulshettyacademy.com' };

        // Perform login with CORS headers
        const response = await loginApiPage.login(credentials, corsHeaders);

        // Validate response status
        expect(response.status()).toBe(200);

        // Validate CORS headers
        loginApiPage.validateCorsHeaders(response);
    });
});