// src/components/UserProfile.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { CalendarIcon, PencilIcon, CheckIcon, XIcon, PlusIcon, TrashIcon, LockIcon, MailIcon, GlobeIcon, GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { useAddInterest, useAddSkill, useChangePassword, useProfile, useRemoveInterest, useRemoveSkill, useSkills, useTechCategories, useUpdateProfile } from '@/hooks/use-account-api';
import { use, useEffect, useState } from 'react';
import { PasswordChangeData } from '@/types/account';
import { useAuthStore } from '@/hooks/use-auth-store';
import { MultiSelector } from '@/components/ui/multisellector';

const profileSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    bio: z.string().max(500).optional(),
    dateOfBirth: z.date().optional().nullable(),
    location: z.string().optional(),
    githubUrl: z.string().url().optional().or(z.literal('')),
    linkedinUrl: z.string().url().optional().or(z.literal('')),
    twitterUrl: z.string().url().optional().or(z.literal('')),
    website: z.string().url().optional().or(z.literal('')),
    profileImage: z.instanceof(File).optional().nullable(),
    skills: z.array(z.number()).optional(),
    interests: z.array(z.number()).optional(),
});

const passwordSchema = z.object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated) {
            window.location.href = '/';
        }
    } , [isAuthenticated]);


    // Queries
    const { data: profile, isLoading: isProfileLoading } = useProfile();
    const { data: skills, isLoading: isSkillsLoading } = useSkills();
    const { data: categories, isLoading: isCategoriesLoading } = useTechCategories();

    // Mutations
    const updateProfile = useUpdateProfile();
    const changePassword = useChangePassword();
    const addSkill = useAddSkill();
    const removeSkill = useRemoveSkill();
    const addInterest = useAddInterest();
    const removeInterest = useRemoveInterest();

    const { register: registerProfile, handleSubmit: handleProfileSubmit, formState: { errors: profileErrors }, reset: resetProfile, setValue } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
    });

    const { register: registerPassword, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors }, reset: resetPassword } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
    });

    useEffect(() => {
        if (profile) {
            resetProfile({
                username: profile.username,
                email: profile.email,
                firstName: profile.first_name,
                lastName: profile.last_name,
                bio: profile.bio || '',
                dateOfBirth: profile.date_of_birth ? new Date(profile.date_of_birth) : null,
                location: profile.location || '',
                githubUrl: profile.github_url || '',
                linkedinUrl: profile.linkedin_url || '',
                twitterUrl: profile.twitter_url || '',
                website: profile.website || '',
            });

            if (profile.profile_image) {
                setPreviewImage(profile.profile_image);
            }
        }
    }, [profile, resetProfile]);

    const handleProfileUpdate = (data: ProfileFormData) => {
        updateProfile.mutate({
            ...data,
            profileImage: profileImage || undefined,
            skills: profile?.skills.map(s => s.id) || [],
            interests: profile?.interests.map(i => i.id) || [],
        });
        setIsEditing(false);
    };

    const handlePasswordUpdate = (data: PasswordChangeData) => {
        changePassword.mutate(data);
        setIsEditingPassword(false);
        resetPassword();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setProfileImage(null);
        setPreviewImage(null);
        setValue('profileImage', null);
    };

    if (isProfileLoading || isSkillsLoading || isCategoriesLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3 space-y-4">
                        <Skeleton className="h-32 w-32 rounded-full mx-auto" />
                        <Skeleton className="h-8 w-3/4 mx-auto" />
                        <Skeleton className="h-4 w-1/2 mx-auto" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                    <div className="w-full md:w-2/3 space-y-4">
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (!profile) {
        return <div className="flex justify-center items-center h-screen">User not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column - Profile Card */}
                <div className="w-full md:w-1/3">
                    <Card>
                        <CardHeader className="items-center">
                            <div className="relative">
                                <Avatar className="w-32 h-32">
                                    <AvatarImage src={previewImage || "/default-avatar.png"} />
                                    <AvatarFallback>
                                        {profile.first_name?.[0] || ''}{profile.last_name?.[0] || ''}
                                    </AvatarFallback>
                                </Avatar>
                                {isEditing && (
                                    <div className="absolute bottom-0 right-0 flex gap-2">
                                        <label htmlFor="profileImage" className="p-2 bg-primary rounded-full cursor-pointer">
                                            <PencilIcon className="h-4 w-4 text-white" />
                                            <input
                                                id="profileImage"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                        {previewImage && (
                                            <button
                                                onClick={handleRemoveImage}
                                                className="p-2 bg-destructive rounded-full"
                                            >
                                                <TrashIcon className="h-4 w-4 text-white" />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                            <CardTitle className="text-2xl mt-4">
                                {profile.first_name} {profile.last_name}
                            </CardTitle>
                            <p className="text-muted-foreground">@{profile.username}</p>
                            {profile.is_verified && (
                                <Badge variant="secondary" className="mt-2">
                                    Verified
                                </Badge>
                            )}
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <Label>Bio</Label>
                                    {isEditing ? (
                                        <Textarea
                                            {...registerProfile('bio')}
                                            placeholder="Tell us about yourself"
                                            className="mt-1"
                                        />
                                    ) : (
                                        <p className="text-muted-foreground mt-1">
                                            {profile.bio || 'No bio provided'}
                                        </p>
                                    )}
                                </div>

                                {/* ... rest of the profile card content ... */}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            {isEditing ? (
                                <div className="flex gap-2">
                                    <Button
                                        onClick={handleProfileSubmit(handleProfileUpdate)}
                                        className="flex items-center"
                                        disabled={updateProfile.isPending}
                                    >
                                        <CheckIcon className="mr-2 h-4 w-4" />
                                        {updateProfile.isPending ? 'Saving...' : 'Save'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsEditing(false)}
                                        className="flex items-center"
                                    >
                                        <XIcon className="mr-2 h-4 w-4" /> Cancel
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center"
                                >
                                    <PencilIcon className="mr-2 h-4 w-4" /> Edit Profile
                                </Button>
                            )}
                        </CardFooter>
                    </Card>

                    {/* ... rest of the left column components ... */}
                </div>

                {/* Right Column - Skills, Interests, Account Settings */}
                <div className="w-full md:w-2/3 space-y-6">
                    {/* Skills Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Skills</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Add or remove skills from your profile
                            </p>
                        </CardHeader>
                        <CardContent>
                            {isEditing ? (
                                <div className="flex flex-wrap gap-2">
                                    {skills?.map(skill => (
                                        <Badge
                                            key={skill.id}
                                            variant={profile.skills.some(s => s.id === skill.id) ? 'default' : 'outline'}
                                            className="cursor-pointer"
                                            onClick={() => {
                                                if (profile.skills.some(s => s.id === skill.id)) {
                                                    removeSkill.mutate(skill.id);
                                                } else {
                                                    addSkill.mutate(skill.id);
                                                }
                                            }}
                                        >
                                            {skill.name}
                                            {profile.skills.some(s => s.id === skill.id) ? (
                                                <XIcon className="ml-2 h-3 w-3" />
                                            ) : (
                                                <PlusIcon className="ml-2 h-3 w-3" />
                                            )}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {profile.skills.length > 0 ? (
                                        profile.skills.map(skill => (
                                            <Badge key={skill.id} variant="secondary">
                                                {skill.name}
                                            </Badge>
                                        ))
                                    ) : (
                                        <p className="text-muted-foreground">No skills added yet</p>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Interests</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Select technology categories you're interested in
                            </p>
                        </CardHeader>
                        <CardContent>
                        {/* {isEditing ? (
  <MultiSelector
    options={(categories || []).map(category => ({
      value: String(category.id),
      label: category.name,
    }))}
    selected={selectedInterests}
    onChange={setSelectedInterests}
    placeholder="Select interests..."
  />
) : (
  <div className="flex flex-wrap gap-2">
    {selectedInterests.length > 0 ? (
      selectedInterests.map(interest => (
        <Badge key={interest.value} variant="outline">
          {interest.label}
        </Badge>
      ))
    ) : (
      <p className="text-muted-foreground">No interests selected yet</p>
    )}
  </div>
)} */}

            </CardContent>
                    </Card>

                    {/* Account Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Manage your account details
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <Label>Username</Label>
                                    {isEditing ? (
                                        <Input
                                            {...registerProfile('username')}
                                            className="mt-1"
                                        />
                                    ) : (
                                        <p className="text-muted-foreground mt-1">@{profile.username}</p>
                                    )}
                                </div>

                                <div>
                                    <Label className="flex items-center">
                                        <MailIcon className="mr-2 h-4 w-4" /> Email
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            {...registerProfile('email')}
                                            type="email"
                                            className="mt-1"
                                        />
                                    ) : (
                                        <p className="text-muted-foreground mt-1">{profile.email}</p>
                                    )}
                                </div>

                                {isEditingPassword ? (
                                    <form onSubmit={handlePasswordSubmit(handlePasswordUpdate)}>
                                        <div className="space-y-4">
                                            <div>
                                                <Label>Current Password</Label>
                                                <Input
                                                    {...registerPassword('currentPassword')}
                                                    type="password"
                                                    className="mt-1"
                                                />
                                                {passwordErrors.currentPassword && (
                                                    <p className="text-sm text-destructive mt-1">
                                                        {passwordErrors.currentPassword.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <Label>New Password</Label>
                                                <Input
                                                    {...registerPassword('newPassword')}
                                                    type="password"
                                                    className="mt-1"
                                                />
                                                {passwordErrors.newPassword && (
                                                    <p className="text-sm text-destructive mt-1">
                                                        {passwordErrors.newPassword.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <Label>Confirm New Password</Label>
                                                <Input
                                                    {...registerPassword('confirmPassword')}
                                                    type="password"
                                                    className="mt-1"
                                                />
                                                {passwordErrors.confirmPassword && (
                                                    <p className="text-sm text-destructive mt-1">
                                                        {passwordErrors.confirmPassword.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex gap-2">
                                                <Button type="submit" className="flex items-center">
                                                    <CheckIcon className="mr-2 h-4 w-4" /> Save Password
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setIsEditingPassword(false);
                                                        resetPassword();
                                                    }}
                                                    className="flex items-center"
                                                >
                                                    <XIcon className="mr-2 h-4 w-4" /> Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                ) : (
                                    <div>
                                        <Label className="flex items-center">
                                            <LockIcon className="mr-2 h-4 w-4" /> Password
                                        </Label>
                                        <div className="flex items-center mt-1">
                                            <p className="text-muted-foreground">••••••••</p>
                                            <Button
                                                variant="link"
                                                onClick={() => setIsEditingPassword(true)}
                                                className="ml-2 h-8 px-2"
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Danger Zone */}
                    <Card className="border-destructive">
                        <CardHeader>
                            <CardTitle className="text-destructive">Danger Zone</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                These actions are irreversible
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <Label>Delete Account</Label>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Permanently delete your account and all associated data
                                    </p>
                                    <Button variant="destructive" className="mt-2">
                                        Delete Account
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ... rest of the right column components ... */}
                </div>
            </div>
        </div>
    );
};


export default UserProfile;