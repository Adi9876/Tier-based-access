import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { supabase, type Event } from '@/lib/supabase'
import EventCard from '@/components/EventCard'

const tierHierarchy = {
  free: ['free'],
  silver: ['free', 'silver'],
  gold: ['free', 'silver', 'gold'],
  platinum: ['free', 'silver', 'gold', 'platinum']
}

async function getEvents(userTier: keyof typeof tierHierarchy): Promise<Event[]> {
  const allowedTiers = tierHierarchy[userTier]
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .in('tier', allowedTiers)
    .order('event_date', { ascending: true })

  if (error) {
    console.error('Error fetching events:', error)
    return []
  }

  return data || []
}

export default async function EventsPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  const user = await currentUser()
  const userTier = (user?.unsafeMetadata?.tier as keyof typeof tierHierarchy) || 'free'
  const events = await getEvents(userTier)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Events</h1>
        <p className="text-gray-600">
          Showing events for <span className="capitalize font-semibold text-blue-600">{userTier}</span> tier and below
        </p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No events available for your tier.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}