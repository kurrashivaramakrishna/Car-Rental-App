// import React from "react";
import React, { useEffect } from "react";
// import "./style.css"; // Local CSS
// import "aos/dist/aos.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

const Portfolio = () => {
  const toggleMenu = (e) => {
    const menu = document.getElementById("menu-content");
    menu.classList.toggle("show");
  };
  useEffect(() => {
    window.scrollTo(-1150, 0); // always scroll to top on mount
  }, []);

  return (
    <div>
      <canvas id="rainCanvas"></canvas>
      <canvas id="dotsCanvas"></canvas>

      {/* Dark mode switch */}
      <label className="switch">
        <span className="label-text"></span>
        <input type="checkbox" id="darkModeSwitch" placeholder="modes" />
        <span className="slider round"></span>
      </label>

      <div className="content-wrapper" id="Content-wrapper">
        {/* Resume Download */}
        <a
          href="/images/Shiva_Rama_Krishna-Software_Engineer.pdf"
          id="download-button"
          download
        >
          <button className="btn">
            <i className="fa fa-download"></i> Resume
          </button>
        </a>

        {/* Dropdown Menu */}
        <div id="dropdown-menu">
          <button className="menu-button" onClick={toggleMenu}>
            ☰
          </button>
          <div id="menu-content" className="menu-content">
            <a href="/index.html" className="menu-Elements">
              Home
            </a>
            <a href="/pages/Skills" className="menu-Elements">
              Skills
            </a>
            <a href="/pages/projects" className="menu-Elements">
              Projects
            </a>
            <a href="/pages/experience" className="menu-Elements">
              Experience
            </a>
            <a href="/pages/Achievements" className="menu-Elements">
              Achievements
            </a>
            <a href="/pages/certifications" className="menu-Elements">
              Certifications
            </a>
            <a href="/pages/interests" className="menu-Elements">
              Interests
            </a>
            <a href="/pages/Contact" className="menu-Elements">
              Contact
            </a>
          </div>
        </div>

        {/* Profile */}
        <div id="my-profile" className="menu-options">
          <img
            src="./images/myprofile.jpg"
            alt="Profile Picture"
            onClick={() => (window.location.href = "/index.html")}
            id="profile-image"
          />
          <span
            className="upload-btn"
            onClick={() => (window.location.href = "/pages/signin")}
          >
            <i className="fas fa-plus"></i>
          </span>

          <h1 id="username">Kurra Shiva Rama Krishna</h1>
          <p id="bio">
            A passionate software developer with a keen interest in web
            technologies and a strong foundation in computer science principles.
          </p>
          <p id="location">Location: Middlesbrough, England</p>
          <p id="motive">
            Detail-oriented and highly motivated Full Stack Developer and AI
            Innovator with a strong academic background and a practical mindset.
            Adept at designing, building, and deploying scalable applications
            across web, mobile, and AI domains. Demonstrated experience in
            delivering high-impact projects from scratch, using modern
            frameworks and design patterns. Proven ability to bridge the gap
            between user needs and software solutions. Actively seeking a Tier 2
            Sponsorship role in the UK to contribute to innovative teams and
            deliver measurable results.
          </p>
        </div>

        {/* Tech Marquee */}
        <div className="tech-marquee menu-options">
          <div className="marquee-track">
            {/* Keep your circular-progress blocks here (unchanged) */}
          </div>
        </div>

        {/* Certification Boxes */}
        <div className="cert-boxes">
          <div className="cert-box">Upcoming: TensorFlow Specialist</div>
          <div className="cert-box">Planned: DevOps with AWS</div>
          <div className="cert-box">Goal: Cybersecurity Fundamentals</div>
          <div className="cert-box">Future: Kubernetes + Docker</div>
        </div>
      </div>

      {/* Skills Section */}
      <div id="skills" className="menu-options">
        <h2>Skills</h2>
        <p>Languages: JavaScript, Java, Python, Kotlin, HTML5, CSS3, SQL</p>
        <p>Frontend: React.js, Vite, Tailwind CSS, Bootstrap</p>
        <p>Backend: Node.js, Express.js, Flask</p>
        <p>Databases: MySQL, PostgreSQL, Firebase</p>
        <p>AI/ML: YOLOv8, CNN, PyTorch, OpenCV</p>
      </div>

      {/* Projects Section */}
      <section id="projects" className="menu-options">
        <h2>Projects</h2>
        <article className="project-card">
          <h3>Autonomous Vehicle Object Detection</h3>
          <p>
            <strong>Objective:</strong> Real-time traffic object detection for
            autonomous vehicles.
          </p>
          <p>
            <strong>Role:</strong> Designed & trained YOLOv8 model; integrated
            CNN-transformer hybrid for edge deployment.
          </p>
          <p>
            <strong>Technologies Used:</strong> YOLOv8, PyTorch, Python, OpenCV
          </p>
          <p>
            <strong>Outcome:</strong> Achieved mAP@0.5 = 0.558; inference
            ~7.8ms/image; robust detection across 5+ classes.
          </p>
          <a
            href="https://colab.research.google.com/drive/1WhzMXk_UnbMhFH10l6lyLO2h2PXyXSJp"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            🔗 View Source Code
          </a>
        </article>

        {/* Repeat same JSX structure for other projects */}
      </section>

      {/* Education */}
      <section id="education" className="menu-options">
        <h2>Education</h2>
        <div className="edu-block">
          <h3>MSc in Computer Science</h3>
          <p>Teesside University, UK (2023–2025)</p>
          <p>
            <strong>Grade:</strong> Merit
          </p>
        </div>
        <div className="edu-block">
          <h3>B.Tech in Electrical & Electronics Engineering</h3>
          <p>Scient Institute of Technology, RR Dist (2017–2021)</p>
          <p>
            <strong>Percentage:</strong> 71%
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="menu-options" aria-label="Contact form section">
        <h1>Contact Me</h1>
        <div className="container">
          <h2>Let's build something great together.</h2>
          <p>
            I'm currently seeking new opportunities as a full-stack developer.
            If you have a project in mind, a job opportunity, or just want to
            connect, please use the form below to get in touch!
          </p>

          <form id="contactForm" className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="6" required></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
          <p id="formResponse"></p>
        </div>
      </section>

      {/* Social Links */}
      <section id="social-links-section" className="contact-section secondary-section">
        <div className="container">
          <h3>Other Ways to Connect</h3>
          <div className="social-links">
            <a
              href="mailto:shivakrish2724262@gmail.com"
              className="social-link"
              title="Email me"
            >
              <i className="fas fa-envelope"></i>
              <span>Email</span>
            </a>
            <a
              href="https://www.linkedin.com/in/shiva-rama-krishna-861a3916b"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/kurrashivaramakrishna"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>

      <footer>© 2025 Shiva Rama Krishna | Full Stack Developer</footer>
    </div>
  );
};

export default Portfolio;
