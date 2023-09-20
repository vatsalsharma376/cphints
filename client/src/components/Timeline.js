import React from 'react'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {Hash,Alt,Bezier,Bug,Hourglass} from 'react-bootstrap-icons'
import contri from '../assets/images/contri.png'
import review from '../assets/images/review.jpeg'
import browse from '../assets/images/browse.png'
import leaderboard from '../assets/images/leaderboard.png'

// import hints from '../assets/images/hints.jpeg'
import Image from 'react-bootstrap/Image'
const Timeline = () => {
  return (
    <div>
  <VerticalTimeline >
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ backgroundColor: '#2d2b55', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(45,43,85)' }}
    // date="2011 - present"
    icon={<Hash/>}
    
    iconStyle={{  backgroundColor: '#2d2b55', color: '#fff' }}  
  >
    <h3 className="vertical-timeline-element-title">Browse Hints</h3>
    {/* <h4 className="vertical-timeline-element-subtitle">HI</h4> */}
    <p>
      Browse hints to find the right solution for your problem
    </p>
    <Image src={browse} fluid/>
    {/* <Image src={hints} fluid height={10}/> */}
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ backgroundColor: '#892cdc', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(137,44,220)' }}
    // date="2010 - 2011"
    icon={<Alt/>}
    iconStyle={{ backgroundColor: '#892cdc', color: '#fff' }}
  
  >
    <h3 className="vertical-timeline-element-title">Contribute Hints</h3>
    {/* <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4> */}
    <p>
     Contribute hints to help others
    </p>
    <Image src={contri} fluid/>

  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ backgroundColor: '#2d2b55', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(45,43,85)' }}
    // date="2008 - 2010"
    icon={<Bezier/>}
    iconStyle={{ backgroundColor: '#2d2b55', color: '#fff' }}
  
  >
    <h3 className="vertical-timeline-element-title">Rankings</h3>
    {/* <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4> */}
    <p>
       Contribute more to get higher rankings
    </p>
    <Image src={leaderboard} fluid/>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ backgroundColor: '#892cdc', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(137,44,220)' }}
    // date="2006 - 2008"
    icon={<Bug/>}
    iconStyle={{ backgroundColor: '#892cdc', color: '#fff' }}
  
  >
    <h3 className="vertical-timeline-element-title">Review</h3>
    
    <p>
     Vote for the hints that helped you the most
    </p>
    <Image src={review} fluid/>

  </VerticalTimelineElement>
  
  

</VerticalTimeline>
    </div>
  )
}

export default Timeline