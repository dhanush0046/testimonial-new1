//components/TestimonialList.tsx -- new update testing
import React from 'react';
import { TestimonialCard } from "@/components/TestimonialCard";
import { Testimonial } from '@/types/testimonial';
import { TagsContainer } from '@/containers/tagsContainer';

interface TestimonialListProps {
  isLoading: boolean;
  error: string | null;
  filteredTestimonials: Testimonial[];
  spaceId: string;
  spaceName: string;
  onLike: (id: string) => void;
  onArchive: (id: string) => void;
  onHighlight: (id: string) => void;
  onDelete: (id: string) => void;
  onTag: (id: string, tagNames: string[]) => void;
  onEdit: (id: string, data: Testimonial) => void;
  activeTab: string;
}

export default function TestimonialList({
  isLoading,
  error,
  filteredTestimonials,
  onLike,
  onArchive,
  onHighlight,
  onDelete,
  spaceId,
  spaceName,
  onTag,
  onEdit,
  activeTab
}: TestimonialListProps) {
  const { tags } = TagsContainer.useContainer();

  if (isLoading) return <p>Loading testimonials...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleOptimisticUpdate = (id: string, updateFn: (testimonial: Testimonial) => Testimonial) => {
    const updatedTestimonials = filteredTestimonials.map(testimonial =>
      testimonial.id === id ? updateFn(testimonial) : testimonial
    );
    // You might need to implement a way to update the parent state here
    // For now, we'll just return the updated testimonials
    return updatedTestimonials;
  };

  return (
    <div className="space-y-6">
      {filteredTestimonials.length > 0 ? (
        filteredTestimonials.map((testimonial) => (
          <TestimonialCard 
            key={testimonial.id} 
            testimonial={testimonial} 
            onLike={(id) => {
              handleOptimisticUpdate(id, (t) => ({ ...t, isLiked: !t.isLiked }));
              onLike(id);
            }}
            onArchive={(id) => {
              handleOptimisticUpdate(id, (t) => ({ ...t, isArchived: !t.isArchived }));
              onArchive(id);
            }}
            onHighlight={(id) => {
              handleOptimisticUpdate(id, (t) => ({ ...t, isHighlighted: !t.isHighlighted }));
              onHighlight(id);
            }}
            onDelete={onDelete}
            activeTab={activeTab}
            spaceId={spaceId}
            spaceName={spaceName}
            spaceTags={tags.filter(tag => tag.isActive).map(tag => tag.name)}
            onTag={onTag}
            onEdit={onEdit}

          />
        ))
      ) : (
        <p className='2xl:w-3/4 2xl:mx-auto'>No testimonials found.</p>
      )}
    </div>
  );
}