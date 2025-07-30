import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import TierSelector from '@/components/TierSelector'

export default async function SettingsPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  const user = await currentUser()
  const currentTier = (user?.unsafeMetadata?.tier as string) || 'free'

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Membership Tier</h2>
        <p className="text-gray-600 mb-6">
          Choose your membership tier to access different levels of events.
        </p>
        
        <TierSelector/>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">How Tiers Work</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Free:</strong> Access to basic workshops and community events</li>
          <li>• <strong>Silver:</strong> Free events + advanced workshops</li>
          <li>• <strong>Gold:</strong> Silver events + professional bootcamps</li>
          <li>• <strong>Platinum:</strong> All events + exclusive VIP experiences</li>
        </ul>
      </div>
    </div>
  )
}