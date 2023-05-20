import { render } from '@testing-library/react';
import { App } from '../src/app';

describe('App', () => {
  it('should render "Hello, world!"', () => {
    const { getByText } = render(<App />);
    const helloWorldElement = getByText('Hello, world!');
    expect(helloWorldElement).toBeTruthy();
  });
});
