import React from 'react';
import './App.css';
import resume from './assets/resume/christian-bjerre-fernandes.pdf';
import finnJake from './assets/adventuretime/finn_jake.png';

function Home(props) {
  return (
    <div>
      <h1>Christian Bjerre-Fernandes</h1>
      <img src={finnJake} width="250" height="200" alt="Finn and Jake"></img>
      <div className="paragraph">
        <p>
          <span>
          Hello! My name is Christian Bjerre-Fernandes. I am a recent graduate from 
          <a href="https://www.uchicago.edu/">University of Chicago</a> in computer science.
          In addition to computer science, I love to study languages and learn about other cultures.
          <br></br>
          <br></br>
          During college, I was a part of <a href="https://equalopportunityprograms.uchicago.edu/title-ix/rsvp-programming-center/">Resources for Sexual Violence Prevention (RSVP)
          </a>, <a href="https://www.facebook.com/UChicagoTheMark/">The Mark</a>, and <a href="https://uncommonhacks.com/">Uncommon Hacks</a>.
          I also loved to participate in intramural sports with my house (Ultimate Frisbee, Foosball, Inner Tube Waterpolo, etc)
          and explore and eat food around Chicago.
          <br></br>
          <br></br>
          Now I am a software engineer at Capital One in their Technology Development Program.
          Outside of work, I love to play Apex Legends (I main Bloodhound/Wraith), watch movies (The Prestige, Lincoln Lawyer, etc.) and 
          shows of all kind (Bojack Horseman, Love is Blind, etc.), and photography.
          <br></br>
          <br></br>
          <a href={resume} target="_blanks">Here</a> is my resume!
          </span>
        </p>
      </div>
    </div>
  )
}
 
export default Home;