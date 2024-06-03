import { calculateTIV, createBarChart, getEarthMovementBarData, getEarthMovementRegionData, CreateEarthMovementBarChart } from './EarthMovementBarChart';
import { formatAmount } from 'src/mappers/natHazMappers';

// Mock dependencies
jest.mock('shared-ui/src/lib/HighCharts/BarChart/colorThemes', () => ({
  ColorThemes: {
    Prospect: 'ProspectTheme',
    Active: 'ActiveTheme'
  }
}));
jest.mock('src/mappers/natHazMappers', () => ({
  formatAmount: jest.fn((amount: number) => `$${amount.toFixed(2)}`)
}));
jest.mock('src/NatHazOverview/NatHazOverview.mock', () => ({
  actionsMock: jest.fn()
}));

describe('EarthMovementBarChart Utilities', () => {
  const mockResponses = [
    { zone: 'zone1', activeTIV: 100, active_locations: 10, prospectTIV: 200, prospect_locations: 20 },
    { zone: 'zone2', activeTIV: 300, active_locations: 30, prospectTIV: 400, prospect_locations: 40 }
  ];

  describe('calculateTIV', () => {
    it('calculates TIV percentage correctly for active type', () => {
      const tiv = calculateTIV(mockResponses, mockResponses[0], 'active');
      expect(tiv).toBe('25.00');
    });

    it('calculates TIV percentage correctly for prospect type', () => {
      const tiv = calculateTIV(mockResponses, mockResponses[1], 'prospect');
      expect(tiv).toBe('66.67');
    });
  });

  describe('createBarChart', () => {
    const mockActiveZoneData = [
      { barValue: 100 },
      { barValue: 200 }
    ];
    const mockProspectZoneData = [
      { barValue: 300 },
      { barValue: 400 }
    ];

    it('creates bar chart data correctly', () => {
      const barChartData = createBarChart(mockActiveZoneData, mockProspectZoneData);
      expect(barChartData).toBeDefined();
    });
  });

  describe('getEarthMovementBarData', () => {
    it('processes response correctly to aggregate data', () => {
      const { activezoneData, prospectzoneData } = getEarthMovementBarData(mockResponses);
      expect(activezoneData.length).toBe(2);
      expect(prospectzoneData.length).toBe(2);
    });
  });

  describe('getEarthMovementRegionData', () => {
    const mockRegionResponse = [
      { region: 'region1', activeTIV: 100, active_location_count: 10, prospectTIV: 200, prospect_location_count: 20 },
      { region: 'region2', activeTIV: 300, active_location_count: 30, prospectTIV: 400, prospect_location_count: 40 }
    ];

    it('processes response correctly to aggregate region data', () => {
      const { regionActiveTable, regionProspectTable } = getEarthMovementRegionData(mockRegionResponse);
      expect(regionActiveTable.length).toBe(2);
      expect(regionProspectTable.length).toBe(2);
    });
  });

  describe('CreateEarthMovementBarChart', () => {
    it('creates Earth Movement Bar Chart data correctly', () => {
      const result = CreateEarthMovementBarChart(mockResponses);
      expect(result.accTitle).toBe('Earth Movement');
      expect(result.status).toBe('SEVERE');
      expect(result.accComp).toBeDefined();
      expect(result.accItemComp).toBeDefined();
    });
  });
});


nx test my-app --testPathPattern=apps/my-app/src/hooks/useFetchEarthMovementBarAndAccordionData.test.tsx
