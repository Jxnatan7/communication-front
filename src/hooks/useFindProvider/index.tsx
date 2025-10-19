import {useMutation} from '@tanstack/react-query';
import ProviderService from '../../apis/ProviderService';

export default function useFindProvider() {
  return useMutation({
    mutationFn: (code: string) => ProviderService.findByCode(code),
    mutationKey: ['find-provider'],
  });
}
