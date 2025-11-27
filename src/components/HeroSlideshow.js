import React from 'react';

function HeroSlideshow() {
  return React.createElement('section', {
    style: {
      width: '100%',
      height: '600px',
      background: 'linear-gradient(to right, rgba(52, 78, 65, 0.8), rgba(58, 90, 64, 0.8)), url("https://images.unsplash.com/photo-1588766381125-c29bced9d2d0?w=1200")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      color: 'white',
      position: 'relative'
    }
  import React from 'react';
  import { useRouter } from '../utils/Router';
    style: {
      maxWidth: '1200px',
    const { navigateTo, currentPath } = useRouter();
    const navigateToSection = (sectionId) => {
      if (currentPath !== '/') {
        navigateTo('/');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };
    const handlePrimaryCTA = (title) => {
      const t = (title || '').toLowerCase();
      if (t.includes('shop') || t.includes('explore') || t.includes('get started')) {
        navigateTo('/products');
        return;
      }
      navigateTo('/products');
    };
    const handleSecondaryCTA = (cta) => {
      const t = (cta || '').toLowerCase();
      if (t.includes('learn') || t.includes('mission') || t.includes('about')) {
        navigateToSection('about');
        return;
      }
      if (t.includes('our story') || t.includes('our-story')) {
        navigateToSection('our-story');
        return;
      }
      if (t.includes('workshop')) {
        navigateToSection('workshops');
        return;
      }
      navigateTo('/');
    };
      margin: '0 auto',
      padding: '0 16px',
      zIndex: 10
    }
  }, React.createElement('div', {
    style: { maxWidth: '672px' }
  }, [
    React.createElement('div', {
      key: 'tag',
      style: {
        display: 'inline-block',
        padding: '8px 16px',
        backgroundColor: '#a3b18a',
        color: '#344e41',
        borderRadius: '9999px',
        fontSize: '14px',
        marginBottom: '24px'
      }
    }, 'Sustainable Living Made Beautiful'),
    React.createElement('h1', {
      key: 'title',
      style: {
        fontSize: '48px',
        lineHeight: '1.2',
        fontWeight: '600',
        marginBottom: '24px',
        margin: '0 0 24px 0'
      }
    }, [
      'Transforming Waste into ',
      React.createElement('span', {
        key: 'highlight',
        style: { color: '#a3b18a' }
      }, 'Wonderful Products')
    ]),
    React.createElement('p', {
      key: 'desc',
      style: {
        fontSize: '18px',
        color: '#dad7cd',
        marginBottom: '32px',
        lineHeight: '1.6'
      }
    }, 'Discover our collection of handcrafted, eco-friendly products made from upcycled materials.'),
    React.createElement('div', {
      key: 'buttons',
      style: { display: 'flex', gap: '16px', flexWrap: 'wrap' }
    }, [
      React.createElement('button', {
        key: 'shop',
        style: {
          padding: '12px 32px',
          backgroundColor: '#588157',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
          fontWeight: '500'
        }, onClick: () => handlePrimaryCTA('Shop Now')
      }, 'Shop Now'),
      React.createElement('button', {
        key: 'learn',
        style: {
          padding: '12px 32px',
          backgroundColor: 'transparent',
          color: 'white',
          border: '2px solid white',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
          fontWeight: '500'
        }, onClick: () => handleSecondaryCTA('Learn More')
      }, 'Learn More')
    ])
  ])));
}

export { HeroSlideshow };