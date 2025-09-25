'use client'

import React from 'react'
import { WebsiteComponent, GridConfig } from '@/types'
import { ComponentRenderer } from '@/components/website/ComponentRenderer'
import { useBuilderStore } from '@/store/builder'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'

interface ScrollableGridProps {
  component: WebsiteComponent
  gridConfig: GridConfig
  isSelected?: boolean
  onClick?: () => void
}

export const ScrollableGrid: React.FC<ScrollableGridProps> = ({
  component,
  gridConfig,
  isSelected = false,
  onClick
}) => {
  const { setNodeRef } = useDroppable({
    id: component.id,
    data: {
      type: 'grid',
      accepts: ['services', 'portfolio', 'testimonials', 'grid-item']
    }
  })

  const childIds = component.children?.map(child => child.id) || []

  const getGridStyles = () => {
    const baseStyles = {
      display: 'grid',
      gap: gridConfig.gap || '1rem',
      gridTemplateColumns: `repeat(${gridConfig.columns}, 1fr)`,
      width: '100%',
      padding: '1rem',
    }

    if (gridConfig.scrollable && gridConfig.maxHeight) {
      return {
        ...baseStyles,
        maxHeight: gridConfig.maxHeight,
        overflowY: 'auto' as const,
        overflowX: 'hidden' as const,
      }
    }

    if (gridConfig.rows) {
      return {
        ...baseStyles,
        gridTemplateRows: `repeat(${gridConfig.rows}, 1fr)`,
      }
    }

    return baseStyles
  }

  const getItemStyles = () => {
    return {
      minWidth: gridConfig.itemMinWidth || '200px',
      minHeight: gridConfig.itemMinHeight || '150px',
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={getGridStyles()}
      className={`
        scrollable-grid
        border-2 border-dashed border-gray-300
        rounded-lg
        transition-all duration-200
        ${isSelected ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400'}
        ${gridConfig.scrollable ? 'scroll-smooth' : ''}
      `}
      onClick={onClick}
    >
      <SortableContext items={childIds} strategy={rectSortingStrategy}>
        {component.children?.map((child) => (
          <div
            key={child.id}
            style={getItemStyles()}
            className="grid-item"
          >
            <ComponentRenderer
              component={child}
              isSelected={false}
              onClick={() => {}}
              inGrid={true}
            />
          </div>
        ))}
      </SortableContext>
      
      {(!component.children || component.children.length === 0) && (
        <div className="col-span-full flex items-center justify-center p-8 text-gray-500">
          <div className="text-center">
            <div className="text-2xl mb-2">📋</div>
            <p>Glissez des éléments ici</p>
            <p className="text-sm">Services, Portfolio, Témoignages...</p>
          </div>
        </div>
      )}
    </div>
  )
}