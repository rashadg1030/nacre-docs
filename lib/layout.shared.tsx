import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { NavToggles } from '@/components/NavToggles';
import { PearlLogo } from '@/components/PearlLogo';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2">
          <PearlLogo />
          <span className="font-serif text-2xl font-light">Nacre</span>
        </span>
      ),
    },
    themeSwitch: {
      component: <NavToggles />,
    },
  };
}
