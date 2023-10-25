import React from 'react';
import LandingFeature from './landingFeatures';
import HeroSection from './heroSection';
import CTASection from './ctaSection';
import TripleColFeatures from './tripleColFeatures';
import Testimonial from './testimonial';

export default function Index() {
  return (
    <React.Fragment>
      <HeroSection />
      <TripleColFeatures />
      <Testimonial />
      <LandingFeature />
      <CTASection />
    </React.Fragment>
  );
}
