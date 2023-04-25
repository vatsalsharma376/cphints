import React from 'react'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {Hash,Alt,Bezier,Bug,Hourglass} from 'react-bootstrap-icons'

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
    <h3 className="vertical-timeline-element-title">title</h3>
    {/* <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4> */}
    <p>
      dkndfnejfnedfjndnfcdfjckedfkjsnfkjnfjknfcjkednkjendkje
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ backgroundColor: '#2d2b55', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(45,43,85)' }}
    // date="2008 - 2010"
    icon={<Bezier/>}
    iconStyle={{ backgroundColor: '#2d2b55', color: '#fff' }}
  
  >
    <h3 className="vertical-timeline-element-title">Web Designer</h3>
    {/* <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4> */}
    <p>
      User Experience, Visual Design
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ backgroundColor: '#892cdc', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(137,44,220)' }}
    // date="2006 - 2008"
    icon={<Bug/>}
    iconStyle={{ backgroundColor: '#892cdc', color: '#fff' }}
  
  >
    <h3 className="vertical-timeline-element-title">Web Designer</h3>
    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
    <p>
      User Experience, Visual Design
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    // date="April 2013"
    icon={<Hourglass/>}
    contentStyle={{ backgroundColor: '#2d2b55', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(45,43,85)' }}
    iconStyle={{  backgroundColor: '#2d2b55', color: '#fff' }}
    
  >
    <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
    <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
    <p>
      Strategy, Social Media
    </p>
  </VerticalTimelineElement>
  

</VerticalTimeline>
    </div>
  )
}

export default Timeline