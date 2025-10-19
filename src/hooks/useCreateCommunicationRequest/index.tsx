import {useMutation} from '@tanstack/react-query';
import CommunicationRequestService from '../../apis/CommunicationRequestService';

const useCreateCommunicationRequest = function (
  onSuccess: () => void = () => {},
) {
  const {data, isSuccess, isPending, error, mutate, mutateAsync} = useMutation({
    mutationFn: (payload: any) => CommunicationRequestService.create(payload),
    mutationKey: ['create-communication-request'],
    onSuccess,
  });

  return {data, isSuccess, isPending, error, mutate, mutateAsync};
};

export default useCreateCommunicationRequest;
