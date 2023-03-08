function mockFetch(mockedResponses, defaultResponse) {
  global.fetch = jest.fn((url) => {
    const response = mockedResponses[url];
    if (!response) {
      return Promise.resolve({
        json: () => Promise.resolve(defaultResponse),
      });
    }
    return Promise.resolve({
      json: () => Promise.resolve(response),
    });
  });
}

export default mockFetch;
