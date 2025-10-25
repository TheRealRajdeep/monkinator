import type { Theme } from '@rainbow-me/rainbowkit';

export const customTheme: Theme = {
  blurs: {
    modalOverlay: 'blur(8px)',
  },
  colors: {
    accentColor: '#7A00FF', // main violet accent
    accentColorForeground: '#ffffff',
    actionButtonBorder: 'rgba(255,255,255,0.1)',
    actionButtonBorderMobile: 'rgba(255,255,255,0.1)',
    actionButtonSecondaryBackground: 'rgba(255,255,255,0.08)',
    closeButton: '#ffffff',
    closeButtonBackground: 'rgba(255,255,255,0.08)',
    connectButtonBackground: '#1A1A1A',
    connectButtonBackgroundError: '#3b0000',
    connectButtonInnerBackground: '#0f0f0f',
    connectButtonText: '#ffffff',
    connectButtonTextError: '#ff4d4d',
    connectionIndicator: '#7A00FF',
    downloadBottomCardBackground: '#0f0f0f',
    downloadTopCardBackground: '#1A1A1A',
    error: '#ff4d4d',
    generalBorder: 'rgba(255,255,255,0.12)',
    generalBorderDim: 'rgba(255,255,255,0.06)',
    menuItemBackground: 'rgba(255,255,255,0.06)',
    modalBackdrop: 'rgba(0,0,0,0.6)',
    modalBackground: '#0f0f0f',
    modalBorder: 'rgba(255,255,255,0.1)',
    modalText: '#ffffff',
    modalTextDim: 'rgba(255,255,255,0.6)',
    modalTextSecondary: 'rgba(255,255,255,0.8)',
    profileAction: 'rgba(122,0,255,0.15)',
    profileActionHover: 'rgba(122,0,255,0.3)',
    profileForeground: '#1a1a1a',
    selectedOptionBorder: '#7A00FF',
    standby: '#ffaa00'
  },
  fonts: {
    body: "'Inter', sans-serif",
  },
  radii: {
    actionButton: '12px',
    connectButton: '12px',
    menuButton: '12px',
    modal: '16px',
    modalMobile: '16px',
  },
  shadows: {
    connectButton: '0 0 10px rgba(122,0,255,0.4)',
    dialog: '0 0 25px rgba(122,0,255,0.25)',
    profileDetailsAction: '0 0 8px rgba(122,0,255,0.4)',
    selectedOption: '0 0 8px rgba(122,0,255,0.5)',
    selectedWallet: '0 0 12px rgba(122,0,255,0.5)',
    walletLogo: '0 0 6px rgba(122,0,255,0.4)',
  },
};