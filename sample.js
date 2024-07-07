
// handleTitleClick.test.js
import { handleTitleClick } from './handleTitleClick';

const NatHazModuleUrlRouteEnum = {
  FLOODURL: 'flood-url',
  WINDURL: 'wind-url',
  EARTHURL: 'earth-url',
};

describe('handleTitleClick', () => {
  let mockNavigate;
  let mockGetNavigationUrl;
  let mockAccountDetails;
  let mockPathname;
  let mockFloodEnabled;
  let mockWindEnabled;
  let mockEarthquakeEnabled;

  beforeEach(() => {
    mockNavigate = jest.fn();
    mockGetNavigationUrl = jest.fn(() => '/mocked-url');
    mockAccountDetails = { orgid: 'test-org-id' };
    mockPathname = '/test-path';
    mockFloodEnabled = true;
    mockWindEnabled = false;
    mockEarthquakeEnabled = true;
  });

  test('should navigate to the correct URL for Flood when enabled', () => {
    handleTitleClick('Flood', mockFloodEnabled, mockWindEnabled, mockEarthquakeEnabled, mockNavigate, mockGetNavigationUrl, mockPathname, mockAccountDetails);

    expect(mockNavigate).toHaveBeenCalledWith('/mocked-url');
    expect(mockGetNavigationUrl).toHaveBeenCalledWith({
      locationPath: mockPathname,
      orgId: mockAccountDetails.orgid,
      pageUrl: NatHazModuleUrlRouteEnum.FLOODURL,
    });
  });

  test('should not navigate for Wind when disabled', () => {
    handleTitleClick('Wind', mockFloodEnabled, mockWindEnabled, mockEarthquakeEnabled, mockNavigate, mockGetNavigationUrl, mockPathname, mockAccountDetails);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('should navigate to the correct URL for Earth Movement when enabled', () => {
    handleTitleClick('Earth Movement', mockFloodEnabled, mockWindEnabled, mockEarthquakeEnabled, mockNavigate, mockGetNavigationUrl, mockPathname, mockAccountDetails);

    expect(mockNavigate).toHaveBeenCalledWith('/mocked-url');
    expect(mockGetNavigationUrl).toHaveBeenCalledWith({
      locationPath: mockPathname,
      orgId: mockAccountDetails.orgid,
      pageUrl: NatHazModuleUrlRouteEnum.EARTHURL,
    });
  });

  test('should not navigate for unknown title', () => {
    handleTitleClick('Unknown', mockFloodEnabled, mockWindEnabled, mockEarthquakeEnabled, mockNavigate, mockGetNavigationUrl, mockPathname, mockAccountDetails);

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
