import { FunctionComponent } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
} from '@chakra-ui/react';

import PerformanceMindsetImage from '@assets/images/performance-mindset.png';
import KeppThingsSimpleImage from '@assets/images/keep-things-simple.png';
import DefaultToTransparencyImage from '@assets/images/default-to-transparency.png';
import TimeIsPreciousImage from '@assets/images/time-is-precious.png';

import VirtuesCard from './components/VirtuesCard';

const DESCRIPTIONS = [
  'Ockam’s Virtues are actions that are embedded in the fabric of our day-today life at Ockam. The four Virtues we live by are:',
];

const VIRTUES_TABS = [
  {
    title: 'High Performance Mindset',
    panel: {
      image: PerformanceMindsetImage,
      texts: [
        'Ockam is a team of doers, builders, shippers, and finishers. We celebrate things that are complete and intentional. Ideas are the easy part. We win by turning ideas into action. ',
        'At Ockam, it’s essential to embrace a growth mindset. High Performance teams have the grit to do the hard things and maintain a growth mindset. We dream audacious goals, and continue to progress towards those goals regardless of obstacles or setbacks. We also understand that every team member will win some, and lose some—learning from losses is essential and a key indicator of a growth mindset. Winning also means doing better than you did before.',
      ],
    },
  },
  {
    title: 'Keep Things Simple',
    panel: {
      image: KeppThingsSimpleImage,
      texts: [
        'The creation of simple solutions out of complex problems is the basis for our namesake, Ockam. Every idea, product, and procedure at Ockam should be governed by the principles in Ockham’s Razor. ',
        'We recognize that simplifying is a difficult and iterative journey. But in the end, when you keep things simple, they tend to be robust - less goes wrong, and there is less to maintain - and less to breakdown.',
        'OKRs help align the team, so that we have a simple clear direction.',
      ],
    },
  },
  {
    title: 'Default to Transparency',
    panel: {
      image: DefaultToTransparencyImage,
      texts: [
        'At Ockam, in the spirit of open source, we believe it’s best to err on the side of disclosure and clarity. By making information public, we can reduce the threshold to contribution and make collaboration easier. Practicing transparency, even when hiding the details could be easier, builds trust. ',
        'Transparency is closely connected with Ockam virtue of Simplicity. When we are transparent, we must communicate ideas simply. By writing down our plans and showcasing our work we gain simplicity because we are transparent.',
      ],
    },
  },
  {
    title: 'Time is Precious',
    panel: {
      image: TimeIsPreciousImage,
      texts: [
        'Time is the most valuable asset that we have. ',
        'We trust each team member to use their time and others’ time wisely. This includes showing up on time to meetings, keeping meetings on track, and taking consideration for others on the team when taking time off.',
        'We value your time. There are 168 hours in a week and Ockam only requires the Team to attend two mandatory meetings each week. We trust each team member to manage the remaining 164 hours in any way they see fit.',
      ],
    },
  },
];

const activeTabItemStyle = {
  textDecoration: 'none',
  bg: 'none',
  svg: { color: 'avocado.500' },
  _after: {
    content: '" "',
    display: 'block',
    borderRadius: '2px',
    height: '4px',
    width: '50%',
    bgColor: 'avocado.500',
    position: 'absolute',
    top: 'calc(100% + 4px)',
  },
};

const Virtues: FunctionComponent = () => (
  <Box bgColor="gray.50" pt={{ base: 16, lg: 20 }} pb={{ base: 20, lg: 30 }}>
    <Container variant="section" px={{ base: 5, lg: 220 }}>
      <Box maxW="3xl" mb={{ base: 16, lg: 14 }} textAlign={{ base: 'left', lg: 'center' }}>
        <Heading as="h2" size="h2" mb={6}>
          Virtues - What We Do
        </Heading>

        {DESCRIPTIONS.map((text, index) => (
          <Text fontSize={{ lg: 'lg' }} key={text} mb={index + 1 === DESCRIPTIONS.length ? 0 : 2}>
            {text}
          </Text>
        ))}
      </Box>

      <VStack spacing={8} display={{ base: 'block', lg: 'none' }}>
        {VIRTUES_TABS.map(({ title, panel }) => (
          <VirtuesCard key={title} title={title} panel={panel} maxW="lg" />
        ))}
      </VStack>

      <Tabs w="full" display={{ base: 'none', lg: 'initial' }}>
        <TabList display="flex" justifyContent="space-between" px={4} mb={16} borderBottom={0}>
          {VIRTUES_TABS.map(({ title }) => (
            <Tab
              position="relative"
              px={2}
              m={0}
              key={title}
              fontSize="xl"
              fontWeight="bold"
              color="gray.500"
              _hover={activeTabItemStyle}
              _selected={{
                ...activeTabItemStyle,
                color: 'brand.900',
                fontWeight: 'bold',
                _hover: { activeTabItemStyle },
              }}
            >
              {title}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {VIRTUES_TABS.map(({ title, panel }) => (
            <TabPanel key={title} p={0}>
              <VirtuesCard title={title} panel={panel} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Container>
  </Box>
);

export default Virtues;
