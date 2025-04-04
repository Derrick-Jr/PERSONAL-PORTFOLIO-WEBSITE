// Initialize charts when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize charts
  initializeCharts();
  
  // Initialize form validation
  initializeFormValidation();
  
  // Add smooth scrolling for internal links
  initializeSmoothScrolling();
  
  // Add animations for elements
  initializeAnimations();
});

// ===============================
// CHARTS INITIALIZATION
// ===============================
function initializeCharts() {
  // Initialize Age Distribution Chart
  const ageCtx = document.getElementById('ageChart');
  const ageChart = new Chart(ageCtx, {
    type: 'bar',
    data: {
      labels: ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'],
      datasets: [{
        label: 'Number of Patients',
        data: [320, 780, 1240, 1650, 890, 400],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Patients: ${context.raw}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Patients'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Age Group'
          }
        }
      }
    }
  });

  // Initialize Age vs Viral Load Scatter Chart
  const scatterCtx = document.getElementById('scatterChart');
  const scatterChart = new Chart(scatterCtx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Patients',
        data: generateScatterData(200),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Age: ${context.parsed.x} years, Viral Load: ${context.parsed.y.toLocaleString()} copies/mL`;
            }
          }
        }
      },
      scales: {
        y: {
          type: 'logarithmic',
          title: {
            display: true,
            text: 'Viral Load (copies/mL)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Age (years)'
          }
        }
      }
    }
  });

  // Initialize Model Metrics Chart
  const metricsCtx = document.getElementById('metricsChart');
  const metricsChart = new Chart(metricsCtx, {
    type: 'line',
    data: {
      labels: ['v1.0', 'v1.2', 'v1.5', 'v2.0', 'v2.2', 'v3.0 (Current)'],
      datasets: [
        {
          label: 'RMSE',
          data: [0.58, 0.48, 0.42, 0.36, 0.32, 0.28],
          borderColor: 'rgba(40, 167, 69, 1)',
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'MAE',
          data: [0.46, 0.39, 0.34, 0.28, 0.25, 0.22],
          borderColor: 'rgba(0, 123, 255, 1)',
          backgroundColor: 'rgba(0, 123, 255, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'R²',
          data: [0.78, 0.82, 0.86, 0.89, 0.91, 0.92],
          borderColor: 'rgba(255, 193, 7, 1)',
          backgroundColor: 'rgba(255, 193, 7, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Metric Value'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Model Version'
          }
        }
      }
    }
  });
}

// Helper function to generate scatter plot data
function generateScatterData(count) {
  const data = [];
  for (let i = 0; i < count; i++) {
    // Age between 18 and 80
    const age = Math.floor(Math.random() * 62) + 18;
    
    // Base viral load decreases slightly with age (on average)
    let baseLoad = Math.pow(10, 3 + Math.random() * 3); // Between 10^3 and 10^6
    
    // Add some age correlation (slight decrease with age)
    baseLoad = baseLoad * (1 - (age - 18) / 150);
    
    // Add randomness
    const viralLoad = baseLoad * (0.5 + Math.random());
    
    data.push({
      x: age,
      y: Math.round(viralLoad)
    });
  }
  return data;
}

// ===============================
// FORM VALIDATION
// ===============================
function initializeFormValidation() {
  const form = document.getElementById('patientForm');
  
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      if (!form.checkValidity()) {
        event.stopPropagation();
      } else {
        // Form is valid, perform prediction
        performPrediction();
      }
      
      form.classList.add('was-validated');
    });
  }
}

// ===============================
// PREDICTION FUNCTIONALITY
// ===============================
function performPrediction() {
  // Show loading state
  const predictButton = document.getElementById('predictButton');
  const originalButtonText = predictButton.innerHTML;
  predictButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Calculating...';
  predictButton.disabled = true;
  
  // Simulate API call delay
  setTimeout(() => {
    // Get form values
    const age = parseFloat(document.getElementById('ageInput').value) || 0;
    const gender = parseInt(document.getElementById('genderInput').value) || 0;
    const h186r = parseInt(document.getElementById('h186rInput').value) || 0;
    const q275e = parseInt(document.getElementById('q275eInput').value) || 0;
    const g363r = parseInt(document.getElementById('g363rInput').value) || 0;
    const k103n = parseInt(document.getElementById('k103nInput').value) || 0;
    
    // Simple prediction model (for demonstration)
    // In a real app, this would call an API endpoint with a trained ML model. I MUST GENERATE THIS!
    let viralLoad = 10000; // Base viral load
    
    // Age factor (older patients tend to have slightly higher viral loads)
    viralLoad += (age - 35) * 50;
    
    // Gender factor
    if (gender === 1) viralLoad *= 1.1;
    
    // Mutation factors
    if (h186r === 1) viralLoad *= 1.4;
    if (q275e === 1) viralLoad *= 1.3;
    if (g363r === 1) viralLoad *= 1.5;
    if (k103n === 1) viralLoad *= 1.2;
    
    // Add some randomness
    viralLoad = viralLoad * (0.85 + Math.random() * 0.3);
    
    // Calculate confidence (in a real model this would come from the model itself)
    const confidence = 85 + Math.random() * 10;
    
    // Determine risk category
    let riskCategory, recommendation;
    if (viralLoad < 5000) {
      riskCategory = '<span class="badge bg-success">Low</span>';
      recommendation = 'Continue current treatment protocol with regular monitoring.';
    } else if (viralLoad < 20000) {
      riskCategory = '<span class="badge bg-warning text-dark">Moderate</span>';
      recommendation = 'Consider treatment adjustment and increase monitoring frequency.';
    } else {
      riskCategory = '<span class="badge bg-danger">High</span>';
      recommendation = 'Immediate treatment review and potential therapy change recommended.';
    }
    
    // Update the results
    document.getElementById('predictedLoad').textContent = Math.round(viralLoad).toLocaleString();
    document.getElementById('predictionConfidence').textContent = `${confidence.toFixed(1)}%`;
    document.getElementById('riskCategory').innerHTML = riskCategory;
    document.getElementById('recommendation').textContent = recommendation;
    
    // Show the results section
    document.getElementById('predictionResults').classList.remove('d-none');
    
    // Reset button state
    predictButton.innerHTML = originalButtonText;
    predictButton.disabled = false;
    
    // Scroll to results
    document.getElementById('predictionResults').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 1500);
}

// ===============================
// SMOOTH SCROLLING
// ===============================
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===============================
// ANIMATIONS
// ===============================
function initializeAnimations() {
  // Check if the IntersectionObserver API is available
  if ('IntersectionObserver' in window) {
    const animatedElements = document.querySelectorAll('.animate-fadeInUp');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    document.querySelectorAll('.animate-fadeInUp').forEach(element => {
      element.classList.add('animated');
    });
  }
}

// ===============================
// RESPONSIVE BEHAVIOR
// ===============================
// Adjust charts on window resize
window.addEventListener('resize', function() {
  // Get all charts and update their layouts
  Object.values(Chart.instances).forEach(chart => {
    chart.resize();
  });
});

// Handle mobile navigation
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a mobile device
  const isMobile = window.innerWidth < 768;
  
  if (isMobile) {
    // Collapse longer sections on mobile
    const collapsibleSections = document.querySelectorAll('.card-body');
    collapsibleSections.forEach(section => {
      const heading = section.querySelector('h2, h3');
      if (heading) {
        heading.style.cursor = 'pointer';
        heading.addEventListener('click', function() {
          const content = this.nextElementSibling;
          if (content) {
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
          }
        });
      }
    });
  }
});
