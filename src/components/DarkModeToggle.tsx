import { useDarkMode } from '../hooks/useDarkMode';

export function DarkModeToggle() {
  const { isDark, toggle } = useDarkMode();

  return (
    <button
      onClick={toggle}
      className="rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? 'Light' : 'Dark'}
    </button>
  );
}
