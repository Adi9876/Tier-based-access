import { SignedIn, SignedOut } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

export default async function Home() {
  const user = await currentUser()
  const userTier = user?.unsafeMetadata?.tier as string || 'free'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">EventTier</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Access exclusive events based on your membership tier.
            From free community meetups to platinum VIP experiences.
          </p>

          <SignedOut>
            <div className="space-y-4">
              <p className="text-gray-700">Sign in to view events available to your tier</p>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="mb-8">
              <p className="text-lg text-gray-700 mb-4">
                Your current tier: <span className="capitalize font-bold text-blue-600">{userTier}</span>
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/events"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                >
                  View My Events
                </Link>
                <Link
                  href="/settings"
                  className="bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-700 transition-colors"
                >
                  Change Tier
                </Link>
              </div>
            </div>
          </SignedIn>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gray-400">
              <h3 className="font-bold text-gray-800 mb-2">Free Tier</h3>
              <p className="text-sm text-gray-600">Access to basic workshops and community events</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gray-500">
              <h3 className="font-bold text-gray-800 mb-2">Silver Tier</h3>
              <p className="text-sm text-gray-600">Advanced workshops plus all Free tier events</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <h3 className="font-bold text-gray-800 mb-2">Gold Tier</h3>
              <p className="text-sm text-gray-600">Professional bootcamps plus lower tier access</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
              <h3 className="font-bold text-gray-800 mb-2">Platinum Tier</h3>
              <p className="text-sm text-gray-600">Exclusive VIP events plus all other tiers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}