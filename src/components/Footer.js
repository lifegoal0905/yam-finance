import React from 'react';
import styled from '@emotion/styled';
import LinkedinLogo from 'emotion-icons/fa-brands/Linkedin';
import TwitterLogo from 'emotion-icons/fa-brands/Twitter';
import { lighten } from 'polished';

import { media } from '../utils/emotion';
import useModal from "../hooks/useModal";
import ContactModal from "../modals/ContactModal";
import useThemeLogo from "../hooks/useThemeLogo";

import PageSection from './pages/PageSection';
import Link from './Link';
import Caption from './Caption';
import Icon from './Icon';
import Image from "./Image";

const FooterGrid = styled.div`
  padding-top: ${props => props.theme.space.large};
  border-top: 1px solid
    ${props => lighten(0.05, props.theme.colors.accentBackground)};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-row-gap: 4rem;
  grid-template-areas:
    'logo logo logo'
    'menu menu menu'
    'copyright copyright social-icons';
  ${media.tablet`
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 
    "logo menu"
    "copyright social-icons";
  `};
`;

const LogoContainer = styled.div`
  grid-area: logo;
  text-align: center;
  ${media.tablet`
    text-align: left;
  `};
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: menu;
  ${media.tablet`
    align-items: center;
    justify-content: flex-end;
  `};
`;

const MenuLink = styled(Link)`
  padding-left: 2rem;
  font-size: ${props => props.theme.fontSizes.bodySmall};
  cursor: pointer;
  &:first-of-type {
    padding-left: 0;
  }
  ${media.tablet`
    padding-left: 6rem;
  `};
`;

const CopyrightContainer = styled.div`
  grid-area: copyright;
`;

const SocialContainer = styled.div`
  grid-area: social-icons;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const LogoOckam = styled(Image)`
  height: 4.8rem;
`;

const Footer = () => {
  const logo = useThemeLogo();
  const [, showContactModal] = useModal(ContactModal);
  const openContactModal = () => showContactModal();
  return (
    <PageSection mb={3}>
      <FooterGrid>
        <LogoContainer>
          <LogoOckam src={logo} alt="Ockam logo" />
        </LogoContainer>
        <MenuContainer>
          <MenuLink onClick={openContactModal}>
            Request Demo
          </MenuLink>
          <MenuLink onClick={openContactModal}>
            Contact Sales
          </MenuLink>
        </MenuContainer>
        <CopyrightContainer>
          <Caption>© 2017-2020 Ockam.io. All rights reserved.</Caption>
        </CopyrightContainer>
        <SocialContainer>
          <Link to="https://www.linkedin.com/company/ockam.io/">
            <Icon icon={LinkedinLogo} color="caption" />
          </Link>
          <Link to="https://twitter.com/ockam_io">
            <Icon ml={3} icon={TwitterLogo} color="caption" />
          </Link>
        </SocialContainer>
      </FooterGrid>
    </PageSection>
  );
};

export default Footer;
