import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App';

describe('App', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders title and version', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ json: () => Promise.resolve({ message: 'Hello from ECS backend' }) }),
    );
    render(<App />);
    expect(screen.getByRole('heading', { name: 'CI/CD 自动化演示' })).toBeInTheDocument();
    expect(screen.getByTestId('version')).toHaveTextContent('v1.0.0');
    await waitFor(() => {
      expect(screen.getByTestId('message')).toHaveTextContent('Hello from ECS backend');
    });
  });

  it('shows backend message after fetch resolves', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ json: () => Promise.resolve({ message: 'Hello from ECS backend' }) }),
    );
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId('message')).toHaveTextContent('Hello from ECS backend');
    });
  });

  it('shows fallback when backend is unreachable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId('message')).toHaveTextContent('后端接口不可用');
    });
  });
});
