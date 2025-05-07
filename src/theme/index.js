const theme = {
  colors: {
    primary: {
      light: '#3B82F6', // blue-500
      dark: '#60A5FA', // blue-400
    },
    secondary: {
      light: '#10B981', // emerald-500
      dark: '#34D399', // emerald-400
    },
    accent: {
      light: '#8B5CF6', // violet-500
      dark: '#A78BFA', // violet-400
    },
    background: {
      light: '#FFFFFF',
      dark: '#1F2937', // gray-800
    },
    surface: {
      light: '#F3F4F6', // gray-100
      dark: '#374151', // gray-700
    },
    text: {
      primary: {
        light: '#111827', // gray-900
        dark: '#F9FAFB', // gray-50
      },
      secondary: {
        light: '#4B5563', // gray-600
        dark: '#9CA3AF', // gray-400
      },
    },
    chart: {
      series: [
        { light: '#3B82F6', dark: '#60A5FA' }, // blue
        { light: '#10B981', dark: '#34D399' }, // emerald
        { light: '#8B5CF6', dark: '#A78BFA' }, // violet
        { light: '#F59E0B', dark: '#FBBF24' }, // amber
        { light: '#EF4444', dark: '#F87171' }, // red
        { light: '#EC4899', dark: '#F472B6' }, // pink
      ],
      grid: {
        light: '#E5E7EB', // gray-200
        dark: '#4B5563', // gray-600
      },
      tooltip: {
        background: {
          light: '#FFFFFF',
          dark: '#1F2937',
        },
        border: {
          light: '#E5E7EB',
          dark: '#4B5563',
        },
      },
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  transitions: {
    DEFAULT: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  borderRadius: {
    sm: '0.25rem',
    DEFAULT: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
};

export default theme;
