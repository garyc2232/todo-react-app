import { RenderOptions, RenderResult, render } from '@testing-library/react';
import { AppStore, rootReducer, setupStore } from '../src/features/store';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    // Automatically create a store instance if no store was passed in
    store = setupStore(rootReducer),
    ...renderOptions
  }: ExtendedRenderOptions = {},
): { store: ReturnType<typeof setupStore> } & ReturnType<typeof render> {
  function Wrapper({ children }: { children: ReactNode }): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  const view: ReturnType<typeof render> = render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  }) as RenderResult;

  // Return an object with the store and all of RTL"s query functions
  return { store, ...view };
}

export * from '@testing-library/react';
