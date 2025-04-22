import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { forumsService } from '@/apis/services/tet/forums.services';
import { useNavigate } from 'react-router-dom';

export const useForums = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Create forum mutation
    const createForum = useMutation({
        mutationFn: ({ data }: { data: any }) => forumsService.createForums(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['forums'] });
            navigate('/forums');
            toast.success('Forum created successfully');
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.message || 'Failed to create forum';
            toast.error(errorMessage);
        }
    });



    // Update forum mutation
    const updateForum = useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) =>
            forumsService.updateForumsId(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['forums'] });
            navigate('/forums');
            toast.success('Forum updated successfully');
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.message || 'Failed to update forum';
            toast.error(errorMessage);
        }
    });

    // Delete forum mutation
    const deleteForum = useMutation({
        mutationFn: (id: number) => forumsService.deleteForumsId(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['forums'] });
            navigate('/forums');
            toast.success('Forum deleted successfully');
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.message || 'Failed to delete forum';
            toast.error(errorMessage);
        }
    });

    return {
        createForum,
        updateForum,
        deleteForum,
    };
};