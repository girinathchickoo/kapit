import * as ReactQuery from 'react-query';
import * as Api from 'api';
import * as Hooks from 'hooks';

export const useUserDetails = () => {
  const userId = Hooks.useUserId();
  const data = ReactQuery.useQuery('getOneUser', () => {
    return Api.Server.Client().post(Api.Server.ApiRoutes.profile.oneUser, {
      user_id: userId?.uid,
    });
  })?.data?.data?.data;

  // console.log('data',data)

  return data;
};
