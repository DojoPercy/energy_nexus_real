# Smart Content Recommendations System

## Overview

The Smart Content Recommendations System is a comprehensive solution that provides intelligent content suggestions across the Energy Nexus platform. It helps keep readers engaged longer and increases conversions by recommending related articles, interviews, and issues based on sophisticated algorithms.

## Features

### 🎯 **Intelligent Recommendation Algorithm**
- **Taxonomy-based matching**: Uses sectors, regions, and tags to find related content
- **Content type diversity**: Ensures variety in recommendations (articles, interviews, videos, events)
- **Recency weighting**: Prioritizes recent and featured content
- **Author and organization connections**: Links content by shared authors or organizations
- **Scoring system**: Multi-factor scoring for optimal content ranking

### 📊 **Analytics & Tracking**
- **Engagement tracking**: Monitors time spent, scroll depth, and user interactions
- **Recommendation performance**: Tracks click-through rates and conversion metrics
- **Taxonomy matching analysis**: Measures which content relationships work best
- **User behavior insights**: Understands reading patterns and preferences

### 🎨 **User Experience**
- **Responsive design**: Works seamlessly across all devices
- **Loading states**: Smooth loading animations and error handling
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance optimized**: Efficient queries and caching strategies

## Architecture

### Core Components

#### 1. **Recommendation Queries** (`src/sanity/lib/recommendation-queries.ts`)
```typescript
// Sophisticated GROQ queries that implement the recommendation algorithm
export const getSmartRecommendations = `
  // Multi-strategy recommendation query combining:
  // - Related by taxonomy (sectors, regions, tags)
  // - Trending content (recent + featured)
  // - Diverse content types
  // - Related publications and events
`;
```

#### 2. **Content Recommendations Component** (`src/components/ContentRecommendations.tsx`)
- Displays smart suggestions in a clean, engaging layout
- Handles different content types (articles, interviews, videos, events)
- Includes analytics tracking for each recommendation click
- Responsive design with hover effects and smooth transitions

#### 3. **Related Content Component** (`src/components/RelatedContent.tsx`)
- Shows content related by taxonomy, author, or organization
- Organized in sections for better user understanding
- Grid layout optimized for different screen sizes
- Enhanced analytics with taxonomy matching details

#### 4. **Analytics System** (`src/lib/analytics.ts`)
- Comprehensive tracking of user interactions
- Google Analytics 4 integration
- Content engagement metrics
- Recommendation performance analysis

#### 5. **Content Engagement Hook** (`src/hooks/useContentEngagement.ts`)
- Tracks time spent on content
- Monitors scroll depth
- Detects user inactivity
- Measures content engagement patterns

## Implementation

### Recommendation Algorithm

The system uses a sophisticated scoring algorithm that considers:

1. **Taxonomy Matches** (Weighted scoring):
   - Sectors: 3 points per match
   - Regions: 2 points per match
   - Tags: 1 point per match

2. **Content Quality**:
   - Featured content: +2 points
   - Recent content (90 days): +1 point
   - Very recent content (7 days): +1 point

3. **Content Type Diversity**:
   - Ensures variety in recommendations
   - Prevents content type clustering
   - Balances different content formats

### Content Types Supported

- **Articles**: News articles and analysis pieces
- **Interviews**: Executive interviews and Q&As
- **Videos**: Video content and multimedia
- **Events**: Conferences, webinars, and meetings
- **Special Reports**: In-depth research and analysis
- **Publications**: Issues and magazines

### Integration Points

The recommendation system is integrated into:

1. **Article Pages** (`src/app/articles/[slug]/page.tsx`)
   - Smart recommendations section
   - Related content by taxonomy and author
   - Engagement tracking

2. **Interview Pages** (`src/app/interviews/[slug]/page.tsx`)
   - Cross-content type recommendations
   - Organization-based suggestions
   - Interview-specific analytics

3. **Publication Pages** (`src/app/publications/[slug]/page.tsx`)
   - Related publications by sector/region
   - Content from the same year
   - Publication-specific engagement metrics

## Analytics & Metrics

### Tracked Events

1. **Recommendation Views**
   - Current content ID and type
   - Number of recommendations shown
   - Types of content recommended

2. **Recommendation Clicks**
   - Clicked content details
   - Recommendation source (smart suggestions, related content, etc.)
   - Taxonomy matches between current and recommended content
   - Position of clicked recommendation

3. **Content Engagement**
   - Time spent on content
   - Scroll depth (25%, 50%, 75%, 100%)
   - User inactivity detection
   - Content view and exit events

4. **User Behavior**
   - Search queries and results
   - Filter usage patterns
   - Content preferences
   - Conversion events

### Performance Metrics

- **Click-through Rate (CTR)**: Percentage of recommendations clicked
- **Engagement Rate**: Time spent and scroll depth
- **Conversion Rate**: Actions taken after viewing recommendations
- **Content Discovery**: New content found through recommendations

## Configuration

### Environment Variables

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### Customization Options

1. **Recommendation Limits**
   ```typescript
   <ContentRecommendations
     maxItems={6}  // Number of recommendations to show
     title="You Might Also Like"  // Custom title
   />
   ```

2. **Analytics Settings**
   ```typescript
   // Enable/disable specific tracking
   useContentEngagement({
     contentId: 'content_id',
     contentType: 'article',
     enabled: true  // Toggle engagement tracking
   });
   ```

3. **Recommendation Sources**
   ```typescript
   // Configure which recommendation strategies to use
   const recommendationSources = [
     'relatedByTaxonomy',
     'trending',
     'diverseTypes',
     'publications',
     'events'
   ];
   ```

## Performance Optimization

### Query Optimization
- Efficient GROQ queries with proper indexing
- Caching strategies for frequently accessed content
- Pagination for large result sets
- Selective field fetching

### Component Optimization
- Lazy loading for recommendation components
- Memoization of expensive calculations
- Debounced scroll and resize handlers
- Optimized image loading and sizing

### Analytics Optimization
- Batched analytics events
- Client-side caching of tracking data
- Efficient event deduplication
- Minimal performance impact

## Future Enhancements

### Planned Features

1. **Machine Learning Integration**
   - User behavior analysis
   - Personalized recommendations
   - A/B testing for recommendation strategies

2. **Advanced Analytics**
   - Real-time recommendation performance
   - User journey mapping
   - Content performance insights

3. **Enhanced Personalization**
   - User preference learning
   - Dynamic recommendation weighting
   - Seasonal and trending content detection

4. **Social Features**
   - User-generated recommendations
   - Social proof indicators
   - Community-driven content discovery

## Troubleshooting

### Common Issues

1. **Recommendations Not Loading**
   - Check Sanity client configuration
   - Verify GROQ query syntax
   - Ensure content has proper taxonomies

2. **Analytics Not Tracking**
   - Verify Google Analytics setup
   - Check browser console for errors
   - Ensure gtag is properly loaded

3. **Performance Issues**
   - Monitor query execution time
   - Check for N+1 query problems
   - Optimize image loading

### Debug Mode

Enable debug mode in development:
```typescript
// In analytics.ts
if (process.env.NODE_ENV === 'development') {
  console.log('Recommendation Click:', event);
}
```

## Support

For technical support or feature requests, please refer to the development team or create an issue in the project repository.

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Status**: Production Ready

