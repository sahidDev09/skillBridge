document.addEventListener('DOMContentLoaded', () => {
  const pinSection = document.getElementById('pin-section');
  const uploadSection = document.getElementById('upload-section');
  const pinInput = document.getElementById('pin-input');
  const pinSubmit = document.getElementById('pin-submit');
  const pinError = document.getElementById('pin-error');
  
  const jobForm = document.getElementById('job-form');
  const jobSuccess = document.getElementById('job-success');
  
  // The super secret PIN
  const CORRECT_PIN = '1234';

  // Handle PIN Submission
  const unlockPortal = () => {
    if (pinInput.value === CORRECT_PIN) {
      pinSection.style.display = 'none';
      uploadSection.style.display = 'block';
    } else {
      pinError.style.display = 'block';
      pinInput.value = '';
      pinInput.focus();
    }
  };

  pinSubmit.addEventListener('click', unlockPortal);
  pinInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') unlockPortal();
  });

  // Handle Job Form Submission
  jobForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Parse comma separated values
    const parseList = (str) => str.split(',').map(s => s.trim()).filter(s => s.length > 0);
    
    const title = document.getElementById('job-title').value;
    const category = document.getElementById('job-category').value;
    const description = document.getElementById('job-description').value;
    const salary = document.getElementById('job-salary').value;
    const skills = parseList(document.getElementById('job-skills').value);
    const tech = parseList(document.getElementById('job-tech').value);

    // Create a new job object
    const newJob = {
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
      title: title,
      category: category,
      description: description,
      skills: skills,
      salary: salary,
      demand: 'High', // Default
      tech: tech,
      requiredSkills: skills
    };

    // Retrieve existing jobs from localStorage (managed by mock-data.js logic)
    let jobs = [];
    const stored = localStorage.getItem('skillbridge_jobs');
    if (stored) {
      try {
        jobs = JSON.parse(stored);
      } catch (err) {
        console.error(err);
      }
    }

    // Add the new job at the beginning
    jobs.unshift(newJob);

    // Save back to localStorage
    localStorage.setItem('skillbridge_jobs', JSON.stringify(jobs));

    // Show success message and reset form
    jobSuccess.style.display = 'block';
    jobForm.reset();
    
    // Hide success message after 4 seconds
    setTimeout(() => {
      jobSuccess.style.display = 'none';
    }, 4000);
  });
});
