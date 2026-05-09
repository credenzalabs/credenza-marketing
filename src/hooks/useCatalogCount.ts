/**
 * useCatalogCount — returns the formatted live catalog size (e.g. "1,600+").
 *
 * One fetch per page load, shared across components via the module-level
 * cache in lib/catalogCount. Renders the fallback "1,700+" until the
 * fetch resolves so SSR-style copy never flashes a placeholder number.
 */

import { useEffect, useState } from 'react';
import { formatCatalogCount, loadCatalogCount } from '../lib/catalogCount';

export function useCatalogCount(): string {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    loadCatalogCount().then(n => {
      if (active && n > 0) setCount(n);
    });
    return () => { active = false; };
  }, []);

  return formatCatalogCount(count ?? 0);
}
