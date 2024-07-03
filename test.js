import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import NatHazOverview from './NatHazOverview';
import { useLocation } from 'react-router-dom';
import {
  EarthMovementBarchartDTO,
  WindBarChartDTO,
  FloodBarChartDTO,
} from '@btp/shared-ui';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
  useLocation: jest.fn(),
}));

jest.mock(
  'src/NatHazDetails/NatHazFilters/hooks/useFetchAccountAggregate',
  () => ({
    __esModule: true,
    default: () => ({
      accountAggregate: {
        totalInsureValue: 1000000,
        locationCount: 50,
        activeInsuredValue: 25000,
        activeLocationCount: 30,
      },
      error: null,
    }),
  }),
);

jest.mock('src/hooks/useGetAccountDetails', () => ({
  __esModule: true,
  useGetAccountDetails: jest.fn(() => {
    return {
      setOrgId: jest.fn(),
    };
  }),
}));

jest.mock('src/hooks/useFetchEarthMovementBarData', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('src/hooks/useFetchWindBarChartData', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('src/hooks/useFetchFloodBarData', () => ({
  __esModule: true,
  useFetchFloodBarAndAccordionData: jest.fn(),
}));

jest.mock('src/common/contexts/HeaderContext', () => ({
  __esModule: true,
  useHeader: jest.fn(() => ({
    activeModule: 'dfd',
    setActiveModule: jest.fn(),
    activeTab: 0,
    setActiveTab: jest.fn(),
    asofDate: null,
  })),
}));

jest.mock('@btp/shared-ui', () => ({
  ...jest.requireActual('@btp/shared-ui'),
  useShellNavigation: jest.fn(() => {
    return {
      navigateToBoB: jest.fn(),
    };
  }),
  ColorThemes: {
    Prospect: 'Prospect',
    Active: 'Active',
  },
  RiskStatus: {
    VERY_SEVERE: 'Very Severe',
    MODERATE: 'Moderate',
    SEVERE: 'Severe',
    MINIMAL: 'Minimal',
  },
  NATURAL_HAZARDS_FLOOD_ENABLED: 'natural-hazards-flood-enabled',
  NATURAL_HAZARDS_WIND_ENABLED: 'natural-hazards-wind-enabled',
  NATURAL_HAZARDS_EARTHQUAKE_ENABLED: 'natural-hazards-earthquake-enabled',
}));

jest.mock('src/common/contexts/RouteParamsContext', () => ({
  __esModule: true,
  useRouteParams: jest.fn(() => {
    return { routeParams: {}, setRouteParams: jest.fn() };
  }),
}));

jest.mock('src/common/components/RightUtilityBar', () => ({
  __esModule: true,
  RightUtilityBar: () => null,
}));

jest.mock('src/common/contexts/AccountContext', () => ({
  __esModule: true,
  useAccount: jest.fn(() => {
    return { accountDetails: {} };
  }),
}));

jest.useFakeTimers();

describe('NatHaz Overview Component', () => {
  it('NatHaz overview page is rendered successfully', () => {
    render(<NatHazOverview />);
    expect(screen.getByTestId('overview')).toBeDefined();
  });

  it('does not set activeTab if pathname is overview and activeTab is 0', () => {
    const mockSetActiveTab = jest.fn();
    const mockUseHeader = require('src/common/contexts/HeaderContext').useHeader;
    mockUseHeader.mockReturnValue({
      activeTab: 0,
      setActiveTab: mockSetActiveTab,
    });

    useLocation.mockReturnValue({
      pathname: '/7765/',
    });

    render(<NatHazOverview />);

    expect(mockSetActiveTab).not.toHaveBeenCalledWith(0);
  });

  it('calls the refetch functions on mount', async () => {
    const mockEarthMovementRefetch = jest.fn();
    const mockWindRefetch = jest.fn();
    const mockFloodRefetch = jest.fn();

    require('src/hooks/useFetchEarthMovementBarData').default.mockReturnValueOnce({
      EarthMovementAttributes: {},
      loading: false,
      errorCode: null,
      refetch: mockEarthMovementRefetch,
    });
    require('src/hooks/useFetchWindBarChartData').default.mockReturnValueOnce({
      WindAttributes: {},
      loading: false,
      errorCode: null,
      refetch: mockWindRefetch,
    });
    require('src/hooks/useFetchFloodBarData').useFetchFloodBarAndAccordionData.mockReturnValueOnce({
      FloodAttributes: {},
      loading: false,
      errorCode: null,
      refetch: mockFloodRefetch,
    });

    render(<NatHazOverview />);

    await waitFor(() => {
      expect(mockEarthMovementRefetch).toHaveBeenCalled();
      expect(mockWindRefetch).toHaveBeenCalled();
      expect(mockFloodRefetch).toHaveBeenCalled();
    });
  });

  it('navigates to the correct URL when a peril title is clicked', () => {
    render(<NatHazOverview />);

    const floodTitle = screen.getByText('Flood');
    fireEvent.click(floodTitle);

    expect(mockUsedNavigate).toHaveBeenCalledWith(
      expect.stringContaining('FloodURL')
    );

    const windTitle = screen.getByText('Wind');
    fireEvent.click(windTitle);

    expect(mockUsedNavigate).toHaveBeenCalledWith(
      expect.stringContaining('WindURL')
    );

    const earthMovementTitle = screen.getByText('Earth Movement');
    fireEvent.click(earthMovementTitle);

    expect(mockUsedNavigate).toHaveBeenCalledWith(
      expect.stringContaining('EarthURL')
    );
  });
});
