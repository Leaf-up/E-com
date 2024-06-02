import { API_URL, PROJECT_KEY } from '~/api/constants';
import changePassword from '~/api/profile/changePassword';
import { TCustomer } from '~/api/types';

const endpoint = `${API_URL}/${PROJECT_KEY}/customers/password`;
const testToken = 'Og==';

const userData: TCustomer = {
  id: 'userId',
  version: 1,
  email: '2@2.ru',
  password: '123',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '01.01.2000',
  addresses: [
    {
      streetName: 'street',
      city: 'city',
      postalCode: '000000',
      country: 'country',
    },
  ],
  shippingAddressIds: [''],
  billingAddressIds: [''],
};

const updatedUserData = {
  ...userData,
  version: userData.version + 1,
};

const currentPassword = 'qwerty123';
const newPassword = '321ytrewq';

const testBody = {
  id: userData.id,
  version: userData.version,
  currentPassword,
  newPassword,
};

const testSuccessResponse = { ...updatedUserData };
const testErrorResponse = { message: 'The given current password does not match.' };
const testFetchOptions = {
  headers: { Authorization: `Bearer ${testToken}`, 'Content-Type': 'application/json' },
  method: 'POST',
  body: JSON.stringify(testBody),
};

const expectedSuccessReturnResponse = {
  customer: updatedUserData,
  error: null,
};
const expectedFailReturnResponse = {
  customer: null,
  error: `(400) ${testErrorResponse.message}`,
};

const assetsSuccessFetchMock = () =>
  Promise.resolve({
    status: 200,
    headers: new Headers({
      'content-type': 'application/json',
    }),
    json: async () => testSuccessResponse,
  } as Response);

const assetsFailFetchMock = () =>
  Promise.resolve({
    status: 400,
    headers: new Headers({
      'content-type': 'application/json',
    }),
    json: async () => testErrorResponse,
  } as Response);

describe('Change password api:', () => {
  const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockImplementationOnce(assetsSuccessFetchMock)
    .mockImplementationOnce(assetsFailFetchMock);

  test('Receive expected successful response', async () => {
    const response = await changePassword(userData.id, userData.version, currentPassword, newPassword, testToken);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(endpoint, testFetchOptions);
    expect(response).toEqual(expectedSuccessReturnResponse);
  });

  test('Receive expected fail response', async () => {
    const response = await changePassword(userData.id, userData.version, currentPassword, newPassword, testToken);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(endpoint, testFetchOptions);
    expect(response).toEqual(expectedFailReturnResponse);
  });
});
