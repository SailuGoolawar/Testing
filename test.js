// Mock data
const mockAccountDetails = {
  orgid: '1',
};

const mockHeader = {
  selectedCurrency: 1,
  asofDate: new Date(),
};

const mockEarthMovementData = {
  EarthMovementBarData: [
    {
      zone: 'zone1',
      active_locations: 10,
      activeTIV: 1000,
      prospect_locations: 20,
      prospectTIV: 2000,
    },
  ],
  EarthMovementAccordionData: [
    {
      region_code: 'region1',
      region_description: 'Region 1',
      active_location_count: 15,
      activeTIV: 1500,
      prospect_location_count: 25,
      prospectTIV: 2500,
    },
  ],
  error: null,
};
