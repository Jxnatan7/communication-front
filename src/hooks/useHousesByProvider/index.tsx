import {useQuery} from '@tanstack/react-query';
import HouseService from '../../apis/HouseService';

const useHousesByProvider = function (providerId: string) {
  const {isPending, error, data} = useQuery({
    queryKey: ['chat-messages', providerId],
    queryFn: () => HouseService.findByProviderId(providerId),
  });

  return {isPending, error, data};
};

export default useHousesByProvider;
