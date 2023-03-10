import { getCMSIntegration } from '../../cms-integration';
import { render } from '../../test-utils';
import { Footer } from './Footer';

describe('<Footer />', () => {
  test('Snapshot without links', async () => {
    const data = await getCMSIntegration();
    const { container } = render(
      <Footer personalInformation={data.personalInformation} />,
    );
    expect(container).toMatchSnapshot();
  });

  test('Snapshot with links', async () => {
    const data = await getCMSIntegration();
    const { container } = render(
      <Footer
        links={data.links}
        personalInformation={data.personalInformation}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
