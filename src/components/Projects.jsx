import React from 'react';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'Barbershop website',
    category: 'Web',
    technologies: 'HTML, CSS, JavaScript, Gsap, Swiper Js and Figma.',
    image: 'path/to/barbershop-image.jpg',
  },
  {
    id: 2,
    title: 'Interface Design For Ice Cream Shop',
    category: 'Design',
    technologies: 'HTML, CSS, JavaScript, Gsap, Swiper Js and Figma.',
    image: 'path/to/ice-cream-shop-image.jpg',
  },
  {
    id: 3,
    title: 'Fast Food Website',
    category: 'Web',
    technologies: 'HTML, CSS, JavaScript, Gsap, Swiper Js and Figma.',
    image: 'path/to/fast-food-image.jpg',
  },
];

const Projects = () => {
  return (
    <section className="projects-section">
      <h2 className="projects-title">Projects</h2>
      <div className="projects-container">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <span className="project-id">{project.id.toString().padStart(2, '0')}</span>
              <span className="project-category">{project.category}</span>
            </div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-technologies">Technologies used</p>
            <p className="project-tech-list">{project.technologies}</p>
            <div className="project-image-container">
              <img src={project.image} alt={project.title} className="project-image" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;