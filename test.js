import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
  default: jest.fn(() => {
    const result: EarthMovementBarchartDTO = {
      totalLocationCount: 4,
      totalTIV: 200,
      totalActiveLocationCount: 4,
      totalActiveTIV: 200,
      earthquake_frequency_zone_aggregates: [
        {
          zoneCode: '50',
          zoneDescription: '50',
          totalLocationCount: 4,
          totalTIV: 200,
          activeLocationCount: 4,
          activeTIV: 200,
          prospectLocationCount: 10,
          prospectTIV: 10,
        },
      ],
      earthquake_region_aggregates: [
        {
          regionCode: 'REGION1',
          regionDescription: 'Region 1',
          totalLocationCount: 4,
          totalTIV: 200,
          activeLocationCount: 4,
          activeTIV: 200,
        },
      ],
      as_of_date: '',
      currency_type_id: null,
      org_prospect_client_id: null,
      riskQuality: 'Minimal',
      activeLocationsRiskQuality: 'Minimal',
    };
    return result;
  }),
}));

jest.mock('src/hooks/useFetchWindBarChartData', () => ({
  __esModule: true,
  default: jest.fn(() => {
    const result: WindBarChartDTO = {
      as_of_date: '',
      currency_type_id: null,
      org_prospect_client_id: null,
      totalLocationCount: 4,
      totalTIV: 200,
      totalActiveLocationCount: 4,
      totalActiveTIV: 200,
      windLossExpectancy: 100,
      windLossActiveExpectancy: 110,
      wind_region_aggregates: [
        {
          windRegion: 'North',
          location_aggregates: {
            totalInsuredValue: 3,
            windLossExpectancy: 4,
            locationCount: 5,
          },
          active_location_aggregates: {
            totalInsuredValue: 1,
            windLossExpectancy: 3,
            locationCount: 5,
          },
          wind_tier_aggregates: [
            {
              underWritingWindTierCode: 'North',
              underWritingWindTierDescription: 'severe',
              totalLocationCount: 200,
              totalTIV: 800,
              windLossExpectancy: 100,
    
              activeLocationCount: 100,
              activeTIV: 100,
              windLossActiveExpectancy: 200,
    
              prospectTIV: 400,
              windLossProspectExpectancy: 200,
              prospectLocationCount: 300,
            },
          ],
        },
      ],
      riskQuality: 'Minimal',
      activeLocationsRiskQuality: 'Minimal',
    };
    return result;
  }),
}));
jest.mock('src/hooks/useFetchFloodBarData', () => ({
  __esModule: true,
  useFetchFloodBarAndAccordionData: jest.fn(() => {
    const result: FloodBarChartDTO = {
      org_prospect_client_id: 9966,
      as_of_date: '2024-05-24',
      currency_type_id: 47,
      floodAggData: [
        {
          flood_hazard_frequency: 'High',
          location_aggregates: {
            total_insured_value: 10,
            hundred_year_loss_expectancy: 10,
            five_hundred_year_loss_expectancy: 10,
            location_count: 10,
          },
          active_location_aggregates: {
            total_insured_value: 10,
            hundred_year_loss_expectancy: 10,
            five_hundred_year_loss_expectancy: 10,
            location_count: 10,
          },
          prospect_location_aggregates: {
            total_insured_value: 10,
            hundred_year_loss_expectancy: 10,
            five_hundred_year_loss_expectancy: 10,
            location_count: 10,
          },
        },
      ],
      totalLocationCount: 4,
      totalTIV: 200,
      totalActiveLocationCount: 4,
      totalActiveTIV: 250,
      riskQuality: 'Very Severe',
      activeLocationsRiskQuality: 'Severe',
    };

    return result;
  }),
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
