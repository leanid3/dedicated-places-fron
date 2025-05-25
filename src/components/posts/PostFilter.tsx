// components/posts/PostFilter.tsx
'use client'

import { FilterOption } from "@/types/filter";
import { useState } from "react";

interface PostFilterProps {
  filterOptions: {
    params: FilterOption[];
    work_hours: FilterOption[];
    types: FilterOption[];
  };
  onFilterChange: (selectedFilters: Record<string, string[]>) => void;
}

const PostFilter = ({ filterOptions, onFilterChange }: PostFilterProps) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    params: [],
    work_hours: [],
    types: []
  });

  const handleCheckboxChange = (type: keyof typeof filterOptions, value: string) => {
    const newFilters = { ...selectedFilters };
    const index = newFilters[type].indexOf(value);
    
    if (index > -1) {
      newFilters[type].splice(index, 1);
    } else {
      newFilters[type].push(value);
    }

    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const renderFilterSection = (title: string, type: keyof typeof filterOptions) => (
    <div className="filter-section">
      <h3>{title}</h3>
      {filterOptions[type].map(option => (
        <div key={option.value} className="filter-option">
          <label>
            <input
              type="checkbox"
              checked={selectedFilters[type].includes(option.value)}
              onChange={() => handleCheckboxChange(type, option.value)}
            />
            {option.value} ({option.count})
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <div className="post-filter">
      {renderFilterSection('Parameters', 'params')}
      {renderFilterSection('Working Hours', 'work_hours')}
      {renderFilterSection('Types', 'types')}
    </div>
  );
};

export default PostFilter;