import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RestTimeLabel } from './';

describe('남은 시간별 텍스트 형태', () => {
  it('남은 시간이 100초 이상일 때', () => {
    render(<RestTimeLabel restTime={140_000} />);
    expect(screen.queryByText(/00시간 02분 20초/)).toBeInTheDocument();
  });
  it('남은 시간이 100초 미만일 때', () => {
    render(<RestTimeLabel restTime={60_000} />);
    expect(screen.getByText('060초')).toBeInTheDocument();
  });
  it('남은 시간이 0초 미만일 때', () => {
    render(<RestTimeLabel restTime={-100} />);
    expect(screen.getByText('000초')).toBeInTheDocument();
  });
});
