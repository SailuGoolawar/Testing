describe('NatHazOverview Component', () => {
  beforeEach(() => {
    (useAccount as jest.Mock).mockReturnValue({
      accountDetails: mockAccountDetails,
    });
    (useHeader as jest.Mock).mockReturnValue(mockHeader);
    (useFetchEarthMovementBarAndAccordionData as jest.Mock).mockReturnValue(mockEarthMovementData);
  });

  it('should fetch and display EarthMovementBarData and EarthMovementAccordionData correctly', () => {
    render(
      <MockedProvider>
        <NatHazOverview />
      </MockedProvider>
    );

    // Assert that the data is rendered correctly
    expect(screen.getByText('Zone zone1')).toBeInTheDocument();
    expect(screen.getByText('Region 1')).toBeInTheDocument();
    expect(screen.getByText('$1000.00')).toBeInTheDocument(); // Assuming formatAmount formats the number to a string with a dollar sign and two decimal places
    expect(screen.getByText('$1500.00')).toBeInTheDocument();
  });
});

git reset --soft HEAD~1
