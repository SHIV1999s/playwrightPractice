class TestData {
  static getValidCredentials() {
    return {
      userEmail: 'shivjayprakashsingh@gmail.com',
      userPassword: 'Shivpratap@123'
    };
  }

  static getInvalidCredentials() {
    return {
      userEmail: 'invalid@example.com',
      userPassword: 'wrongpassword'
    };
  }

  static getMissingEmailData() {
    return {
      userPassword: 'Shivpratap@123'
    };
  }

  static getMissingPasswordData() {
    return {
      userEmail: 'shivjayprakashsingh@gmail.com'
    };
  }

  static getEmptyData() {
    return {};
  }

  static getInvalidJsonData() {
    return 'invalid json';
  }

  static getCustomHeaders() {
    return {
      'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
      'Connection': 'keep-alive',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
      'sec-ch-ua': '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"'
    };
  }
}
module.exports = TestData;
