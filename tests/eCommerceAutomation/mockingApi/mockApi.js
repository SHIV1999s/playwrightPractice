class MockAPI {
  constructor() {
    this.baseUrl = 'https://mock-api.example.com';
  }

  async getData() {
    // Simulate network delay (100ms - 2000ms)
    const delay = Math.random() * 1900 + 100;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Generate 1 single item only
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Item 1',
      value: Math.floor(Math.random() * 1000),
      status: Math.random() > 0.9 ? 'active' : 'inactive',
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = MockAPI;