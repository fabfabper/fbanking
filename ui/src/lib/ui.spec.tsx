import { render } from '@testing-library/react';

import FbankingUi from './ui';

describe('FbankingUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FbankingUi />);
    expect(baseElement).toBeTruthy();
  });
});
