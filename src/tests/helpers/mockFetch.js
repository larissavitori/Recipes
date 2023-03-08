import mockData from './mockData.json';

function mockFetch(mockedResponses) {
  global.fetch = jest.fn((url) => {
    const response = mockedResponses[url];
    if (!response) {
      return Promise.resolve({
        json: () => Promise.resolve(mockData),
      });
    }
    return Promise.resolve({
      json: () => Promise.resolve(response),
    });
  });
}

export default mockFetch;
