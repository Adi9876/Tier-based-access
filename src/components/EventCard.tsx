import Image from 'next/image'
import { type Event } from '@/lib/supabase'

const tierColors = {
  free: 'bg-gray-100 text-gray-800',
  silver: 'bg-gray-200 text-gray-900',
  gold: 'bg-yellow-100 text-yellow-800',
  platinum: 'bg-purple-100 text-purple-800'
}

const tierBorderColors = {
  free: 'border-gray-200',
  silver: 'border-gray-300',
  gold: 'border-yellow-200',
  platinum: 'border-purple-200'
}

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={`bg-white rounded-lg shadow-md border-2 ${tierBorderColors[event.tier]} hover:shadow-lg transition-shadow duration-300`}>
      <div className="relative h-48 w-full">
        <Image
          src={event.image_url || '/placeholder-image.jpg'}
          alt={event.title}
          fill
          className="object-cover rounded-t-lg"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${tierColors[event.tier]}`}>
            {event.tier}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{event.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(event.event_date)}
        </div>
      </div>
    </div>
  )
}