import React, { useState, useEffect, useCallback } from 'react';
import { getSuggestions } from '../services/api';

const Locationpanel = ({ onLocationSelect, inputValue = '' }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounced function to get suggestions
  const debouncedGetSuggestions = useCallback(
    (() => {
      let timeoutId;
      return (input) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          if (input && input.length >= 3) {
            setLoading(true);
            try {
              const response = await getSuggestions(input);
              setSuggestions(response.suggestions || []);
            } catch (error) {
              console.error('Error fetching suggestions:', error);
              setSuggestions([]);
            } finally {
              setLoading(false);
            }
          } else {
            setSuggestions([]);
            setLoading(false);
          }
        }, 300); // 300ms delay
      };
    })(),
    []
  );

  // Get suggestions when input value changes
  useEffect(() => {
    debouncedGetSuggestions(inputValue);
  }, [inputValue, debouncedGetSuggestions]);

  const handleSuggestionClick = (suggestion) => {
    onLocationSelect(suggestion);
  };

  return (
    <div className="p-6 max-h-80 overflow-y-auto bg-white">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Search Locations</h3>
          <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-6 h-6 border-2 border-blue-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-6 h-6 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">Searching locations...</span>
                <span className="text-gray-500 text-sm">Please wait</span>
              </div>
            </div>
          </div>
        )}

        {/* API Suggestions */}
        {!loading &&
          inputValue &&
          suggestions.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700 mb-3">
                Found {suggestions.length} location{suggestions.length !== 1 ? 's' : ''}
              </div>
              {suggestions.map((suggestion, idx) => (
                <div
                  key={idx}
                  className="group flex items-center space-x-4 p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl cursor-pointer transition-all duration-200 border border-transparent hover:border-blue-100"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-medium text-sm truncate group-hover:text-blue-700 transition-colors">
                      {suggestion}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">Tap to select this location</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors">
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        {/* No suggestions found */}
        {!loading &&
          inputValue &&
          suggestions.length === 0 &&
          inputValue.length >= 3 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
              </div>
              <h4 className="text-gray-700 font-medium mb-2">No locations found</h4>
              <p className="text-gray-500 text-sm">
                We couldn't find any locations matching "{inputValue}"
              </p>
              <p className="text-gray-400 text-xs mt-2">Try a different search term</p>
            </div>
          )}

        {/* Show message when input is too short */}
        {!loading &&
          inputValue &&
          inputValue.length < 3 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="text-gray-700 font-medium mb-2">Start typing to search</h4>
              <p className="text-gray-500 text-sm">
                Type at least 3 characters to find locations
              </p>
            </div>
          )}

        {/* Empty state when no input */}
        {!loading && !inputValue && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="text-gray-700 font-medium mb-2">Search for locations</h4>
            <p className="text-gray-500 text-sm">
              Enter a location name to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Locationpanel;