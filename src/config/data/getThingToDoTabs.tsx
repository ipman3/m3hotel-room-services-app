

export interface Tab {
  title: string;
  content: React.ReactNode;
}

export const getThingToDoTabs = (): Tab[] => {
  return [
    {
      title: "Highlight",
      content: (
        <p className="text-sm text-gray-600">
          Phnom Kulen, also known as Kulen Mountain, is a significant historical
          and natural landmark in Cambodia. It is considered the birthplace of
          the ancient Khmer Empire and holds great historical and spiritual
          significance. The mountain range is home to numerous natural and
          historical-cultural tourist sites, including the famous Phnom Kulen
          Waterfall, which features cool, multi-tiered cascades and spacious
          grounds. The waterfalls are believed to have purifying properties,
          attracting visitors who bathe in the waters to wash away bad luck and
          bring blessings.
        </p>
      ),
    },
    {
      title: "Itinerary",
      content: (
        <p className="text-sm text-gray-600">
          Phnom Kulen, also known as Kulen Mountain, is a significant historical
          and natural landmark in Cambodia.
        </p>
      ),
    },
    {
      title: "Gallery",
      content: (
        <p className="text-sm text-gray-600">
          Phnom Kulen, also known as Kulen Mountain, is a significant historical
          and natural landmark in Cambodia. It is considered the birthplace of
          the ancient Khmer Empire and holds great historical and spiritual
          significance. The mountain range is home to numerous natural and
          historical-cultural tourist sites, including the famous Phnom Kulen
          Waterfall, which features cool, multi-tiered cascades and spacious
          grounds. The waterfalls are believed to have purifying properties,
          attracting visitors who bathe in the waters to wash away bad luck and
          bring blessings. Apart from the waterfalls, Phnom Kulen boasts ancient
          temples, intricate river carvings known as the "Valley of a Thousand
          Lingas," and the giant reclining Buddha statue at the mountain's
          summit. These attractions offer insights into Cambodia's rich cultural
          heritage and natural beauty.
        </p>
      ),
    },
    {
      title: "Information",
      content: (
        <p className="text-sm text-gray-600">
          Phnom Kulen, also known as Kulen Mountain, is a significant historical
          and natural landmark in Cambodia. It is considered the birthplace of
          the ancient Khmer Empire and holds great historical and spiritual
          significance. The mountain range is home to numerous natural and
          historical-cultural tourist sites, including the famous Phnom Kulen
          Waterfall, which features cool, multi-tiered cascades and spacious
          grounds. The waterfalls are believed to have purifying properties,
          attracting visitors who bathe in the waters to wash away bad luck and
          bring blessings. Apart from the waterfalls, Phnom Kulen boasts ancient
          temples, intricate river carvings known as the "Valley of a Thousand
          Lingas," and the giant reclining Buddha statue at the mountain's
          summit. These attractions offer insights into Cambodia's rich cultural
          heritage and natural beauty.
        </p>
      ),
    },
  ];
};
