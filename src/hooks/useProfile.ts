import { userApis } from '@/apis'
import { IUserProfile } from '@/types'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useProfile = (options?: Omit<UseQueryOptions<IUserProfile>, 'queryKey' | 'queryFn'>) => {
    return useQuery<IUserProfile>({
        ...options,
        queryKey: ['profile'],
        queryFn: userApis.getProfile,
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })
}
