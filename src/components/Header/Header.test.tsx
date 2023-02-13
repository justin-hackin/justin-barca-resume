import { getCMSIntegration } from '../../cms-integration';
import { render } from '../../test-utils';
import { Header } from './Header';

describe('<Header />', () => {
  test('Snapshot', async () => {
    const data = await getCMSIntegration();
    const { container } = render(
      <Header personalInformation={data.personalInformation} />,
    );
    expect(container).toMatchSnapshot();
  });
});
