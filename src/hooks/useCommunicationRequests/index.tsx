import {useQuery} from '@tanstack/react-query';
import CommunicationRequestService from '../../apis/CommunicationRequestService';

const useCommunicationRequests = function (houseId: string) {
  const {isPending, error, data} = useQuery({
    queryKey: ['communication-requests', houseId],
    queryFn: () => CommunicationRequestService.listByHouseId(houseId),
  });

  return {isPending, error, data};
};

export default useCommunicationRequests;
