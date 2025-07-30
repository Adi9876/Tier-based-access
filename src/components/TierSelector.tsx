'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

const tiers = [
  { id: 'free', name: 'Free', color: 'border-gray-300 bg-gray-50' },
  { id: 'silver', name: 'Silver', color: 'border-gray-400 bg-gray-100' },
  { id: 'gold', name: 'Gold', color: 'border-yellow-400 bg-yellow-50' },
  { id: 'platinum', name: 'Platinum', color: 'border-purple-400 bg-purple-50' }
]

export default function TierSelector() {
  const { user } = useUser()
  const [selectedTier, setSelectedTier] = useState("");
  const [isUpdating, setIsUpdating] = useState(false)


  useEffect(() => {
    if (user) {
      const current = user.unsafeMetadata?.tier as string
      setSelectedTier(current || 'free')
    }
  }, [user])

  const updateTier = async (newTier: string) => {
    if (!user) return

    setIsUpdating(true)
    try {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          tier: newTier
        }
      });

      setSelectedTier(newTier)

      // window.location.reload()
    } catch (error) {
      console.error('Error updating tier:', error)
      alert('Failed to update tier. Please try again.')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tiers.map((tier) => (
          <button
            key={tier.id}
            onClick={() => updateTier(tier.id)}
            disabled={isUpdating}
            className={`
              p-4 border-2 rounded-lg text-left transition-all
              ${selectedTier === tier.id
                ? `${tier.color} border-solid`
                : 'border-gray-200 hover:border-gray-300'
              }
              ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}
            `}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold capitalize">{tier.name}</span>
              {selectedTier === tier.id && (
                <span className="text-green-600 text-sm">✓ Current</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {isUpdating && (
        <div className="text-center text-gray-600">
          <div className="inline-flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            Updating your tier...
          </div>
        </div>
      )}
    </div>
  )
}