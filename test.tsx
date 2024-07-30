// yourHook.test.js
import { renderHook, act } from '@testing-library/react-hooks';
import { useLazyFetchEarthMovementExposure } from './yourHook';
import { useAccount, useHeader } from './yourHooks'; // Example import paths
import { useLazyQuery } from '@apollo/client';

// Mock the dependencies
jest.mock('@apollo/client', () => ({
  useLazyQuery: jest.fn(),
}));
jest.mock('./yourHooks', () => ({
  useAccount: jest.fn(),
  useHeader: jest.fn(),
}));

describe('useLazyFetchEarthMovementExposure', () => {
  beforeEach(() => {
    useAccount.mockReturnValue({
      accountDetails: {
        orgid: 'mockOrgId',
      },
    });
    useHeader.mockReturnValue({
      selectedCurrency: 'USD',
    });
    useLazyQuery.mockReturnValue([
      jest.fn(), // execute function
      { data: null, error: null, refetch: jest.fn() }, // result object
    ]);
  });

  it('should fetch earth movement exposure data correctly', async () => {
    const mockData = {
      btp_natural_hazards: {
        earth_movement_exposure: {
          // mock data structure
        },
      },
    };

    const mockRefetch = jest.fn();
    const executeQuery = jest.fn().mockResolvedValue({ data: mockData, error: null, refetch: mockRefetch });
    useLazyQuery.mockReturnValue([executeQuery, { data: mockData, error: null, refetch: mockRefetch }]);

    const { result } = renderHook(() => useLazyFetchEarthMovementExposure());

    await act(async () => {
      const fetchResult = await result.current();

      expect(executeQuery).toHaveBeenCalled();
      expect(fetchResult.data).toEqual({
        // expected processed data
      });
      expect(fetchResult.errorCode).toBeNull();
      expect(fetchResult.refetch).toBe(mockRefetch);
    });
  });

  it('should handle errors correctly', async () => {
    const mockError = {
      graphQLErrors: [{ message: 'Mock Error' }],
    };
    const executeQuery = jest.fn().mockResolvedValue({ data: null, error: mockError, refetch: jest.fn() });
    useLazyQuery.mockReturnValue([executeQuery, { data: null, error: mockError, refetch: jest.fn() }]);

    const { result } = renderHook(() => useLazyFetchEarthMovementExposure());

    await act(async () => {
      const fetchResult = await result.current();

      expect(executeQuery).toHaveBeenCalled();
      expect(fetchResult.data).toBeNull();
      expect(fetchResult.errorCode).toEqual(mockError.graphQLErrors);
    });
  });
});
