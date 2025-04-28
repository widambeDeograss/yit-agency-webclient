// src/hooks/useAccount.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { accountService } from '@/apis/services/auth/account.service';
import { toast } from 'react-toastify';
import { PasswordChangeData, ProfileUpdateData } from '@/types/account';
import { useAuthStore } from './use-auth-store';

export const useProfile = () => {
    const {user} =  useAuthStore();
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => accountService.getProfile(user?.id),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ProfileUpdateData) => accountService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success( 'Profile updated successfully',
      );
    },
    onError: () => {
      toast.error('Failed to update profile');
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: PasswordChangeData) => accountService.changePassword(data),
    onSuccess: () => {
      toast.success( 'Password changed successfully',
      );
    },
    onError: () => {
      toast.error( 'Failed to change password');
    },
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
        const response =  accountService.getSkills();
        return response.then((res) => {
            return res.results;
        }
        );
    },
  });
};

export const useTechCategories = () => {
  return useQuery({
    queryKey: ['techCategories'],
    queryFn:async () => {
        const response = accountService.getTechCategories();
        return response.then((res) => {
            return res.results;
        }
        );
    },
  });
};

export const useAddSkill = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (skillId: number) => accountService.addSkill(skillId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useRemoveSkill = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (skillId: number) => accountService.removeSkill(skillId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useAddInterest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (categoryId: number) => accountService.addInterest(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useRemoveInterest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (categoryId: number) => accountService.removeInterest(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: () => accountService.deleteAccount(),
    onSuccess: () => {
      // Handle successful account deletion (e.g., redirect to home page)
    },
  });
};