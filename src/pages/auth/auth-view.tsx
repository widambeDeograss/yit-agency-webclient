import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {   X,
  Mail,
  Github,
  Facebook,
  ChevronLeft,
  User,
  Lock,
  AtSign
} from "lucide-react"
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/apis/services/auth/auth.service'
import { toast } from 'react-toastify'



export function AuthModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: ''
  });

 
const createUserMutation = useMutation({
  mutationFn: async (userData: typeof formData) => {
    const response = await authService.regieter({
      first_name: userData.fullName,
      email: userData.email,
      username: userData.username,
      password: userData.password,
      groups: []
    });
    return response;
  },
  onSuccess: () => {
    console.log('Account created successfully');
    toast.success('Account created successfully, please login');
    onClose();
  },
  onError: (error: Error) => {
    console.error('Registration failed:', error.message);
    toast.error('Registration failed, please try again');
  }
});
  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData);
    createUserMutation.mutate(formData);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] md:max-w-4xl p-0 overflow-hidden">
        <div className="relative flex">
          {/* Left Side - Image Section */}
          <div className="hidden md:block w-1/2 bg-gradient-to-br from-primary to-primary/90 relative">
            <div className="h-full p-8 text-white">
              <div className="relative h-full flex flex-col justify-between">
                <h2 className="text-3xl font-bold">Join 50,000+ Tech Enthusiasts</h2>
                <div className="space-y-6">
                  <p className="text-xl leading-relaxed">
                    Collaborate, learn and grow with Africa's fastest-growing tech community
                  </p>
                  <div className="flex gap-3">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="w-14 h-14 bg-white/10 rounded-lg backdrop-blur-sm" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Content */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <DialogHeader className="text-right">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:bg-primary/10"
              >
                <X className="h-6 w-6" />
              </Button>
            </DialogHeader>

            <div className="max-w-xl mx-auto space-y-8">
              {showEmailForm ? (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowEmailForm(false)}
                    className="gap-2 -ml-2 text-muted-foreground hover:text-primary"
                  >
                    <ChevronLeft className="h-5 w-5" />
                    Back to Login Options
                  </Button>
                  
                  <form onSubmit={handleEmailSubmit} className="space-y-6">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium mb-2 text-muted-foreground">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/80" />
                        <Input
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          className="pl-10 h-12 rounded-xl border-2 border-primary/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 bg-background/50"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-medium mb-2 text-muted-foreground">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/80" />
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="pl-10 h-12 rounded-xl border-2 border-primary/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 bg-background/50"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-medium mb-2 text-muted-foreground">
                        Username
                      </label>
                      <div className="relative">
                        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/80" />
                        <Input
                          value={formData.username}
                          onChange={(e) => setFormData({...formData, username: e.target.value})}
                          className="pl-10 h-12 rounded-xl border-2 border-primary/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 bg-background/50"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-medium mb-2 text-muted-foreground">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/80" />
                        <Input
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          className="pl-10 h-12 rounded-xl border-2 border-primary/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 bg-background/50"
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-lg font-medium"
                    >
                      Create Account
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <div className="text-center space-y-2">
                    <h3 className="text-3xl font-bold">Welcome to Talk the Tech</h3>
                    <p className="text-lg text-muted-foreground">Join the largest tech community in East Africa</p>
                  </div>
                  
                  <div className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full h-14 rounded-xl gap-3 text-base border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                      onClick={() => setShowEmailForm(true)}
                    >
                      <Mail className="h-5 w-5 text-primary" />
                      Continue with Email
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full h-14 rounded-xl gap-3 text-base border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                      onClick={() => handleSocialLogin('github')}
                    >
                      <Github className="h-5 w-5 text-foreground" />
                      Continue with GitHub
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full h-14 rounded-xl gap-3 text-base border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                      onClick={() => handleSocialLogin('facebook')}
                    >
                      <Facebook className="h-5 w-5 text-blue-600" />
                      Continue with Facebook
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground text-center px-8 leading-relaxed">
                    By continuing, you agree to our 
                    <span className="text-primary hover:underline cursor-pointer"> Terms of Service </span> 
                    and acknowledge our 
                    <span className="text-primary hover:underline cursor-pointer"> Privacy Policy</span>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


