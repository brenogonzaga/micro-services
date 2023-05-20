describe('Test', () => {
  test('should log "Hello World!" to the console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    console.log('Hello World!');
    expect(consoleSpy).toHaveBeenCalledWith('Hello World!');
  });
});
